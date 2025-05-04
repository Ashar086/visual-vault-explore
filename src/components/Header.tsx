
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signIn, signOut } = useAuth();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container max-w-7xl mx-auto px-4">
        {/* First row: Logo and Navigation */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">Art Vibe</Link>
            <span className="ml-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full">
              Explore
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-4">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
              >
                Gallery
              </Link>
              <Link 
                to="/about" 
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/about' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/contact' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
              >
                Contact
              </Link>
            </nav>

            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || 'User'} 
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <User size={18} className="text-blue-500" />
                    )}
                  </div>
                  <span className="text-sm font-medium hidden lg:block">{user.displayName || 'User'}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button 
                onClick={handleGoogleSignIn}
                className="flex items-center gap-2 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              >
                <img src="/google-icon.svg" alt="Google" className="w-4 h-4" />
                <LogIn size={16} />
                <span>Sign In</span>
              </Button>
            )}
          </div>
          
          <button 
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Second row: Search bar */}
        {location.pathname === '/' && (
          <div className="py-3 border-t border-gray-100 dark:border-gray-800">
            <form onSubmit={handleSubmit}>
              <div className="relative flex items-center">
                <Input
                  type="search"
                  placeholder="Search for images..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-12 focus-visible:ring-blue-500 w-full"
                />
                <Button 
                  type="submit" 
                  size="sm"
                  className="absolute right-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                to="/about" 
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/about' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/contact' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
            
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || 'User'} 
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <User size={18} className="text-blue-500" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{user.displayName || 'User'}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button 
                onClick={handleGoogleSignIn}
                className="flex items-center gap-2 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 w-full"
              >
                <img src="/google-icon.svg" alt="Google" className="w-4 h-4" />
                <LogIn size={16} />
                <span>Sign In with Google</span>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
