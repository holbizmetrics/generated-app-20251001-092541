import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { MainLayout } from '@/components/MainLayout';
import { ApiKeyDisclaimer } from '@/components/ApiKeyDisclaimer';
import { useChatStore } from '@/hooks/useChatStore';
import { AnimatedBackground } from '@/components/AnimatedBackground';
export function HomePage() {
  const initializeChat = useChatStore((state) => state.initialize);
  useEffect(() => {
    initializeChat();
  }, [initializeChat]);
  return (
    <div className="relative">
      <AnimatedBackground />
      <MainLayout />
      <Toaster richColors position="top-right" />
      <ApiKeyDisclaimer />
    </div>
  );
}