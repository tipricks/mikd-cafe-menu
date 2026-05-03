import { useState, useEffect, useMemo } from 'react';
import { MenuItem, MealCategory } from './types';
import { DEMO_MENU_ITEMS } from './demoData';
import { fetchMenuFromSheet } from './googleSheets';
import MenuCard from './components/MenuCard';
import CategoryTab from './components/CategoryTab';
import GuideModal from './components/GuideModal';
import StatsBar from './components/StatsBar';

const ALL_CATEGORIES: MealCategory[] = [
  'All',
  'Breakfast',
  'Morning Refreshment',
  'Lunch',
  'Evening Refreshment',
  'Dinner',
];

const MEAL_TIMES: Record<string, { label: string; emoji: string; time: string }> = {
  'Breakfast': { label: 'Breakfast', emoji: '🌅', time: '7:00 AM – 10:00 AM' },
  'Morning Refreshment': { label: 'Morning Break', emoji: '☕', time: '10:30 AM – 11:30 AM' },
  'Lunch': { label: 'Lunch', emoji: '🥗', time: '12:00 PM – 3:00 PM' },
  'Evening Refreshment': { label: 'Evening Snacks', emoji: '🍵', time: '4:00 PM – 6:00 PM' },
  'Dinner': { label: 'Dinner', emoji: '🌙', time: '7:00 PM – 10:00 PM' },
};

