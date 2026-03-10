type EventoProps = {
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen: string;
};

function EventoCard({ titulo, descripcion, fecha, imagen }: EventoProps) {
  return (
    <div className="relative flex h-full w-full overflow-hidden rounded-lg">
      <img
        src={imagen}
        alt={titulo}
        className="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-110 hover:opacity-95"
      />
      <div className="flex flex-col gap-2 absolute bottom-0 left-0 w-full bg-black/50 text-white py-2 p-2">
        <h4 className="text-center text-sm font-semibold">{titulo}</h4>
        <p className="text-xs text-center">{descripcion}</p>
        <p className="pl-3 text-gray-300/50 text-xs">{fecha}</p>
      </div>
    </div>
  );
}
export default EventoCard