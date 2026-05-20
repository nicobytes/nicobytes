export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/blog/", label: "Blog" },
  // { href: '/projects/', label: 'Projects' }, // reserved for later
  { href: "/portfolio/", label: "Portfolio" },
  //{ href: '/courses/', label: 'Courses' },
  //{ href: '/speaking/', label: 'Speaking' },
] as const;

export function isNavItemActive(currentPath: string, href: string): boolean {
  if (href === "/") {
    return currentPath === "/";
  }
  const base = href.endsWith("/") ? href : `${href}/`;
  return currentPath === base || currentPath.startsWith(base);
}
