import { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  children: ReactNode;
}

export function InfoCard({ title, children }: InfoCardProps) {
  return (
    // ## ADDED: transition and hover classes ##
    <div className="bg-black/25 backdrop-blur-lg border border-white/10 rounded-2xl p-4 transition-transform duration-300 hover:scale-105 hover:border-white/20">
      <h2 className="text-white/60 text-xs font-bold uppercase tracking-wider mb-3 px-2">{title}</h2>
      {children}
    </div>
  );
}