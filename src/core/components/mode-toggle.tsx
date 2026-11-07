import { useTheme } from '@/core/components/theme-provider';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { Moon, Sun } from 'lucide-react';
import React from 'react';

export const ModeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const effectiveTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  const toggleTheme = () => {
    const newTheme = effectiveTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-9 w-9 rounded-md"
      aria-label="Toggle theme"
    >
      <Sun className={cn(
        "h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
        effectiveTheme === 'light' ? "text-black" : "text-muted-foreground"
      )} />
      <Moon className={cn(
        "absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
        effectiveTheme === 'dark' ? "text-blue-400" : "text-muted-foreground"
      )} />
    </Button>
  );
};

export default ModeToggle;
