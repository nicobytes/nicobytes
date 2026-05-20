export const navItems = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  // { href: '/projects', label: 'Projects' }, // reserved for later
  { href: "/portfolio", label: "Portfolio" },
  //{ href: '/courses', label: 'Courses' },
  //{ href: '/speaking', label: 'Speaking' },
] as const;

export function isNavItemActive(currentPath: string, href: string): boolean {
  return currentPath === href || currentPath.startsWith(`${href}/`);
}
