import { Badge } from "@/core/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/core/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { BookOpen, Cross, Heart, Sparkles, Sun, Users } from "lucide-react";
import { CHURCH_VALUES } from "../constants/aboutConfig";

/**
 * Mapeo de iconos para los valores
 */
const iconMap = {
  cross: Cross,
  heart: Heart,
  book: BookOpen,
  sparkles: Sparkles,
  users: Users,
  sun: Sun,
};

/**
 * Sección de Valores
 * Muestra los valores de la iglesia en un grid de cards
 */
export function ValuesSection() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge variant="default" className="mb-4 text-base px-4 py-1">
          Nuestros Valores
        </Badge>
        <h3 className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold",
          "text-foreground tracking-tight mb-4"
        )}>
          Principios que nos guían
        </h3>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Estos son los pilares fundamentales que definen quiénes somos y cómo servimos
        </p>
      </div>

      {/* Grid de valores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CHURCH_VALUES.map((value, index) => {
          const Icon = iconMap[value.ICON as keyof typeof iconMap];
          
          return (
            <Card
              key={index}
              className={cn(
                "group hover:shadow-lg hover:scale-105",
                "transition-all duration-300 cursor-default",
                "border hover:border-primary/50"
              )}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "p-3 bg-primary/10 rounded-lg",
                    "group-hover:bg-primary/20 transition-colors"
                  )}>
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{value.TITLE}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {value.DESCRIPTION}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

