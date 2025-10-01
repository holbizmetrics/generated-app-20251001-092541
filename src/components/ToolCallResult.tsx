import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Wrench, Bot } from 'lucide-react';
import type { ToolCall } from '../../worker/types';
import { renderToolCall } from '@/lib/chat';
interface ToolCallResultProps {
  toolCall: ToolCall;
}
export function ToolCallResult({ toolCall }: ToolCallResultProps) {
  const resultString = JSON.stringify(toolCall.result, null, 2);
  return (
    <Accordion type="single" collapsible className="w-full my-2">
      <AccordionItem value="item-1" className="border rounded-md px-3 bg-muted/50">
        <AccordionTrigger className="py-2 text-sm hover:no-underline">
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            <span>{renderToolCall(toolCall)}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-2 bg-background rounded-md">
            <pre className="text-xs whitespace-pre-wrap break-all font-mono">
              <code>{resultString}</code>
            </pre>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}