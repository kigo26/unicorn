import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, Menu, X, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, User, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      await signInWithPopup(auth, provider);
      onClose();
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      alert('Error signing in: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-midnight/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-md bg-midnight border border-border-glass rounded-2xl shadow-2xl overflow-hidden p-8 text-center"
          >
            <div className="absolute top-4 right-4">
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors bg-glass rounded-full p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <h2 className="text-2xl font-display font-bold text-white mb-2 tracking-tight">Welcome back</h2>
            <p className="text-white/50 text-sm mb-8">
              Sign in to save your favorite products and view your downloads.
            </p>

            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full bg-white text-midnight py-4 rounded-xl font-semibold hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-sm border border-transparent"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Navigation({ user }: { user?: User | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-midnight/70 backdrop-blur-xl border-border-glass py-4" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-electric to-cyan flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white">SoftVerse</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center justify-center gap-8">
          <a href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Web2</a>
          <a href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Web3</a>
          <a href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Pricing</a>
          <a href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Resources</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center justify-end gap-5">
          <button className="text-white/70 hover:text-white transition-colors hidden sm:block">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-white/70 hover:text-white transition-colors hidden sm:block">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <div className="h-4 w-px bg-white/20 hidden sm:block" />
          
          {user ? (
            <div className="hidden sm:flex items-center gap-4">
              <span className="text-sm font-medium text-white/90">{user.email}</span>
              <button 
                onClick={() => signOut(auth)}
                className="text-sm font-medium text-white/50 hover:text-white transition-colors"
                title="Sign out"
              >
                Sign out
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={() => setShowLogin(true)}
                className="hidden sm:block text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Log in
              </button>
              <button className="hidden sm:flex items-center justify-center px-4 py-2 text-sm font-medium bg-white text-midnight rounded-full hover:bg-white/90 transition-colors">
                Get Started
              </button>
            </>
          )}

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white/70 hover:text-white p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-midnight-light border-b border-border-glass overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <a href="#" className="text-lg font-medium text-white">Web2 Software</a>
              <a href="#" className="text-lg font-medium text-white">Web3 Software</a>
              <a href="#" className="text-lg font-medium text-white">Enterprise Apps</a>
              <a href="#" className="text-lg font-medium text-white">Pricing</a>
              
              <div className="h-px bg-white/10 my-2" />
              
              {user ? (
                <div className="flex flex-col gap-4">
                  <span className="text-sm text-white/50">{user.email}</span>
                  <button 
                    onClick={() => {
                      signOut(auth);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left py-3 text-white font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => {
                      setShowLogin(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left py-3 text-white font-medium"
                  >
                    Log In
                  </button>
                  <button className="w-full bg-white text-midnight py-4 rounded-xl font-bold">
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </motion.header>
  );
}
