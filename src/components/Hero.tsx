import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Wrench, Star, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-appliances.jpg';

const Hero = () => {
  return (
    <section className="bg-gray-50 section-spacing">
      <div className="container-main">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Content */}
          <div className="md:col-span-6 space-y-6">
            
            {/* Badge */}
            <Badge className="bg-gray-800 text-white font-medium px-4 py-2 rounded-full border-0 hover:bg-gray-800">
              <Star className="h-4 w-4 mr-2 text-green-400" />
              Authorized Dealers & Service Providers
            </Badge>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                Premium Home Appliances
                <span className="block text-blue-600">Sales & Service</span>
              </h1>
              <p className="text-gray-600 text-lg max-w-lg leading-relaxed">
                Your trusted partner for quality appliances from top brands. Expert sales consultation and professional service support for all your home needs.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-700">Genuine Products</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-700">Expert Service</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-700">Doorstep Support</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold group"
              >
                <Link to="/shop">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Shop Appliances
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold group"
              >
                <Link to="/services">
                  <Wrench className="h-5 w-5 mr-2" />
                  Book Service
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">5000+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">6+</div>
                <div className="text-sm text-gray-600">Premium Brands</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600">Service Support</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="md:col-span-6">
            <div className="relative">
              <img
                src={heroImage}
                alt="Modern home appliances including refrigerator, washing machine, AC, and TV"
                className="w-full h-auto rounded-2xl shadow-brand"
              />
              
              {/* Floating offer badge */}
              <div className="absolute top-6 right-6 bg-accent text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                <span className="text-sm">Up to 30% OFF</span>
              </div>
              
              {/* Service badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Same Day Service Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;