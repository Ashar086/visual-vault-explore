
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-md border-b py-4">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold">Art Vibe</Link>
              <span className="ml-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full">
                Explore
              </span>
            </div>
            
            <button 
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <div className={`md:flex md:items-center ${mobileMenuOpen ? 'flex flex-col gap-4 py-4' : 'hidden md:block'}`}>
            <nav className="flex flex-col md:flex-row md:items-center md:mr-6 space-y-2 md:space-y-0 md:space-x-4 text-center">
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
            
            {location.pathname === '/' && (
              <form onSubmit={handleSubmit} className="flex-1 max-w-md w-full">
                <div className="relative flex items-center">
                  <Input
                    type="search"
                    placeholder="Search for images..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-12 focus-visible:ring-blue-500"
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
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
