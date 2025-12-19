import { Github, Linkedin, Terminal } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="text-brand-blue" />
          <span className="font-bold text-xl tracking-tighter text-white">AJACS</span>
        </div>
        
        <div className="flex items-center gap-4 text-slate-400">
          <a href="#" className="hover:text-brand-blue transition-colors"><Github size={20} /></a>
          <a href="#" className="hover:text-brand-purple transition-colors"><Linkedin size={20} /></a>
        </div>
      </div>
    </nav>
  );
};
