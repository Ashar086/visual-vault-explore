import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  User as FirebaseUser,
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { toast } from '@/components/ui/sonner';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC17nDFc_wh29SNZuzJliMyU72qhPRRvJA",
  authDomain: "visual-vault-719e5.firebaseapp.com",
  projectId: "visual-vault-719e5",
  storageBucket: "visual-vault-719e5.appspot.com",
  messagingSenderId: "827580227082",
  appId: "1:827580227082:web:3ef7f8a2308f0741fe5819"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Add additional scopes if needed
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');

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

  // Check for redirect result on initial load
  useEffect(() => {
    const checkRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          setUser(result.user);
          toast.success(`Welcome, ${result.user.displayName || 'User'}!`);
        }
      } catch (error) {
        console.error('Error with redirect result:', error);
        toast.error('Authentication failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    checkRedirect();

    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // For popup sign-in method
  const signIn = async (): Promise<void> => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      toast.success(`Welcome, ${result.user.displayName || 'User'}!`);
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Failed to sign in with Google. Please try again.');
    } finally {
      setLoading(false);
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
