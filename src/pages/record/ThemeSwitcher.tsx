import moonIcon from "@iconify-icons/tabler/moon";
import sunIcon from "@iconify-icons/tabler/sun";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  useEffect(() => {
    chrome.storage.local.get(["theme"], (result) => {
      if (result.theme) {
        setTheme(result.theme);
      } else {
        chrome.storage.local.set({ theme: "light" });
      }
    });
  }, []);
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
    chrome.storage.local.set({ theme });
  }, [theme]);
  return (
    <div
      className="rounded-full bg-[#FF6699] group text-white p-1 flex justify-center items-center cursor-pointer"
      onClick={toggleTheme}
    >
      <Icon
        icon={theme === "light" ? sunIcon : moonIcon}
        fontSize={24}
        className="group-hover:scale-110"
      />
    </div>
  );
};
export default ThemeSwitcher;
