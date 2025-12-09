
import React from 'react';
import { TranslationSet, MenuItem } from '../types';
import { beverageDB } from '../data';

interface BeverageProps {
  t: TranslationSet;
  onItemClick: (item: MenuItem) => void;
}

const Beverage: React.FC<BeverageProps> = ({ t, onItemClick }) => {
  
  // Use safe default keys if translations are missing or don't match data
  const softDrinksTitle = t.bev_soft || "Soft Drinks";
  const mocktailsTitle = t.bev_mock || "Mocktails";
  const coffeeTitle = t.bev_coffee || "Coffee (Hot Only)";
  const specialTitle = t.bev_spec || "Special Drink";

  // Safety check to ensure data exists before filtering
  if (!beverageDB) return null;

  // Data mapping: keys here are for display, values filter by the HARDCODED category in data.ts
  const categories: { [title: string]: MenuItem[] } = {
    [softDrinksTitle]: beverageDB.filter(i => i.c === 'Soft Drinks'),
    [mocktailsTitle]: beverageDB.filter(i => i.c === 'Mocktails'),
    [coffeeTitle]: beverageDB.filter(i => i.c === 'Coffee (Hot Only)'),
    [specialTitle]: beverageDB.filter(i => i.c === 'Special Drink')
  };

  const iconMap: { [key: string]: string } = {
    [softDrinksTitle]: '🥤',
    [mocktailsTitle]: '🍹',
    [coffeeTitle]: '☕',
    [specialTitle]: '🍺'
  };

  const renderBevCard = (title: string, items: MenuItem[]) => {
    const icon = iconMap[title] || '🥤';
    return (
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <h4 className="font-bold text-slate-700 mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
          <span>{icon}</span> {title}
        </h4>
        <ul className="text-sm text-slate-600 space-y-1">
          {items.length === 0 ? (
             <li className="text-slate-400 text-xs italic py-2">No items available</li>
          ) : (
             items.map((item, idx) => (
              <li 
                key={idx} 
                className="flex justify-between py-2 border-b border-slate-50 last:border-0 cursor-pointer hover:bg-slate-50 px-2 -mx-2 rounded transition-colors group"
                onClick={() => onItemClick(item)}
              >
                <span className="group-hover:text-amber-700 transition-colors">{item.n}</span>
                <i className="fa-solid fa-chevron-right text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 mt-1"></i>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  };

  return (
    <div id="view-beverage" className="space-y-6">
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm mb-6 flex items-start gap-4">
        <div className="text-2xl text-amber-600 mt-1"><i className="fa-solid fa-lightbulb"></i></div>
        <div>
          <h3 className="font-bold text-amber-800 text-sm">{t.bev_advice_title}</h3>
          <p className="text-xs text-amber-900 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.bev_advice_desc }}></p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(categories).map(([title, items], idx) => (
          <React.Fragment key={idx}>
            {renderBevCard(title, items)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Beverage;
