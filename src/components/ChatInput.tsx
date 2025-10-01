import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizonal } from 'lucide-react';
import { useChatStore } from '@/hooks/useChatStore';
import { useShallow } from 'zustand/react/shallow';
export function ChatInput() {
  const { input, setInput, sendMessage, isProcessing } = useChatStore(
    useShallow((state) => ({
      input: state.input,
      setInput: state.setInput,
      sendMessage: state.sendMessage,
      isProcessing: state.isProcessing,
    }))
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${scrollHeight}px`;
    }
  }, [input]);
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage();
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };
  return (
    <form
      onSubmit={handleSendMessage}
      className="sticky bottom-0 w-full bg-background/80 py-4 backdrop-blur-xl"
    >
      <div className="relative mx-auto max-w-3xl">
        <Textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Aura anything..."
          disabled={isProcessing}
          className="w-full resize-none rounded-xl border-2 border-border bg-muted/50 py-3 pl-4 pr-16 text-base shadow-sm transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/50"
          style={{ minHeight: '52px', maxHeight: '200px' }}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isProcessing}
          className="absolute bottom-2.5 right-3 h-9 w-9 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <SendHorizonal className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </form>
  );
}