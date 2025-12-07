import React, { useState } from 'react';
import { translations } from './data';
import { Lang, MenuItem } from './types';
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

  const t = translations[lang];

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
        return <Dashboard t={t} lang={lang} />;
      case 'database':
        return <MenuDatabase t={t} lang={lang} onItemClick={handleItemClick} />;
      case 'beverage':
        return <Beverage t={t} onItemClick={handleItemClick} />;
      default:
        return <Dashboard t={t} lang={lang} />;
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-md z-30 flex-none border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg flex items-center justify-center text-white shadow-lg flex-shrink-0">
                <i className="fa-solid fa-utensils"></i>
              </div>
              <div className="overflow-hidden">
                <h1 className="text-xl font-bold text-slate-800 leading-tight tracking-tight whitespace-nowrap">VP Buffet</h1>
                <p className="text-[10px] uppercase font-semibold text-amber-600 tracking-wider truncate max-w-[180px] md:max-w-none">For Men 50+ | No Beef/Fish/Raw</p>
              </div>
            </div>

            {/* Right Side: Nav & Lang Switch */}
            <div className="flex items-center gap-6">
              {/* Desktop Nav */}
              <nav className="hidden md:flex gap-6">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`nav-item px-2 py-5 text-sm font-medium hover:text-amber-800 ${activeTab === 'dashboard' ? 'active text-amber-900' : 'text-slate-600'}`}
                >
                  {t.nav_dash}
                </button>
                <button
                  onClick={() => setActiveTab('database')}
                  className={`nav-item px-2 py-5 text-sm font-medium hover:text-amber-800 ${activeTab === 'database' ? 'active text-amber-900' : 'text-slate-600'}`}
                >
                  {t.nav_menu}
                </button>
                <button
                  onClick={() => setActiveTab('beverage')}
                  className={`nav-item px-2 py-5 text-sm font-medium hover:text-amber-800 ${activeTab === 'beverage' ? 'active text-amber-900' : 'text-slate-600'}`}
                >
                  {t.nav_bev}
                </button>
              </nav>

              {/* Lang Switcher */}
              <button onClick={toggleLanguage} className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors border border-slate-200">
                <span className="text-lg">{lang === 'th' ? '🇹🇭' : '🇺🇸'}</span>
                <span className="text-xs font-bold text-slate-600">{lang === 'th' ? 'TH' : 'EN'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content (Scrollable) */}
      <main className="flex-1 overflow-y-auto bg-slate-50 relative">
        <div className="max-w-7xl mx-auto space-y-8 pb-24 p-4 md:p-8">
          {renderContent()}
        </div>
      </main>

      {/* Navigation Mobile */}
      <div className="md:hidden bg-white border-t border-slate-200 fixed bottom-0 w-full z-40 flex justify-around shadow-lg pb-safe">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 py-3 text-center border-t-2 ${activeTab === 'dashboard' ? 'text-amber-800 border-amber-600 bg-amber-50' : 'text-slate-400 border-transparent'}`}
        >
          <div className="text-xl mb-1"><i className="fa-solid fa-chart-pie"></i></div>
          <div className="text-[10px] font-medium">{t.nav_dash_short}</div>
        </button>
        <button
          onClick={() => setActiveTab('database')}
          className={`flex-1 py-3 text-center border-t-2 ${activeTab === 'database' ? 'text-amber-800 border-amber-600 bg-amber-50' : 'text-slate-400 border-transparent'}`}
        >
          <div className="text-xl mb-1"><i className="fa-solid fa-list"></i></div>
          <div className="text-[10px] font-medium">{t.nav_menu_short}</div>
        </button>
        <button
          onClick={() => setActiveTab('beverage')}
          className={`flex-1 py-3 text-center border-t-2 ${activeTab === 'beverage' ? 'text-amber-800 border-amber-600 bg-amber-50' : 'text-slate-400 border-transparent'}`}
        >
          <div className="text-xl mb-1"><i className="fa-solid fa-glass-water"></i></div>
          <div className="text-[10px] font-medium">{t.nav_bev_short}</div>
        </button>
      </div>

      <Modal
        isOpen={modalOpen}
        item={selectedItem}
        onClose={closeModal}
        t={t}
        lang={lang}
      />
    </>
  );
}

export default App;