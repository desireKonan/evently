import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { PropsWithChildren } from "react";

interface EventlyTooltipProps {
    label: string;
}

export function EventlyTooltip({ label, children }: PropsWithChildren<EventlyTooltipProps>) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        { children }
      </TooltipTrigger>
      <TooltipContent>
        <p> { label } </p>
      </TooltipContent>
    </Tooltip>
  )
}
