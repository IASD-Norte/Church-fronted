import { Facebook, Instagram, Phone, Smartphone, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-background text-foreground border-t transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Sección principal - Logo y contacto */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            {/* Logo y título */}
            <div className="flex flex-col items-center lg:items-start">
              <a
                href="/"
                title="División Sudamericana"
                className="group inline-block transition-transform duration-300 hover:scale-105"
              >
                <img
                  src="https://www.adventistas.org/es/wp-content/themes/pa-theme-sedes/assets/sedes/es/logo-iasd-vertical.svg"
                  alt="División Sudamericana"
                  className="w-28 h-auto lg:w-32 dark:brightness-0 dark:invert transition-all duration-300"
                />
              </a>
              <span className="block mt-4 text-center lg:text-left font-semibold text-base lg:text-lg">
                Asociación del Oriente Colombiano
              </span>
            </div>

            <hr className="border-border" />

            {/* Información de contacto */}
            <div className="text-center lg:text-left leading-relaxed space-y-2 text-sm lg:text-base text-muted-foreground">
              <p className="font-medium">Carrera 20 #6-47 Comuneros</p>
              <p>Bucaramanga, Santander</p>
              <p>Colombia</p>
              <div className="flex items-center justify-center lg:justify-start gap-2 mt-4">
                <Phone className="w-4 h-4" />
                <span className="font-semibold">+57 3046417789</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Smartphone className="w-4 h-4" />
                <span className="font-semibold">+57 3046417789</span>
              </div>
            </div>

            {/* Redes sociales - Visible en todas las pantallas */}
            <div className="pt-4">
              <span className="block text-center lg:text-left font-semibold text-base lg:text-lg mb-3">
                Nuestras redes sociales
              </span>
              <div className="flex gap-4 justify-center lg:justify-start">
                <a
                  href="https://www.facebook.com/iglesiaadvnorte"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/@iglesiaadventistanortebuca6594"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Youtube"
                  className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/iglesia__adventista__norte/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Sección de enlaces */}
          <div className="lg:col-span-8 grid grid-cols-1 text-center md:grid-cols-2 gap-8 lg:gap-12 lg:pl-8">
            {/* Sobre nosotros */}
            <div className="space-y-4">
              <h2 className="text-lg lg:text-xl font-bold border-b-2 border-border pb-2">
                Sobre nosotros
              </h2>
              <ul className="space-y-2 text-sm lg:text-base">
                <li>
                  <a
                    href="http://institucional.adventistas.org/es/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      Los Adventistas
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://institucional.adventistas.org/es/nuestras-crencias/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      Creencias
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://institucional.adventistas.org/es/quienes-somos/mision-y-servicio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      Misión y servicio
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://institucional.adventistas.org/es/quienes-somos/estructura-organizacional/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      Organización
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Departamentos */}
            <div className="space-y-4">
              <h2 className="text-lg lg:text-xl font-bold border-b-2 border-border pb-2">
                Departamentos
              </h2>
              <ul className="space-y-2 text-sm lg:text-base">
                <li>
                  <a
                    href="https://www.adventistas.org/es/afam/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      Feja
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.adventistas.org/es/asa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      Guías
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.adventistas.org/es/asociacionministerial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      Asociación Ministerial
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.adventistas.org/es/aventureros/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      Aventureros
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.adventistas.org/es/comunicacion"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      Comunicación
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.adventistas.org/es/conquistadores/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      Conquistadores
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Asociación del Oriente Colombiano | IASD Norte Bucaramanga. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

