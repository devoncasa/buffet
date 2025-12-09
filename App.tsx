
import React, { useState } from 'react';
import { translations } from './data';
import { Lang, MenuItem, DietaryStyle } from './types';
import Dashboard from './components/Dashboard';
import MenuDatabase from './components/MenuDatabase';
import Beverage from './components/Beverage';
import Modal from './components/Modal';

type Tab = 'dashboard' | 'database' | 'beverage';

function App() {
  const [lang, setLang] = useState<Lang>('th');
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [diet, setDiet] = useState<DietaryStyle>('omnivore');

  // Safety check for translations
  const t = translations ? (translations[lang] || translations['th']) : null;

  if (!t) return <div className="flex h-screen items-center justify-center text-slate-500">Loading resources...</div>;

  const toggleLanguage = () => {
    setLang(prev => prev === 'th' ? 'en' : 'th');
  };

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard t={t} lang={lang} diet={diet} />;
      case 'database':
        return <MenuDatabase t={t} lang={lang} diet={diet} onItemClick={handleItemClick} />;
      case 'beverage':
        return <Beverage t={t} onItemClick={handleItemClick} />;
      default:
        return <Dashboard t={t} lang={lang} diet={diet} />;
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm z-30 flex-none border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between h-auto md:h-16 items-center py-3 md:py-0 gap-3 md:gap-0">
            {/* Top Row on Mobile: Logo + Lang Switcher */}
            <div className="flex items-center justify-between w-full md:w-auto">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg flex items-center justify-center text-white shadow-lg flex-shrink-0">
                        <i className="fa-solid fa-utensils"></i>
                    </div>
                    <div className="overflow-hidden flex-1 min-w-0">
                        <h1 className="text-lg font-bold text-slate-800 leading-tight tracking-tight whitespace-nowrap">{t.app_title}</h1>
                        <p className="text-[10px] uppercase font-semibold text-amber-600 tracking-wider truncate">{t.app_subtitle}</p>
                    </div>
                </div>
                {/* Mobile Lang Switcher (Right aligned next to logo) */}
                <button onClick={toggleLanguage} className="md:hidden flex-shrink-0 flex items-center justify-center w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors border border-slate-200">
                    <span className="text-base leading-none pt-0.5">{lang === 'th' ? '🇹🇭' : '🇺🇸'}</span>
                </button>
            </div>

            {/* Bottom Row on Mobile: Controls */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              
              {/* Diet Selector - Full width on mobile */}
              <div className="flex items-center gap-2 flex-1 md:flex-initial">
                 <span className="text-[10px] font-bold text-slate-400 hidden md:inline uppercase whitespace-nowrap">{t.diet_selector}</span>
                 {/* Text base on mobile prevents zoom */}
                 <select 
                    value={diet}
                    onChange={(e) => setDiet(e.target.value as DietaryStyle)}
                    className="text-base md:text-xs border border-slate-300 rounded-md px-3 py-2 md:py-1.5 focus:outline-none focus:border-amber-500 bg-white w-full md:w-auto shadow-sm"
                 >
                    <option value="omnivore">{t.diet_omni}</option>
                    <option value="keto">{t.diet_keto}</option>
                    <option value="vegetarian">{t.diet_veg}</option>
                    <option value="pescatarian">{t.diet_pesc}</option>
                 </select>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden md:flex gap-4 border-l border-slate-200 pl-4">
                <button onClick={() => setActiveTab('dashboard')} className={`text-sm font-medium hover:text-amber-800 ${activeTab === 'dashboard' ? 'text-amber-900 font-bold' : 'text-slate-600'}`}>{t.nav_dash}</button>
                <button onClick={() => setActiveTab('database')} className={`text-sm font-medium hover:text-amber-800 ${activeTab === 'database' ? 'text-amber-900 font-bold' : 'text-slate-600'}`}>{t.nav_menu}</button>
                <button onClick={() => setActiveTab('beverage')} className={`text-sm font-medium hover:text-amber-800 ${activeTab === 'beverage' ? 'text-amber-900 font-bold' : 'text-slate-600'}`}>{t.nav_bev}</button>
              </nav>

              {/* Desktop Lang Switcher */}
              <button onClick={toggleLanguage} className="hidden md:flex flex-shrink-0 items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded transition-colors border border-slate-200">
                <span className="text-base">{lang === 'th' ? '🇹🇭' : '🇺🇸'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content (Scrollable) */}
      <main className="flex-1 overflow-y-auto bg-slate-50 relative pb-32">
        <div className="max-w-7xl mx-auto space-y-8 p-4 md:p-8 h-full flex flex-col">
          {renderContent()}
        </div>
      </main>

      {/* Navigation Mobile */}
      <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-slate-200 fixed bottom-0 w-full z-40 flex justify-around shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 py-3 text-center border-t-2 transition-colors ${activeTab === 'dashboard' ? 'text-amber-800 border-amber-600 bg-amber-50/50' : 'text-slate-400 border-transparent'}`}
        >
          <div className="text-xl mb-1"><i className="fa-solid fa-chart-pie"></i></div>
          <div className="text-[10px] font-medium">{t.nav_dash_short}</div>
        </button>
        <button
          onClick={() => setActiveTab('database')}
          className={`flex-1 py-3 text-center border-t-2 transition-colors ${activeTab === 'database' ? 'text-amber-800 border-amber-600 bg-amber-50/50' : 'text-slate-400 border-transparent'}`}
        >
          <div className="text-xl mb-1"><i className="fa-solid fa-book-open"></i></div>
          <div className="text-[10px] font-medium">{t.nav_menu_short}</div>
        </button>
        <button
          onClick={() => setActiveTab('beverage')}
          className={`flex-1 py-3 text-center border-t-2 transition-colors ${activeTab === 'beverage' ? 'text-amber-800 border-amber-600 bg-amber-50/50' : 'text-slate-400 border-transparent'}`}
        >
          <div className="text-xl mb-1"><i className="fa-solid fa-wine-glass"></i></div>
          <div className="text-[10px] font-medium">{t.nav_bev_short}</div>
        </button>
      </div>

      <Modal
        isOpen={modalOpen}
        item={selectedItem}
        onClose={closeModal}
        t={t}
        lang={lang}
        diet={diet}
      />
    </>
  );
}

export default App;
