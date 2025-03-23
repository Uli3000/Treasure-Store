import { useEffect, useState } from "react";

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    if (!document.startViewTransition) {
      setIsDarkMode(!isDarkMode);
      return;
    }

    document.startViewTransition(() => {
      setIsDarkMode((prev) => !prev);
    });
  };

  return { isDarkMode, toggleDarkMode };
}
