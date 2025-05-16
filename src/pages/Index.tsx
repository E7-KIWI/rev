
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommandGenerator from '@/components/CommandGenerator';
import { Terminal, Shield, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <section className="mb-12 text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 text-neon-green">
              Reverse Shell Command Generator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Generate reverse shell commands for multiple platforms with customizable parameters.
              Simple, secure, and ready for your penetration testing needs.
            </p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex flex-col items-center p-4 bg-dark-secondary rounded-lg border border-neon-green/20">
                <Terminal className="h-10 w-10 text-neon-green mb-2" />
                <h3 className="text-lg font-medium mb-1">Multiple Shells</h3>
                <p className="text-muted-foreground text-sm text-center">
                  Support for Bash, Python, Perl, PHP, Netcat, and PowerShell
                </p>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-dark-secondary rounded-lg border border-neon-green/20">
                <Zap className="h-10 w-10 text-neon-blue mb-2" />
                <h3 className="text-lg font-medium mb-1">Instant Generation</h3>
                <p className="text-muted-foreground text-sm text-center">
                  Real-time command generation with copy to clipboard
                </p>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-dark-secondary rounded-lg border border-neon-green/20">
                <Shield className="h-10 w-10 text-neon-purple mb-2" />
                <h3 className="text-lg font-medium mb-1">Base64 Encoding</h3>
                <p className="text-muted-foreground text-sm text-center">
                  Obfuscate commands with automatic Base64 encoding
                </p>
              </div>
            </div>
          </section>
          
          <div className="bg-dark-secondary border border-neon-green/20 rounded-lg p-6">
            <CommandGenerator />
          </div>
          
          <section className="mt-12 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4 text-neon-green">Usage Instructions</h2>
            
            <div className="space-y-4 text-sm">
              <div className="bg-dark-secondary border border-neon-green/20 p-4 rounded-lg">
                <h3 className="font-medium mb-2 text-neon-blue">1. Configure your listener</h3>
                <div className="code-block">
                  <pre className="terminal-text">nc -lvnp {4444}</pre>
                </div>
                <p className="mt-2 text-muted-foreground">
                  Start a netcat listener on your attacking machine to receive the connection.
                </p>
              </div>
              
              <div className="bg-dark-secondary border border-neon-green/20 p-4 rounded-lg">
                <h3 className="font-medium mb-2 text-neon-blue">2. Execute the shell</h3>
                <p className="text-muted-foreground mb-2">
                  Run the generated command on the target system to establish the connection.
                </p>
              </div>
              
              <div className="bg-dark-secondary border border-neon-green/20 p-4 rounded-lg">
                <h3 className="font-medium mb-2 text-neon-blue">3. Upgrade your shell (optional)</h3>
                <div className="code-block">
                  <pre className="terminal-text">python -c 'import pty;pty.spawn("/bin/bash")'</pre>
                </div>
                <p className="mt-2 text-muted-foreground">
                  For a more stable and feature-rich shell experience.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
