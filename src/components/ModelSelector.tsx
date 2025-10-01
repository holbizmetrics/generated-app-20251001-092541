import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MODELS } from "@/lib/chat";
import { useChatStore } from "@/hooks/useChatStore";
import { useShallow } from 'zustand/react/shallow';
export function ModelSelector() {
  const { model, setModel } = useChatStore(
    useShallow((state) => ({ model: state.model, setModel: state.setModel }))
  );
  return (
    <Select value={model} onValueChange={setModel}>
      <SelectTrigger className="w-full sm:w-[200px] bg-background/80 backdrop-blur-sm">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        {MODELS.map((m) => (
          <SelectItem key={m.id} value={m.id}>
            {m.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}