import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LeadForm } from "@/shared/LeadForm"
import { cn } from "@/lib/utils"

const NOMINALS = [5000, 10000, 15000, 25000]
const rub = new Intl.NumberFormat("ru-RU")

export function Gift() {
  const [nominal, setNominal] = useState(10000)
  const [name, setName] = useState("")
  const [open, setOpen] = useState(false)

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div>
        <h2 className="text-5xl leading-[1.05] md:text-6xl">
          Подарите <em className="text-primary">себе</em> или близкому
        </h2>
        <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted-foreground">
          Сертификат действует год на любые процедуры клиники. Пришлём электронную версию сразу или подготовим открытку с курьером.
        </p>

        <fieldset className="mt-10">
          <legend className="mb-3 text-sm text-muted-foreground">Номинал</legend>
          <div className="flex flex-wrap gap-2">
            {NOMINALS.map((n) => (
              <button
                key={n}
                type="button"
                aria-pressed={nominal === n}
                onClick={() => setNominal(n)}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-sm tabular-nums transition-colors active:scale-[0.97]",
                  nominal === n ? "border-primary bg-primary text-primary-foreground" : "border-input hover:border-primary/60",
                )}
              >
                {rub.format(n)} ₽
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 grid max-w-sm gap-2">
          <Label htmlFor="gift-name">Кому дарите</Label>
          <Input id="gift-name" value={name} maxLength={28} onChange={(e) => setName(e.target.value)} placeholder="Имя получателя" className="h-12" />
        </div>

        <Button size="lg" onClick={() => setOpen(true)} className="mt-8 h-12 rounded-full px-7 text-base">
          Оформить сертификат
        </Button>
      </div>

      {/* Живое превью сертификата */}
      <div className="relative mx-auto w-full max-w-[480px] [perspective:1200px]">
        <div className="relative aspect-[8/5] overflow-hidden rounded-[22px] bg-[radial-gradient(120%_120%_at_0%_0%,#e9a597_0%,#c9705f_45%,#5b2b26_100%)] p-7 text-[#1d1211] shadow-[0_30px_80px_-20px_rgb(217_138_122/0.45)] transition-transform duration-700 hover:[transform:rotateY(-8deg)_rotateX(4deg)] md:p-9">
          <div className="absolute -right-16 -bottom-24 size-72 rounded-full border border-white/25" />
          <div className="absolute -right-4 -bottom-12 size-48 rounded-full border border-white/20" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="font-heading text-3xl italic">Нюанс</span>
              <span className="text-xs tracking-[0.2em] uppercase opacity-70">Сертификат</span>
            </div>
            <div>
              <p className="text-sm opacity-70">{name.trim() ? `Для: ${name.trim()}` : "Для самого важного человека"}</p>
              <p className="font-heading text-5xl tabular-nums md:text-6xl">{rub.format(nominal)} ₽</p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-3xl">Сертификат на {rub.format(nominal)} ₽</DialogTitle>
            <DialogDescription>Оставьте телефон, администратор уточнит способ доставки и оплаты.</DialogDescription>
          </DialogHeader>
          <LeadForm submitLabel="Оформить сертификат" successText="Перезвоним в течение 20 минут и всё оформим." />
        </DialogContent>
      </Dialog>
    </div>
  )
}
