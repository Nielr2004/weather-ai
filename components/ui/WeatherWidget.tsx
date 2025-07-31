import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface WeatherWidgetProps {
    icon: ReactNode;
    title: string;
    value: string | number;
    unit: string;
    description?: string;
}

export function WeatherWidget(props: WeatherWidgetProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">{props.title}</CardTitle>
            <div className="text-white/80">{props.icon}</div>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">
                {props.value} <span className="text-xl font-normal text-white/70">{props.unit}</span>
            </div>
            {props.description && <p className="text-xs text-white/70">{props.description}</p>}
        </CardContent>
    </Card>
  )
}