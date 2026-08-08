# 🔗 Panduan Integrasi Dinamis Konfigurasi Sekolah (Go Backend)

Dokumen ini menjelaskan cara backend sekolah berbasis **Go (Golang)** mengambil data konfigurasi sekolah secara dinamis dari **Amertarva Registry API** saat startup, menggantikan nilai hardcoded di `.env`.

---

## Arsitektur Alur Data

```
┌──────────────────────────────┐
│  Backend Sekolah (Go)        │
│  apps/school-backend/        │
└──────────────────────────────┘
         │  saat startup
         │  GET /schools/:id
         │  Authorization: Bearer <token>
         ▼
┌──────────────────────────────┐
│  Amertarva Registry API      │
│  (Elysia / Node.js)          │
│  http://backend.amertarva.com│
└──────────────────────────────┘
         │
         │  Response JSON
         ▼
┌──────────────────────────────┐
│  schoolConfig (in-memory)    │
│  SchoolName, PlanType,       │
│  RentEndDate, Status, dll.   │
└──────────────────────────────┘
```

> [!IMPORTANT]
> Endpoint `GET /schools/:id` memerlukan **JWT Lord Admin** (`Authorization: Bearer <token>`). Untuk keperluan server-to-server, gunakan token yang di-generate saat login admin dan simpan sebagai `AMERTARVA_API_TOKEN` di `.env` sekolah.
> 
> **Catatan Keamanan**: Endpoint ini **tidak** mengembalikan nilai raw kredensial database (URL/Key Supabase dll.). Kredensial tersebut hanya dikembalikan sebagai flag `isConfigured: true/false`. Nilai asli tetap perlu disimpan di `.env` sekolah.

---

## 1. Minimal `.env` Backend Sekolah

```env
# =============================================
# AMERTARVA REGISTRY — koneksi ke API pusat
# =============================================

# URL backend Amertarva (sumber konfigurasi sekolah)
AMERTARVA_BACKEND_URL=https://backend.amertarva.com

# ID Sekolah — diberikan Lord Admin setelah pendaftaran
SCHOOL_ID=SCH_aB3xYz1234

# Token JWT Lord Admin — untuk autentikasi ke registry API
# Dapatkan dari POST /auth/login menggunakan akun Lord Admin
AMERTARVA_API_TOKEN=eyJhbGciOiJIUzI1NiIs...

# =============================================
# DATABASE SEKOLAH — tetap di .env (tidak di-expose API)
# =============================================
SUPABASE_URL=https://<project-id>.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIs...

# Port server Go
PORT=8080
```

---

## 2. Struktur Data (Go Structs)

Buat file `internal/registry/school_config.go`:

```go
package registry

import "time"

// SchoolConfig adalah representasi konfigurasi sekolah
// yang diambil dari Amertarva Registry API.
type SchoolConfig struct {
    SchoolID       string     `json:"schoolId"`
    SchoolName     string     `json:"schoolName"`
    SubdomainSlug  string     `json:"subdomainSlug"`
    PlanType       string     `json:"planType"` // "CLASSIC" | "PRO" | "PREMIUM" | "CUSTOM"
    Status         string     `json:"status"`   // "PENDING" | "ACTIVE" | "SUSPENDED"
    MaxStorageGb   int        `json:"maxStorageGb"`
    InitStatus     string     `json:"initStatus"`
    Rent           RentInfo   `json:"rent"`
    Credentials    CredFlags  `json:"credentials"`
    CreatedAt      time.Time  `json:"createdAt"`
    UpdatedAt      time.Time  `json:"updatedAt"`
}

type RentInfo struct {
    DurationMonths int       `json:"durationMonths"`
    StartDate      time.Time `json:"startDate"`
    EndDate        time.Time `json:"endDate"`
    Status         string    `json:"status"` // "ACTIVE" | "EXPIRING_SOON" | "EXPIRED" | "NONE"
}

type CredFlags struct {
    SupaTeachers IsConfigured `json:"supaTeachers"`
    SupaStudents IsConfigured `json:"supaStudents"`
    SupaClasses  IsConfigured `json:"supaClasses"`
    SupaGrades   IsConfigured `json:"supaGrades"`
    Astradb      IsConfigured `json:"astradb"`
    MongoDB      IsConfigured `json:"mongodb"`
    Turso        IsConfigured `json:"turso"`
    NAS          IsConfigured `json:"nas"`
}

type IsConfigured struct {
    IsConfigured bool `json:"isConfigured"`
}
```

---

## 3. Client HTTP ke Registry API

Buat file `internal/registry/client.go`:

