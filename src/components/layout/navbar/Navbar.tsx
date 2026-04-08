import ThemeSwitch from "./theme-switch/ThemeSwitch";

export default function Navbar() {
  return (
    <nav className="fixed bg-background/80 backdrop-blur-md border-b border-border top-0 left-0 right-0 z-10 px-6 py-4 flex justify-between">
      <h1 className="text-2xl font-bold">AI Interview</h1>
      <ThemeSwitch />
    </nav>
  );
}
