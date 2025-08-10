import { Link } from "react-router-dom";

export default function Navbar() {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "#experience", label: "Experience" },
    { to: "#projects", label: "Projects" },
    { to: "#skills", label: "Skills" },
    { to: "#education", label: "Education" },
    { to: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-neutral-900/80 backdrop-blur border-b border-neutral-800">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-bold text-white hover:text-cyan-400 transition-colors">
          Subash Yadav
        </Link>
        <ul className="flex space-x-6 text-sm">
          {navLinks.map((link) => (
            <li key={link.to}>
              <a href={link.to} className="text-neutral-300 hover:text-cyan-400 transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
