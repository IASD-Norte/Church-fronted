"use client"

import { cn } from "@/shared/lib/utils"
import { useEffect, useState } from "react"

interface CountdownTimerProps {
  targetDate: string
  className?: string
  variant?: "default" | "compact"
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({ 
  targetDate, 
  className,
  variant = "default" 
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const distance = new Date(targetDate).getTime() - now

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      })
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-1">
      <div className={cn(
        "bg-card border border-border rounded-lg px-3 py-2 shadow-sm",
        "transition-colors duration-200",
        variant === "compact" && "px-2 py-1"
      )}>
        <span className={cn(
          "font-bold tabular-nums text-foreground",
          variant === "default" ? "text-2xl" : "text-xl"
        )}>
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className={cn(
        "text-muted-foreground font-medium",
        variant === "default" ? "text-sm" : "text-xs"
      )}>
        {label}
      </span>
    </div>
  )

  return (
    <div className={cn(
      "flex items-center justify-center gap-2",
      variant === "default" && "gap-3",
      className
    )}>
      <TimeUnit value={timeLeft.days} label="Días" />
      <span className="text-2xl text-muted-foreground font-bold">:</span>
      <TimeUnit value={timeLeft.hours} label="Horas" />
      <span className="text-2xl text-muted-foreground font-bold">:</span>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <span className="text-2xl text-muted-foreground font-bold">:</span>
      <TimeUnit value={timeLeft.seconds} label="Seg" />
    </div>
  )
}
