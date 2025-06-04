import Logo from "./Logo";

type NavbarProps = {
  children: React.ReactNode;
};

export default function Navbar({ children }: NavbarProps) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
