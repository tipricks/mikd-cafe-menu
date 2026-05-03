import { MenuItem } from '../types';

interface Props {
  item: MenuItem;
}

const categoryColors: Record<string, string> = {
  'Breakfast': 'bg-amber-100 text-amber-700',
  'Morning Refreshment': 'bg-orange-100 text-orange-700',
  'Lunch': 'bg-green-100 text-green-700',
  'Evening Refreshment': 'bg-purple-100 text-purple-700',
  'Dinner': 'bg-red-100 text-red-700',
};

export default function MenuCard({ item }: Props) {
  return (
    <div className={`group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${!item.isAvailable ? 'opacity-60' : ''}`}>
      
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/lunch.jpg';
          }}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {item.isSpecial && (
            <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              ⭐ Special
            </span>
          )}
          {!item.isAvailable && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              ❌ Unavailable
            </span>
          )}
        </div>
        
        {/* Price tag */}
        <div className="absolute bottom-3 right-3 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl px-3 py-1 shadow-lg">
          <span className="text-lg font-bold text-green-600">Rs. {item.price}</span>
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category tag */}
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[item.category] || 'bg-gray-100 text-gray-600'}`}>
          {item.category}
        </span>
        
        {/* Name */}
        <h3 className="mt-2 text-lg font-bold text-gray-800 leading-tight">{item.name}</h3>
        
        {/* Description */}
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.description}</p>

        {/* Stats Row */}
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div className="bg-orange-50 rounded-lg p-2">
            <div className="text-sm font-bold text-orange-600">🔥 {item.calories}</div>
            <div className="text-xs text-gray-400">Calories</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-2">
            <div className="text-sm font-bold text-blue-600">⏱ {item.prepTime}</div>
            <div className="text-xs text-gray-400">Ready In</div>
          </div>
          <div className="bg-green-50 rounded-lg p-2">
            <div className="text-sm font-bold text-green-600">⭐ {item.rating}</div>
            <div className="text-xs text-gray-400">Rating</div>
          </div>
        </div>

        {/* Portion & Allergens */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>🍽️</span>
            <span>{item.portionSize}</span>
          </div>
          {item.allergens && item.allergens !== 'None' && (
            <div className="text-xs text-red-400 flex items-center gap-1">
              <span>⚠️</span>
              <span className="truncate max-w-[100px]">{item.allergens}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
