import { Blocks, Clock, PiggyBank, TerminalSquare } from 'lucide-astro'

export const about = {
  title: 'One Ecosystem for Your Entire Office',
  description:
    "Amertarva Office isn't just a collection of apps. It's a seamlessly integrated web platform tailored for corporate efficiency. Whether you're tracking retail sales, monitoring employee attendance, managing complex projects, or handling financial flows, our suite provides the digital infrastructure to run your entire operation from a single browser window.",
  features: [
    {
      title: 'Point of Sale',
      description: 'Streamline transactions and track sales effortlessly.',
      icon: TerminalSquare,
    },
    {
      title: 'Attendance',
      description: 'Monitor employee presence with GPS verification.',
      icon: Clock,
    },
    {
      title: 'Project Management',
      description: 'Keep your team aligned on milestones and deadlines.',
      icon: Blocks,
    },
    {
      title: 'Financial Management',
      description: 'Manage budgets, expenses, and invoices securely.',
      icon: PiggyBank,
    },
  ],
}
