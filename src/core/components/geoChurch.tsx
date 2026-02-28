import { cn } from '@/shared/lib/utils';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const churchIcon = L.icon({
  iconUrl: '/church.png',
  iconSize: [32, 37],
  iconAnchor: [16, 37],
  popupAnchor: [0, -28],
  shadowUrl: '/church.png',
  shadowSize: [41, 41],
});

interface Iglesia {
  name: string;
  lat: number;
  lng: number;
  direccion: string;
}

export function Map() {
  const [iglesias, setIglesias] = useState<Iglesia[]>([]);

  useEffect(() => {
    fetch('/data/church.json')
      .then((res) => res.json())
      .then((data) => {
        setIglesias(data.bga);
      })
      .catch((err) => console.error('Error cargando iglesias:', err));
  }, []);

  return (
    <div className={cn(
      "relative w-full md:w-1/2",
      "h-[400px] md:h-[500px] lg:h-[400px]",
      "rounded-2xl overflow-hidden",
      "border border-border shadow-lg",
      "group"
    )}>
      {/* Header decorativo */}
      <div className={cn(
        "absolute top-4 right-4 z-10",
        "bg-card/95 backdrop-blur-sm",
        "border border-border rounded-lg",
        "px-4 py-2 shadow-lg",
        "flex items-center gap-2"
      )}>
        <MapPin className="w-5 h-5 text-primary" />
        <span className="text-sm font-semibold text-foreground">
          {iglesias.length} Grupos Pequeños
        </span>
      </div>

      <MapContainer 
        center={[7.119, -73.119]} 
        zoom={12.5} 
        scrollWheelZoom={false} 
        className="h-full w-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {iglesias.map((iglesia, index) => (
          <Marker key={index} position={[iglesia.lat, iglesia.lng]} icon={churchIcon}>
            <Popup className="custom-popup">
              <div className="p-2">
                <h3 className="font-bold text-base mb-1">{iglesia.name}</h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Dirección:</strong> {iglesia.direccion}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
