# CLAUDE.ecosystem.zh.md — Amertarva 产品生态系统 Section 规范

> 本文件专门规范首页「产品生态系统」区块的结构、文案、样式与实现方式。
>
> **绝对禁止：本 Section 与任何学校客户项目（包括代工案例）无关。
> 此处展示的是 Amertarva 自有产品平台，不得提及任何具体学校名称或第三方客户项目。**

---

## 1. Section 定位与功能

| 属性 | 说明 |
|---|---|
| Section ID | `#ecosystem` |
| 页面位置 | 首页第三块：`#hero` → `#about` → **`#ecosystem`** → `#portal` → `#work` → `#cta` |
| 核心目的 | 展示 Amertarva 旗下两个自有产品平台，引导访客跳转至对应子站 |
| 产品数量 | 固定两个，不可增减（Office / Learning） |

### 放置逻辑（为什么在 About 之后、Portal 之前）

```
About（我们是谁）
  ↓
Ecosystem（我们自己做了什么产品）   ← 本 Section
  ↓
Portal（我们能为你定制什么）
```

"我们是谁" → "我们自己的产品" → "我们能为你做什么" — 这个叙事顺序最自然。

---

## 2. Section 顶部文案

```ts
// data/ecosystem.ts — header 字段
export const ecosystemHeader = {
  label: 'Ekosistem Produk',          // 小标签，全大写显示
  title: 'Dua Solusi, Satu Ekosistem',
  subtitle:
    'Platform kami dirancang khusus untuk dua kebutuhan utama — bisnis yang ingin hadir secara digital, dan institusi pendidikan yang siap belajar tanpa batas ruang.',
}
```

---

## 3. 产品数据结构

```ts
// data/ecosystem.ts — product 字段
export interface EcosystemProduct {
  id: string
  tag: string                    // 显示在 badge 上的小标签
  title: string
  description: string
  features: string[]             // 功能列表，最多 4 条
  domain: string                 // 显示在卡片底部的域名
  href: string                   // 跳转链接
  colorVariant: 'office' | 'learning'  // 控制卡片配色
}

export const ecosystemProducts: EcosystemProduct[] = [
  {
    id: 'office',
    tag: 'For Business',
    title: 'Amertarva Office',
    description:
      'Solusi digital lengkap untuk bisnis dan korporat — dari company profile hingga sistem operasional.',
    features: [
      'Landing page & company profile',
      'Website corporate & profil bisnis',
      'Sistem point of sale (POS)',
      'Custom web app untuk operasional',
    ],
    domain: 'office.amertarva.app',
    href: 'https://office.amertarva.app',
    colorVariant: 'office',
  },
  {
    id: 'learning',
    tag: 'For Education',
    title: 'Amertarva Learning',
    description:
      'Platform e-learning modern untuk institusi pendidikan yang ingin mendigitalisasi proses pembelajaran.',
    features: [
      'Manajemen materi & kurikulum',
      'Kelas virtual & tugas online',
      'Monitoring progres siswa',
      'Multi-tenant per institusi',
    ],
    domain: 'learning.amertarva.app',
    href: 'https://learning.amertarva.app',
    colorVariant: 'learning',
  },
]
```

---

## 4. 配色规范（基于既有 Token）

本 Section 不引入任何新颜色。两个卡片使用现有 token 的不同角色以形成视觉区分。

| 部件 | Office 卡片 | Learning 卡片 |
|---|---|---|
| 卡片背景 | `bg-secondary/10` | `bg-accent/15` |
| 卡片边框 | `border-secondary/35` | `border-accent/50` |
| 图标背景 | `bg-secondary/20` | `bg-accent/25` |
| 图标颜色 | `text-secondary` | `text-accent`（深化处理） |
| Badge 背景 | `bg-secondary/15` | `bg-accent/15` |
| Badge 文字 | `text-secondary`（更深色） | `text-accent`（更深色） |
| Feature 圆点 | `bg-secondary` | `bg-accent` |
| CTA 按钮 | `bg-secondary text-white` | `bg-accent text-heading` |
| 大标题 | `text-heading`（两张卡片一致） | 同左 |
| 描述文字 | `text-body`（两张卡片一致） | 同左 |

**禁止手动覆盖颜色 hex** — 所有颜色必须通过 Tailwind 的 token class 实现，与全站主题切换（amerta-day/amerta-night）保持联动。

---

## 5. 组件结构

```
components/sections/EcosystemSection.vue
  ├── 顶部文案（label / title / subtitle）
  └── 卡片容器（grid 2列）
      ├── EcosystemCard.vue (colorVariant="office")
      └── EcosystemCard.vue (colorVariant="learning")
```

### EcosystemCard.vue 接收的 Props