function getCurrentMeal(): MealCategory {
  const hour = new Date().getHours();
  if (hour >= 7 && hour < 10) return 'Breakfast';
  if (hour >= 10 && hour < 12) return 'Morning Refreshment';
  if (hour >= 12 && hour < 15) return 'Lunch';
  if (hour >= 16 && hour < 19) return 'Evening Refreshment';
  if (hour >= 19 || hour < 7) return 'Dinner';
  return 'All';
}

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [activeCategory, setActiveCategory] = useState<MealCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showGuide, setShowGuide] = useState(false);
  const [showUnavailable, setShowUnavailable] = useState(true);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'calories' | 'rating'>('default');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    loadMenu();
    // Auto-set current meal time
    setActiveCategory(getCurrentMeal());
    
    // Update time every minute
    const timer = setInterval(() => {
      setLastUpdated(new Date().toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    setLastUpdated(new Date().toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' }));
    
    return () => clearInterval(timer);
  }, []);

  async function loadMenu() {
    setIsLoading(true);
    try {
      const sheetData = await fetchMenuFromSheet();
      if (sheetData && sheetData.length > 0) {
        setMenuItems(sheetData);
        setIsDemo(false);
      } else {
        setMenuItems(DEMO_MENU_ITEMS);
        setIsDemo(true);
      }
    } catch {
      setMenuItems(DEMO_MENU_ITEMS);
      setIsDemo(true);
    }
    setIsLoading(false);
  }

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: menuItems.length };
    menuItems.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    let items = menuItems;

    // Category filter
    if (activeCategory !== 'All') {
      items = items.filter(i => i.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q)
      );
    }

    // Availability filter
    if (!showUnavailable) {
      items = items.filter(i => i.isAvailable);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc': items = [...items].sort((a, b) => a.price - b.price); break;
      case 'price-desc': items = [...items].sort((a, b) => b.price - a.price); break;
      case 'calories': items = [...items].sort((a, b) => a.calories - b.calories); break;
      case 'rating': items = [...items].sort((a, b) => b.rating - a.rating); break;
      default: items = [...items].sort((a, b) => (b.isSpecial ? 1 : 0) - (a.isSpecial ? 1 : 0));
    }

    return items;
  }, [menuItems, activeCategory, searchQuery, showUnavailable, sortBy]);

  const currentMealInfo = MEAL_TIMES[activeCategory] || null;

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#f8f7f4' }}>
      
      {/* Guide Modal */}
      {showGuide && <GuideModal onClose={() => setShowGuide(false)} />}

      {/* HERO HEADER */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('/images/hero-bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Logo & Title */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-3xl shadow-xl">
                🍽️
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Cafeteria Menu
                </h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse"></span>
                    Live Menu
                  </span>
                  <span className="text-gray-400 text-sm">• Updated: {lastUpdated}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-wrap">
              {isDemo && (
                <button
                  onClick={() => setShowGuide(true)}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold px-4 py-2 rounded-full text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  📊 Google Sheet Connect Karein
                </button>
              )}
              <button
                onClick={loadMenu}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2"
              >
                🔄 Refresh
              </button>
              <button
                onClick={() => setShowGuide(true)}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2"
              >
                📖 Setup Guide
              </button>
            </div>
          </div>

          {/* Demo Banner */}
          {isDemo && (
            <div className="mt-4 bg-yellow-400/20 border border-yellow-400/40 rounded-2xl p-3 flex items-start gap-3">
              <span className="text-yellow-400 text-xl flex-shrink-0">⚡</span>
              <div className="text-sm text-yellow-100">
                <strong className="text-yellow-300">Demo Mode Chal Raha Hai!</strong> Yeh sample data hai.
                Google Sheet connect karein aur apna real menu add karein.{' '}
                <button onClick={() => setShowGuide(true)} className="underline font-semibold text-yellow-300 hover:text-white transition-colors">
                  Setup kaise karein? →
                </button>
              </div>
            </div>
          )}

          {/* Meal Time Banner */}
          {currentMealInfo && (
            <div className="mt-4 bg-white/10 rounded-2xl p-3 flex items-center gap-3">
              <span className="text-2xl">{currentMealInfo.emoji}</span>
              <div>
                <div className="text-white font-semibold">{currentMealInfo.label} Time</div>
                <div className="text-gray-300 text-xs">{currentMealInfo.time}</div>
              </div>
            </div>
          )}

          {/* Date */}
          <div className="mt-2 text-gray-400 text-sm">
            {new Date().toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-5">

        {/* Stats */}
        {!isLoading && <StatsBar items={menuItems} />}

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
          {/* Search */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search menu... (e.g. biryani, chai, samosa)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none text-sm transition-colors"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">✕</button>
            )}
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-600">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="text-sm border-2 border-gray-200 rounded-lg px-2 py-1.5 focus:border-orange-400 focus:outline-none"
              >
                <option value="default">⭐ Featured First</option>
                <option value="price-asc">💰 Price: Low to High</option>
                <option value="price-desc">💰 Price: High to Low</option>
                <option value="calories">🔥 Calories: Low First</option>
                <option value="rating">⭐ Top Rated</option>
              </select>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => setShowUnavailable(!showUnavailable)}
                className={`relative w-11 h-6 rounded-full transition-colors ${showUnavailable ? 'bg-orange-400' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${showUnavailable ? 'left-5' : 'left-0.5'}`} />
              </div>
              <span className="text-sm text-gray-600">Show Unavailable</span>
            </label>
          </div>
        </div>

        {/* Category Tabs */}
        <CategoryTab
          categories={ALL_CATEGORIES}
          active={activeCategory}
          onChange={setActiveCategory}
          counts={categoryCounts}
        />

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-14 h-14 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 font-medium">Menu Load Ho Raha Hai...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🤷</div>
            <h3 className="text-xl font-bold text-gray-700">Koi Item Nahi Mili</h3>
            <p className="text-gray-500 mt-2">Search change karein ya category select karein</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-4 bg-orange-400 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Menu Grid */}
        {!isLoading && filteredItems.length > 0 && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">
                {activeCategory === 'All' ? '🍴 All Items' : `${activeCategory}`}
                <span className="ml-2 text-sm font-normal text-gray-400">({filteredItems.length} items)</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredItems.map(item => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}

        {/* Footer */}
        <footer className="text-center py-8 border-t border-gray-200 mt-8">
          <p className="text-gray-400 text-sm">
            🍽️ Cafeteria Menu Board • Powered by Google Sheets
          </p>
          <p className="text-gray-300 text-xs mt-1">
            Menu update karne ke liye Google Sheet edit karein
          </p>
        </footer>
      </div>
    </div>
  );
}
