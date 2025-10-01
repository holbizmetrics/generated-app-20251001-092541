import { Sidebar } from './Sidebar';
import { ChatView } from './ChatView';
import { useHotkeys } from 'react-hotkeys-hook';
import { useChatStore } from '@/hooks/useChatStore';
import { toast } from 'sonner';
export function MainLayout() {
  const createNewSession = useChatStore((state) => state.createNewSession);
  useHotkeys('mod+k', (event) => {
    event.preventDefault();
    createNewSession();
    toast.message('New chat created.');
  }, { preventDefault: true });
  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <Sidebar />
      <main className="flex-1">
        <ChatView />
      </main>
    </div>
  );
}