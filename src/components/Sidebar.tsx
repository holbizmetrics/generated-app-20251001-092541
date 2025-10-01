import { Plus, MessageSquare, Settings, MoreHorizontal, Trash2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChatStore } from '@/hooks/useChatStore';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/lib/utils';
import { SettingsDialog } from './SettingsDialog';
import { RenameSessionDialog } from './RenameSessionDialog';
export function Sidebar() {
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
    <aside className="hidden h-screen w-72 flex-col border-r bg-muted/40 lg:flex">
      <div className="flex h-[65px] items-center border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <MessageSquare className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-bold">Aura Code</span>
        </div>
      </div>
      <div className="flex-1 p-4">
        <Button
          onClick={createNewSession}
          className="w-full justify-start gap-2 transition-all duration-200 hover:shadow-md"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
        <ScrollArea className="h-[calc(100vh-200px)] pr-3 mt-4">
          <div className="space-y-1">
            {sessions.map((session) => (
              <div key={session.id} className="group relative flex items-center rounded-md">
                <Button
                  variant="ghost"
                  onClick={() => setActiveSessionId(session.id)}
                  className={cn(
                    'w-full justify-start truncate pr-8',
                    activeSessionId === session.id && 'bg-accent text-accent-foreground'
                  )}
                >
                  {session.title}
                </Button>
                <div className="absolute right-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <RenameSessionDialog sessionId={session.id} currentTitle={session.title}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Rename
                        </DropdownMenuItem>
                      </RenameSessionDialog>
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(session.id);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <footer className="mt-auto flex items-center justify-between border-t p-4">
        <span className="text-xs text-muted-foreground">Built with ���️ at Cloudflare</span>
        <SettingsDialog>
          <Button variant="ghost" size="icon" className="transition-transform hover:scale-110">
            <Settings className="h-5 w-5" />
          </Button>
        </SettingsDialog>
      </footer>
    </aside>
  );
}