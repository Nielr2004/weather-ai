import { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  children: ReactNode;
}

export function InfoCard({ title, children }: InfoCardProps) {
  return (
    <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-4">
      <h2 className="text-white/60 text-sm font-bold uppercase tracking-wider mb-3 px-2">{title}</h2>
      {children}
    </div>
  );
}