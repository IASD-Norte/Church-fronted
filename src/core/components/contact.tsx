import { Input } from "@/core/components/ui/input"
import { Label } from "@/core/components/ui/label"
import { Textarea } from "@/core/components/ui/textarea"
import { CheckCircle2, Loader2, MapPin, Send } from "lucide-react"
import { useState } from "react"
import emailjs from "emailjs-com"
import WorldMapDemo from "./mapChurch"
import { cn } from "@/shared/lib/utils"
import { useContent, DEFAULT_CONTACT_FORM } from "@/features/content"

export default function Contact() {
  const copy = useContent("contact_form", DEFAULT_CONTACT_FORM)
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: ""
  })

  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          nombre: form.nombre,
          email: form.email,
          mensaje: form.mensaje
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      setEnviado(true)
      setForm({ nombre: "", email: "", mensaje: "" })

      setTimeout(() => setEnviado(false), 4000)
    } catch (error) {
      console.error(error)
      alert("Error enviando el mensaje. Intenta de nuevo.")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section
      data-cms-section="contact_form"
      className="w-full min-h-screen flex items-center justify-center bg-background py-20 px-6 lg:px-16 overflow-hidden"
    >
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">

        {/* Left Side: Map / Location */}
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center">
          <div className="flex items-center gap-4 mb-6">
            <span
              data-cms="contact_form.locationEyebrow"
              data-cms-type="text"
              className="text-xs font-bold tracking-[0.2em] uppercase text-primary/60 dark:text-zinc-400"
            >
              {copy.locationEyebrow}
            </span>
            <div className="h-[1px] w-12 bg-primary/30 dark:bg-zinc-700" />
          </div>

          <h2
            data-cms="contact_form.locationHeading"
            data-cms-type="text"
            className="text-4xl md:text-5xl lg:text-[56px] font-serif text-primary dark:text-zinc-100 leading-[1.1] tracking-tight mb-8"
          >
            {copy.locationHeading}
          </h2>

          <div className="w-full aspect-[4/3] rounded-sm overflow-hidden border border-border/50 shadow-xl relative">
            <WorldMapDemo />
          </div>

          <div className="flex items-start gap-4 mt-8 text-primary/80 dark:text-zinc-300">
            <MapPin className="w-6 h-6 shrink-0 mt-1" />
            <p
              data-cms="contact_form.locationBody"
              data-cms-type="textarea"
              className="text-lg md:text-xl font-serif"
            >
              {copy.locationBody}
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="w-full bg-[#fcf9f4] dark:bg-zinc-900 border border-border/60 p-8 md:p-12 shadow-sm rounded-sm relative">

            {/* Decorative Label */}
            <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-primary text-white dark:bg-zinc-100 dark:text-zinc-900 px-6 py-2">
              <span
                data-cms="contact_form.formBadge"
                data-cms-type="text"
                className="text-xs font-bold tracking-[0.25em] uppercase"
              >
                {copy.formBadge}
              </span>
            </div>

            <div className="mb-10 mt-4">
              <h3
                data-cms="contact_form.formScriptHeading"
                data-cms-type="text"
                className="font-['Brush_Script_MT',cursive,serif] text-4xl text-primary dark:text-zinc-100 mb-4 transform -rotate-2"
              >
                {copy.formScriptHeading}
              </h3>
              <h4
                data-cms="contact_form.formTitle"
                data-cms-type="text"
                className="text-3xl md:text-4xl font-serif text-primary dark:text-zinc-100 leading-tight"
              >
                {copy.formTitle}
              </h4>
              <p
                data-cms="contact_form.formSubtitle"
                data-cms-type="textarea"
                className="text-muted-foreground mt-4 text-sm md:text-base"
              >
                {copy.formSubtitle}
              </p>
            </div>

            {enviado ? (
              <div className="py-16 flex flex-col items-center text-center space-y-6 animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-[#dfa83d]/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-[#dfa83d]" />
                </div>
                <div>
                  <h3
                    data-cms="contact_form.successTitle"
                    data-cms-type="text"
                    className="text-2xl font-serif text-primary dark:text-zinc-100 mb-2"
                  >
                    {copy.successTitle}
                  </h3>
                  <p
                    data-cms="contact_form.successBody"
                    data-cms-type="textarea"
                    className="text-muted-foreground"
                  >
                    {copy.successBody}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="space-y-3">
                  <Label
                    data-cms="contact_form.nameLabel"
                    data-cms-type="text"
                    className="text-xs font-semibold tracking-widest uppercase text-primary/70 dark:text-zinc-400 ml-1"
                  >
                    {copy.nameLabel}
                  </Label>
                  <Input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    disabled={enviando}
                    className="border-0 border-b border-primary/20 ml-1 bg-transparent rounded-none px-1 focus-visible:ring-0 focus-visible:border-primary dark:bg-transparent md:text-lg h-12 shadow-none"
                    placeholder={copy.namePlaceholder}
                    data-cms="contact_form.namePlaceholder"
                    data-cms-type="text"
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    data-cms="contact_form.emailLabel"
                    data-cms-type="text"
                    className="text-xs font-semibold tracking-widest uppercase text-primary/70 dark:text-zinc-400 ml-1"
                  >
                    {copy.emailLabel}
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    disabled={enviando}
                    className="border-0 ml-1 border-b border-primary/20 bg-transparent rounded-none px-1 focus-visible:ring-0 focus-visible:border-primary dark:bg-transparent  md:text-lg h-12 shadow-none"
                    placeholder={copy.emailPlaceholder}
                    data-cms="contact_form.emailPlaceholder"
                    data-cms-type="text"
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    data-cms="contact_form.messageLabel"
                    data-cms-type="text"
                    className="text-xs font-semibold tracking-widest uppercase text-primary/70 dark:text-zinc-400 ml-1"
                  >
                    {copy.messageLabel}
                  </Label>
                  <Textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    required
                    disabled={enviando}
                    className="border-0 ml-1 border-b border-primary/20 bg-transparent rounded-none px-1 focus-visible:ring-0 focus-visible:border-primary dark:bg-transparent min-h-[120px] md:text-lg resize-none shadow-none"
                    placeholder={copy.messagePlaceholder}
                    data-cms="contact_form.messagePlaceholder"
                    data-cms-type="textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={enviando}
                  data-cms="contact_form.submitLabel"
                  data-cms-type="text"
                  className={cn(
                    "group w-full flex items-center justify-center gap-4 px-8 py-5 mt-8",
                    "border border-primary/40 dark:border-zinc-700 bg-transparent",
                    "text-primary dark:text-zinc-300 text-xs font-semibold tracking-[0.2em] uppercase",
                    "hover:bg-primary hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all duration-300",
                    enviando && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {enviando ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span data-cms="contact_form.submittingLabel" data-cms-type="text">
                        {copy.submittingLabel}
                      </span>
                    </>
                  ) : (
                    <>
                      {copy.submitLabel}
                      <Send className="w-4 h-4 ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
