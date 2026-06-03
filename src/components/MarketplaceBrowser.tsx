import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Star, ShieldCheck, ChevronDown, Check, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { ProductDetails } from './ProductDetails';
import { VendorModal } from './VendorModal';

const CATEGORIES = ["All Software", "Web2 Software", "Web3 Software", "Enterprise Apps", "AI Agents"];
const PRICE_RANGES = ["Any Price", "One-time Purchase", "Subscriptions", "Free / Open Source"];
const RATINGS = [
  { value: 4, label: "4.0 & Up" },
  { value: 3, label: "3.0 & Up" },
];

const MOCK_PRODUCTS = [
  // Web2
  {
    id: 1,
    title: "CRM Pro",
    category: "Web2 Software",
    rating: 4.8,
    reviews: 245,
    price: "$299",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    vendor: "CloudStream Solutions"
  },
  {
    id: 2,
    title: "ShopMaster",
    category: "Web2 Software",
    rating: 4.9,
    reviews: 182,
    price: "$499",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    vendor: "EcoSystems"
  },
  {
    id: 3,
    title: "LearnHub LMS",
    category: "Web2 Software",
    rating: 4.7,
    reviews: 94,
    price: "$850",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop",
    vendor: "EduTech Global"
  },
  // Web3
  {
    id: 4,
    title: "NFT Marketplace",
    category: "Web3 Software",
    rating: 4.6,
    reviews: 312,
    price: "1.5 ETH",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2064&auto=format&fit=crop",
    vendor: "Nexus DAO"
  },
  {
    id: 5,
    title: "DAO Governance",
    category: "Web3 Software",
    rating: 4.9,
    reviews: 56,
    price: "0.8 ETH",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f4fc5e6?q=80&w=2070&auto=format&fit=crop",
    vendor: "BlockForge"
  },
  {
    id: 6,
    title: "DeFi Vault",
    category: "Web3 Software",
    rating: 4.8,
    reviews: 124,
    price: "2.0 ETH",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=2097&auto=format&fit=crop",
    vendor: "Alpha Finance"
  },
  // Enterprise
  {
    id: 7,
    title: "ERP Nexus",
    category: "Enterprise Apps",
    rating: 4.9,
    reviews: 432,
    price: "$5,000",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    vendor: "Vertex Labs"
  },
  {
    id: 8,
    title: "SupplyChain Pro",
    category: "Enterprise Apps",
    rating: 4.7,
    reviews: 156,
    price: "$3,200",
    image: "https://images.unsplash.com/photo-1586528116311-ad86d34e6e6a?q=80&w=2070&auto=format&fit=crop",
    vendor: "Logistics OS"
  },
  {
    id: 9,
    title: "PropertyOS",
    category: "Enterprise Apps",
    rating: 4.8,
    reviews: 89,
    price: "$1,800",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop",
    vendor: "Haven Systems"
  },
  // AI Agents
  {
    id: 10,
    title: "Sales Agent AI",
    category: "AI Agents",
    rating: 5.0,
    reviews: 167,
    price: "$1,200",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
    vendor: "Stratos AI"
  },
  {
    id: 11,
    title: "Customer Support AI",
    category: "AI Agents",
    rating: 4.9,
    reviews: 294,
    price: "$899",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
    vendor: "MindFlow"
  },
  {
    id: 12,
    title: "Trading Agent AI",
    category: "AI Agents",
    rating: 4.8,
    reviews: 512,
    price: "$1,500",
    image: "https://images.unsplash.com/photo-1611974714851-48206139d733?q=80&w=2070&auto=format&fit=crop",
    vendor: "QuantLabs"
  }
];

