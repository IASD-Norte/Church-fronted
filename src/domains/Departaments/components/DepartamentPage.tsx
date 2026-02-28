import { useParams } from 'react-router-dom';
import { departmentData } from '../constants/departamentPage';
import { type DepartmentSlug } from '../types/types';
import { Card, CardContent } from '@/core/components/ui/card';

const NotFound = () => (
  <div className="container py-16 text-center">
    <h2 className="text-xl font-medium text-foreground">
      Departamento no encontrado
    </h2>
  </div>
);

export default function DepartmentPage() {
  const { slug } = useParams<{ slug: string }>();

  const isValidSlug = (s: string): s is DepartmentSlug => s in departmentData;

  if (!slug || !isValidSlug(slug)) return <NotFound />;

  const data = departmentData[slug];

  return (
    <div className="flex-1 min-h-screen w-full py-20 px-4 md:px-10 lg:px-20 mt-10">

      <Card className="p-6 md:p-10">
        <CardContent className="flex-1 space-y-12 md:space-y-16">

          {/* ==== HEADER PRINCIPAL ==== */}
          <div className="w-full flex flex-col lg:flex-row justify-between gap-10 lg:gap-16">

            {/* LEFT */}
            <div className="flex-1 flex flex-col justify-between gap-10">

              {/* TITULO Y DESCRIPCIÓN */}
              <div className="space-y-4 md:space-y-6 w-full lg:w-2/3">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold flex items-center gap-4">
                  {data.title}
                </h1>
                <p className="text-base text-foreground leading-relaxed">
                  {data.description}
                </p>
              </div>

              {/* MINI CARDS DINÁMICOS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {data.sections.slice(0, 4).map((sec, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-muted/40 border shadow-sm"
                  >
                    <h3 className="text-lg md:text-xl font-bold">{sec.heading}</h3>
                    <p className="text-sm mt-1 text-muted-foreground line-clamp-3">
                      {sec.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="rounded-3xl overflow-hidden shadow-lg w-full sm:w-2/3 lg:w-2/5 h-80 md:h-[420px] lg:h-[550px] mx-auto">
              <img
                className="w-full h-full object-cover"
                src={data.imageVertical}
                alt={data.title}
              />
            </div>
          </div>

          {/* ==== IMAGEN PRINCIPAL / BANNER ==== */}
          <div className="flex w-full h-52 sm:h-72 md:h-96 lg:h-[450px] justify-center items-center">
            <img
              className="w-full h-full rounded-3xl object-cover"
              src={data.imageHorizontal}
              alt={data.title}
            />
          </div>

          {/* ==== CONTENIDO DINÁMICO COMPLETO ==== */}
          <div className="space-y-16">
            {data.sections.map((section, index) => (
              <div key={index} className="space-y-6">

                {/* HEADING */}
                <h2 className="text-2xl md:text-3xl font-extrabold">
                  {section.heading}
                </h2>

                {/* CONTENT */}
                <p className="text-base leading-relaxed">
                  {section.content}
                </p>

                {/* LIST ITEMS */}
                {section.items && (
                  <ul className="list-disc ml-6 space-y-2 text-foreground">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {/* SCRIPTURE */}
                {section.scripture && (
                  <blockquote className="border-l-4 pl-4 italic text-muted-foreground">
                    {section.scripture}
                  </blockquote>
                )}
              </div>
            ))}
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
