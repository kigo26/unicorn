import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Star, ShieldCheck, Download, Code, FileText, CheckCircle2, User, Clock, Bell, X, Loader2, ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { CheckoutModal } from './CheckoutModal';
import { VendorModal } from './VendorModal';
import { FAQ } from './FAQ';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, query, where, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firebase-error';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
}

export function ProductDetails({ product, onBack }: { product: any, onBack: () => void, key?: React.Key }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [newReviewContent, setNewReviewContent] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  // Price alert state
  const [showPriceAlert, setShowPriceAlert] = useState(false);
  const [priceAlertEmail, setPriceAlertEmail] = useState('');
  const [isSubmittingAlert, setIsSubmittingAlert] = useState(false);
  const [priceAlertSuccess, setPriceAlertSuccess] = useState(false);

  // Vendor modal state
  const [showVendorModal, setShowVendorModal] = useState(false);

  // Gallery carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const gallery = product.gallery || [
    product.image,
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1639762681485-074b7f4fc5e6?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
  ].filter((img, i, arr) => arr.indexOf(img) === i); // avoid duplicates if product.image is one of the mocks

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  useEffect(() => {
    setIsLoadingReviews(true);
    const q = query(
      collection(db, 'reviews'), 
      where('productId', '==', product.id),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedReviews: Review[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedReviews.push({
          id: doc.id,
          author: data.authorName || 'Anonymous',
          rating: data.rating,
          date: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
          content: data.content
        });
      });
      setReviewsList(fetchedReviews);
      setIsLoadingReviews(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'reviews');
      setIsLoadingReviews(false);
    });

    return () => unsubscribe();
  }, [product.id]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewContent.trim()) return;
    
    setIsSubmittingReview(true);
    try {
      const currentUser = auth.currentUser;
      const authorName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Anonymous';
      
      await addDoc(collection(db, 'reviews'), {
        productId: product.id,
        authorId: currentUser?.uid || 'anonymous',
        authorName,
        rating: newReviewRating,
        content: newReviewContent,
        createdAt: serverTimestamp()
      });

      setNewReviewContent('');
      setNewReviewRating(5);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'reviews');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Mock data for the product details
  const features = [
    "Enterprise-grade security",
    "SOC2 Compliance ready",
    "Comprehensive API documentation",
    "Priority 24/7 technical support",
    "Unlimited seats and projects",
    "Custom branding options"
  ];

  const techStack = [
    { name: "React", icon: <Code className="w-4 h-4" /> },
    { name: "Node.js", icon: <Code className="w-4 h-4" /> },
    { name: "PostgreSQL", icon: <Code className="w-4 h-4" /> },
    { name: "Redis", icon: <Code className="w-4 h-4" /> }
  ];

  const screenshots = [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1639762681485-074b7f4fc5e6?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
  ];

  const similarProducts = [
    { id: 101, title: "Cloud ERP", price: "$2,500", rating: 4.8, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400" },
    { id: 102, title: "Admin Panel", price: "$150", rating: 4.9, image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400" },
    { id: 103, title: "Secure Vault", price: "$899", rating: 4.7, image: "https://images.unsplash.com/photo-1639762681485-074b7f4fc5e6?auto=format&fit=crop&w=400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="py-6"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to marketplace
      </button>

      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12 border border-border-glass group bg-midnight">
        <div className="absolute inset-0 bg-midnight/40 z-10 pointer-events-none" />
        
        <AnimatePresence initial={false} mode="wait">
          <motion.img 
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            src={gallery[currentImageIndex]} 
            alt={`${product.title} - Image ${currentImageIndex + 1}`} 
            className="absolute inset-0 w-full h-full object-cover" 
          />
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="absolute inset-0 z-30 flex items-center justify-between p-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="pointer-events-auto p-3 rounded-full bg-midnight/60 backdrop-blur-md border border-border-glass text-white hover:bg-glass hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="pointer-events-auto p-3 rounded-full bg-midnight/60 backdrop-blur-md border border-border-glass text-white hover:bg-glass hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute top-6 right-8 z-30 flex gap-2">
          {gallery.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              aria-label={`Go to image ${idx + 1}`}
              className={cn(
                "h-2 rounded-full transition-all focus:outline-none",
                idx === currentImageIndex ? "bg-white w-8" : "bg-white/30 hover:bg-white/60 w-2"
              )}
            />
          ))}
        </div>

        <div className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-end bg-gradient-to-t from-midnight via-midnight/80 to-transparent pointer-events-none">
          <div className="flex flex-wrap items-center gap-3 mb-4 pointer-events-auto">
            <span className="px-3 py-1 rounded-full bg-glass border border-border-glass text-xs font-mono tracking-wider backdrop-blur-md">
              {product.category}
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-glass border border-border-glass rounded-full backdrop-blur-md">
              <Star className="w-3.5 h-3.5 text-amber fill-amber" />
              <span className="text-sm font-medium">{product.rating} ({product.reviews} reviews)</span>
            </div>
            <div 
              className="flex items-center gap-1.5 px-3 py-1 bg-glass border border-border-glass rounded-full backdrop-blur-md pointer-events-auto cursor-pointer hover:bg-glass/80 transition-colors group/vendor"
              onClick={() => setShowVendorModal(true)}
            >
              <ShieldCheck className="w-4 h-4 text-emerald" />
              <span className="text-sm group-hover/vendor:text-cyan transition-colors">Verified Vendor: {product.vendor}</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-4 pointer-events-auto">
            {product.title}
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-2xl pointer-events-auto">
            A premium, scalable solution ready to be deployed instantly. Enhance your infrastructure with enterprise-grade reliability.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12 order-2 lg:order-1">
          
          <section>
            <h2 className="text-2xl font-display font-bold mb-6">Overview</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              {product.title} provides a complete end-to-end framework for modern businesses. Built with performance and scale in mind, it allows you to bypass months of development time and launch immediately.
            </p>
            <p className="text-white/70 leading-relaxed">
              Every line of code has been audited for security and optimized for speed. Included are comprehensive documentation, deployment scripts, and architectural diagrams to ensure your team can take ownership instantly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-glass border border-border-glass leading-snug">
                  <CheckCircle2 className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-6">Technology Stack</h2>
            <div className="flex flex-wrap gap-4">
               {techStack.map((tech, i) => (
                 <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-glass border border-border-glass">
                   {tech.icon}
                   <span className="font-medium">{tech.name}</span>
                 </div>
               ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-6">Screenshots</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {screenshots.map((src, i) => (
                <div key={i} className="aspect-video rounded-xl overflow-hidden border border-border-glass bg-midnight group cursor-zoom-in">
                  <img src={src} alt="Screenshot" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-6">Demo Video</h2>
            <div className="aspect-video rounded-3xl overflow-hidden border border-border-glass bg-midnight-light relative group">
              <div className="absolute inset-0 flex items-center justify-center bg-midnight/40 group-hover:bg-midnight/20 transition-colors pointer-events-none">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                </div>
              </div>
              <img 
                src={product.image} 
                alt="Video thumbnail" 
                className="w-full h-full object-cover"
              />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-6">Documentation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="#" className="flex items-center justify-between p-5 rounded-2xl bg-glass border border-border-glass hover:bg-glass/80 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-cyan/10 border border-cyan/20">
                    <FileText className="w-6 h-6 text-cyan" />
                  </div>
                  <div>
                    <div className="font-bold">Installation Guide</div>
                    <div className="text-sm text-white/50">Setup in under 5 minutes</div>
                  </div>
                </div>
                <ArrowDown className="w-5 h-5 text-white/30 group-hover:text-cyan transition-colors" />
              </a>
              <a href="#" className="flex items-center justify-between p-5 rounded-2xl bg-glass border border-border-glass hover:bg-glass/80 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <Code className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="font-bold">API Reference</div>
                    <div className="text-sm text-white/50">Full developer guidelines</div>
                  </div>
                </div>
                <ArrowDown className="w-5 h-5 text-white/30 group-hover:text-cyan transition-colors" />
              </a>
            </div>
          </section>

          <FAQ />

          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold">Reviews</h2>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={cn("w-5 h-5", star <= Math.round(product.rating) ? "text-amber fill-amber" : "text-white/20 fill-white/20")} />
                  ))}
                </div>
                <span className="font-medium text-white/70">{product.rating} general rating</span>
              </div>
            </div>

            {/* Write a Review Form */}
            <div className="p-6 rounded-2xl bg-midnight-light border border-border-glass mb-10">
              <h3 className="text-lg font-medium mb-4">Write a Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        className="hover:scale-110 transition-transform focus:outline-none"
                      >
                        <Star className={cn("w-6 h-6", star <= newReviewRating ? "text-amber fill-amber" : "text-white/20 fill-white/20")} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="review-content" className="block text-sm font-medium text-white/70 mb-2">Message</label>
                  <textarea
                    id="review-content"
                    rows={4}
                    value={newReviewContent}
                    onChange={(e) => setNewReviewContent(e.target.value)}
                    placeholder="What did you think of this product?"
                    className="w-full bg-glass/50 border border-border-glass rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-cyan/50 focus:bg-glass transition-colors resize-none"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmittingReview || !newReviewContent.trim()}
                    className="px-6 py-2.5 bg-white text-midnight font-semibold rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmittingReview ? (
                      <>
                        <div className="w-4 h-4 border-2 border-midnight border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : 'Submit Review'}
                  </button>
                </div>
              </form>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              <AnimatePresence>
                {reviewsList.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl bg-glass border border-border-glass"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric/20 to-cyan/20 border border-border-glass flex items-center justify-center">
                          <User className="w-5 h-5 text-cyan" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{review.author}</div>
                          <div className="flex items-center gap-1.5 text-xs text-white/50 mt-0.5">
                            <Clock className="w-3 h-3" />
                            {new Date(review.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={cn("w-4 h-4", star <= review.rating ? "text-amber fill-amber" : "text-white/20 fill-white/20")} />
                        ))}
                      </div>
                    </div>
                    <p className="text-white/80 leading-relaxed text-sm md:text-base">
                      {review.content}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-8">Similar Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProducts.map((p) => (
                <div key={p.id} className="group rounded-2xl border border-border-glass bg-glass/40 overflow-hidden hover:border-cyan/30 transition-all cursor-pointer">
                  <div className="h-32 overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold truncate pr-2">{p.title}</h4>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star className="w-3 h-3 text-amber fill-amber" />
                        <span className="text-[10px] text-white/70">{p.rating}</span>
                      </div>
                    </div>
                    <div className="text-xs text-white/50">{p.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar / Checkout */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <div className="sticky top-32 p-8 rounded-3xl bg-midnight-light border border-border-glass shadow-2xl">
            <h3 className="text-lg font-medium text-white/50 mb-2">Commercial License</h3>
            <div className="text-4xl font-display font-bold mb-6">{product.price}</div>
            
            <button 
              onClick={() => setShowCheckout(true)}
              className="w-full py-4 bg-white text-midnight font-bold rounded-xl mb-4 hover:bg-white/90 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" /> Buy and Download
            </button>
            <button className="w-full py-4 bg-glass border border-border-glass text-white font-medium rounded-xl hover:bg-glass/80 transition-all mb-4">
              Live Preview
            </button>
            <button 
              onClick={() => setShowPriceAlert(true)}
              className="w-full py-4 bg-glass border border-border-glass text-white/80 font-medium rounded-xl hover:bg-glass/80 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Bell className="w-4 h-4" /> Set Price Alert
            </button>

            <div className="mt-8 space-y-4 pt-8 border-t border-border-glass">
              <a href="#" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                <FileText className="w-5 h-5" /> Technical Documentation
              </a>
              <a href="#" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                <ShieldCheck className="w-5 h-5" /> Security Audit Report
              </a>
            </div>
          </div>
        </div>

      </div>

      <CheckoutModal 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
        product={product} 
        price={product.price} 
      />

      <VendorModal
        isOpen={showVendorModal}
        onClose={() => setShowVendorModal(false)}
        vendorName={product.vendor}
      />

      {/* Price Alert Modal */}
      <AnimatePresence>
        {showPriceAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-midnight/80 backdrop-blur-sm"
              onClick={() => !isSubmittingAlert && setShowPriceAlert(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-midnight-light border border-border-glass rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setShowPriceAlert(false)}
                disabled={isSubmittingAlert}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors disabled:opacity-50"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan/20 to-electric/20 border border-border-glass flex items-center justify-center mb-6">
                <Bell className="w-8 h-8 text-cyan" />
              </div>

              <h2 className="text-2xl font-display font-bold mb-2">Price Drop Alert</h2>
              
              {priceAlertSuccess ? (
                <div className="py-4">
                  <div className="flex items-center gap-3 text-emerald mb-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-medium">Alert Set Successfully!</span>
                  </div>
                  <p className="text-white/60 text-sm mb-6">We'll email you at {priceAlertEmail} when {product.name} gets a discount.</p>
                  <button 
                    onClick={() => {
                      setShowPriceAlert(false);
                      setTimeout(() => setPriceAlertSuccess(false), 500);
                    }}
                    className="w-full py-3.5 bg-white text-midnight font-bold rounded-xl hover:bg-white/90 transition-all"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!priceAlertEmail) return;
                  setIsSubmittingAlert(true);
                  // Simulate API
                  setTimeout(() => {
                    setIsSubmittingAlert(false);
                    setPriceAlertSuccess(true);
                  }, 1000);
                }}>
                  <p className="text-white/60 text-sm mb-6">Receive an email notification as soon as the price for {product.name} drops.</p>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      value={priceAlertEmail}
                      onChange={(e) => setPriceAlertEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full bg-glass border border-border-glass rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-cyan/50"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmittingAlert || !priceAlertEmail}
                    className="w-full py-4 bg-cyan text-midnight font-bold rounded-xl hover:bg-cyan/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmittingAlert ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Set Alert'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
