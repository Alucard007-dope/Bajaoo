import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingCart, User, Heart, Menu, 
  Star, ChevronRight, ChevronLeft, Filter, 
  X, Facebook, Twitter, Instagram, Youtube,
  ArrowRight, CheckCircle2, Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, View } from './types';
import { PRODUCTS, CATEGORIES } from './constants';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const navigateToDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
    window.scrollTo(0, 0);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-white text-black text-[10px] py-1 text-center font-bold tracking-widest uppercase">
        Free Shipping on orders over ₹999 | Easy Returns | Certified Equipment
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass border-b border-white/10 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              <Menu size={24} />
            </button>
            <div 
              className="text-2xl font-display font-bold tracking-tighter cursor-pointer flex items-center gap-2"
              onClick={() => setCurrentView('home')}
            >
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
              </div>
              BAJAAO
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium uppercase tracking-wider">
            <button onClick={() => setCurrentView('listing')} className="hover:text-brand transition-colors">Guitars</button>
            <button className="hover:text-brand transition-colors">Drums</button>
            <button className="hover:text-brand transition-colors">Keyboards</button>
            <button className="hover:text-brand transition-colors">Pro Audio</button>
            <button className="text-red-500 font-bold hover:text-red-400 transition-colors">Clearance</button>
          </div>

          <div className="flex-1 max-w-md hidden lg:block">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for guitars, drums, audio gear..." 
                className="w-full input-dark pl-10 py-2 text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="hover:text-brand transition-colors hidden sm:block">
              <Heart size={22} />
            </button>
            <button 
              className="hover:text-brand transition-colors relative"
              onClick={() => setCurrentView('cart')}
            >
              <ShoppingCart size={22} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </button>
            <button className="hover:text-brand transition-colors">
              <User size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentView === 'home' && <HomeView key="home" onNavigate={navigateToDetail} onCategoryClick={() => setCurrentView('listing')} />}
          {currentView === 'listing' && <ListingView key="listing" onProductClick={navigateToDetail} />}
          {currentView === 'detail' && selectedProduct && (
            <DetailView 
              key="detail" 
              product={selectedProduct} 
              onAddToCart={() => addToCart(selectedProduct)} 
            />
          )}
          {currentView === 'cart' && (
            <CartView 
              key="cart" 
              cart={cart} 
              total={cartTotal}
              onRemove={removeFromCart}
              onUpdateQty={updateQuantity}
              onCheckout={() => alert('Proceeding to checkout...')}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 pt-16 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="text-2xl font-display font-bold mb-6">BAJAAO</div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Since 2005, BAJAAO has been dedicated to serving the musical community with the best gear and expert advice. India's first and largest music gear retailer.
              </p>
              <div className="flex gap-4">
                <Facebook size={20} className="text-white/40 hover:text-white cursor-pointer" />
                <Twitter size={20} className="text-white/40 hover:text-white cursor-pointer" />
                <Instagram size={20} className="text-white/40 hover:text-white cursor-pointer" />
                <Youtube size={20} className="text-white/40 hover:text-white cursor-pointer" />
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Shop Gear</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Guitars</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Keyboards</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Drums</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pro Audio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Customer Support</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Warranty</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Join the Community</h4>
              <p className="text-sm text-white/60 mb-4">Subscribe for exclusive deals, gear guides, and artist interviews.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Your Email Address" className="flex-1 input-dark text-sm" />
                <button className="bg-brand px-4 py-2 rounded-lg font-bold text-sm">Join</button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/40 uppercase tracking-widest">
            <div>© 2024 BAJAAO ENTERTAINMENT. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Views ---

function HomeView({ onNavigate, onCategoryClick }: { onNavigate: (p: Product) => void, onCategoryClick: () => void, key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="space-y-24 pb-24"
    >
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/hero/1920/1080?blur=2" 
            className="w-full h-full object-cover opacity-40"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl"
          >
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/60 mb-4 block">Limited Edition Release</span>
            <h1 className="text-7xl md:text-8xl font-display font-bold leading-[0.9] mb-8 tracking-tighter">
              UNLEASH THE <br />
              <span className="text-brand">POWER OF SOUND</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 leading-relaxed">
              Experience the next generation of professional audio equipment. Shop the exclusive winter collection now.
            </p>
            <div className="flex gap-4">
              <button onClick={onCategoryClick} className="btn-primary px-8 py-4 text-lg">
                Shop Collection
              </button>
              <button className="px-8 py-4 border border-white/20 rounded-full font-semibold hover:bg-white hover:text-black transition-all">
                Explore Gear
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute right-0 bottom-0 p-12 hidden lg:block">
          <div className="flex items-center gap-4 text-white/20 font-display font-bold text-6xl tracking-widest uppercase">
            <span>Featured</span>
            <div className="w-12 h-1 bg-white/10" />
            <span>Promo</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-display font-bold mb-2">TOP CATEGORIES</h2>
            <div className="w-20 h-1 bg-brand" />
          </div>
          <button onClick={onCategoryClick} className="text-sm font-bold uppercase tracking-widest text-white/40 hover:text-white flex items-center gap-2">
            View All Categories <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div 
              key={cat.name}
              whileHover={{ y: -10 }}
              onClick={onCategoryClick}
              className="bg-card-dark border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 cursor-pointer hover:border-brand/50 transition-all group"
            >
              <div className="text-5xl group-hover:scale-110 transition-transform">{cat.icon}</div>
              <span className="text-xs font-bold uppercase tracking-widest text-center">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-display font-bold mb-2">NEW ARRIVALS</h2>
            <p className="text-white/40 text-sm">Fresh gear landed in our store this week</p>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} onClick={() => onNavigate(product)} />
          ))}
        </div>
      </section>
    </motion.div>
  );
}

