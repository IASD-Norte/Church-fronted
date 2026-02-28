import { ModeToggle } from "@/core/components/mode-toggle"
import { ProfileLogin } from "@/core/components/profile-login"
import { cn } from "@/shared/lib/utils"
import { ChevronDown, Menu, X } from "lucide-react"
import * as React from "react"
import { Link, useLocation } from "react-router-dom"

export function NavigationMenuDemo() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null)
  const [activeDesktopMenu, setActiveDesktopMenu] = React.useState<string | null>(null)
  const [scrolled, setScrolled] = React.useState(false)
  const location = useLocation()

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    setMobileMenuOpen(false)
    setOpenSubmenu(null)
  }, [location])

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu)
  }

  const isHomePage = location.pathname === "/"
  const activeScrolled = !isHomePage || scrolled


  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={cn(
          "hidden lg:flex fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-24 items-center justify-center",
          activeScrolled || activeDesktopMenu
            ? "border-b border-border/50 shadow-sm bg-background"
            : "bg-transparent"
        )}
        onMouseLeave={() => setActiveDesktopMenu(null)}
      >
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
          >
            <img
              src="/logo/logo-remove.png"
              alt=""
              className={cn(
                scrolled || activeDesktopMenu ? "h-60 w-auto transition-all duration-300 dark:invert" : "h-60 w-auto transition-all duration-300 invert"
              )}
            />
          </Link>
        </div>

        <div className="flex items-center gap-8 h-full">
          <Link
            to="/"
            className={cn(
              "px-3 py-2 text-sm font-semibold transition-colors rounded-md",
              activeScrolled || activeDesktopMenu
                ? "text-foreground hover:text-primary hover:bg-accent/50"
                : "text-white hover:text-white/80 hover:bg-white/10"
            )}
          >
            Inicio
          </Link>

          {/* NOSOTROS */}
          <div
            className="h-full flex items-center"
            onMouseEnter={() => setActiveDesktopMenu('nosotros')}
          >
            <Link
              to="/nosotros"
              className={cn(
                "flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-colors rounded-md",
                activeScrolled || activeDesktopMenu
                  ? "text-foreground hover:text-primary hover:bg-accent/50"
                  : "text-white hover:text-white/80 hover:bg-white/10",
                activeDesktopMenu === 'nosotros' && "text-primary bg-accent/50"
              )}
            >
              Nosotros
              <ChevronDown className={cn("h-3 w-3 transition-transform duration-300", activeDesktopMenu === 'nosotros' && "rotate-180")} />
            </Link>

            <div
              className={cn(
                "absolute top-full left-0 w-full bg-popover shadow-xl border-b border-border transition-all duration-300 origin-top bg-white dark:bg-black",
                activeDesktopMenu === 'nosotros' ? "opacity-100 visible scale-y-100" : "opacity-0 invisible scale-y-95 pointer-events-none"
              )}
            >
              <div className="flex w-full py-12 px-6 text-foreground">
                <div className="flex w-full max-w-7xl mx-auto items-center justify-between gap-16">
                  {/* Left side: Image */}
                  <div className="w-[45%] flex-shrink-0">
                    <Link to="/nosotros" className="block w-full overflow-hidden transition-opacity hover:opacity-90">
                      <img
                        src="https://lh3.googleusercontent.com/gps-cs-s/AHVAweplqjh2n9EK-lXikWaJtIbup-O4shDkSWeQSrD4d32g_mJPlbcqcOxp_1mxnQMF1W441s3ndQysnwdo7yrfOoIIwVWuibqTeCqNwwbZRQ94mrBLAEKjukf7fZyxW0IwmhPVrKlBaQ=s680-w680-h510-rw"
                        alt="Iglesia Adventista Norte"
                        className="w-full h-auto object-cover"
                      />
                    </Link>
                  </div>

                  {/* Right side: Links Grid */}
                  <div className="w-[55%] flex flex-col justify-center">
                    <div className="grid grid-cols-2 gap-x-12 gap-y-8 font-serif">
                      <Link to="/nosotros#quienes-somos" className="text-[22px] font-medium tracking-wide hover:opacity-75 transition-opacity">
                        ¿Quiénes Somos?
                      </Link>
                      <Link to="/nosotros#creencias" className="text-[22px] font-medium tracking-wide hover:opacity-75 transition-opacity">
                        Creencias
                      </Link>
                      <Link to="/nosotros#historia" className="text-[22px] font-medium tracking-wide hover:opacity-75 transition-opacity">
                        Nuestra Historia
                      </Link>
                      <Link to="/recursos" className="text-[22px] font-medium tracking-wide hover:opacity-75 transition-opacity">
                        Recursos
                      </Link>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-12">
                      <Link
                        to="/nosotros"
                        className="flex items-center gap-3 px-6 py-3 border border-border text-sm font-semibold tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
                      >
                        CONÓCENOS MÁS <span className="text-lg leading-none">→</span>
                      </Link>
                      <Link
                        to="/contact"
                        className="flex items-center gap-3 px-6 py-3 border border-border text-sm font-semibold tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
                      >
                        CONTÁCTANOS <span className="text-lg leading-none">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DEPARTAMENTOS */}
          <div
            className="h-full flex items-center"
            onMouseEnter={() => setActiveDesktopMenu('departamentos')}
          >
            <span
              className={cn(
                "cursor-pointer flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-colors rounded-md",
                activeScrolled || activeDesktopMenu
                  ? "text-foreground hover:text-primary hover:bg-accent/50"
                  : "text-white hover:text-white/80 hover:bg-white/10",
                activeDesktopMenu === 'departamentos' && "text-primary bg-accent/50"
              )}
            >
              Departamentos
              <ChevronDown className={cn("h-3 w-3 transition-transform duration-300", activeDesktopMenu === 'departamentos' && "rotate-180")} />
            </span>

            <div
              className={cn(
                "absolute top-full left-0 w-full bg-popover shadow-xl border-b border-border transition-all duration-300 origin-top bg-white dark:bg-black",
                activeDesktopMenu === 'departamentos' ? "opacity-100 visible scale-y-100" : "opacity-0 invisible scale-y-95 pointer-events-none"
              )}
            >
              <div className="flex justify-center w-full py-12 px-6 text-foreground">
                <div className="flex w-full max-w-7xl mx-auto flex-col">
                  {/* Departments Grid */}
                  <div className="grid grid-cols-4 gap-x-12 gap-y-6 font-serif">
                    <Link to="/departamentos/mayordomia" className="text-[20px] tracking-wide hover:opacity-75 transition-opacity">Mayordomía</Link>
                    <Link to="/departamentos/diaconos" className="text-[20px] tracking-wide hover:opacity-75 transition-opacity">Diáconos</Link>
                    <Link to="/departamentos/conquistadores" className="text-[20px] tracking-wide hover:opacity-75 transition-opacity">Conquistadores</Link>
                    <Link to="/departamentos/ministerios-personales" className="text-[20px] tracking-wide hover:opacity-75 transition-opacity">Ministerios Personales</Link>
                    <Link to="/departamentos/comunicaciones" className="text-[20px] tracking-wide hover:opacity-75 transition-opacity">Comunicaciones</Link>
                    <Link to="/departamentos/escuela-sabatica" className="text-[20px] tracking-wide hover:opacity-75 transition-opacity">Escuela Sabática</Link>
                    <Link to="/departamentos/jovenes" className="text-[20px] tracking-wide hover:opacity-75 transition-opacity">Jóvenes</Link>
                    <Link to="/departamentos/universitarios" className="text-[20px] tracking-wide hover:opacity-75 transition-opacity">Universitarios</Link>
                    <Link to="/departamentos/educacion" className="text-[20px] tracking-wide hover:opacity-75 transition-opacity">Educación</Link>
                    <Link to="/departamentos/familia" className="text-[20px] tracking-wide hover:opacity-75 transition-opacity">Familia</Link>
                    <Link to="/departamentos/salud" className="text-[20px] tracking-wide hover:opacity-75 transition-opacity">Salud</Link>
                    <Link to="/departamentos/dorcas" className="text-[20px] tracking-wide hover:opacity-75 transition-opacity">Dorcas</Link>
                    <Link to="/departamentos/tesoreria" className="text-[20px] tracking-wide hover:opacity-75 transition-opacity">Tesorería</Link>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 mt-12 w-full">
                    <Link
                      to="/departamentos"
                      className="flex items-center gap-3 px-6 py-3 border border-border text-sm font-semibold tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
                    >
                      VER TODOS LOS DEPARTAMENTOS <span className="text-lg leading-none">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/recursos"
            className={cn(
              "px-3 py-2 text-sm font-semibold transition-colors rounded-md",
              activeScrolled || activeDesktopMenu
                ? "text-foreground hover:text-primary hover:bg-accent/50"
                : "text-white hover:text-white/80 hover:bg-white/10"
            )}
          >
            Recursos
          </Link>

          <Link
            to="/eventos"
            className={cn(
              "px-3 py-2 text-sm font-semibold transition-colors rounded-md",
              activeScrolled || activeDesktopMenu
                ? "text-foreground hover:text-primary hover:bg-accent/50"
                : "text-white hover:text-white/80 hover:bg-white/10"
            )}
          >
            Eventos
          </Link>

          <Link
            to="/contact"
            className={cn(
              "px-3 py-2 text-sm font-semibold transition-colors rounded-md",
              activeScrolled || activeDesktopMenu
                ? "text-foreground hover:text-primary hover:bg-accent/50"
                : "text-white hover:text-white/80 hover:bg-white/10"
            )}
          >
            Contactanos
          </Link>
        </div>

        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-50">
          <div className={cn("transition-colors", !activeScrolled && !activeDesktopMenu && "brightness-200 contrast-200")}>
            <ModeToggle />
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={cn(
        "lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        activeScrolled || mobileMenuOpen
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}>
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img
              src={activeScrolled || mobileMenuOpen ? "/logo-remove.png" : "/logo.jpg"}
              alt="Logo IASD"
              className={cn(
                "h-10 w-auto transition-all duration-300",
                !(activeScrolled || mobileMenuOpen) && "rounded-full"
              )}
            />
          </Link>

          <div className="flex items-center gap-1.5">
            <div className={cn("transition-colors", !(activeScrolled || mobileMenuOpen) && "brightness-200 contrast-200")}>
              <ModeToggle />
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-1.5 rounded-md transition-colors duration-200",
                activeScrolled || mobileMenuOpen
                  ? "hover:bg-accent/80 hover:text-accent-foreground text-foreground"
                  : "text-white hover:bg-white/10"
              )}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background/85 backdrop-blur-lg border-b border-border/50 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto">
            <nav className="p-4 space-y-1">
              <MobileNavLink to="/" onClick={() => setMobileMenuOpen(false)}>
                Inicio
              </MobileNavLink>

              <MobileSubmenu
                title="Nosotros"
                isOpen={openSubmenu === 'nosotros'}
                onToggle={() => toggleSubmenu('nosotros')}
              >
                <MobileNavLink to="/nosotros#quienes-somos" onClick={() => setMobileMenuOpen(false)}>
                  ¿Quiénes Somos?
                </MobileNavLink>
                <MobileNavLink to="/nosotros#creencias" onClick={() => setMobileMenuOpen(false)}>
                  Creencias
                </MobileNavLink>
                <MobileNavLink to="/nosotros#historia" onClick={() => setMobileMenuOpen(false)}>
                  Nuestra Historia
                </MobileNavLink>
              </MobileSubmenu>


              <MobileSubmenu
                title="Departamentos"
                isOpen={openSubmenu === 'departamentos'}
                onToggle={() => toggleSubmenu('departamentos')}
              >
                <div className="grid grid-cols-2 gap-1">
                  <MobileNavLink to="/departamentos/mayordomia" onClick={() => setMobileMenuOpen(false)}>Mayordomía</MobileNavLink>
                  <MobileNavLink to="/departamentos/ministerios-personales" onClick={() => setMobileMenuOpen(false)}>Min. Personales</MobileNavLink>
                  <MobileNavLink to="/departamentos/comunicaciones" onClick={() => setMobileMenuOpen(false)}>Comunicaciones</MobileNavLink>
                  <MobileNavLink to="/departamentos/escuela-sabatica" onClick={() => setMobileMenuOpen(false)}>Esc. Sabática</MobileNavLink>
                  <MobileNavLink to="/departamentos/jovenes" onClick={() => setMobileMenuOpen(false)}>Jóvenes</MobileNavLink>
                  <MobileNavLink to="/departamentos/universitarios" onClick={() => setMobileMenuOpen(false)}>Universitarios</MobileNavLink>
                  <MobileNavLink to="/departamentos/educacion" onClick={() => setMobileMenuOpen(false)}>Educación</MobileNavLink>
                  <MobileNavLink to="/departamentos/familia" onClick={() => setMobileMenuOpen(false)}>Familia</MobileNavLink>
                  <MobileNavLink to="/departamentos/salud" onClick={() => setMobileMenuOpen(false)}>Salud</MobileNavLink>
                  <MobileNavLink to="/departamentos/dorcas" onClick={() => setMobileMenuOpen(false)}>Dorcas</MobileNavLink>
                  <MobileNavLink to="/departamentos/tesoreria" onClick={() => setMobileMenuOpen(false)}>Tesorería</MobileNavLink>
                </div>
              </MobileSubmenu>

              <MobileNavLink to="/recursos" onClick={() => setMobileMenuOpen(false)}>
                Recursos
              </MobileNavLink>

              <MobileNavLink to="/eventos" onClick={() => setMobileMenuOpen(false)}>
                Eventos
              </MobileNavLink>
              <MobileNavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>
                Contactanos
              </MobileNavLink>
            </nav>
          </div>
        )}
      </div>

    </>
  )
}

// Helper Components



function MobileNavLink({
  to,
  children,
  onClick
}: {
  to: string;
  children: React.ReactNode;
  onClick?: () => void
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent/80 hover:text-accent-foreground transition-all duration-200 text-foreground"
    >
      {children}
    </Link>
  )
}

function MobileSubmenu({
  title,
  children,
  isOpen,
  onToggle,
}: {
  title: string
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent/80 hover:text-accent-foreground transition-all duration-200 text-foreground"
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-300 text-muted-foreground",
            isOpen && "rotate-180 text-foreground"
          )}
        />
      </button>
      {isOpen && (
        <div className="mt-1 ml-4 space-y-1 border-l-2 border-primary/30 pl-3 animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  )
}
