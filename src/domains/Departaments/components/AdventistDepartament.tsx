import { Card } from '@/core/components/ui/card'; // Ajusta según tu estructura de UI
import { ScrollText, HandCoins, HeartHandshake } from 'lucide-react';

export function MayordomiaDepartment() {
  return (
    <Card className="max-w-2xl mx-auto p-6 md:p-8 bg-white dark:bg-card rounded-xl shadow-sm border border-border">
      <div className="flex items-start gap-4 mb-5">
        <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
          <HandCoins className="h-6 w-6 text-amber-700 dark:text-amber-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Departamento de Mayordomía</h2>
          <p className="text-sm text-muted-foreground">Iglesia Adventista del Séptimo Día</p>
        </div>
      </div>

      <p className="text-muted-foreground mb-4">
        La mayordomía adventista va más allá del dinero: es una respuesta de gratitud a Dios por
        todo lo que Él nos ha dado —tiempo, talentos, recursos y la vida misma.
      </p>

      <blockquote className="border-l-4 border-amber-600 pl-4 italic my-4 text-foreground">
        “Del Señor es la tierra y su plenitud; el mundo, y los que en él habitan.”  
        <span className="block mt-1 font-semibold not-italic">— Salmo 24:1</span>
      </blockquote>

      <div className="space-y-3 mb-5">
        <div className="flex items-start gap-3">
          <ScrollText className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm">
            <span className="font-medium">Propósito:</span> Inspirar a los miembros a vivir una vida de generosidad, administración fiel y devoción total a Dios.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <HeartHandshake className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm">
            <span className="font-medium">Enfoque:</span> Diezmos, ofrendas, uso sabio de los recursos, y el principio de que “todo pertenece a Dios”.
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-border/50">
        <p className="text-sm text-muted-foreground">
          ¿Quieres saber cómo participar o aprender más sobre mayordomía cristiana?
          ¡Habla con el encargado de mayordomía de tu iglesia o visita los recursos oficiales!
        </p>
      </div>
    </Card>
  );
}