function ListingView({ onProductClick }: { onProductClick: (p: Product) => void, key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-8 py-12"
    >
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-8">
          <div className="flex items-center gap-2 text-xl font-display font-bold mb-8">
            <Filter size={20} className="text-brand" />
            Filters
          </div>

          <FilterSection title="Brand" isOpen={true}>
            {['Fender', 'Gibson', 'Ibanez', 'Yamaha', 'Cort', 'Epiphone'].map(brand => (
              <label key={brand} className="flex items-center gap-3 text-sm text-white/60 hover:text-white cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-brand" />
                {brand}
              </label>
            ))}
          </FilterSection>

          <FilterSection title="Price Range">
            {['Under ₹10,000', '₹10,000 - ₹25,000', '₹25,000 - ₹50,000', 'Over ₹50,000'].map(range => (
              <label key={range} className="flex items-center gap-3 text-sm text-white/60 hover:text-white cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5" />
                {range}
              </label>
            ))}
          </FilterSection>

          <FilterSection title="Body Type">
            {['Dreadnought', 'Concert', 'Parlor', 'Jumbo'].map(type => (
              <label key={type} className="flex items-center gap-3 text-sm text-white/60 hover:text-white cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5" />
                {type}
              </label>
            ))}
          </FilterSection>

          <button className="w-full py-3 rounded-lg bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
            Reset All Filters
          </button>

          <div className="bg-brand/10 border border-brand/20 rounded-2xl p-6">
            <h4 className="font-bold text-sm mb-2">Expert Advice Just a Call Away</h4>
            <p className="text-xs text-white/60 mb-4">Need help picking the right guitar? Our experts are here to help.</p>
            <button className="w-full py-2 bg-white text-black rounded-lg font-bold text-xs uppercase">Call Now</button>
          </div>
        </aside>

        {/* Main Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <nav className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest mb-2">
                <span>Home</span> <ChevronRight size={10} />
                <span>Musical Instruments</span> <ChevronRight size={10} />
                <span className="text-white">Acoustic Guitars</span>
              </nav>
              <h1 className="text-5xl font-display font-bold tracking-tighter">ACOUSTIC GUITARS</h1>
              <p className="text-white/40 text-sm mt-2">From beginner strings to premium craftsman Dreadnoughts.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/40 uppercase tracking-widest">Sort by:</span>
              <select className="bg-card-dark border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none">
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <Tag label="Fender" onRemove={() => {}} />
            <Tag label="Under ₹25,000" onRemove={() => {}} />
            <Tag label="Dreadnought" onRemove={() => {}} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
            ))}
          </div>

          <div className="mt-16 flex justify-center items-center gap-2">
            <button className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
              <ChevronLeft size={20} />
            </button>
            {[1, 2, 3, '...', 12].map((p, i) => (
              <button 
                key={i}
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all ${p === 1 ? 'bg-brand text-white' : 'border border-white/10 text-white/40 hover:text-white'}`}
              >
                {p}
              </button>
            ))}
            <button className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DetailView({ product, onAddToCart }: { product: Product, onAddToCart: () => void, key?: string }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-8 py-12"
    >
      <nav className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest mb-12">
        <span>Home</span> <ChevronRight size={10} />
        <span>Electric Guitars</span> <ChevronRight size={10} />
        <span className="text-white">Solid Body</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Gallery */}
        <div className="space-y-6">
          <div className="aspect-square rounded-3xl overflow-hidden bg-card-dark border border-white/5">
            <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${i === 1 ? 'border-brand' : 'border-transparent opacity-50 hover:opacity-100'}`}>
                <img src={`https://picsum.photos/seed/thumb${i}/200/200`} className="w-full h-full object-cover" alt="Thumb" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div>
            <span className="bg-brand/20 text-brand text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">New Arrival</span>
            <h1 className="text-5xl font-display font-bold tracking-tighter mb-2">{product.brand} {product.name}</h1>
            <p className="text-white/40 text-lg">Sunburst, Maple Fingerboard</p>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} />)}
              </div>
              <span className="text-xs text-white/40">({product.reviews} Reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-5xl font-display font-bold">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-2xl text-white/20 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <div className="p-4 bg-brand/5 border border-brand/10 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 bg-brand/20 rounded-full flex items-center justify-center text-brand">
              <Truck size={20} />
            </div>
            <div>
              <p className="text-sm font-bold">As low as ₹{Math.round(product.price / 12)}/mo</p>
              <p className="text-xs text-white/40">with Affirm. <a href="#" className="text-brand underline">Learn more</a></p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-white/40">Color: 3-Color Sunburst</p>
            <div className="flex gap-3">
              {[ '#8b4513', '#1a1a1a', '#f5f5f5' ].map((color, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedColor(i)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === i ? 'border-brand p-1' : 'border-transparent'}`}
                >
                  <div className="w-full h-full rounded-full" style={{ backgroundColor: color }} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={onAddToCart}
              className="flex-1 btn-primary py-4 text-lg"
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all">
              <Heart size={24} />
            </button>
          </div>

          <button className="w-full py-4 border border-white/10 rounded-2xl font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            Buy it now
          </button>

          <div className="space-y-4 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3 text-sm text-green-500">
              <CheckCircle2 size={18} /> In Stock: Ready to ship within 24 hours
            </div>
            <div className="flex items-center gap-3 text-sm text-white/60">
              <Truck size={18} /> Free Express Shipping across India
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-24">
        <div className="flex border-b border-white/10 mb-12">
          {['description', 'specifications', 'reviews'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-brand' : 'text-white/40 hover:text-white'}`}
            >
              {tab}
              {activeTab === tab && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-brand" />}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-3xl font-display font-bold">The Evolution of the American Standard</h3>
            <p className="text-white/60 leading-relaxed">
              {product.description || "The American Professional II Stratocaster® draws from more than sixty years of innovation, inspiration and evolution to meet the demands of today's working player."}
            </p>
            <ul className="space-y-4">
              {[
                "Three V-Mod II single-coil Stratocaster pickups",
                "Upgraded 2-Point Tremolo with Cold-Rolled Steel Block",
                "Deep \"C\"-shaped neck profile with rolled fingerboard edges",
                "Contoured neck heel for easy access to the upper register"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                  <ChevronRight size={14} className="text-brand" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card-dark border border-white/5 rounded-3xl p-8">
            <h4 className="font-bold text-lg mb-6">Quick Specs</h4>
            <div className="space-y-6">
              {Object.entries(product.specs || {
                'Body Material': 'Alder',
                'Neck Finish': '"Super-Natural" Satin Urethane',
                'Scale Length': '25.5" (648 mm)',
                'Pickups': 'V-Mod II Single-Coil Strat',
                'Case': 'Deluxe Molded Case (Included)'
              }).map(([key, val]) => (
                <div key={key} className="flex justify-between items-start gap-4 text-xs">
                  <span className="text-white/40 uppercase tracking-widest">{key}</span>
                  <span className="text-right font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CartView({ cart, total, onRemove, onUpdateQty, onCheckout }: { 
  cart: { product: Product; quantity: number }[], 
  total: number,
  onRemove: (id: string) => void,
  onUpdateQty: (id: string, d: number) => void,
  onCheckout: () => void,
  key?: string
}) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-8 py-12"
    >
      <nav className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest mb-12">
        <span>Home</span> <ChevronRight size={10} />
        <span className="text-white">Shopping Cart</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-8">
          <div className="flex items-end justify-between border-b border-white/10 pb-6">
            <h1 className="text-5xl font-display font-bold tracking-tighter">SHOPPING CART</h1>
            <span className="text-white/40 text-sm">{cart.length} items in your cart</span>
          </div>

          {cart.length === 0 ? (
            <div className="py-24 text-center space-y-6">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/20">
                <ShoppingCart size={48} />
              </div>
              <h2 className="text-2xl font-bold">Your cart is empty</h2>
              <p className="text-white/40">Looks like you haven't added anything to your cart yet.</p>
              <button className="btn-primary mx-auto">Start Shopping</button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-6 p-6 bg-card-dark border border-white/5 rounded-3xl group">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden bg-black border border-white/5">
                    <img src={item.product.image} className="w-full h-full object-cover" alt={item.product.name} />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{item.product.brand} {item.product.name}</h3>
                        <p className="text-xs text-white/40 uppercase tracking-widest">Polar White, Maple Fretboard</p>
                      </div>
                      <button 
                        onClick={() => onRemove(item.product.id)}
                        className="text-red-500 hover:text-red-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <X size={14} /> Remove
                      </button>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-4 bg-black/40 rounded-xl p-1 border border-white/10">
                        <button 
                          onClick={() => onUpdateQty(item.product.id, -1)}
                          className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQty(item.product.id, 1)}
                          className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-2xl font-display font-bold">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="w-full lg:w-96">
          <div className="bg-card-dark border border-white/5 rounded-3xl p-8 sticky top-32">
            <h2 className="text-2xl font-display font-bold mb-8">Order Summary</h2>
            <div className="space-y-6 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Subtotal</span>
                <span className="font-bold">₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Shipping Estimate</span>
                <span className="text-green-500 font-bold">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Tax (GST 18%)</span>
                <span className="font-bold italic">Included</span>
              </div>
            </div>
            <div className="border-t border-white/10 pt-6 mb-8 flex justify-between items-baseline">
              <span className="text-xl font-bold">Total</span>
              <span className="text-4xl font-display font-bold text-brand">₹{total.toLocaleString()}</span>
            </div>

            <div className="relative mb-6">
              <input type="text" placeholder="Promo code" className="w-full input-dark pr-16" />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-brand text-xs font-bold uppercase">Apply</button>
            </div>

            <button 
              onClick={onCheckout}
              disabled={cart.length === 0}
              className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to Checkout <ArrowRight size={20} />
            </button>
            
            <p className="text-[10px] text-white/20 text-center mt-6 uppercase tracking-widest">Secure 256-bit SSL Encrypted Payment</p>
            
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
              <div className="text-center space-y-2">
                <CheckCircle2 size={24} className="mx-auto text-white/20" />
                <p className="text-[8px] font-bold uppercase tracking-widest text-white/40">1 Year Warranty</p>
              </div>
              <div className="text-center space-y-2">
                <Truck size={24} className="mx-auto text-white/20" />
                <p className="text-[8px] font-bold uppercase tracking-widest text-white/40">Fast Delivery</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}

// --- Sub-components ---

function ProductCard({ product, onClick }: { product: Product, onClick: () => void, key?: string }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-card-dark border border-white/5 rounded-3xl overflow-hidden group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden bg-black">
        <img 
          src={product.image} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          alt={product.name} 
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isTopSeller && (
            <span className="bg-brand text-[8px] font-bold px-2 py-1 rounded uppercase tracking-widest">Top Seller</span>
          )}
          {product.isSale && (
            <span className="bg-red-500 text-[8px] font-bold px-2 py-1 rounded uppercase tracking-widest">Sale</span>
          )}
        </div>
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-brand hover:text-white">
          <Heart size={18} />
        </button>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < 4 ? "currentColor" : "none"} />)}
          <span className="text-[10px] text-white/40 ml-1">({product.reviews})</span>
        </div>
        
        <div>
          <h3 className="font-bold text-sm group-hover:text-brand transition-colors line-clamp-2 h-10">
            {product.brand} {product.name}
          </h3>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-[10px] text-white/20 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
            <span className="text-xl font-display font-bold">₹{product.price.toLocaleString()}</span>
          </div>
          <button className="text-[10px] font-bold uppercase tracking-widest text-brand hover:text-white transition-colors">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function FilterSection({ title, children, isOpen = false }: { title: string, children: React.ReactNode, isOpen?: boolean }) {
  const [open, setOpen] = useState(isOpen);
  return (
    <div className="space-y-4">
      <button 
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-widest group"
      >
        <span className="group-hover:text-brand transition-colors">{title}</span>
        <ChevronRight size={16} className={`transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && (
        <div className="space-y-3 pl-1">
          {children}
        </div>
      )}
    </div>
  );
}

function Tag({ label, onRemove }: { label: string, onRemove: () => void }) {
  return (
    <div className="bg-brand/20 text-brand border border-brand/30 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
      {label}
      <button onClick={onRemove} className="hover:text-white transition-colors">
        <X size={12} />
      </button>
    </div>
  );
}
