import { MenuItem } from '../types';

interface Props {
  items: MenuItem[];
}

export default function StatsBar({ items }: Props) {
  const available = items.filter(i => i.isAvailable).length;
  const specials = items.filter(i => i.isSpecial).length;
  const avgPrice = items.length > 0 ? Math.round(items.reduce((s, i) => s + i.price, 0) / items.length) : 0;
  const avgCal = items.length > 0 ? Math.round(items.reduce((s, i) => s + i.calories, 0) / items.length) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
        <div className="text-2xl font-bold text-green-600">{available}</div>
        <div className="text-xs text-gray-500 mt-0.5">Available Items</div>
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
        <div className="text-2xl font-bold text-yellow-500">{specials}</div>
        <div className="text-xs text-gray-500 mt-0.5">Today's Specials</div>
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
        <div className="text-2xl font-bold text-blue-600">Rs.{avgPrice}</div>
        <div className="text-xs text-gray-500 mt-0.5">Avg Price</div>
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
        <div className="text-2xl font-bold text-orange-500">{avgCal}</div>
        <div className="text-xs text-gray-500 mt-0.5">Avg Calories</div>
      </div>
    </div>
  );
}
