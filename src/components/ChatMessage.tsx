import React from 'react';
import { Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import type { Message } from '../../worker/types';
import { CodeBlock } from './CodeBlock';
import { ToolCallResult } from './ToolCallResult';
interface ChatMessageProps {
  message: Message;
}
export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn('flex items-start gap-4', isUser ? 'justify-end' : 'justify-start')}
    >
      {!isUser && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </div>
      )}
      <div
        className={cn(
          'max-w-xl rounded-2xl px-4 py-3 lg:max-w-3xl',
          isUser
            ? 'rounded-br-none bg-blue-600 text-white'
            : 'rounded-bl-none bg-muted'
        )}
      >
        {message.toolCalls && message.toolCalls.length > 0 && (
          <div className="mt-1 border-b border-border/50 pb-3 mb-2">
            {message.toolCalls.map((tool, index) => (
              <ToolCallResult key={index} toolCall={tool} />
            ))}
          </div>
        )}
        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-pre:my-0 prose-pre:p-0 prose-pre:bg-transparent">
          <ReactMarkdown
            components={{
              code({ node, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')} />
                ) : (
                  <code className="rounded bg-black/10 px-1 py-0.5 font-mono text-sm dark:bg-white/10" {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
      {isUser && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <User className="h-5 w-5" />
        </div>
      )}
    </motion.div>
  );
}