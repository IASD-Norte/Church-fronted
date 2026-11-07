import { Link } from 'react-router-dom';
import { departmentData } from '../constants/departamentPage';
import { useContent, DEFAULT_DEPARTMENTS_INDEX } from '@/features/content';

export default function DepartamentsIndexPage() {
    const departments = Object.entries(departmentData);
    const page = useContent('departments_index', DEFAULT_DEPARTMENTS_INDEX);

    return (
        <div
            data-cms-section="departments_index"
            className="flex-1 w-full flex flex-col min-h-screen"
        >
            {/* Hero Section */}
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] flex items-center justify-center bg-black overflow-hidden mt-24">
                <img
                    src={page.heroImageUrl}
                    alt="Hands together"
                    data-cms="departments_index.heroImageUrl"
                    data-cms-type="image"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="relative z-10 text-center px-4 w-full flex flex-col justify-center items-center">
                    <div className="flex items-center justify-center gap-2 text-white/80 text-sm font-semibold tracking-widest uppercase mb-4">
                        <Link
                            to="/"
                            data-cms="departments_index.breadcrumbHome"
                            data-cms-type="text"
                            className="hover:text-white transition-colors"
                        >
                            {page.breadcrumbHome}
                        </Link>
                        <span>/</span>
                        <span
                            data-cms="departments_index.breadcrumbCurrent"
                            data-cms-type="text"
                        >
                            {page.breadcrumbCurrent}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
                        <span data-cms="departments_index.title1" data-cms-type="text">
                            {page.title1}
                        </span>
                        <span className="hidden sm:block text-2xl font-light text-white/50">|</span>
                        <span
                            data-cms="departments_index.title2"
                            data-cms-type="text"
                            className="uppercase tracking-widest"
                        >
                            {page.title2}
                        </span>
                    </h1>
                </div>
            </div>

            {/* Intro Section */}
            <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 text-center space-y-10">
                <p
                    data-cms="departments_index.intro"
                    data-cms-type="textarea"
                    className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto"
                >
                    {page.intro}
                </p>
                <div className="max-w-4xl mx-auto space-y-6">
                    <p
                        data-cms="departments_index.verse"
                        data-cms-type="textarea"
                        className="text-2xl md:text-3xl font-serif font-medium text-primary leading-snug"
                    >
                        {page.verse}
                    </p>
                    <p
                        data-cms="departments_index.verseRef"
                        data-cms-type="text"
                        className="text-sm font-bold text-muted-foreground tracking-widest uppercase"
                    >
                        {page.verseRef}
                    </p>
                </div>
            </div>

            {/* Departments Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {departments.map(([slug, data]) => (
                        <Link
                            key={slug}
                            to={`/departamentos/${slug}`}
                            data-cms-collection="departments"
                            data-cms-id={slug}
                            className="group flex flex-col bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="h-44 w-full overflow-hidden relative bg-muted">
                                <img
                                    src={data.imageVertical || data.imageHorizontal}
                                    alt={data.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-lg font-bold font-serif mb-2 text-foreground group-hover:text-primary transition-colors">
                                    {data.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1 leading-relaxed">
                                    {data.description}
                                </p>
                                <div
                                    data-cms="departments_index.cardCta"
                                    data-cms-type="text"
                                    className="flex items-center text-xs font-bold tracking-wider text-primary mt-auto uppercase"
                                >
                                    {page.cardCta} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
