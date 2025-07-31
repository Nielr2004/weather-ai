import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface DetailWidgetProps {
    icon: ReactNode;
    title: string;
    value: string | number;
    unit?: string;
    children?: ReactNode;
}

export function DetailWidget(props: DetailWidgetProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white flex-grow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">{props.title}</CardTitle>
            <div className="text-yellow-300">{props.icon}</div>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">
                {props.value} <span className="text-xl font-normal text-white/70">{props.unit}</span>
            </div>
            {props.children}
        </CardContent>
    </Card>
  )
}