import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { useContent, DEFAULT_GRUPOS_PAGE } from "@/features/content";

type Church = {
    name: string;
    direccion: string;
    description?: string;
    images?: string[];
    lat?: number;
    lng?: number;
};

export default function GruposIndexPage() {
    const [churches, setChurches] = useState<Church[]>([]);
    const page = useContent("grupos_page", DEFAULT_GRUPOS_PAGE);

    useEffect(() => {
        // Scroll ariba al cargar la página
        window.scrollTo(0, 0);

        fetch("/data/church.json")
            .then((res) => res.json())
            .then((json) => {
                // Asignamos todos los grupos, o filtramos si es necesario.
                setChurches(json.bga);
            })
            .catch((err) => console.error("Error cargando iglesias:", err));
    }, []);

    return (
        <section
            data-cms-section="grupos_page"
            className="w-full flex flex-col min-h-screen bg-background"
        >

            {/* Header Estilo Referencia */}
            <div
                data-cms="grupos_page.headerBackgroundUrl"
                data-cms-type="image"
                className="w-full bg-cover bg-center flex flex-col items-center justify-center py-16 px-6 mt-16 md:mt-24"
                style={{ backgroundImage: `url(${page.headerBackgroundUrl})` }}
            >
                <div className="w-full max-w-6xl flex flex-col items-start gap-4">
                    <h1
                        data-cms="grupos_page.title"
                        data-cms-type="text"
                        className="text-4xl md:text-5xl lg:text-5xl font-serif text-white leading-tight"
                    >
                        {page.title}
                    </h1>
                </div>
            </div>

            {/* Hero Content Section */}
            <div className="w-full max-w-6xl mx-auto px-6 py-16 flex flex-col gap-10 border-b border-border/40">

                {/* Images Row */}
                <div className="flex flex-col md:flex-row w-full gap-6">
                    <div className="w-full md:w-1/2 aspect-video md:aspect-[4/3] relative overflow-hidden bg-muted">
                        <img
                            src={page.imageUrl}
                            alt="Personas orando"
                            data-cms="grupos_page.imageUrl"
                            data-cms-type="image"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-full md:w-1/2 aspect-video md:aspect-[4/3] bg-[#f2f2f2] dark:bg-zinc-900 border-[16px] border-white dark:border-zinc-800 shadow-md flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">

                        {/* Decorative Frame Elements */}
                        <div className="absolute inset-4 border border-[#bd5c5c]/20 opacity-50 pointer-events-none" />

                        <h3
                            data-cms="grupos_page.leadershipLabel"
                            data-cms-type="text"
                            className="font-['Brush_Script_MT',cursive,serif] text-5xl md:text-6xl text-[#16302b] dark:text-zinc-300 mb-2 mt-4 transform -rotate-2"
                        >
                            {page.leadershipLabel}
                        </h3>
                        <div className="flex items-center gap-4 text-[#bd5c5c] my-4">
                            <span className="h-px w-8 bg-[#bd5c5c]" />
                            <span
                                data-cms="grupos_page.leadershipMiddle"
                                data-cms-type="text"
                                className="font-serif italic text-lg text-[#16302b] dark:text-zinc-300"
                            >
                                {page.leadershipMiddle}
                            </span>
                            <span className="h-px w-8 bg-[#bd5c5c]" />
                        </div>
                        <h2
                            data-cms="grupos_page.leadershipHeading"
                            data-cms-type="text"
                            className="text-3xl font-serif text-[#3b4b6b] dark:text-zinc-400 leading-snug tracking-wide uppercase font-semibold whitespace-pre-line"
                        >
                            {page.leadershipHeading}
                        </h2>
                    </div>
                </div>

                {/* Text Paragraphs */}
                <div className="flex flex-col md:flex-row w-full gap-8 md:gap-16 mt-6">
                    <div
                        data-cms="grupos_page.bodyLeft"
                        data-cms-type="textarea"
                        className="w-full md:w-1/2 text-muted-foreground text-sm md:text-base leading-relaxed text-justify"
                    >
                        {page.bodyLeft}
                    </div>
                    <div
                        data-cms="grupos_page.bodyRight"
                        data-cms-type="textarea"
                        className="w-full md:w-1/2 text-muted-foreground text-sm md:text-base leading-relaxed text-justify"
                    >
                        {page.bodyRight}
                    </div>
                </div>
            </div>

            {/* Grid de Todos Los Grupos Pequeños */}
            <div className="w-full max-w-7xl mx-auto px-6 py-20">

                <div className="flex flex-col items-center text-center mb-16 gap-4">
                    <h2
                        data-cms="grupos_page.gridHeading"
                        data-cms-type="text"
                        className="text-4xl md:text-5xl font-serif text-primary dark:text-zinc-100 mb-2"
                    >
                        {page.gridHeading}
                    </h2>
                    <div className="w-16 h-1 bg-[#bd5c5c]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {churches.map((church, idx) => {
                        const hasImage = church.images && church.images.length > 0;
                        const imgSrc = hasImage ? church.images![0] : "/images/mas/5.jpg";
                        const cmsId = church.name || String(idx);

                        return (
                            <div
                                key={idx}
                                data-cms-collection="grupos"
                                data-cms-id={cmsId}
                                className="group flex flex-col bg-card border border-border/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 rounded-sm"
                            >
                                <div className="w-full aspect-[4/3] overflow-hidden relative">
                                    <img
                                        src={imgSrc}
                                        alt={church.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {!hasImage && (
                                        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                                            <span className="bg-background/80 px-3 py-1 text-xs uppercase tracking-widest text-primary font-semibold rounded-sm">Sin imagen</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col p-6 flex-grow">
                                    <h3 className="text-xl md:text-2xl font-serif text-primary dark:text-zinc-100 mb-3 group-hover:text-[#bd5c5c] transition-colors">
                                        {church.name}
                                    </h3>

                                    <div className="flex items-start gap-2 mb-4 text-muted-foreground mt-auto pt-4 border-t border-border/50">
                                        <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                                        <span className="text-sm">{church.direccion}</span>
                                    </div>

                                    {church.description && (
                                        <p className="text-sm text-muted-foreground/80 line-clamp-3 mb-4">
                                            {church.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {churches.length === 0 && (
                    <div className="w-full py-20 flex justify-center text-muted-foreground">
                        Cargando grupos...
                    </div>
                )}
            </div>

        </section>
    );
}
