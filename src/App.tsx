import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Code2, ArrowRight, Menu, X, ExternalLink, Terminal, FileCode2, GitBranch, Globe, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { ParticleBackground } from './components/sections/ParticleBackground';

// Animações - SIMPLES E COMPATÍVEIS
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// Projetos
const meusProjetos = [
  { title: "InsutecPayAPI", tech: "API • Node.js • Finance", desc: "API para gestão de pagamentos universitários, focada em sistemas de informação e segurança.", link: "https://github.com/ajacs10/InsutecPayAPI" },
  { title: "XFITNESS System", tech: "Full Stack • React • Management", desc: "Sistema completo para gestão de academias, integrando controle de alunos e planos de treino.", link: "https://github.com/ajacs10/XFITNESS-SISTEM" },
  { title: "Hotel Manager AO", tech: "Java • SQL • Desktop", desc: "Software de gestão hoteleira adaptado ao mercado angolano, focado em fluxos administrativos.", link: "https://github.com/ajacs10/HotelManagerSystem_ao" },
  { title: "Insutec Conect", tech: "React • Frontend • UX", desc: "Plataforma de jornal universitário para centralizar informações e conectar a comunidade acadêmica.", link: "https://github.com/ajacs10/insutec-conect-jornal-universitario" },
  { title: "TeamHelpsGO", tech: "TypeScript • Collaboration", desc: "Ferramenta desenvolvida para otimizar o suporte e colaboração entre equipes técnicas.", link: "https://github.com/ajacs10/TeamHelpsGO" },
  { title: "CPP Games & Projects", tech: "C++ • Algorithms • 42", desc: "Projetos de lógica e jogos desenvolvidos em baixo nível durante a formação na 42 Luanda.", link: "https://github.com/ajacs10/CPP-game_and-Project" }
];

// Tecnologias
const tecnologias = [
  { name: "React", icon: <FileCode2 size={48} />, color: "text-cyan-400" },
  { name: "C / C++", icon: <Code2 size={48} />, color: "text-blue-600" },
  { name: "Linux Admin", icon: <Terminal size={48} />, color: "text-orange-500" },
  { name: "Java", icon: <Code2 size={48} />, color: "text-red-500" },
  { name: "Git", icon: <GitBranch size={48} />, color: "text-orange-600" }
];

