/**
 * LoadingFallback Component
 * Simple loading indicator for Suspense fallback
 */
export default function LoadingFallback() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-white"></div>
        <p className="text-lg text-gray-400">Cargando...</p>
      </div>
    </div>
  );
}

