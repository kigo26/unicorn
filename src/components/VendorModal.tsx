import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Mail, Globe, MapPin, Building2, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

interface VendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendorName: string;
}

export function VendorModal({ isOpen, onClose, vendorName }: VendorModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-midnight/80 backdrop-blur-sm cursor-auto"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-lg bg-midnight-light border border-border-glass rounded-3xl p-8 shadow-2xl overflow-hidden cursor-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-start gap-5 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald/20 to-cyan/20 border border-border-glass flex items-center justify-center shrink-0">
                <Building2 className="w-8 h-8 text-emerald" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-display font-bold">{vendorName}</h2>
                  <ShieldCheck className="w-5 h-5 text-emerald" />
                </div>
                <p className="text-white/60 text-sm">Verified Enterprise Partner</p>
                <div className="flex gap-2 mt-3">
                  <span className="px-2 py-0.5 rounded-md bg-white/5 border border-border-glass text-xs font-mono text-white/70">
                    Trusted
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald/10 border border-emerald/20 text-xs font-mono text-emerald/90">
                    Top Rated
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-white/70">
                <Globe className="w-4 h-4" />
                <a href="#" className="hover:text-cyan transition-colors text-sm">https://{vendorName.toLowerCase().replace(/\s+/g, '')}.io</a>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="w-4 h-4" />
                <a href="#" className="hover:text-cyan transition-colors text-sm">support@{vendorName.toLowerCase().replace(/\s+/g, '')}.io</a>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>

            <div className="bg-glass/30 border border-border-glass rounded-xl p-5 mb-8">
              <h3 className="font-semibold mb-2">About {vendorName}</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {vendorName} is a leading provider of enterprise-grade software solutions, specializing in secure and scalable infrastructure for modern applications. All products have passed our rigorous security and quality audits.
              </p>
            </div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="w-full py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              Close Profile
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
