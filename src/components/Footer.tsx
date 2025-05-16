
import React from 'react';
import { Github, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 px-4 mt-12 border-t border-neon-green/20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} RevGen. For educational purposes only.</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-neon-green transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-neon-green transition-colors">
              <Shield className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="mt-4 text-xs text-muted-foreground text-center md:text-left">
          <p>Disclaimer: This tool is designed for educational purposes and authorized penetration testing only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
