import { MealCategory } from '../types';

interface Props {
  categories: MealCategory[];
  active: MealCategory;
  onChange: (cat: MealCategory) => void;
  counts: Record<string, number>;
}

const categoryConfig: Record<string, { emoji: string; color: string; activeColor: string }> = {
  'All': { emoji: '🍴', color: 'text-gray-600', activeColor: 'bg-gray-800 text-white' },
  'Breakfast': { emoji: '🌅', color: 'text-amber-600', activeColor: 'bg-amber-500 text-white' },
  'Morning Refreshment': { emoji: '☕', color: 'text-orange-600', activeColor: 'bg-orange-500 text-white' },
  'Lunch': { emoji: '🥗', color: 'text-green-600', activeColor: 'bg-green-600 text-white' },
  'Evening Refreshment': { emoji: '🍵', color: 'text-purple-600', activeColor: 'bg-purple-500 text-white' },
  'Dinner': { emoji: '🌙', color: 'text-red-600', activeColor: 'bg-red-600 text-white' },
};

export default function CategoryTab({ categories, active, onChange, counts }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => {
        const config = categoryConfig[cat] || categoryConfig['All'];
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 border-2 ${
              isActive
                ? `${config.activeColor} border-transparent shadow-lg scale-105`
                : `bg-white ${config.color} border-gray-200 hover:border-gray-300 hover:shadow-md`
            }`}
          >
            <span className="text-base">{config.emoji}</span>
            <span className="whitespace-nowrap">{cat}</span>
            {counts[cat] !== undefined && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {counts[cat]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
