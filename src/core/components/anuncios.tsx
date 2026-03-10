import { AnimatedTestimonials } from "@/core/components/ui/animated-testimonials";

export default function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "La Santa Cena nos recuerda el sacrificio de Cristo y renueva nuestra esperanza en Su pronto regreso. Es un tiempo de reflexión, comunión y gratitud.",
      name: "SANTA CENA",
      designation: "Celebración espiritual",
      src: "https://marketplace.canva.com/EAGYTACmB7o/2/0/1600w/canva-post-de-instagram-santa-cena-iglesia-cristiana-uj4YxF3HReg.jpg",
      date: "2026-12-15T18:00:00",
    },
    {
      quote:
        "A través de la música exaltamos el nombre de Dios y llevamos un mensaje de esperanza que transforma corazones.",
      name: "VOCEROS DEL REINO",
      designation: "Ministerio musical",
      src: "https://i.ytimg.com/vi/Z0MjwG_WZ54/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGMgYyhjMA8=&rs=AOn4CLACm9ilKNvGcmtdHWSGH3XSOsATkA",
      date: "2026-12-15T18:00:00",
    },
    {
      quote:
        "Cada conferencia es una oportunidad para profundizar en la Palabra de Dios y fortalecer nuestra fe como iglesia.",
      name: "CONFERENCIA ASOCIACION",
      designation: "Enseñanza y edificación",
      src: "https://i.ytimg.com/vi/RWe_IAiTV2k/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGHIgUyg3MA8=&rs=AOn4CLDHgNbvwC36I_Lqi8xmcA2EnZ3sDg",
      date: "2026-12-15T18:00:00",
    },
    {
      quote:
        "El campamento de Guías Mayores fortalece el liderazgo, el compañerismo y la relación personal con Dios.",
      name: "CAMPAMENTO GUIAS MAYORES",
      designation: "Formación y liderazgo",
      src: "https://imgv2-1-f.scribdassets.com/img/document/707438809/original/867b82eb94/1?v=1",
      date: "2026-12-15T18:00:00",
    },
    {
      quote:
        "Un encuentro donde los jóvenes se unen para adorar, aprender y crecer juntos en Cristo.",
      name: "CONGRESO JUVENIL",
      designation: "Juventud y adoración",
      src: "https://cdn.stayhappening.com/events5/banners/2cb8fd547af710ef4c45d1657a8202097e59b21b9ee204e70235d9c0a1e55b7f-rimg-w1200-h600-gmir.jpg",
      date: "2026-12-15T18:00:00",
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} />;
}
