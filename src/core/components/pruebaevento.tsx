import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/core/components/ui/dialog";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Phone,
  Mail,
  Info,
  CheckCircle,
} from "lucide-react";

export const ChurchEventModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [registrado, setRegistrado] = useState(false);

  const evento = {
    titulo: "Retiro Espiritual de Sanidad",
    subtitulo: "Un encuentro transformador con Dios",
    fecha: "Sábado, 16 de Noviembre de 2025",
    horaInicio: "9:00 AM",
    horaFin: "6:00 PM",
    lugar: "Centro de Retiros Monte Horeb",
    direccion: "Calle 45 #23-15, Floridablanca",
    capacidad: "120 personas",
    cuposDisponibles: "35 cupos disponibles",
    precio: "Entrada libre - Ofrenda voluntaria",
    descripcion:
      "Te invitamos a un día de renovación espiritual donde experimentarás la presencia de Dios a través de la adoración, la oración y la ministración. Este retiro está diseñado para aquellos que buscan sanidad emocional, física y espiritual.",
    programa: [
      { hora: "9:00 AM", actividad: "Registro y Bienvenida" },
      { hora: "9:30 AM", actividad: "Alabanza y Adoración" },
      { hora: "10:30 AM", actividad: "Mensaje: 'Jesús el Sanador'" },
      { hora: "12:00 PM", actividad: "Almuerzo (incluido)" },
      { hora: "1:30 PM", actividad: "Taller: Sanidad Interior" },
      { hora: "3:00 PM", actividad: "Tiempo de Oración Personal" },
      { hora: "4:00 PM", actividad: "Ministración y Testimonios" },
      { hora: "5:30 PM", actividad: "Cierre y Bendición" },
    ],
    incluye: [
      "Material de estudio y reflexión",
      "Almuerzo y refrigerios",
      "Transporte desde la iglesia",
      "Certificado de participación",
    ],
    requisitos: [
      "Llevar Biblia personal",
      "Ropa cómoda y apropiada",
      "Actitud de apertura y fe",
    ],
    contacto: {
      telefono: "(607) 123-4567",
      email: "eventos@iglesia.com",
      whatsapp: "+57 300 123 4567",
    },
    organizador: "Ministerio de Sanidad y Restauración",
    invitado: "Pastor Juan Carlos Martínez",
  };

  const handleRegistro = () => {
    setRegistrado(true);
    setTimeout(() => setRegistrado(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Iglesia Comunidad de Fe
        </h1>
        <p className="text-xl text-gray-600 mb-8">Próximo Evento Especial</p>

        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-indigo-700 mb-2">
            {evento.titulo}
          </h2>
          <p className="text-gray-600 mb-4">{evento.subtitulo}</p>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-600" />
              <span className="font-medium">{evento.fecha}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-600" />
              <span className="font-medium">
                {evento.horaInicio} - {evento.horaFin}
              </span>
            </div>
          </div>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg px-12 py-4 rounded-lg shadow-lg transition-all transform hover:scale-105">
              Ver Información Completa
            </button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
            <DialogHeader className="border-b pb-2">
              <div className="relative -mt-6 -mx-6 mb-4 rounded-t-lg overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-70"
                  style={{
                    backgroundImage:
                      "url('https://menap.cl/wp-content/uploads/2024/09/SantaCena.png')",
                  }}
                />
                <div className="relative p-9 text-white">
                  <DialogTitle className="text-3xl font-bold mb-1">
                    {evento.titulo}
                  </DialogTitle>
                  <DialogDescription className="text-indigo-100 text-lg">
                    {evento.subtitulo}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Detalles */}
              <section className="bg-indigo-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Info className="h-6 w-6 text-indigo-600" />
                  Detalles del Evento
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailItem icon={Calendar} label="Fecha" value={evento.fecha} />
                  <DetailItem
                    icon={Clock}
                    label="Horario"
                    value={`${evento.horaInicio} - ${evento.horaFin}`}
                  />
                  <DetailItem
                    icon={MapPin}
                    label="Lugar"
                    value={`${evento.lugar}\n${evento.direccion}`}
                  />
                  <DetailItem
                    icon={Users}
                    label="Capacidad"
                    value={`${evento.capacidad}\n${evento.cuposDisponibles}`}
                  />
                  <DetailItem
                    icon={DollarSign}
                    label="Inversión"
                    value={evento.precio}
                    spanCols
                  />
                </div>
              </section>

              {/* Descripción */}
              <Section title="Descripción">
                <p className="text-gray-600 leading-relaxed">
                  {evento.descripcion}
                </p>
              </Section>

              {/* Programa */}
              <Section title="Programa del Día">
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  {evento.programa.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 pb-2 border-b border-gray-200 last:border-0"
                    >
                      <span className="font-bold text-indigo-600 min-w-[80px]">
                        {item.hora}
                      </span>
                      <span className="text-gray-700">{item.actividad}</span>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Incluye */}
              <Section title="El Evento Incluye">
                <ul className="space-y-2">
                  {evento.incluye.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {/* Requisitos */}
              <Section title="Requisitos" bg="yellow">
                <ul className="space-y-1 text-gray-700">
                  {evento.requisitos.map((req, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-yellow-600">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {/* Organizador e invitado */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard title="Organiza" content={evento.organizador} />
                <InfoCard title="Invitado Especial" content={evento.invitado} />
              </div>

              {/* Contacto */}
              <Section title="Información de Contacto" bg="indigo">
                <div className="space-y-3">
                  <ContactItem icon={Phone} value={evento.contacto.telefono} />
                  <ContactItem icon={Mail} value={evento.contacto.email} />
                  <ContactItem
                    icon={Phone}
                    value={`WhatsApp: ${evento.contacto.whatsapp}`}
                  />
                </div>
              </Section>

              {/* Botón Registro */}
              <div className="pt-4">
                <button
                  onClick={handleRegistro}
                  className={`w-full font-bold text-lg py-4 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg ${
                    registrado
                      ? "bg-green-500 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  {registrado ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle className="h-6 w-6" />
                      ¡Registro Exitoso!
                    </span>
                  ) : (
                    "¡Quiero Registrarme!"
                  )}
                </button>
                <p className="text-sm text-gray-500 text-center mt-3">
                  Al registrarte recibirás un correo de confirmación con más
                  detalles
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

/* 🔹 Subcomponentes Limpios y Reutilizables */
const Section: React.FC<{
  title: string;
  bg?: "indigo" | "yellow";
  children: React.ReactNode;
}> = ({ title, bg, children }) => (
  <div
    className={`rounded-lg p-6 ${
      bg === "indigo"
        ? "bg-indigo-50"
        : bg === "yellow"
        ? "bg-yellow-50 border border-yellow-200"
        : ""
    }`}
  >
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    {children}
  </div>
);

const DetailItem: React.FC<{
  icon: any;
  label: string;
  value: string;
  spanCols?: boolean;
}> = ({ icon: Icon, label, value, spanCols }) => (
  <div className={`flex items-start gap-3 ${spanCols ? "md:col-span-2" : ""}`}>
    <Icon className="h-5 w-5 text-indigo-600 mt-1" />
    <div>
      <p className="font-semibold text-gray-800">{label}</p>
      <p className="text-gray-600 whitespace-pre-line">{value}</p>
    </div>
  </div>
);

const InfoCard: React.FC<{ title: string; content: string }> = ({
  title,
  content,
}) => (
  <div>
    <h4 className="font-bold text-gray-800 mb-1">{title}</h4>
    <p className="text-gray-600">{content}</p>
  </div>
);

const ContactItem: React.FC<{ icon: any; value: string }> = ({
  icon: Icon,
  value,
}) => (
  <div className="flex items-center gap-3 text-gray-700">
    <Icon className="h-5 w-5 text-indigo-600" />
    <span>{value}</span>
  </div>
);
