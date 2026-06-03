import { motion } from 'motion/react';

const stats = [
  { value: "50,000+", label: "Customers" },
  { value: "10,000+", label: "Products" },
  { value: "1,000+", label: "Vendors" },
  { value: "150+", label: "Countries" },
];

export function SocialProof() {
  return (
    <section className="py-24 relative border-t border-border-glass">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-white/40 uppercase mb-8">Trusted by innovative teams worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
            {/* Fake Logos */}
            <div className="text-xl font-display font-bold">Acme Corp</div>
            <div className="text-xl font-serif font-bold italic">GlobalTech</div>
            <div className="text-xl font-display font-bold">Nexus</div>
            <div className="text-xl font-sans font-black tracking-tighter">STRATOS</div>
            <div className="text-xl font-display font-medium">Vertex</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divider-x divider-border-glass pt-16 border-t border-border-glass/50">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <span className="text-3xl md:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-2">
                {stat.value}
              </span>
              <span className="text-sm text-white/50 font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
