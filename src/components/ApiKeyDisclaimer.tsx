import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Terminal } from 'lucide-react';
const DISCLAIMER_KEY = 'aura-code-api-key-disclaimer-seen';
export function ApiKeyDisclaimer() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const hasSeenDisclaimer = localStorage.getItem(DISCLAIMER_KEY);
    if (!hasSeenDisclaimer) {
      setIsOpen(true);
    }
  }, []);
  const handleDismiss = () => {
    localStorage.setItem(DISCLAIMER_KEY, 'true');
    setIsOpen(false);
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            Important: AI Functionality Notice
          </AlertDialogTitle>
          <AlertDialogDescription className="pt-4 text-base">
            Welcome to Aura Code! Please be aware that the AI chat features
            require API keys to connect to language models.
            <br /><br />
            For this live demo to work, you'll need to deploy your own instance and configure the necessary API keys in your Cloudflare Worker environment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleDismiss}>I Understand</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}