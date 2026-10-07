import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

/**
 * Демо-форма заявки: валидирует телефон и показывает успех,
 * но никуда не отправляет (лендинги для портфолио).
 */
export function LeadForm({
  submitLabel,
  successText,
  note,
  className,
  tone = "light",
}: {
  submitLabel: string
  successText: string
  note?: string
  className?: string
  tone?: "light" | "dark"
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle")
  const [error, setError] = useState("")

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const phone = String(new FormData(e.currentTarget).get("phone") ?? "")
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Введите номер полностью, 10 цифр после +7")
      return
    }
    setError("")
    setStatus("sending")
    setTimeout(() => setStatus("done"), 900)
  }

  const dark = tone === "dark"

  if (status === "done") {
    return (
      <div className={cn("rounded-xl border p-6", dark ? "border-white/15" : "border-border", className)} role="status">
        <p className="text-lg font-semibold">Заявка принята</p>
        <p className={cn("mt-2 text-sm", dark ? "text-white/70" : "text-muted-foreground")}>{successText}</p>
      </div>
    )
  }

  const field = dark
    ? "h-12 border-white/20 bg-white/5 text-white placeholder:text-white/45 focus-visible:border-white/50"
    : "h-12 bg-card"

  return (
    <form onSubmit={onSubmit} noValidate className={cn("grid gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="lead-name" className={dark ? "text-white/80" : undefined}>Как к вам обращаться</Label>
        <Input id="lead-name" name="name" autoComplete="name" placeholder="Имя" className={field} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="lead-phone" className={dark ? "text-white/80" : undefined}>Телефон</Label>
        <Input
          id="lead-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+7 900 000-00-00"
          aria-invalid={!!error}
          aria-describedby={error ? "lead-phone-error" : undefined}
          className={field}
        />
        {error && (
          <p id="lead-phone-error" className={cn("text-sm", dark ? "text-red-300" : "text-destructive")}>{error}</p>
        )}
      </div>
      <Button type="submit" size="lg" disabled={status === "sending"} className="h-12 text-base">
        {status === "sending" ? "Отправляем..." : submitLabel}
      </Button>
      {note && <p className={cn("text-xs", dark ? "text-white/55" : "text-muted-foreground")}>{note}</p>}
    </form>
  )
}
