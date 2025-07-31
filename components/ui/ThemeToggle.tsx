'use client';

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        // On mount, check localStorage and set the theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.className = savedTheme;
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.className = newTheme;
    };

    return (
        <button onClick={toggleTheme} className="p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/20">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
}