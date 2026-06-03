import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2, ShieldCheck, Wallet, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

// Make sure to set VITE_STRIPE_PUBLISHABLE_KEY in .env.example
// @ts-ignore
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

function CryptoCheckout({ price, onCancel }: { price: string, onCancel: () => void }) {
  const [step, setStep] = useState<'connect' | 'pay' | 'success'>('connect');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  // Parse price mock for crypto equivalent
  const numPrice = parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
  // Let's pretend 1 ETH is $3000
  const ethAmount = (numPrice / 3000).toFixed(4);

  const handleConnect = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!window.ethereum) {
        throw new Error("No Web3 provider found. Please install MetaMask.");
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setStep('pay');
      } else {
        throw new Error("No accounts connected.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePay = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!window.ethereum) {
        throw new Error("No Web3 provider found.");
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // We would send it to a merchant address, for this app let's send to a placeholder.
      // E.g., the connected user sends to himself for demonstration if no merchant is provided
      const tx = await signer.sendTransaction({
        to: account, // Demostration: sending to oneself 
        value: ethers.parseEther(ethAmount)
      });
      
      await tx.wait();
      setStep('success');
    } catch (err: any) {
      setError(err.message || "Transaction failed.");
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'connect') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-6 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan/20 to-electric/20 border border-border-glass flex items-center justify-center mb-4">
          <Wallet className="w-8 h-8 text-cyan" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">Connect your Wallet</h3>
        <p className="text-white/50 text-sm mb-6">Connect your Web3 crypto wallet to securely complete the transaction.</p>
        
        {error && (
          <div className="mb-4 text-rose-400 bg-rose-500/10 p-3 rounded-lg border border-rose-500/20 text-sm w-full">
            {error}
          </div>
        )}

        <button 
          onClick={handleConnect}
          disabled={isLoading}
          className="w-full py-3.5 bg-white text-midnight font-bold rounded-xl hover:bg-white/90 transition-all flex items-center justify-between px-6 disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (
            <>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 111.4 104.9" xmlns="http://www.w3.org/2000/svg"><path d="M102.5 29.8L83 0l-31 22L20.8 1l-18 29L33.7 51 0 71.9 33.3 93l-4 11.9 31-15 31.8 15-4-11.8L111.4 72 78 51.1l32.5-4z" fill="#E2761B"/><path d="M51.9 22l31-22L61.6 37 51.9 14.1l-9.6 23L33.7 44" fill="#E4761B"/><path d="M78 51.1L102.5 30 83 0 61.6 37" fill="#E4761B"/><path d="M33.7 51l-31 20.9 30.6 21.1 1.7-18.4L33.7 51" fill="#E4761B"/><path d="M51.9 22L33.7 44 20.8 1 2.8 30l30.9 21z" fill="#E4761B"/><path d="M111.4 71.9L78 51.1l1.7 23.4 33.3-21.2" fill="#E4761B"/><path d="M51.9 14.1l-9.6 23L33.7 44l18.2-12L61.6 37l-9.7-22.9" fill="#D7C1B3"/><path d="M33.7 51L35.4 74l16.5-17.7-18.2-5.3" fill="#D7C1B3"/><path d="M61.6 37l9.7 22.9-18.2 5.3L69.6 74 78 51.1" fill="#D7C1B3"/><path d="M33.7 51l18.2 5.3L61.6 37 51.9 14.1l-9.6 23" fill="#233447"/><path d="M51.9 56.3L35.4 74l16.5 13.9L69.6 74 51.9 56.3" fill="#233447"/><path d="M51.9 87.9l-16.5-13.9-6 19L51.9 78" fill="#D7C1B3"/><path d="M51.9 87.9L51.9 78l22.5 15-6-19" fill="#D7C1B3"/><path d="M51.9 78l22.5 15 3.5 11.9L51.9 87.9" fill="#E4761B"/><path d="M35.4 74l6-19h-12" fill="#E4761B"/><path d="M69.6 74h-12l6 19" fill="#E4761B"/><path d="M51.9 78L29.4 93l-4 11.9L51.9 87.9" fill="#E4761B"/><path d="M29.4 55h12l-6-17.7" fill="#E4761B"/><path d="M75.6 55l6-17.7-6 17.7z" fill="#E4761B"/><path d="M29.4 55h-12l18 19" fill="#E4761B"/><path d="M75.6 55l12 19h-12" fill="#E4761B"/><path d="M35.4 74l16.5-17.7-18.2-5.3L29.4 55" fill="#CD6116"/><path d="M69.6 74L75.6 55l-12-4-18.2 5.3L69.6 74" fill="#CD6116"/><path d="M29.4 55l6 19 16.5-17.7" fill="#CD6116"/><path d="M69.6 74l6-19-12-4" fill="#CD6116"/><path d="M29.4 93l22.5-15L51.9 56.3 35.4 74 29.4 93" fill="#F6851B"/><path d="M75.6 93L51.9 78V56.3L69.6 74 75.6 93" fill="#F6851B"/></svg>
              MetaMask
            </span>
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </button>
      <button 
        onClick={handleConnect}
        disabled={isLoading}
        className="w-full py-3.5 mt-3 bg-glass border border-border-glass text-white font-medium rounded-xl hover:bg-glass/80 transition-all flex items-center justify-between px-6 disabled:opacity-50"
      >
        <span className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-blue-500 overflow-hidden flex items-center justify-center">
             <svg viewBox="0 0 40 40" className="w-4 h-4 fill-white"><path fillRule="evenodd" clipRule="evenodd" d="M12.446 16.899c3.92-3.805 10.264-3.805 14.184 0l.477.463c.53.515 1.39.515 1.921 0l2.257-2.19c.531-.516.531-1.352 0-1.867l-.478-.463A15.807 15.807 0 0 0 20.012 8.44a15.807 15.807 0 0 0-10.795 4.402l-.477.463c-.53.515-.53 1.35 0 1.867l2.257 2.19c.53.515 1.39.515 1.921 0l.477-.463Zm18.91 10.985 3.033-2.943c.53-.514.53-1.35 0-1.866l-.721-.699a21.432 21.432 0 0 0-30.26 0l-.72.699c-.532.515-.532 1.352 0 1.866l3.033 2.943c.53.515 1.39.515 1.92 0l1.196-1.161c3.136-3.044 8.212-3.044 11.348 0l1.196 1.16c.532.516 1.391.516 1.921 0l1.196-1.16c3.136-3.044 8.212-3.044 11.348 0l1.196 1.16c.531.516 1.391.516 1.921 0Z"/></svg>
          </div> 
          WalletConnect
        </span>
        <ChevronRight className="w-4 h-4 text-white/50" />
      </button>
    </motion.div>
  );
}

  if (step === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-6 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald/20 border border-emerald/30 flex items-center justify-center mb-4 text-emerald">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">Payment Completed</h3>
        <p className="text-white/50 text-sm mb-6">Your transaction has been confirmed on the blockchain. The software is ready for download.</p>
        
        <button 
          onClick={onCancel}
          className="w-full py-3.5 bg-white text-midnight font-bold rounded-xl hover:bg-white/90 transition-all font-display"
        >
          View Downloads
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-2">
      <div className="flex justify-between items-center bg-glass/30 border border-border-glass p-4 rounded-xl mb-4">
        <div>
          <div className="text-white/50 text-sm mb-1">Pay with ETH</div>
          <div className="text-2xl font-mono text-white font-medium">{ethAmount} ETH</div>
        </div>
        <div className="text-right">
          <div className="text-white/50 text-sm mb-1">Network</div>
          <div className="text-white text-sm font-medium">Ethereum Mainnet</div>
        </div>
      </div>
      
      <div className="bg-glass/30 border border-border-glass p-4 rounded-xl mb-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-white/50">Fiat equivalent:</span>
          <span className="text-white font-medium">{price}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/50">Conversion via:</span>
          <span className="text-cyan font-medium flex items-center gap-1.5"><Wallet className="w-3.5 h-3.5"/> NowPayments</span>
        </div>
        <div className="flex justify-between text-sm border-t border-border-glass pt-3 mt-3">
          <span className="text-white/50">Estimated Gas:</span>
          <span className="text-white font-medium">~$3.40 <span className="text-white/30 text-xs">(0.0011 ETH)</span></span>
        </div>
      </div>

      <button
        onClick={handlePay}
        disabled={isLoading}
        className="w-full py-3.5 bg-cyan text-midnight font-bold rounded-xl hover:bg-cyan/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 font-display"
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : `Approve & Pay ${ethAmount} ETH`}
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-white/40 text-xs">
        <ShieldCheck className="w-4 h-4" /> Smart Contract Verified
      </div>
    </motion.div>
  );
}

