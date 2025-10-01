import React, { useEffect, useRef } from 'react';
import { Bot, Sparkles, PanelLeft } from 'lucide-react';
import { useChatStore } from '@/hooks/useChatStore';
import { useShallow } from 'zustand/react/shallow';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ModelSelector } from './ModelSelector';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MobileSidebar } from './MobileSidebar';
export function ChatView() {
  const { messages, streamingMessage, isLoading, isProcessing } = useChatStore(
    useShallow((state) => ({
      messages: state.messages,
      streamingMessage: state.streamingMessage,
      isLoading: state.isLoading,
      isProcessing: state.isProcessing,
    }))
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingMessage]);
  const EmptyState = () => (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-blue-500 bg-blue-500/10">
        <Sparkles className="h-8 w-8 text-blue-500" />
      </div>
      <h2 className="font-display text-3xl font-semibold">Aura Code</h2>
      <p className="max-w-md text-muted-foreground">
        Start a conversation with your AI-powered coding assistant.
      </p>
    </div>
  );
  const LoadingState = () => (
    <div className="space-y-6 p-4">
      <div className="flex items-start gap-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-16 w-3/4" />
        </div>
      </div>
      <div className="flex items-start justify-end gap-4">
        <div className="flex-1 space-y-2 text-right">
          <Skeleton className="ml-auto h-4 w-1/4" />
          <Skeleton className="ml-auto h-12 w-1/2" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-[65px] items-center justify-between border-b p-4">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Sidebar</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <MobileSidebar />
            </SheetContent>
          </Sheet>
          <h1 className="font-display text-xl font-semibold hidden sm:block">Coding Assistant</h1>
        </div>
        <ModelSelector />
      </header>
      <div className="flex-1 overflow-y-auto" ref={scrollRef}>
        <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8">
          {isLoading ? (
            <LoadingState />
          ) : messages.length === 0 && !isProcessing ? (
            <EmptyState />
          ) : (
            <>
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {streamingMessage && (
                <ChatMessage
                  message={{
                    id: 'streaming',
                    role: 'assistant',
                    content: streamingMessage,
                    timestamp: Date.now(),
                  }}
                />
              )}
              {isProcessing && !streamingMessage && (
                 <div className="flex items-start gap-4 justify-start">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="rounded-2xl rounded-bl-none bg-muted px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50 [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50 [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50"></span>
                      </div>
                    </div>
                  </div>
              )}
            </>
          )}
        </div>
      </div>
      <ChatInput />
    </div>
  );
}