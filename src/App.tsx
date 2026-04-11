import { ThemeProvider } from "@/core/components/theme-provider";
import MainLayout from "@/core/layouts/MainLayout";
import { lazy, Suspense } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import DepartmentPage from "./domains/Departaments/components/DepartamentPage";


// Lazy load of components
const Home = lazy(() => import("@/domains/Home").then(m => ({ default: m.Home })));
const About = lazy(() => import("@/domains/About").then(m => ({ default: m.About })));
const Events = lazy(() => import("@/domains/events").then(m => ({ default: m.Events })));
const Resources = lazy(() => import("@/domains/Resources").then(m => ({ default: m.Resources })));
const Contact = lazy(() => import("@/domains/Contact").then(m => ({ default: m.Contact })));
const DepartamentsIndex = lazy(() => import("@/domains/Departaments/components/DepartamentsIndexPage"));
const GruposIndex = lazy(() => import("@/domains/Grupos/components/GruposIndexPage"));

const routeFallback = (
  <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
    Cargando contenido...
  </div>
);

function App() {
  const router = createHashRouter([
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={routeFallback}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/nosotros",
          element: (
            <Suspense fallback={routeFallback}>
              <About />
            </Suspense>
          ),
        },
        {
          path: "/eventos",
          element: (
            <Suspense fallback={routeFallback}>
              <Events />
            </Suspense>
          ),
        },
        {
          path: "/recursos",
          element: (
            <Suspense fallback={routeFallback}>
              <Resources />
            </Suspense>
          ),
        },
        {
          path: "/departamentos",
          element: (
            <Suspense fallback={routeFallback}>
              <DepartamentsIndex />
            </Suspense>
          ),
        },
        {
          path: "/grupos",
          element: (
            <Suspense fallback={routeFallback}>
              <GruposIndex />
            </Suspense>
          ),
        },
        {
          path: "/departamentos/:slug",
          element: (
            <Suspense fallback={routeFallback}>
              <DepartmentPage />
            </Suspense>
          ),
        },
        {
          path: "/contact",
          element: (
            <Suspense fallback={routeFallback}>
              <Contact />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