function InteractiveProductCard({ product, onClick, index }: { product: any; onClick: () => void; index: number; key?: React.Key }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showVendorModal, setShowVendorModal] = useState(false);
  const isTrending = product.rating >= 4.7 && product.reviews > 100;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ duration: 0.6, delay: index * 0.1, type: "spring", bounce: 0.4 }}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        className="group relative rounded-2xl border border-border-glass bg-glass/40 overflow-hidden hover:border-cyan/30 transition-all hover:shadow-[0_10px_40px_rgba(34,211,238,0.15)] cursor-pointer flex flex-col"
      >
        <div 
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-50 mix-blend-screen"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
          }}
        />
        <div className="relative h-48 overflow-hidden z-10">
          <div className="absolute inset-0 bg-midnight/30 group-hover:bg-transparent z-10 transition-colors" />
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
          {isTrending && (
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-midnight/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-cyan/30 text-[10px] font-medium tracking-wide text-white shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-80"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan"></span>
              </span>
              Trending
            </div>
          )}
          <div className="absolute top-3 right-3 z-20 bg-midnight/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-border-glass font-mono text-[10px] font-medium tracking-wide">
            {product.category}
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col z-10">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-display font-bold tracking-tight text-white group-hover:text-cyan transition-colors">
              {product.title}
            </h3>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-midnight/50 rounded-md border border-border-glass">
              <Star className="w-3 h-3 text-amber fill-amber" />
              <span className="text-xs font-medium">{product.rating}</span>
            </div>
          </div>

          <div 
            className="flex items-center gap-2 mb-5 text-sm text-white/50 hover:text-white transition-colors w-fit"
            onClick={(e) => {
              e.stopPropagation();
              setShowVendorModal(true);
            }}
          >
            <ShieldCheck className="w-4 h-4 text-emerald" />
            <span>Verified by {product.vendor}</span>
          </div>

          <div className="mt-auto pt-5 border-t border-border-glass flex items-center justify-between">
            <span className="text-base font-mono font-medium text-white/90">{product.price}</span>
            <div className="w-8 h-8 rounded-full bg-cyan/10 flex items-center justify-center -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
              <ArrowRight className="w-4 h-4 text-cyan" />
            </div>
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

