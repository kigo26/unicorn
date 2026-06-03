import { motion } from 'motion/react';
import { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setEmail('');
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="col-span-2 md:col-span-4 lg:col-span-4 lg:col-start-9">
      <h4 className="font-semibold text-white mb-2">Subscribe to our newsletter</h4>
      <p className="text-sm text-white/50 mb-6 max-w-sm">
        Get the latest updates on new software, marketplace trends, and exclusive offers.
      </p>
      <form onSubmit={handleSubmit} className="relative w-full max-w-sm">
        <div className="relative group">
          <input
            type="email"
            id="newsletter-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full bg-midnight border border-border-glass rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:border-cyan/50 focus:bg-glass transition-all placeholder-transparent"
            placeholder="name@example.com"
            required
            disabled={isLoading || isSuccess}
          />
          <label
            htmlFor="newsletter-email"
            className={`absolute left-4 transition-all duration-200 pointer-events-none text-white/40 ${
              email ? 'top-1.5 text-[11px] font-medium text-white/70' : 'top-3.5 text-sm peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-white/70'
            }`}
          >
            Email address
          </label>
        </div>
        <button
          type="submit"
          disabled={isLoading || isSuccess || !email}
          className="absolute right-1.5 top-1.5 bottom-1.5 bg-white text-midnight px-4 rounded-lg font-semibold text-sm hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[110px]"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isSuccess ? (
            <CheckCircle2 className="w-4 h-4 text-emerald" />
          ) : (
            <>
              Subscribe <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border-glass bg-midnight-light pt-24 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-y-12 gap-x-8 mb-20">
          
          <div className="col-span-2 md:col-span-4 lg:col-span-3">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-electric to-cyan flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">SoftVerse</span>
            </div>
            <p className="text-white/50 text-sm max-w-xs mb-8">
              The world's premium marketplace for Web2 and Web3 software. Buy, deploy, and scale with confidence.
            </p>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-white mb-6">Marketplace</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">Web2 Software</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Web3 Software</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Enterprise Apps</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI Agents</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-white mb-6">Vendors</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">Sell Software</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Verification</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-white mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-white mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
            </ul>
          </div>

          <NewsletterSignup />

        </div>

        <div className="pt-8 border-t border-border-glass flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© 2026 SoftVerse Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
