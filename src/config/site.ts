import { SidebarNavItem, SiteConfig } from "@/src/types";

export const siteConfig: SiteConfig = {
    name: "ShipThatBot",
    description: "Get your bot off to an explosive start with ShipThatBot!",
    links: {
        twitter: "https://twitter.com/somilg050",
        github: "https://github.com/somilg050",
        medium: "https://medium.com/@somil_gupta",
    },
    mailSupport: "hello@shipthat.blog",
};

export const footerLinks: SidebarNavItem[] = [
    {
        title: "Links",
        items: [
            { title: "About Me", href: "/blog/about-me" },
            {
                title: "Sample Blog",
                href: "/blog/build-rag-application-using-langchain",
            },
        ],
    },
    {
        title: "Product",
        items: [
            { title: "Customization", href: "#" },
            { title: "Customers", href: "#" },
            { title: "Changelog", href: "#" },
        ],
    },
    {
        title: "Legal",
        items: [
            { title: "Terms of services", href: "/tos" },
            { title: "Privacy policy", href: "/privacy-policy" },
            { title: "Contact Us", href: "/contact-us" },
        ],
    },
];
