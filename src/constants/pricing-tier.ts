export interface Tier {
  name: string;
  id: 'free' | 'basic' | 'pro';
  icon: string;
  description: string;
  features: string[];
  featured: boolean;
  priceId: Record<string, string>;
}

export const PricingTier: Tier[] = [
  {
    name: 'Free',
    id: 'free',
    icon: '/assets/icons/price-tiers/free-icon.svg',
    description: 'Ideal for individuals who want to get started with simple design tasks.',
    features: ['1 workspace', 'Limited collaboration', 'Export to PNG and SVG'],
    featured: false,
    priceId: { month: 'pri_01jphjqv4z3eytjz1t904zb057', year: 'pri_01jphjt79w9k6wyf604qjeeftm' },
  },
  {
    name: 'Basic',
    id: 'basic',
    icon: '/assets/icons/price-tiers/basic-icon.svg',
    description: 'Enhanced design tools for scaling teams who need more flexibility.',
    features: ['Integrations', 'Unlimited workspaces', 'Advanced editing tools', 'Everything in Starter'],
    featured: true,
    priceId: { month: 'pri_01jphjwv69v528efdhadtp2mqk', year: 'pri_01jphjxbzrnpr93nyzwwjy7nm3' },
  },
  {
    name: 'Pro',
    id: 'pro',
    icon: '/assets/icons/price-tiers/pro-icon.svg',
    description: 'Powerful tools designed for extensive collaboration and customization.',
    features: [
      'Single sign on (SSO)',
      'Advanced version control',
      'Assets library',
      'Guest accounts',
      'Everything in Pro',
    ],
    featured: false,
    priceId: { month: 'pri_01jphjz3majvahm5ffrz6mxe0h', year: 'pri_01jphjzj3m18kejz2na2bqbm3g' },
  },
];
