import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, Phone, MapPin, Clock, Home, ArrowLeft } from 'lucide-react';
import { CartDropdown } from '@/features/cart/components/CartDropdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/shop', label: 'Shop' },
    { href: '/service', label: 'Service' },
    { href: '/brands', label: 'Brands' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];
  
  const showBackButton = pathname !== '/';

  return (
    <>
      {/* Top bar */}
      <div className="bg-secondary text-white py-3 text-sm">
        <div className="container-main px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-full">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:underline transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="whitespace-nowrap">Kanniyakumari, Tamil Nadu</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="whitespace-nowrap">Mon-Sat: 9AM-8PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container-main">
          <div className="flex items-center justify-between h-12 xs:h-14 sm:h-16 md:h-18 lg:h-20">
            
            {/* Back Button & Logo */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 min-w-0 flex-1">
              {showBackButton && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => navigate(-1)}
                  className="text-secondary hover:text-primary flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              )}
              <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
                <img 
                  src="/logo.png" 
                  alt="Kavita Cooler Logo" 
                  className="h-5 w-5 xs:h-6 xs:w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-auto object-contain flex-shrink-0"
                />
                <div className="hidden sm:block min-w-0">
                  <h1 className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-secondary truncate">Kavita Cooler</h1>
                  <p className="text-xs xs:text-xs sm:text-sm text-muted-foreground truncate">Authorized Dealers & Service</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-1.5 text-secondary font-medium hover:text-primary transition-colors duration-200',
                      isActive && 'text-primary font-semibold'
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>

            {/* Search & Actions */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-4 flex-shrink-0">
              
              {/* Search */}
              <div className="hidden md:flex items-center gap-2">
                {isSearchOpen ? (
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search products..."
                        className="w-48 lg:w-64 pr-10"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const searchTerm = (e.target as HTMLInputElement).value;
                            if (searchTerm.trim()) {
                              window.location.href = `/shop?q=${encodeURIComponent(searchTerm)}`;
                            }
                          }
                        }}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setIsSearchOpen(false)}
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={() => setIsSearchOpen(true)}
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Cart Dropdown */}
              <div className="relative">
                <CartDropdown />
              </div>

              {/* Book Service Button */}
              <div className="hidden xl:block">
                <Button asChild size="sm" className="whitespace-nowrap">
                  <Link to="/service">Book Service</Link>
                </Button>
              </div>

              {/* Mobile menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="ghost" className="lg:hidden h-8 w-8 sm:h-10 sm:w-10">
                    <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] max-w-sm">
                  <div className="flex flex-col gap-6 mt-8">
                    
                    {/* Mobile Search */}
                    <div className="flex items-center gap-2">
                      <Input 
                        placeholder="Search products..." 
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const searchTerm = (e.target as HTMLInputElement).value;
                            if (searchTerm.trim()) {
                              window.location.href = `/shop?q=${encodeURIComponent(searchTerm)}`;
                            }
                          }
                        }}
                      />
                      <Button 
                        size="icon"
                        onClick={(e) => {
                          const input = e.currentTarget.parentElement?.querySelector('input');
                          const searchTerm = input?.value;
                          if (searchTerm?.trim()) {
                            window.location.href = `/shop?q=${encodeURIComponent(searchTerm)}`;
                          }
                        }}
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="flex flex-col gap-2">
                      {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                          <NavLink
                            key={item.href}
                            to={item.href}
                            className={cn(
                              'flex items-center gap-3 text-lg font-medium py-3 px-3 rounded-lg transition-colors duration-200',
                              isActive 
                                ? 'bg-primary/10 text-primary font-semibold'
                                : 'text-secondary hover:bg-accent/50'
                            )}
                          >
                            {Icon && <Icon className="h-5 w-5" />}
                            {item.label}
                          </NavLink>
                        );
                      })}
                    </nav>

                    {/* Contact Info */}
                    <div className="border-t pt-6 space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <span className="font-medium">+91 98765 43210</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="text-sm">Kanniyakumari, Tamil Nadu</span>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;