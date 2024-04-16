export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SiteConfig = {
  name: string;
  description: string;
  mailSupport: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type LandingConfig = {
  mainNav: MainNavItem[];
};
