
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface CopyButtonProps {
  text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        toast({
          title: "Command copied!",
          description: "The command has been copied to your clipboard.",
        });
        setTimeout(() => setCopied(false), 2000);
      },
      () => {
        toast({
          variant: "destructive",
          title: "Failed to copy",
          description: "Please try again or copy manually.",
        });
      }
    );
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={copyToClipboard}
      className="h-8 w-8 border-neon-green/30 hover:border-neon-green hover:text-neon-green hover:bg-neon-green/10 transition-colors"
    >
      {copied ? (
        <Check className="h-4 w-4 text-neon-green" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
};

export default CopyButton;
