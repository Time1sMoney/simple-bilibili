import githubIcon from "@iconify-icons/tabler/brand-github";
import { Icon } from "@iconify/react";
import ThemeSwitcher from "./ThemeSwitcher";
const Header: React.FC = () => {
  return (
    <div className="flex justify-end items-center gap-4">
      <ThemeSwitcher />
      <a
        href="https://github.com/chenbinli-dev/simple-bilibili"
        target="_blank"
      >
        <button className="rounded-full p-2 hover:bg-gray-200 group dark:hover:bg-gray-700">
          <Icon
            icon={githubIcon}
            fontSize={24}
            className="group-hover:scale-110"
          />
        </button>
      </a>
    </div>
  );
};
export default Header;
