import * as React from "react";
import { Globe } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/core/components/ui/dropdown-menu";
import i18next from "i18next";

// Button que acepta ref para Radix
const RefButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  (props, ref) => <Button {...props} ref={ref} />
);

const languages = [
  { code: "en", lang: "English" },
  { code: "es", lang: "Español" },
];

export function LanguageToggle() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <RefButton variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Select language</span>
        </RefButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lng) => (
          <DropdownMenuItem key={lng.code} onClick={() => i18next.changeLanguage(lng.code)}>
            {lng.lang}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
