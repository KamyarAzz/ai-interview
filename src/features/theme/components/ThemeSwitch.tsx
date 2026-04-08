import moon from "@/assets/images/theme/moon-solid-full.svg";
import sun from "@/assets/images/theme/sun-solid-full.svg";
import {useTheme} from "../hooks/useTheme";
import {useThemeStore} from "@/stores/themeStore";

export default function ThemeSwitch() {
  const theme = useThemeStore((state) => state.theme);
  const {toggleTheme} = useTheme();

  return (
    <div
      onClick={toggleTheme}
      className="rounded-full w-8 h-8 cursor-pointer flex items-center justify-center p-1"
    >
      {theme === "dark" ? (
        <img src={moon} alt="dark" />
      ) : (
        <img src={sun} alt="light" />
      )}
    </div>
  );
}