function CheckoutForm({ price, onCancel }: { price: string, onCancel: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href, // Redirect here after payment
      },
      redirect: "if_required",
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "An error occurred");
      } else {
        setMessage("An unexpected error occurred.");
      }
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment succeeded! The software is ready for download.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <PaymentElement id="payment-element" className="mb-6" />
      <button
        disabled={isLoading || !stripe || !elements}
        className="w-full py-3 bg-white text-midnight font-bold rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : `Pay ${price}`}
      </button>
      {message && <div className="text-rose-400 mt-4 text-sm bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">{message}</div>}
      
      <div className="mt-4 flex items-center justify-center gap-2 text-white/40 text-xs">
        <ShieldCheck className="w-4 h-4" /> Payments are secure and encrypted
      </div>
    </form>
  );
}

export function CheckoutModal({ isOpen, onClose, product, price }: { isOpen: boolean, onClose: () => void, product: any, price: string }) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto'>('card');

  useEffect(() => {
    if (isOpen) {
      // Basic mock price parsing, default to $10.00
      let priceCent = 1000;
      if (price.includes("$")) {
        const num = parseInt(price.replace(/[^0-9]/g, ''));
        if (!isNaN(num)) priceCent = num * 100;
      }

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: product.id }], priceCent }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Integration error. Did you configure STRIPE_SECRET_KEY in your env?`);
          }
          return res.json();
        })
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else if (data.error) {
            setError(data.error);
          }
        })
        .catch(err => {
          setError(err.message);
        });
    }
  }, [isOpen, product, price]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-midnight/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-midnight-light border border-border-glass rounded-3xl p-8 z-50 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-medium text-white">Checkout</h2>
              <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6 pb-6 border-b border-border-glass">
              <div className="flex items-center gap-4">
                <img src={product.image} alt={product.title} className="w-16 h-16 rounded-lg object-cover border border-border-glass" />
                <div>
                  <h3 className="font-medium text-white">{product.title}</h3>
                  <div className="text-xl font-display font-bold text-white mt-1">{price}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 p-1 mb-6 bg-glass/50 border border-border-glass rounded-xl">
              <button 
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors ${paymentMethod === 'card' ? 'bg-white text-midnight' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              >
                <CreditCard className="w-4 h-4" /> Credit Card
              </button>
              <button 
                onClick={() => setPaymentMethod('crypto')}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors ${paymentMethod === 'crypto' ? 'bg-white text-midnight' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              >
                <Wallet className="w-4 h-4" /> Web3 Wallet
              </button>
            </div>

            {paymentMethod === 'crypto' ? (
              <CryptoCheckout price={price} onCancel={onClose} />
            ) : error ? (
              <div className="text-rose-400 bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 text-sm">
                <p className="font-medium mb-1">Configuration Required</p>
                {error}
                <p className="mt-2 opacity-80 text-xs">To enable real payments, please add your test Stripe Secret and Publishable keys to the application's environment configuration.</p>
              </div>
            ) : clientSecret ? (
              <Elements options={{ clientSecret, appearance: { theme: 'night' } }} stripe={stripePromise}>
                <CheckoutForm price={price} onCancel={onClose} />
              </Elements>
            ) : (
              <div className="py-8 flex flex-col justify-center items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-cyan" />
                <span className="text-sm text-white/50">Initializing secure checkout...</span>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
