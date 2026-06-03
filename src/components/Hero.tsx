import { motion } from 'motion/react';
import { ChevronRight, Sparkles, Terminal } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-24 overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-electric/20 blur-[120px] mix-blend-screen" />
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan/15 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-aurora/15 blur-[120px] mix-blend-screen" />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_10%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        
     

       /* <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-[1.05] max-w-5xl text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50"
        >
          Buy World-Class Software.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-cyan to-aurora">Deploy in Minutes.</span>
        </motion.h1>*/

        /*<motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-8 text-xl text-white/60 max-w-2xl font-normal leading-relaxed"
        >
          Explore premium Web2 and Web3 applications, acquire complete platforms, and accelerate your business growth securely.
        </motion.p>*/

        /*<motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <button className="px-8 py-4 rounded-full bg-white text-midnight font-semibold text-lg hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            Explore Marketplace
          </button>
          <button className="px-8 py-4 rounded-full bg-glass border border-border-glass text-white font-semibold text-lg hover:bg-white/5 transition-all flex items-center gap-2">
            <Terminal className="w-5 h-5" /> Become a Vendor
          </button>
        </motion.div>*/

        {/* Abstract 3D/Cards floating visualization placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="mt-20 w-full max-w-5xl relative h-64 md:h-96"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full rounded-2xl border border-border-glass bg-gradient-to-b from-glass to-transparent backdrop-blur-sm shadow-2xl flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] opacity-20 object-cover bg-center brightness-150 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent" />
            
            {/* Fake UI inside the preview window */}
            <div className="relative z-10 w-3/4 h-3/4 rounded-xl border border-border-glass bg-midnight-light/50 backdrop-blur-md flex flex-col overflow-hidden shadow-2xl">
              <div className="h-10 border-b border-border-glass flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-ruby/80" />
                <div className="w-3 h-3 rounded-full bg-amber/80" />
                <div className="w-3 h-3 rounded-full bg-emerald/80" />
              </div>
              <div className="flex-1 p-6 grid grid-cols-3 gap-4">
                <div className="col-span-1 border border-border-glass rounded-lg bg-glass/50 p-4 space-y-3">
                   <div className="w-full h-2 bg-white/10 rounded-full" />
                   <div className="w-3/4 h-2 bg-white/10 rounded-full" />
                   <div className="w-1/2 h-2 bg-white/10 rounded-full" />
                </div>
                <div className="col-span-2 border border-border-glass rounded-lg bg-glass/50" />
              </div>
            </div>
            
          </div>
        </motion.div>

      </div>
    </section>
  );
}