```go
package registry

import (
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "os"
    "time"
)

// RegistryClient adalah HTTP client untuk Amertarva Registry API.
type RegistryClient struct {
    baseURL    string
    token      string
    httpClient *http.Client
}

// NewRegistryClient membuat instance client baru dari environment variables.
func NewRegistryClient() *RegistryClient {
    return &RegistryClient{
        baseURL: os.Getenv("AMERTARVA_BACKEND_URL"),
        token:   os.Getenv("AMERTARVA_API_TOKEN"),
        httpClient: &http.Client{
            Timeout: 10 * time.Second,
        },
    }
}

// FetchSchoolConfig mengambil konfigurasi sekolah dari registry API.
func (c *RegistryClient) FetchSchoolConfig(schoolID string) (*SchoolConfig, error) {
    url := fmt.Sprintf("%s/schools/%s", c.baseURL, schoolID)

    req, err := http.NewRequest(http.MethodGet, url, nil)
    if err != nil {
        return nil, fmt.Errorf("gagal membuat request: %w", err)
    }

    req.Header.Set("Authorization", "Bearer "+c.token)
    req.Header.Set("Content-Type", "application/json")

    resp, err := c.httpClient.Do(req)
    if err != nil {
        return nil, fmt.Errorf("gagal menghubungi registry API: %w", err)
    }
    defer resp.Body.Close()

    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return nil, fmt.Errorf("gagal membaca response: %w", err)
    }

    switch resp.StatusCode {
    case http.StatusOK:
        // sukses
    case http.StatusUnauthorized:
        return nil, fmt.Errorf("AMERTARVA_API_TOKEN tidak valid atau sudah expired")
    case http.StatusNotFound:
        return nil, fmt.Errorf("sekolah dengan ID '%s' tidak ditemukan di registry", schoolID)
    default:
        return nil, fmt.Errorf("registry API mengembalikan status %d: %s", resp.StatusCode, string(body))
    }

    var config SchoolConfig
    if err := json.Unmarshal(body, &config); err != nil {
        return nil, fmt.Errorf("gagal decode JSON response: %w", err)
    }

    return &config, nil
}
```

---

## 4. Inisialisasi Saat Startup

Buat file `internal/registry/app_config.go`:

```go
package registry

import (
    "fmt"
    "log"
    "os"
    "sync"
    "time"
)

// AppConfig menyimpan konfigurasi aplikasi yang dimuat saat startup.
type AppConfig struct {
    mu     sync.RWMutex
    School *SchoolConfig
}

var Global = &AppConfig{}

// Load mengambil dan memvalidasi konfigurasi sekolah dari registry.
func (a *AppConfig) Load() error {
    schoolID := os.Getenv("SCHOOL_ID")
    if schoolID == "" {
        return fmt.Errorf("SCHOOL_ID belum diset di .env")
    }

    client := NewRegistryClient()
    config, err := client.FetchSchoolConfig(schoolID)
    if err != nil {
        return fmt.Errorf("gagal mengambil konfigurasi sekolah: %w", err)
    }

    // Validasi status sekolah
    if config.Status == "SUSPENDED" {
        return fmt.Errorf("sekolah '%s' dalam status SUSPENDED — hubungi Lord Admin", config.SchoolName)
    }

    // Periksa masa sewa
    if config.Rent.Status == "EXPIRED" {
        return fmt.Errorf("masa sewa sekolah '%s' sudah berakhir pada %s",
            config.SchoolName,
            config.Rent.EndDate.Format("02 Jan 2006"),
        )
    }

    if config.Rent.Status == "EXPIRING_SOON" {
        log.Printf("⚠️  PERINGATAN: Masa sewa sekolah '%s' akan berakhir pada %s",
            config.SchoolName,
            config.Rent.EndDate.Format("02 Jan 2006"),
        )
    }

    a.mu.Lock()
    a.School = config
    a.mu.Unlock()

    log.Printf("✅ Konfigurasi sekolah berhasil dimuat: %s [%s] — Sewa: %s",
        config.SchoolName,
        config.PlanType,
        config.Rent.Status,
    )

    return nil
}

// Get mengambil konfigurasi sekolah secara thread-safe.
func (a *AppConfig) Get() *SchoolConfig {
    a.mu.RLock()
    defer a.mu.RUnlock()
    return a.School
}

// StartAutoRefresh memperbarui konfigurasi secara periodik (opsional).
// Berguna untuk mendeteksi perubahan planType atau status sewa tanpa restart.
func (a *AppConfig) StartAutoRefresh(interval time.Duration) {
    go func() {
        ticker := time.NewTicker(interval)
        defer ticker.Stop()
        for range ticker.C {
            if err := a.Load(); err != nil {
                log.Printf("❌ Auto-refresh konfigurasi gagal: %v", err)
            }
        }
    }()
}
```

---

## 5. Integrasi di `main.go`