```ts
interface Props {
  product: EcosystemProduct
}
```

卡片内部结构（从上到下）：

```
[装饰圆形背景色块 — position absolute, right-top]
[图标框 44×44px，border-radius 10px]
[Badge 小标签]
[标题 h3]
[描述段落]
[功能列表（最多4条，带颜色圆点）]
[分隔线]
[底部行：域名文字（left） + CTA按钮（right）]
```

---

## 6. Tailwind 类名参考

```html
<!-- Section 容器 -->
<section id="ecosystem" class="bg-base py-20 px-6">

  <!-- 顶部文案 -->
  <p class="text-secondary text-xs font-medium uppercase tracking-widest mb-2">
    Ekosistem Produk
  </p>
  <h2 class="text-heading text-3xl font-medium leading-snug mb-3">
    Dua Solusi, Satu Ekosistem
  </h2>
  <p class="text-body text-sm leading-relaxed max-w-xl mb-10">
    Platform kami ...
  </p>

  <!-- 卡片 Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">

    <!-- Office 卡片示例 -->
    <div class="relative overflow-hidden rounded-2xl border bg-secondary/10 border-secondary/35 p-7">
      <!-- 图标 -->
      <div class="w-11 h-11 rounded-xl bg-secondary/20 flex items-center justify-center mb-5">
        <!-- Heroicons: BuildingOffice2Icon 或等效 -->
      </div>
      <!-- Badge -->
      <span class="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary/15 text-secondary mb-3 inline-block">
        For Business
      </span>
      <!-- 标题 -->
      <h3 class="text-heading text-lg font-medium mb-2">Amertarva Office</h3>
      <!-- 描述 -->
      <p class="text-body text-sm leading-relaxed mb-5">...</p>
      <!-- 功能列表 -->
      <ul class="space-y-2 mb-6">
        <li class="flex items-center gap-2 text-body text-xs border-b border-black/5 pb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0"></span>
          Landing page & company profile
        </li>
      </ul>
      <!-- 底部 -->
      <div class="flex items-center justify-between pt-4 border-t border-black/5">
        <span class="text-body text-[11px] font-mono opacity-70">office.amertarva.app</span>
        <a href="https://office.amertarva.app"
           class="bg-secondary text-white text-xs font-medium px-3.5 py-2 rounded-lg flex items-center gap-1 hover:opacity-90 transition-opacity">
          Jelajahi →
        </a>
      </div>
    </div>

    <!-- Learning 卡片 —— 将 secondary 替换为 accent，text-white 替换为 text-heading -->

  </div>
</section>
```

---

## 7. 响应式规范

| 断点 | 布局 |
|---|---|
| Mobile (`< md`) | 单列堆叠（`grid-cols-1`），两张卡片上下排列 |
| Desktop (`≥ md`) | 两列并排（`grid-cols-2`），等高等宽 |
| 等高处理 | 使用 CSS Grid 自动等高，无需手动 `min-h` |

---

## 8. 链接行为

```ts
// 链接在新标签页打开（target="_blank" + rel="noopener noreferrer"）
// 理由：用户在浏览主站时点击子域，不应丢失当前页面
href: 'https://office.amertarva.app'
href: 'https://learning.amertarva.app'
```

如果子站域名尚未上线，先用 `href="#"` 占位，**禁止随便填入其他真实 URL**。

---

## 9. 严格禁止事项（FORBIDDEN）

- ❌ 禁止在此 Section 提及任何学校名称、机构名称或第三方客户名称
- ❌ 禁止新增第三个产品卡片（如需扩展，须人工更新本规范后再动手）
- ❌ 禁止在卡片内使用 `style=""` 写死 hex 颜色值
- ❌ 禁止使用 `dark:` Tailwind prefix（本项目用 `data-theme` 属性方案）
- ❌ 禁止在 feature 列表超过 4 条（超出部分裁剪，非折叠/展开）
- ❌ 禁止把 `ecosystemProducts` 数组内容直接写死在 `<template>` 里，必须从 `data/ecosystem.ts` import

---

## 10. 提交前检查清单

- [ ] `data/ecosystem.ts` 存在且包含 `ecosystemHeader` 和 `ecosystemProducts`
- [ ] 两张卡片均通过 `colorVariant` prop 区分样式，无重复硬编码
- [ ] `href` 链接包含 `target="_blank" rel="noopener noreferrer"`
- [ ] 功能列表每张卡片不超过 4 条
- [ ] 在 `amerta-day` 和 `amerta-night` 两个主题下均目视检查一遍
- [ ] 全文件无任何学校名称或第三方客户名称
- [ ] Section ID 为 `ecosystem`，与 `pages/index.vue` 中的锚点一致