
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ShellOptionProps {
  name: string;
  icon?: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const ShellOption: React.FC<ShellOptionProps> = ({
  name,
  icon,
  isActive,
  onClick,
}) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className={cn(
        "border rounded-md px-3 py-1 flex items-center gap-2 transition-colors",
        isActive
          ? "bg-neon-green/20 text-neon-green border-neon-green"
          : "border-neon-green/30 hover:border-neon-green hover:text-neon-green hover:bg-neon-green/10"
      )}
    >
      {icon && <span className="text-sm">{icon}</span>}
      <span className="text-sm font-medium">{name}</span>
    </Button>
  );
};

export default ShellOption;
