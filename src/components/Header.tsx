
import React from 'react';
import { Terminal } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 border-b border-neon-green/20 bg-dark">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Terminal className="h-8 w-8 text-neon-green" />
          <h1 className="text-3xl font-bold text-neon-green animate-glow">
            RevGen
          </h1>
        </div>
        <div className="font-mono text-sm text-neon-green/70">
          <span className="hidden md:inline">Simple.</span> Secure. <span className="hidden md:inline">Powerful.</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
