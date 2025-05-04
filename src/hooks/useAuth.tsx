
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged,
  User as FirebaseUser,
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { toast } from '@/components/ui/sonner';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1w1V-s7kySWWQJSyLdMK9cY9IEJL-HGs",
  authDomain: "artvibe-app.firebaseapp.com",
  projectId: "artvibe-app",
  storageBucket: "artvibe-app.appspot.com",
  messagingSenderId: "208475903024",
  appId: "1:208475903024:web:6eaa9e91249d5ddc3ae6f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Type definitions
type AuthContextType = {
  user: FirebaseUser | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast.success(`Welcome, ${result.user.displayName || 'User'}!`);
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Failed to sign in with Google. Please try again.');
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await firebaseSignOut(auth);
      toast.info('You have signed out successfully.');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
