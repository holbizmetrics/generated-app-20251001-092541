import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { chatService } from '@/lib/chat';
import type { Message, SessionInfo } from '../../worker/types';
import { toast } from 'sonner';
type ChatState = {
  sessions: SessionInfo[];
  activeSessionId: string | null;
  messages: Message[];
  streamingMessage: string;
  isLoading: boolean;
  isProcessing: boolean;
  model: string;
  input: string;
};
type ChatActions = {
  initialize: () => Promise<void>;
  fetchSessions: () => Promise<void>;
  setActiveSessionId: (sessionId: string | null) => void;
  loadSessionMessages: (sessionId: string) => Promise<void>;
  createNewSession: () => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  renameSession: (sessionId: string, newTitle: string) => Promise<void>;
  sendMessage: () => Promise<void>;
  setModel: (model: string) => void;
  setInput: (input: string) => void;
};
export const useChatStore = create<ChatState & ChatActions>()(
  immer((set, get) => ({
    sessions: [],
    activeSessionId: null,
    messages: [],
    streamingMessage: '',
    isLoading: true,
    isProcessing: false,
    model: 'google-ai-studio/gemini-2.5-flash',
    input: '',
    setInput: (input) => {
      set({ input });
    },
    setModel: async (model) => {
      set({ model });
      if (get().activeSessionId) {
        await chatService.updateModel(model);
      }
    },
    fetchSessions: async () => {
      const response = await chatService.listSessions();
      if (response.success && response.data) {
        set({ sessions: response.data });
      } else {
        toast.error('Failed to load sessions.');
      }
    },
    setActiveSessionId: (sessionId) => {
      if (get().activeSessionId === sessionId) return;
      set({ activeSessionId: sessionId, messages: [], streamingMessage: '' });
      if (sessionId) {
        chatService.switchSession(sessionId);
        get().loadSessionMessages(sessionId);
      }
    },
    loadSessionMessages: async (sessionId) => {
      set({ isLoading: true });
      const response = await chatService.getMessages();
      if (response.success && response.data) {
        set({
          messages: response.data.messages,
          model: response.data.model,
          isProcessing: response.data.isProcessing,
        });
      } else {
        toast.error('Failed to load messages for this session.');
      }
      set({ isLoading: false });
    },
    createNewSession: async () => {
      chatService.newSession();
      const newSessionId = chatService.getSessionId();
      set({
        activeSessionId: newSessionId,
        messages: [],
        streamingMessage: '',
        isProcessing: false,
      });
    },
    deleteSession: async (sessionId: string) => {
      const { activeSessionId, sessions } = get();
      const response = await chatService.deleteSession(sessionId);
      if (response.success) {
        toast.success('Session deleted.');
        const remainingSessions = sessions.filter((s) => s.id !== sessionId);
        set({ sessions: remainingSessions });
        if (activeSessionId === sessionId) {
          if (remainingSessions.length > 0) {
            get().setActiveSessionId(remainingSessions[0].id);
          } else {
            get().createNewSession();
          }
        }
      } else {
        toast.error('Failed to delete session.');
      }
    },
    renameSession: async (sessionId: string, newTitle: string) => {
      const response = await chatService.updateSessionTitle(sessionId, newTitle);
      if (response.success) {
        toast.success('Session renamed.');
        set((state) => {
          const sessionToUpdate = state.sessions.find((s) => s.id === sessionId);
          if (sessionToUpdate) {
            sessionToUpdate.title = newTitle;
          }
        });
      } else {
        toast.error('Failed to rename session.');
      }
    },
    sendMessage: async () => {
      const { input, activeSessionId, messages, model } = get();
      if (!input.trim() || get().isProcessing) return;
      const text = input.trim();
      set({ input: '' });
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: text,
        timestamp: Date.now(),
      };
      set((state) => {
        state.messages.push(userMessage);
        state.isProcessing = true;
        state.streamingMessage = '';
      });
      const isNewSession = !get().sessions.some(s => s.id === activeSessionId);
      if (isNewSession && activeSessionId) {
        const response = await chatService.createSession(undefined, activeSessionId, text);
        if (response.success) {
          await get().fetchSessions();
        } else {
          toast.error('Failed to create new session.');
        }
      }
      try {
        await chatService.sendMessage(text, model, (chunk) => {
          set((state) => {
            state.streamingMessage += chunk;
          });
        });
        const response = await chatService.getMessages();
        if (response.success && response.data) {
          set({
            messages: response.data.messages,
            isProcessing: false,
            streamingMessage: '',
          });
        } else {
          throw new Error('Failed to fetch final message state.');
        }
      } catch (error: any) {
        const errorMessage = error.message || 'An unknown error occurred.';
        toast.error(errorMessage, {
          description: 'Please check your configuration and try again.',
        });
        set((state) => {
          state.messages.pop(); // Remove the user's message that failed
          state.isProcessing = false;
          state.streamingMessage = '';
        });
      }
    },
    initialize: async () => {
      set({ isLoading: true });
      await get().fetchSessions();
      const sessions = get().sessions;
      if (sessions.length > 0) {
        const mostRecentSessionId = sessions[0].id;
        get().setActiveSessionId(mostRecentSessionId);
      } else {
        get().createNewSession();
        set({ isLoading: false });
      }
    },
  }))
);