function App() {
  const linkedinUrl = "https://www.linkedin.com/in/ana-juliana-avelino-da-costa-sobrinho";
  const githubUrl = "https://github.com/ajacs10";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAlternatePhoto, setIsAlternatePhoto] = useState(false);
  const [sending, setSending] = useState(false);

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], [0, -100]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  // Inicializa EmailJS
  useEffect(() => {
    emailjs.init('llXWzplALaS2dZrNl');
  }, []);

  // Envio do Terminal
  const handleTerminalSend = () => {
    const input = document.getElementById('terminal-input') as HTMLInputElement;
    const output = document.getElementById('terminal-output');
    if (!input || !output || !input.value.trim() || sending) return;

    const message = input.value.trim();

    const userLine = document.createElement('p');
    userLine.innerHTML = `<span class="text-brand-purple">$</span> ${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}`;
    output.appendChild(userLine);

    const statusLine = document.createElement('p');
    statusLine.className = "text-yellow-400";
    statusLine.textContent = "Enviando mensagem para o inbox...";
    output.appendChild(statusLine);

    setSending(true);

    emailjs.send(
      'miudadura',
      'template_portfolio',
      { message: message }
    ).then(() => {
      statusLine.className = "text-green-400";
      statusLine.innerHTML = "[MENSAGEM ENVIADA COM SUCESSO!]<br/>Obrigada! Chegou ao meu Gmail. Responderei em breve 💌";
    }).catch(() => {
      statusLine.className = "text-red-400";
      statusLine.textContent = "[ERRO] Não foi possível enviar. Tenta por LinkedIn ou email direto.";
    }).finally(() => {
      setSending(false);
      input.value = '';
      output.scrollTop = output.scrollHeight;
    });
  };

  // Enviar com Enter
  useEffect(() => {
    const input = document.getElementById('terminal-input');
    if (input) {
      const listener = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !sending) {
          handleTerminalSend();
        }
      };
      input.addEventListener('keypress', listener);
      return () => input.removeEventListener('keypress', listener);
    }
  }, [sending]);

  // Lista de itens do menu
  const menuItems = [
    { id: 'projetos', label: 'Projetos' },
    { id: 'tecnologias', label: 'Tecnologias' },
    { id: 'habilidades', label: 'Habilidades' },
    { id: 'terminal', label: 'Terminal' }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden font-sans antialiased selection:bg-brand-blue/30 relative">
      {/* FUNDO GERAL COM fundo.png */}
      <div className="fixed inset-0 -z-50">
        <img
          src="/fundo.png"
          alt="Fundo geral"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#020617]/80" />
      </div>

      <ParticleBackground />

      {/* NAVBAR COM INTERAÇÃO VISUAL MELHORADA */}
      <nav className="fixed top-0 left-0 right-0 w-full z-50 border-b border-white/5 bg-[#020617]/95 backdrop-blur-2xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-brand-blue/30">S</div>
            <span className="text-2xl font-black tracking-tighter text-white hidden sm:block">SheCodeAjacs</span>
            <span className="text-2xl font-black tracking-tighter text-white sm:hidden">S.</span>
          </div>

          {/* Menu Desktop - TEXTO MUDA DE COR + UNDERLINE ANIMADO */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12 text-sm font-medium">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative py-2 overflow-hidden"
              >
                <motion.span
                  className="relative z-10 block"
                  initial={{ backgroundPosition: '0% 50%' }}
                  whileHover={{ 
                    backgroundPosition: '100% 50%',
                    color: 'transparent'
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{
                    backgroundImage: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'inherit',
                    backgroundSize: '200% 100%'
                  }}
                >
                  {item.label}
                </motion.span>

                {/* Underline animado */}
                <motion.span
                  className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-brand-blue to-brand-purple origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </button>
            ))}

            {/* Botão Contato */}
            <button
              onClick={() => scrollToSection('contato')}
              className="bg-brand-blue text-slate-950 px-6 lg:px-8 py-3 rounded-full font-bold hover:shadow-xl hover:shadow-brand-blue/40 transition-all"
            >
              Contato
            </button>
          </div>

          {/* Hamburger Mobile */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-3 hover:bg-white/10 rounded-xl transition-colors" aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
              className="md:hidden absolute top-20 left-0 right-0 bg-[#020617]/98 backdrop-blur-xl border-b border-white/10 shadow-2xl">
              <div className="container mx-auto px-6 py-8 flex flex-col gap-1 text-lg font-medium">
                {menuItems.map((item) => (
                  <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-left hover:text-brand-blue transition-colors py-4 border-b border-white/5">
                    {item.label}
                  </button>
                ))}
                <button onClick={() => scrollToSection('contato')} className="bg-brand-blue text-slate-950 px-8 py-4 rounded-full font-bold text-center mt-6 shadow-lg shadow-brand-blue/40">
                  Contato
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center pt-24 px-6 overflow-hidden">
        <motion.div style={{ y: heroParallax }} className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl" />
        </motion.div>

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="order-2 lg:order-1 space-y-10">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}>
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-xs font-mono uppercase tracking-widest">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-blue"></span>
                </span>
                Estudante do 4º Ano • Eng. Informática • Cadete 42 Luanda
              </div>
            </motion.div>

            <motion.h1 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }} className="text-5xl sm:text-6xl lg:text-7xl xl:text-[6rem] font-black leading-[0.95] tracking-tighter text-white">
              Ana Sobrinho<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-purple to-brand-orange">SheCode.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }} className="text-slate-300 text-lg md:text-xl max-w-2xl leading-relaxed">
              Estudante do 4º ano de Engenharia Informática no Instituição Superior de Ciência e Tecnologia INSUTEC,
              atualmente a caminho da Licenciatura. Cadete na 42 Luanda, apaixonada por programação low-level
              e desenvolvimento de interfaces modernas com React.
            </motion.p>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <button onClick={() => scrollToSection('projetos')} className="group px-10 py-5 bg-white text-slate-950 font-black rounded-2xl shadow-2xl shadow-white/20 hover:scale-105 transition-all flex items-center gap-3">
                Ver Projetos <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
              </button>

              <div className="flex items-center gap-6 bg-white/5 backdrop-blur border border-white/10 px-8 py-5 rounded-2xl">
                <a href={githubUrl} target="_blank" rel="noreferrer" className="hover:text-brand-blue transition-colors"><Github size={28} /></a>
                <a href={linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-brand-blue transition-colors"><Linkedin size={28} /></a>
                <a href="mailto:ajacs120702@gmail.com" className="hover:text-brand-blue transition-colors"><Mail size={28} /></a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.42, 0, 0.58, 1] }} className="order-1 lg:order-2 flex justify-center">
            <div className="relative group cursor-pointer" onClick={() => setIsAlternatePhoto(!isAlternatePhoto)}>
              <div className="absolute -inset-6 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-orange rounded-[3rem] blur-2xl opacity-30 group-hover:opacity-50 transition duration-1000" />

              <div className="relative w-72 h-96 sm:w-96 sm:h-[520px] lg:w-[460px] lg:h-[620px] rounded-[3rem] overflow-hidden border-4 border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={isAlternatePhoto ? 'alt' : 'main'}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6 }}
                    src={isAlternatePhoto ? "/foto-alternativa.jpg" : "/minhafoto.png"}
                    alt="Ana Sobrinho"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                </AnimatePresence>

                <div className="absolute top-6 right-6 px-4 py-2 bg-black/70 backdrop-blur-xl rounded-full text-xs font-mono text-white uppercase tracking-wider">
                  Clique para mudar ⟲
                </div>

                <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
                  className="absolute bottom-8 left-8 right-8 p-6 bg-slate-900/80 backdrop-blur-2xl border border-white/20 rounded-3xl">
                  <p className="text-2xl font-black text-white">Ana Sobrinho</p>
                  <p className="text-brand-blue text-sm font-medium">Estudante de Eng. Informática • 42 Luanda Cadet</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <ChevronDown size={40} className="text-white/40" />
        </motion.div>
      </section>

      {/* PROJETOS */}
      <section id="projetos" className="py-32 px-6 bg-slate-950/40">
        <div className="container mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }} className="text-center mb-20">

            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
              Sistemas em Produção
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {meusProjetos.map((proj, idx) => (
              <motion.a key={idx} href={proj.link} target="_blank" rel="noreferrer" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
                whileHover={{ y: -16, scale: 1.03 }} className="group block p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-blue/50 backdrop-blur-sm transition-all duration-500">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-brand-blue/20 rounded-2xl group-hover:bg-brand-blue/40 transition-colors">
                    <Code2 size={32} className="text-brand-blue" />
                  </div>
                  <ExternalLink size={22} className="text-slate-500 group-hover:text-brand-blue transition-colors" />
                </div>
                <p className="text-brand-purple font-mono text-xs uppercase tracking-widest mb-4">{proj.tech}</p>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-brand-blue transition-colors">{proj.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-8">{proj.desc}</p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-brand-blue transition-colors">
                  Ver no GitHub <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* TECNOLOGIAS */}
      <section id="tecnologias" className="py-32 px-6">
        <div className="container mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }} className="text-center mb-20">
          
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">Tecnologias de Domino</h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
            {tecnologias.map((tech, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
                whileHover={{ scale: 1.15, y: -12 }} className="group flex flex-col items-center">
                <div className={`p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-brand-blue/50 group-hover:bg-brand-blue/10 transition-all duration-500 shadow-xl ${tech.color}`}>
                  {tech.icon}
                </div>
                <p className="mt-6 text-lg font-bold text-slate-300 group-hover:text-white transition-colors">{tech.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HABILIDADES */}
      <section id="habilidades" className="py-32 px-6">
        <div className="container mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }} className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">
              Habilidades<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">Ação</span>
            </h2>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}>
              <Feature icon={<Globe size={48} className="text-brand-purple" />} title="Desenvolvimento Front-End" text="Interfaces modernas, acessíveis e fluidas com React, Tailwind e foco em UX/UI." />
            </motion.div>
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}>
              <Feature icon={<Zap size={48} className="text-brand-orange" />} title="Low-Level & Algoritmos" text="Domínio profundo de C/C++, estruturas de dados e resolução de problemas complexos (42 Luanda)." />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TERMINAL */}
      <section id="terminal" className="py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }} className="text-center mb-16">
          
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
              Terminal SheCode<span className="text-brand-purple">.</span>
            </h2>
            <p className="text-slate-400 mt-6 text-lg max-w-3xl mx-auto">
              Se quiseres perguntar-me algo, enviar uma oportunidade, feedback ou só dizer olá digita a tua mensagem abaixo e clica em Enviar.
              Chegará diretamente ao meu inbox em tempo real! 🚀
            </p>
          </motion.div>

          <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl border border-brand-blue/30 shadow-2xl shadow-brand-blue/20 overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 bg-slate-900/80 border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <p className="text-slate-400 text-sm font-mono ml-4">bash = AnaSobrinho@shecodeajacs:#</p>
            </div>

            <div className="p-6 min-h-96 font-mono text-sm">
              <p className="text-brand-blue mb-6">$ Estou Pronta para receber a tua mensagem:</p>

              <div id="terminal-output" className="text-slate-300 mb-6 space-y-3 max-h-96 overflow-y-auto"></div>

              <div className="flex items-center gap-3">
                <span className="text-brand-purple">$</span>
                <input
                  type="text"
                  id="terminal-input"
                  className="flex-1 bg-transparent outline-none text-white placeholder-slate-500"
                  placeholder="Digita a tua mensagem aqui..."
                  autoComplete="off"
                  disabled={sending}
                />
                <button
                  onClick={handleTerminalSend}
                  disabled={sending}
                  className="px-5 py-2 bg-brand-blue/20 hover:bg-brand-blue/40 disabled:opacity-50 rounded-lg text-brand-blue font-bold transition-all"
                >
                  {sending ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-slate-500 text-xs mt-8 font-mono">
            Todas as mensagens são enviadas de forma segura e privada. Obrigada pela visita! 💙
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contato" className="py-24 border-t border-white/10 bg-gradient-to-t from-slate-950 to-transparent">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }} className="text-4xl md:text-5xl font-black text-white mb-10 tracking-tighter">
            VAMOS CONSTRUIR O PRÓXIMO SISTEMA JUNTOS?
          </motion.h2>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }} className="flex justify-center gap-8 mb-16">
            <a href="mailto:ajacs120702@gmail.com" className="p-6 bg-white/5 rounded-3xl hover:bg-brand-blue/20 border border-white/10 hover:border-brand-blue/50 transition-all group">
              <Mail size={36} className="text-slate-400 group-hover:text-brand-blue transition-colors" />
            </a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="p-6 bg-white/5 rounded-3xl hover:bg-brand-blue/20 border border-white/10 hover:border-brand-blue/50 transition-all group">
              <Linkedin size={36} className="text-slate-400 group-hover:text-brand-blue transition-colors" />
            </a>
            <a href={githubUrl} target="_blank" rel="noreferrer" className="p-6 bg-white/5 rounded-3xl hover:bg-brand-blue/20 border border-white/10 hover:border-brand-blue/50 transition-all group">
              <Github size={36} className="text-slate-400 group-hover:text-brand-blue transition-colors" />
            </a>
          </motion.div>

          <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.6em]">
            © 2025 ANA JULIANA AVELINO DA COSTA SOBRINHO • SHECODEAJACS
          </p>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }} whileHover={{ y: -12 }} className="group relative p-8 md:p-10 lg:p-12 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-blue/40 backdrop-blur-sm transition-all duration-500 text-center">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-blue/5 to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-8 flex justify-center">
          <div className="p-5 md:p-6 rounded-2xl bg-white/5 group-hover:bg-brand-blue/10 transition-colors">
            {icon}
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-black text-white mb-6 uppercase tracking-tight">{title}</h3>
        <p className="text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">{text}</p>
      </div>
    </motion.div>
  );
}

export default App;
