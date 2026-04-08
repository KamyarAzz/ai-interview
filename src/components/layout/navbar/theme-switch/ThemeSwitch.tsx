import moon from "@/assets/images/theme/moon-solid-full.svg";
import sun from "@/assets/images/theme/sun-solid-full.svg";
import {useState} from "react";

type Theme = "light" | "dark";

export default function ThemeSwitch() {
  const returnInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      return savedTheme;
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      return prefersDark ? "dark" : "light";
    }
  };

  const [currentTheme, setCurrentTheme] = useState<Theme>(returnInitialTheme());

  const toggleTheme = () => {
    const html = document.documentElement;
    if (currentTheme === "dark") {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setCurrentTheme("light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setCurrentTheme("dark");
    }
  };

  return (
    <div
      onClick={toggleTheme}
      className="rounded-full w-8 h-8 cursor-pointer flex items-center justify-center p-1"
    >
      {currentTheme === "dark" ? (
        <img src={moon} alt="dark" />
      ) : (
        <img src={sun} alt="light" />
      )}
    </div>
  );
}
