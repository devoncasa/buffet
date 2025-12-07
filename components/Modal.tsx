import React from 'react';
import { MenuItem, TranslationSet, Lang } from '../types';

interface ModalProps {
  isOpen: boolean;
  item: MenuItem | null;
  onClose: () => void;
  t: TranslationSet;
  lang: Lang;
}

const Modal: React.FC<ModalProps> = ({ isOpen, item, onClose, t, lang }) => {
  if (!item) return null;

  const adviceText = lang === 'th' ? item.r_th : item.r_en;
  const ingredients = lang === 'th' ? item.ing_th : item.ing_en;
  
  const iconMap: { [key: string]: string } = {
    'Salad': 'fa-leaf', 
    'Appetizer': 'fa-cookie-bite', 
    'Soup': 'fa-mug-hot', 
    'Main Dish': 'fa-drumstick-bite', 
    'Seafood': 'fa-shrimp', 
    'Pizza': 'fa-pizza-slice', 
    'Pasta': 'fa-bowl-food', 
    'Dessert': 'fa-ice-cream',
    'Soft Drinks': 'fa-bottle-water',
    'Mocktails': 'fa-martini-glass-citrus',
    'Coffee (Hot Only)': 'fa-mug-hot',
    'Special Drink': 'fa-beer-mug-empty'
  };

  const iconClass = `fa-solid ${iconMap[item.c] || 'fa-utensils'}`;

  let statusEl = null;
  if (item.s === 0) {
    statusEl = (
      <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
        <i className='fa-solid fa-triangle-exclamation'></i> {lang === 'th' ? 'ควรเลี่ยง' : 'Avoid'}
      </div>
    );
  } else if (item.s >= 2) {
    statusEl = (
      <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
        <i className='fa-solid fa-thumbs-up'></i> {lang === 'th' ? 'แนะนำสูงสุด' : 'Highly Recommended'}
      </div>
    );
  } else {
    statusEl = (
      <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
        Neutral
      </div>
    );
  }

  return (
    <div className={`modal fixed inset-0 z-50 flex items-center justify-center p-4 ${isOpen ? 'open' : ''}`}>
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-slate-800 p-6 text-white relative overflow-hidden flex-none">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl transform translate-x-10 -translate-y-10">
            <i className={iconClass}></i>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10 bg-black/20 rounded-full w-8 h-8 flex items-center justify-center">
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
          <div className="flex items-start gap-4 relative z-10 pr-8">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10 flex-shrink-0">
              <i className={`${iconClass} text-2xl text-amber-400`}></i>
            </div>
            <div>
              <span className="text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded uppercase tracking-wider mb-1 inline-block">{item.c}</span>
              <h2 className="text-xl font-bold leading-tight">{item.n}</h2>
              {statusEl}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto bg-white flex-1 overscroll-contain">
          <div className="space-y-6">
            
            {/* Section: Ingredients */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <i className="fa-solid fa-basket-shopping text-blue-500"></i> <span>{t.modal_ing}</span>
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed bg-blue-50 p-3 rounded-lg border border-blue-100">
                {ingredients}
              </p>
            </div>

            {/* Section: Nutrition Grid - 2 cols mobile, 4 cols desktop */}
            <div>
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i className="fa-solid fa-chart-simple text-purple-500"></i> <span>{t.modal_nutri_grid}</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">{t.nutri_cal}</div>
                  <div className="font-bold text-slate-800 text-lg">{item.kcal}</div>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">{t.nutri_prot}</div>
                  <div className="font-bold text-slate-800 text-lg">{item.protein}</div>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">{t.nutri_fat}</div>
                  <div className="font-bold text-slate-800 text-lg">{item.fat}</div>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">{item.sugar ? t.nutri_sugar : t.nutri_carb}</div>
                  <div className="font-bold text-slate-800 text-lg">{item.sugar ? item.sugar : item.carbs}</div>
                </div>
              </div>
            </div>

            {/* Existing Section: Highlight */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <i className="fa-solid fa-heart-pulse text-amber-500"></i> <span>{t.modal_nutri_highlight}</span>
              </h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 relative">
                <i className="fa-solid fa-quote-left text-slate-200 absolute top-2 left-2 text-3xl -z-10"></i>
                <p className="text-slate-700 text-sm leading-relaxed">{item.h}</p>
              </div>
            </div>

            {/* Section: Economics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-[10px] text-slate-400 uppercase tracking-wide mb-1">{t.modal_cost}</div>
                <div className="text-xl md:text-2xl font-bold text-slate-700">฿{item.cost}</div>
                <div className="text-[10px] text-slate-400 mt-1">{t.modal_cost_sub}</div>
              </div>
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 shadow-sm">
                <div className="text-[10px] text-amber-600 uppercase tracking-wide mb-1">{t.modal_val}</div>
                <div className="text-xl md:text-2xl font-bold text-amber-700">฿{item.val}</div>
                <div className="text-[10px] text-amber-600/70 mt-1">{t.modal_val_sub}</div>
              </div>
            </div>

            {/* Section: Expert Advice */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <i className="fa-solid fa-user-doctor text-emerald-500"></i> <span>{t.modal_advice}</span>
              </h3>
              <div className="flex gap-4">
                <div className="w-1 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full flex-shrink-0"></div>
                <div className="text-sm text-slate-600 leading-relaxed py-1">{adviceText}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center flex-none pb-safe">
          <button onClick={onClose} className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg transform active:scale-[0.98]">
            {t.modal_close}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;