```go
package main

import (
    "log"
    "net/http"
    "os"
    "time"

    "github.com/yourname/school-backend/internal/registry"
    // import router, handler, dll.
)

func main() {
    // 1. Muat konfigurasi sekolah dari Amertarva Registry
    log.Println("🔄 Menghubungkan ke Amertarva Registry...")
    if err := registry.Global.Load(); err != nil {
        log.Fatalf("❌ Gagal memuat konfigurasi sekolah: %v", err)
    }

    // 2. (Opsional) Auto-refresh setiap 1 jam
    registry.Global.StartAutoRefresh(1 * time.Hour)

    // 3. Jalankan HTTP server
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    log.Printf("🚀 Server sekolah '%s' berjalan di port %s",
        registry.Global.Get().SchoolName, port)

    // Setup router & handler di sini...
    // mux := setupRouter()
    // http.ListenAndServe(":"+port, mux)
}
```

---

## 6. Penggunaan di Handler

Contoh penggunaan `registry.Global.Get()` di dalam handler Go:

```go
package handler

import (
    "encoding/json"
    "net/http"

    "github.com/yourname/school-backend/internal/registry"
)

// GetSchoolInfo mengembalikan info sekolah yang sedang aktif.
func GetSchoolInfo(w http.ResponseWriter, r *http.Request) {
    cfg := registry.Global.Get()

    json.NewEncoder(w).Encode(map[string]any{
        "schoolId":   cfg.SchoolID,
        "schoolName": cfg.SchoolName,
        "planType":   cfg.PlanType,
        "rentStatus": cfg.Rent.Status,
        "rentEndDate": cfg.Rent.EndDate,
    })
}

// CheckPremiumFeature adalah middleware untuk membatasi fitur berdasarkan plan.
func RequirePlan(minPlan string) func(http.Handler) http.Handler {
    planLevel := map[string]int{
        "CLASSIC": 1,
        "PRO":     2,
        "PREMIUM": 3,
        "CUSTOM":  4,
    }

    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            cfg := registry.Global.Get()
            if planLevel[cfg.PlanType] < planLevel[minPlan] {
                http.Error(w, "Fitur ini membutuhkan plan "+minPlan+" atau lebih tinggi", http.StatusForbidden)
                return
            }
            next.ServeHTTP(w, r)
        })
    }
}
```

Contoh penggunaan middleware plan di router:

```go
// Hanya tersedia untuk plan PRO ke atas
mux.Handle("/api/advanced-reports", RequirePlan("PRO")(advancedReportsHandler))

// Hanya tersedia untuk plan PREMIUM ke atas
mux.Handle("/api/ai-grading", RequirePlan("PREMIUM")(aiGradingHandler))
```

---

## 7. Contoh Response JSON dari Registry API

Ini adalah bentuk response dari `GET /schools/:id` yang akan di-parse oleh Go:

```json
{
  "schoolId": "SCH_aB3xYz1234",
  "schoolName": "SMA Maju Jaya",
  "subdomainSlug": "sma-maju-jaya",
  "planType": "PRO",
  "status": "ACTIVE",
  "maxStorageGb": 10,
  "initStatus": "DONE",
  "superAdminEmail": "admin@smamajujaya.sch.id",
  "rent": {
    "durationMonths": 12,
    "startDate": "2025-07-18T00:00:00Z",
    "endDate": "2026-07-18T00:00:00Z",
    "status": "ACTIVE"
  },
  "credentials": {
    "supaTeachers": { "isConfigured": true },
    "supaStudents": { "isConfigured": true },
    "supaClasses":  { "isConfigured": true },
    "supaGrades":   { "isConfigured": true },
    "astradb":      { "isConfigured": false },
    "mongodb":      { "isConfigured": false },
    "turso":        { "isConfigured": false },
    "nas":          { "isConfigured": false }
  },
  "createdAt": "2025-07-18T04:57:00Z",
  "updatedAt": "2025-07-18T04:57:00Z"
}
```

> [!NOTE]
> Perhatikan bahwa `credentials` hanya mengembalikan flag `isConfigured: true/false`, **bukan** nilai URL atau Key aslinya. Nilai asli tetap harus disimpan di `.env` sekolah karena alasan keamanan — tidak pernah di-expose melalui API.

---

## 8. Ringkasan Data yang Didapat Dinamis vs Statis

| Data | Didapat dari API? | Tetap di `.env`? | Keterangan |
|---|---|---|---|
| `schoolId` | ❌ | ✅ Wajib | Diperlukan untuk memanggil API |
| `schoolName` | ✅ | ❌ Opsional | Bisa diambil dari API |
| `subdomainSlug` | ✅ | ❌ Opsional | Bisa diambil dari API |
| `planType` | ✅ | ❌ Opsional | Dipakai untuk feature gating |
| `rentEndDate` | ✅ | ❌ Opsional | Dipakai untuk validasi masa sewa |
| `status` | ✅ | ❌ | Dipakai untuk blokir jika SUSPENDED |
| Supabase URL | ❌ | ✅ Wajib | Tidak pernah di-expose API |
| Supabase Key | ❌ | ✅ Wajib | Tidak pernah di-expose API |
| JWT Token | ❌ | ✅ Wajib | Dipakai untuk memanggil registry API |
