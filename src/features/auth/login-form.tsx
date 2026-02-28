import { Card, CardContent } from "@/core/components/ui/card"
import { Input } from "@/core/components/ui/input"
import { Label } from "@/core/components/ui/label"
import { cn } from "@/shared/lib/utils"
import { Link } from "react-router-dom"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden border border-white/10 backdrop-blur-xl bg-white/5 shadow-2xl rounded-2xl">
        <CardContent className="gri p-0 md:grid-cols-2">
          {/* Formulario */}
          <form className="flex flex-col justify-center p-6 md:p-10">
            <div className="flex flex-col gap-6">
              {/* Encabezado */}
              <div className="flex flex-col items-center text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  Welcome back
                </h1>
                <p className="text-sm text-gray-300">
                  Sign in to continue with IASND
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                  Email
                </Label>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-200">
                    Password
                  </Label>
                  <a
                    href="#"
                    className="text-sm text-blue-400 hover:underline underline-offset-2"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-indigo-400 focus:ring-indigo-400"
                  required
                />
              </div>

              {/* Botón */}
              <Link
                to="/example"
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 text-center text-white font-semibold tracking-wide shadow-md transition hover:shadow-lg hover:opacity-90 active:scale-95"
              >
                Login
              </Link>

              {/* Sign up */}
              <div className="text-center text-sm text-gray-300">
                Don’t have an account?{" "}
                <a
                  href="https://google.com"
                  target="_blank"
                  className="font-medium text-blue-400 hover:underline underline-offset-4"
                >
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
