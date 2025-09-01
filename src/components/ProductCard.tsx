import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { motion, MotionConfig } from "framer-motion";
import { Star, ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/features/cart/CartContext";
import { useState } from "react";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  title: string;
  brand: string;
  rating?: { value: number; count: number };
  price: number;
  mrp?: number;
  discountPct?: number;
  specs?: string[];
  imageUrl: string;
  inStock?: boolean;
  className?: string;
}


export function ProductCard({
  id,
  title,
  brand,
  rating,
  price,
  mrp,
  discountPct,
  specs = [],
  imageUrl,
  inStock = true,
  className,
  ...props
}: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  
  const hasDiscount = discountPct !== undefined && discountPct > 0;
  const showMrp = mrp !== undefined && mrp > price;
  const formattedPrice = price.toLocaleString('en-IN');
  const formattedMrp = mrp?.toLocaleString('en-IN');
  const itemInCart = isInCart(id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!inStock) return;
    
    setIsAdding(true);
    
    // Create product object without quantity
    // Add item to cart (quantity will be added by the context)
    addToCart({
      id,
      title,
      price,
      mrp: mrp || price,
      image: imageUrl,
      discountPct: discountPct || 0,
      brand,
      category: "",
      inStock
    });

    
    // Show feedback
    setIsAdded(true);
    toast.success('Added to cart', {
      description: `${title} has been added to your cart.`,
    });
    
    // Reset button state after animation
    setTimeout(() => {
      setIsAdding(false);
      setTimeout(() => setIsAdded(false), 1500);
    }, 1000);
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.article
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300",
          "hover:shadow-lg hover:-translate-y-0.5",
          !inStock && "opacity-80",
          className
        )}
        whileHover={{ y: -4 }}
        initial={false}
        {...props}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={imageUrl || '/placeholder-product.jpg'}
            alt={title}
            className="h-full w-full object-contain sm:object-cover transition-transform duration-300 group-hover:scale-105 p-2 sm:p-0"
            loading="lazy"
            width={400}
            height={300}
          />
          
          {/* Out of Stock Overlay */}
          {!inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <span className="rounded bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-900 backdrop-blur-sm">
                Out of Stock
              </span>
            </div>
          )}
          
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute right-3 top-3">
              <span className="inline-flex items-center rounded-full bg-[#FF7A00] px-2.5 py-1 text-xs font-semibold text-white">
                {discountPct}% OFF
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="flex flex-1 flex-col p-2 xs:p-3 sm:p-4">
          {/* Title */}
          <h3 
            className="mb-1 xs:mb-1.5 font-poppins text-xs xs:text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 h-8 xs:h-10 sm:h-12"
            title={title}
          >
            {title}
          </h3>
          
          {/* Brand & Rating */}
          <div className="mb-1 xs:mb-2 flex items-center justify-between">
            <span className="font-dm-sans text-xs xs:text-sm text-gray-600">{brand}</span>
            {rating && (
              <div className="inline-flex items-center gap-0.5">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="font-dm-sans text-xs font-medium text-gray-900">
                  {rating.value}
                  <span className="text-gray-400"> ({rating.count})</span>
                </span>
              </div>
            )}
          </div>
          
          {/* Specs */}
          {specs.length > 0 && (
            <p 
              className="mb-2 xs:mb-3 sm:mb-4 line-clamp-2 h-6 xs:h-8 sm:h-10 font-dm-sans text-xs sm:text-sm text-gray-600"
              title={specs.join(", ")}
            >
              {specs.join(", ")}
            </p>
          )}
          
          {/* Price Block */}
          <div className="mt-2 xs:mt-3 sm:mt-4 flex items-start justify-between">
            <div className="flex-1 pr-2">
              <p className="text-xs xs:text-sm text-gray-500 truncate">{brand}</p>
              <h3 className="mt-1 text-xs xs:text-sm font-medium text-gray-900 line-clamp-2 h-8 xs:h-10">
                {title}
              </h3>
              
              <div className="mt-1 xs:mt-2 sm:mt-3">
                <Button 
                  variant={itemInCart || isAdded ? "outline" : "default"}
                  size="sm" 
                  className="w-full text-xs sm:text-sm h-6 xs:h-8 sm:h-9 group-hover:opacity-100 transition-opacity duration-200"
                  onClick={handleAddToCart}
                  disabled={!inStock || isAdding || isAdded}
                >
                  {isAdding ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Adding...
                    </span>
                  ) : isAdded || itemInCart ? (
                    <span className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      {itemInCart ? 'In Cart' : 'Added'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      {inStock ? 'Add to Cart' : 'Out of Stock'}
                    </span>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="text-right">
              {showMrp && (
                <p className="text-xs text-gray-500 line-through">
                  ₹{formattedMrp}
                </p>
              )}
              <p className="font-medium text-gray-900 text-xs xs:text-sm sm:text-base">₹{formattedPrice}</p>
              {hasDiscount && (
                <span className="text-xs font-medium text-green-600">
                  {discountPct}% off
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    </MotionConfig>
  );
}

// Skeleton Loader for Product Card
export function ProductCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="aspect-[4/3] w-full bg-gray-100" />
      <div className="flex-1 p-4">
        <div className="mb-2 h-5 w-3/4 rounded bg-gray-100" />
        <div className="mb-4 h-4 w-1/2 rounded bg-gray-100" />
        <div className="mb-6 h-3 w-2/3 rounded bg-gray-100" />
        <div className="h-10 w-full rounded bg-gray-100" />
      </div>
    </div>
  );
}
