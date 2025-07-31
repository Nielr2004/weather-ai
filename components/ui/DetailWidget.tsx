import { ReactNode } from "react";

interface DetailWidgetProps {
    icon: ReactNode;
    title: string;
    value: string | number;
    unit?: string;
    children?: ReactNode;
}

export function DetailWidget(props: DetailWidgetProps) {
  // The root div now replaces the <Card> component
  return (
    <div className="bg-white/10 backdrop-blur-md border-white/20 text-white flex-grow p-4 rounded-2xl flex flex-col">
      {/* This div replaces <CardHeader> */}
      <div className="flex flex-row items-center justify-between pb-2">
        {/* This p tag replaces <CardTitle> */}
        <p className="text-sm font-medium text-white/80">{props.title}</p>
        <div className="text-yellow-300">{props.icon}</div>
      </div>
      
      {/* This div replaces <CardContent> */}
      <div>
        <div className="text-2xl font-bold">
            {props.value} <span className="text-xl font-normal text-white/70">{props.unit}</span>
        </div>
        {props.children}
      </div>
    </div>
  )
}