import Link from "next/link";
const links = [
  { href: "/about", label: "about" },
  { href: "/chat", label: "chat" },
  { href: "/create", label: "create" },
  { href: "/list", label: "list" },
  { href: "/profile", label: "profile" },
];

const NavLinks = () => {
  return (
    <ul className="menu text-base-content">
      {links.map((link) => {
        return (
          <li key={link.href}>
            <Link href={link.href} className="capitalize">
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default NavLinks;
