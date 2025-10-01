import { Plus, MessageSquare, Settings, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatStore } from '@/hooks/useChatStore';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/lib/utils';
import { SettingsDialog } from './SettingsDialog';
import { SheetClose } from '@/components/ui/sheet';
export function MobileSidebar() {
  const { sessions, activeSessionId, createNewSession, setActiveSessionId, deleteSession } = useChatStore(
    useShallow((state) => ({
      sessions: state.sessions,
      activeSessionId: state.activeSessionId,
      createNewSession: state.createNewSession,
      setActiveSessionId: state.setActiveSessionId,
      deleteSession: state.deleteSession,
    }))
  );
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-[65px] items-center border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <MessageSquare className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-bold">Aura Code</span>
        </div>
      </div>
      <div className="flex-1 p-4">
        <SheetClose asChild>
          <Button
            onClick={createNewSession}
            className="w-full justify-start gap-2"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
        </SheetClose>
        <ScrollArea className="h-[calc(100vh-200px)] pr-3 mt-4">
          <div className="space-y-1">
            {sessions.map((session) => (
              <div key={session.id} className="group flex items-center rounded-md hover:bg-accent">
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    onClick={() => setActiveSessionId(session.id)}
                    className={cn(
                      'w-full justify-start truncate text-left h-auto py-2 flex-1',
                      activeSessionId === session.id && 'bg-accent text-accent-foreground'
                    )}
                  >
                    {session.title}
                  </Button>
                </SheetClose>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100"
                  onClick={() => deleteSession(session.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="mt-auto flex items-center justify-end border-t p-4">
        <SettingsDialog>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </SettingsDialog>
      </div>
    </div>
  );
}