import React, { useState } from 'react';
import { MenuItem, TranslationSet, Lang } from '../types';
import { menuDB } from '../data';

interface MenuDatabaseProps {
  t: TranslationSet;
  lang: Lang;
  onItemClick: (item: MenuItem) => void;
}

const MenuDatabase: React.FC<MenuDatabaseProps> = ({ t, lang, onItemClick }) => {
  const [filterType, setFilterType] = useState<'All' | 'Recommended' | 'Avoid'>('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = menuDB.filter(item => {
    const matchType = (filterType === 'All') ||
      (filterType === 'Recommended' && item.s >= 2) ||
      (filterType === 'Avoid' && item.s === 0);
    const matchSearch = item.n.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = (categoryFilter === 'All') || (item.c === categoryFilter);
    return matchType && matchSearch && matchCat;
  });

  return (
    <div id="view-database" className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4 bg-white p-3 rounded-lg shadow-sm">
        <button
          onClick={() => setFilterType('All')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md shadow-sm transition-all ${filterType === 'All' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          {t.filter_all}
        </button>
        <button
          onClick={() => setFilterType('Recommended')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${filterType === 'Recommended' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 ring-2 ring-emerald-400/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-200'}`}
        >
          {t.filter_rec}
        </button>
        <button
          onClick={() => setFilterType('Avoid')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${filterType === 'Avoid' ? 'bg-red-50 text-red-600 border-red-100 ring-2 ring-red-400/20' : 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100'}`}
        >
          {t.filter_avoid}
        </button>
        <div className="w-px h-6 bg-slate-200 mx-2"></div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="text-sm border border-slate-200 rounded-md px-2 py-1.5 focus:outline-none focus:border-amber-500"
        >
          <option value="All">{t.cat_all}</option>
          <option value="Salad">Salad</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Soup">Soup</option>
          <option value="Main Dish">Main Dish</option>
          <option value="Seafood">Seafood</option>
          <option value="Pizza">Pizza</option>
          <option value="Pasta">Pasta</option>
          <option value="Dessert">Dessert</option>
        </select>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={lang === 'th' ? 'ค้นหาเมนู...' : 'Search menu...'}
          className="ml-auto text-sm border border-slate-200 rounded-md px-3 py-1.5 w-full md:w-64 focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-semibold">{t.th_menu}</th>
                <th className="p-4 font-semibold hidden md:table-cell">{t.th_cat}</th>
                <th className="p-4 font-semibold hidden md:table-cell">{t.th_key}</th>
                <th className="p-4 font-semibold text-right">{t.th_val}</th>
                <th className="p-4 font-semibold text-center">{t.th_status}</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    {lang === 'th' ? 'ไม่พบรายการอาหาร' : 'No items found'}
                  </td>
                </tr>
              ) : (
                filteredData.map((item, idx) => {
                  let badgeClass = "badge-neutral";
                  let badgeText = "Neutral";
                  let rowClass = "";

                  if (item.s === 0) {
                    badgeClass = "badge-avoid";
                    badgeText = "AVOID";
                    rowClass = "opacity-60 grayscale-[0.5]";
                  } else if (item.s === 2) {
                    badgeClass = "badge-rec";
                    badgeText = "Recommended";
                  } else if (item.s === 3) {
                    badgeClass = "badge-rec bg-emerald-600 text-white border-none shadow-sm";
                    badgeText = "MUST TRY";
                  }

                  return (
                    <tr
                      key={idx}
                      className={`border-b border-slate-100 hover:bg-amber-50 cursor-pointer transition-all duration-200 ${rowClass}`}
                      onClick={() => onItemClick(item)}
                    >
                      <td className="p-4">
                        <div className="font-bold text-slate-700">{item.n}</div>
                      </td>
                      <td className="p-4 hidden md:table-cell text-slate-500">{item.c}</td>
                      <td className="p-4 hidden md:table-cell text-slate-600 text-xs">{item.h}</td>
                      <td className="p-4 text-right font-mono text-slate-600">฿{item.val}</td>
                      <td className="p-4 text-center">
                        <span className={`status-badge ${badgeClass}`}>{badgeText}</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-center text-xs text-slate-400 mt-2">
        <i className="fa-solid fa-hand-pointer mr-1"></i> <span>{t.click_hint}</span>
      </div>
    </div>
  );
};

export default MenuDatabase;