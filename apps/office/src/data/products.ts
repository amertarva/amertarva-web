export interface Product {
  id: string
  icon: string
  badge: string
  title: string
  tagline: string
  description: string
  features: string[]
  status: 'available' | 'coming-soon'
  href: string
}

export const productsHeader = {
  label: 'Our Products',
  title: 'Purpose-Built Tools for Modern Operations',
  subtitle:
    'Every product in the Amertarva Office suite is designed to solve a specific operational challenge — no bloat, no feature overload.',
}

export const products: Product[] = [
  {
    id: 'pos',
    icon: 'receipt',
    badge: 'Point of Sale',
    title: 'POS System',
    tagline: 'Sell smarter, not harder.',
    description:
      'A lightweight, browser-based point-of-sale system built for retail and service businesses. Manage products, process transactions, and track sales — no hardware lock-in required.',
    features: [
      'Product & inventory management',
      'Transaction processing with receipt generation',
      'Daily and monthly sales reporting',
      'Multi-cashier support',
      'Offline-ready with data sync',
    ],
    status: 'available',
    href: '/products/pos',
  },
  {
    id: 'attendance',
    icon: 'fingerprint',
    badge: 'HR & Workforce',
    title: 'Web Attendance',
    tagline: "Know who's in, anytime.",
    description:
      'A web-based employee attendance system with location verification and automated reporting — no dedicated hardware kiosks needed.',
    features: [
      'Check-in / check-out via web browser',
      'GPS-based location validation',
      'Shift scheduling & overtime tracking',
      'Exportable attendance reports (PDF / CSV)',
      'Role-based access for HR and managers',
    ],
    status: 'available',
    href: '/products/attendance',
  },
  {
    id: 'amertask',
    icon: 'layout-kanban',
    badge: 'Project Management',
    title: 'Amertask',
    tagline: "Your team's work, clearly managed.",
    description:
      "Amertask is Amertarva's project management platform — a focused tool for teams to plan tasks, track progress, and ship work without the noise of over-engineered PM tools.",
    features: [
      'Kanban boards & task assignment',
      'Project milestones & deadline tracking',
      'Team workload overview',
      'Activity log & audit trail',
      'Integrated with Amertarva ecosystem',
    ],
    status: 'available',
    href: '/products/amertask',
  },
  {
    id: 'finance',
    icon: 'piggy-bank',
    badge: 'Finance & Accounting',
    title: 'Financial Management',
    tagline: 'Control your cash flow securely.',
    description:
      'A comprehensive financial tool designed to manage budgets, track expenses, and generate automated invoices with a few clicks.',
    features: [
      'Expense tracking & categorization',
      'Automated invoice generation',
      'Budget planning & monitoring',
      'Profit & loss reporting',
      'Multi-currency support',
    ],
    status: 'coming-soon',
    href: '/products/finance',
  },
]
