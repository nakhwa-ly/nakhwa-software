interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
}

export function TestimonialCard({ quote, name, role, company }: TestimonialCardProps) {
  return (
    <div className="p-6 rounded-2xl border bg-card flex flex-col gap-4">
      <span className="text-5xl text-primary/30 font-serif leading-none">&ldquo;</span>
      <p className="text-foreground/80 leading-relaxed flex-1">{quote}</p>
      <div className="flex items-center gap-3 pt-2 border-t">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-muted-foreground text-xs">
            {role} — {company}
          </p>
        </div>
      </div>
    </div>
  );
}
