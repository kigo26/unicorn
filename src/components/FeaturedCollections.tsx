import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, ShieldCheck } from 'lucide-react';
import { VendorModal } from './VendorModal';

const products = [
  {
    id: 1,
    title: "Aura CRM System",
    category: "Enterprise Software",
    rating: 4.9,
    reviews: 128,
    price: "$499/mo",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    vendor: "Vertex Labs"
  },
  {
    id: 2,
    title: "Nexus Trading Bot",
    category: "Web3 Software",
    rating: 4.8,
    reviews: 342,
    price: "0.5 ETH",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f4fc5e6?q=80&w=2070&auto=format&fit=crop",
    vendor: "Nexus DAO"
  },
  {
    id: 3,
    title: "Synth AI Agent",
    category: "AI Applications",
    rating: 5.0,
    reviews: 89,
    price: "$1,200",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
    vendor: "Stratos AI"
  }
];

function FeaturedProductCard({ product }: { product: any; key?: React.Key }) {
  const [showVendorModal, setShowVendorModal] = useState(false);

  return (
    <>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          show: { 
            opacity: 1, 
            y: 0,
            transition: { type: "spring", stiffness: 80, damping: 15 }
          }
        }}
        className="group relative rounded-2xl border border-border-glass bg-glass overflow-hidden hover:border-white/20 transition-all hover:shadow-[0_0_40px_rgba(0,102,255,0.1)] cursor-pointer flex flex-col"
      >
        {/* Image constraints */}
        <div className="relative h-56 overflow-hidden">
          <div className="absolute inset-0 bg-midnight/20 group-hover:bg-transparent z-10 transition-colors" />
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 z-20 bg-midnight/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-border-glass font-mono text-xs font-medium">
            {product.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-display font-bold tracking-tight text-white group-hover:text-cyan transition-colors">
              {product.title}
            </h3>
            <div className="flex items-center gap-1.5 bg-glass px-2 py-1 rounded border border-border-glass">
              <Star className="w-3.5 h-3.5 text-amber fill-amber" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
          </div>

          <div 
            className="flex items-center gap-2 mb-6 text-sm text-white/50 hover:text-white transition-colors w-fit"
            onClick={(e) => {
              e.stopPropagation();
              setShowVendorModal(true);
            }}
          >
            <ShieldCheck className="w-4 h-4 text-emerald" />
            <span>Verified by {product.vendor}</span>
          </div>

          <div className="mt-auto pt-6 border-t border-border-glass flex items-center justify-between">
            <span className="text-lg font-mono font-medium text-white/90">{product.price}</span>
            <button className="text-sm font-medium bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
              View Details
            </button>
          </div>
        </div>
      </motion.div>
      <VendorModal 
        isOpen={showVendorModal} 
        onClose={() => setShowVendorModal(false)} 
        vendorName={product.vendor}
      />
    </>
  );
}

export function FeaturedCollections() {
  return (
    <section className="py-24 relative overflow-hidden bg-midnight-light">
      <div className="absolute top-0 right-[-20%] w-[50%] h-[50%] bg-electric/10 blur-[150px] mix-blend-screen pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">Featured Collections</h2>
            <p className="text-xl text-white/50"><i>Verified for quality and security.</i></p>
          </div>
          <button className="flex items-center gap-2 text-electric hover:text-cyan transition-colors font-medium">
            View all products <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
