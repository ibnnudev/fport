"use client";

import Image from "next/image";
import logo from "@/public/images/logo.jpg";
import FreelanceOrderModal from "./modal-order";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const HeaderComponent = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
      }
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center justify-between space-y-4">
      <div className="flex items-center text-center md:text-left">
        <Image
          src={logo}
          alt="Profile Picture"
          width={100}
          height={100}
          className="rounded-full border border-gray-200 object-cover w-20 h-20 md:w-24 md:h-24"
        />
        <h1 className="text-gray-900 dark:text-gray-100 text-2xl md:text-3xl font-semibold ml-4">
          Ibnu Sutio
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleThemeSwitch}
          className="p-2 rounded-full focus:outline-none transition-colors duration-300"
        >
          {theme === "dark" ? (
            <Moon className="h-5 w-5 text-yellow-400" />
          ) : (
            <Sun className="h-5 w-5 text-gray-700" />
          )}
        </button>
        <FreelanceOrderModal />
      </div>
    </div>
  );
};

export default HeaderComponent;
