import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './lib/firebase';
import { Navigation } from './components/Navigation';
import { SocialProof } from './components/SocialProof';
import { FeaturedCollections } from './components/FeaturedCollections';
import { MarketplaceBrowser } from './components/MarketplaceBrowser';
import { Footer } from './components/Footer';

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Subscribe to auth state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    
    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-midnight font-sans text-white antialiased selection:bg-electric/30">
      <Navigation user={user} />
      <SocialProof />
      <FeaturedCollections />
      <MarketplaceBrowser />
      <Footer />
    </main>
  );
}