export function MarketplaceBrowser() {
  const [activeCategory, setActiveCategory] = useState("All Software");
  const [activePrice, setActivePrice] = useState("Any Price");
  const [activeRating, setActiveRating] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Trigger loading when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeCategory, activePrice, activeRating, searchQuery]);

  // Simple filtering logic
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    if (activeCategory !== "All Software" && product.category !== activeCategory) return false;
    if (activeRating && product.rating < activeRating) return false;
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    // Price filtering mocked lightly
    if (activePrice === "Free / Open Source" && product.price !== "Free / Open Source") return false;
    return true;
  });

  return (
    <section className="py-24 relative overflow-hidden bg-midnight border-t border-border-glass" id="marketplace">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {selectedProduct ? (
            <ProductDetails 
              key="details"
              product={selectedProduct} 
              onBack={() => {
                setSelectedProduct(null);
                setTimeout(() => {
                  document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }} 
            />
          ) : (
            <motion.div 
               key="browser"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Mobile Filter Toggle */}
          <button 
            className="lg:hidden w-full flex items-center justify-between p-4 rounded-xl border border-border-glass bg-glass"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-white/70" />
              <span className="font-medium">Filters</span>
            </div>
            <ChevronDown className={cn("w-5 h-5 transition-transform", showMobileFilters && "rotate-180")} />
          </button>

          {/* Sidebar Filters */}
          <aside className={cn(
            "w-full lg:w-64 shrink-0 lg:block space-y-10",
            showMobileFilters ? "block" : "hidden"
          )}>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-glass border border-border-glass rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-cyan/50 focus:bg-glass/80 transition-all"
              />
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-4">Categories</h3>
              <ul className="space-y-2">
                {CATEGORIES.map(category => (
                  <li key={category}>
                    <button
                      onClick={() => setActiveCategory(category)}
                      className="flex items-center gap-3 w-full group py-1"
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all duration-200",
                        activeCategory === category 
                          ? "bg-cyan border-cyan text-midnight" 
                          : "border-white/20 bg-transparent group-hover:border-white/40"
                      )}>
                        {activeCategory === category && <Check className="w-3 h-3" strokeWidth={3} />}
                      </div>
                      <span className={cn(
                        "text-sm transition-colors duration-200",
                        activeCategory === category ? "text-white font-medium" : "text-white/60 group-hover:text-white"
                      )}>
                        {category}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-4">Pricing</h3>
              <ul className="space-y-2">
                {PRICE_RANGES.map(price => (
                  <li key={price}>
                    <button
                      onClick={() => setActivePrice(price)}
                      className="flex items-center gap-3 w-full group py-1"
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200",
                        activePrice === price 
                          ? "border-cyan" 
                          : "border-white/20 group-hover:border-white/40"
                      )}>
                        {activePrice === price && <div className="w-2 h-2 rounded-full bg-cyan" />}
                      </div>
                      <span className={cn(
                        "text-sm transition-colors duration-200",
                        activePrice === price ? "text-white font-medium" : "text-white/60 group-hover:text-white"
                      )}>
                        {price}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ratings */}
            <div>
              <h3 className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-4">Minimum Rating</h3>
              <ul className="space-y-2">
                <li key="any-rating">
                    <button
                      onClick={() => setActiveRating(null)}
                      className="flex items-center gap-3 w-full group py-1"
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200",
                        activeRating === null 
                          ? "border-amber" 
                          : "border-white/20 group-hover:border-white/40"
                      )}>
                        {activeRating === null && <div className="w-2 h-2 rounded-full bg-amber" />}
                      </div>
                      <span className={cn(
                        "text-sm transition-colors duration-200",
                        activeRating === null ? "text-white font-medium" : "text-white/60 group-hover:text-white"
                      )}>
                        Any Rating
                      </span>
                    </button>
                </li>
                {RATINGS.map(rating => (
                  <li key={rating.value}>
                    <button
                      onClick={() => setActiveRating(rating.value)}
                      className="flex items-center gap-3 w-full group py-1"
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200",
                        activeRating === rating.value 
                          ? "border-amber" 
                          : "border-white/20 group-hover:border-white/40"
                      )}>
                        {activeRating === rating.value && <div className="w-2 h-2 rounded-full bg-amber" />}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={cn(
                                "w-3.5 h-3.5", 
                                i < rating.value 
                                  ? (activeRating === rating.value ? "text-amber fill-amber opacity-100" : "text-amber fill-amber opacity-70") 
                                  : "text-white/10 fill-white/10"
                              )} 
                            />
                          ))}
                        </div>
                        <span className={cn(
                          "transition-colors duration-200 ml-1",
                          activeRating === rating.value ? "text-white font-medium" : "text-white/50 group-hover:text-white/80"
                        )}>& Up</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <span className="text-white/50 text-sm font-medium">
                Showing {filteredProducts.length} result{filteredProducts.length !== 1 && 's'}
              </span>
              
              <div className="flex items-center gap-3">
                <span className="text-white/40 text-sm">Sort by:</span>
                <button className="flex items-center gap-2 text-sm font-medium bg-glass border border-border-glass px-4 py-2 rounded-lg hover:bg-glass/80 transition-colors">
                  Recommended <ChevronDown className="w-4 h-4 text-white/50" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  [...Array(4)].map((_, i) => (
                    <motion.div
                      key={`skeleton-${i}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="rounded-2xl border border-border-glass bg-glass/20 overflow-hidden flex flex-col h-[380px] animate-pulse"
                    >
                      <div className="h-48 bg-white/5" />
                      <div className="p-5 flex-1 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                          <div className="h-6 bg-white/10 rounded w-2/3" />
                          <div className="h-6 bg-white/10 rounded w-12" />
                        </div>
                        <div className="h-4 bg-white/10 rounded w-1/2" />
                        <div className="mt-auto pt-5 border-t border-border-glass flex justify-between items-center">
                          <div className="h-6 bg-white/10 rounded w-24" />
                          <div className="w-8 h-8 rounded-full bg-white/10" />
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : filteredProducts.map((product, index) => (
                  <InteractiveProductCard
                    key={product.id}
                    index={index}
                    product={product}
                    onClick={() => {
                      setSelectedProduct(product);
                      setTimeout(() => {
                        document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' });
                      }, 50);
                    }}
                  />
                ))}
              </AnimatePresence>

              {filteredProducts.length === 0 && !isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center flex flex-col items-center"
                >
                  <Search className="w-12 h-12 text-white/10 mb-4" />
                  <h3 className="text-xl font-display font-medium text-white/80 mb-2">No products found</h3>
                  <p className="text-white/40">Try adjusting your filters or search query.</p>
                  <button 
                    onClick={() => {
                      setActiveCategory("All Software");
                      setActivePrice("Any Price");
                      setActiveRating(null);
                      setSearchQuery("");
                    }}
                    className="mt-6 text-sm font-medium text-cyan hover:text-white transition-colors"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </div>
            
            {filteredProducts.length > 0 && (
              <div className="mt-12 text-center text-white/40 text-sm">
                End of results  
              </div>
            )}
          </div>
        </div>
        </motion.div>
        )}
        </AnimatePresence>
      </div>
    </section>
  );
}
