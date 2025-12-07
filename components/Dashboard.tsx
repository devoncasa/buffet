import React from 'react';
import { Lang, TranslationSet } from '../types';

interface DashboardProps {
  t: TranslationSet;
  lang: Lang;
}

const Dashboard: React.FC<DashboardProps> = ({ t }) => {
  const renderPlanCard = (time: string, icon: string, title: string, desc: string, items: string[]) => {
    return (
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative overflow-hidden group hover:border-amber-300 transition-colors">
        <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded-bl">{time}</div>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl mb-3 shadow-sm">{icon}</div>
        <h3 className="font-bold text-sm mb-1 text-slate-800">{title}</h3>
        <p className="text-[10px] text-slate-500 mb-3 uppercase tracking-wide">{desc}</p>
        <ul className="text-xs space-y-2 text-slate-600">
          {items.map((item, i) => (
            <li key={i} className="flex items-center">
              <i className="fa-solid fa-check text-[10px] text-emerald-500 mr-2"></i>{item}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div id="view-dashboard" className="space-y-6 animate-fade-in">
      {/* Restaurant Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="hero-pattern p-6 md:p-8 border-b border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <i className="fa-solid fa-circle-info text-amber-500"></i>
              {t.about_title}
            </h2>
            <span className="mt-2 md:mt-0 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wide">{t.about_sub}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-600 leading-relaxed text-sm md:text-base">
            <div>
              <h3 className="font-bold text-slate-800 mb-2 border-l-4 border-amber-500 pl-3">{t.about_atmosphere}</h3>
              <p className="mb-4 text-justify" dangerouslySetInnerHTML={{ __html: t.about_atm_desc }}></p>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-2 border-l-4 border-emerald-500 pl-3">{t.about_why}</h3>
              <p className="mb-4 text-justify" dangerouslySetInnerHTML={{ __html: t.about_why_desc }}></p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel bg-white p-5 rounded-xl shadow-sm border-l-4 border-amber-500">
          <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">{t.stat_total}</div>
          <div className="text-3xl font-bold text-slate-800">68</div>
        </div>
        <div className="glass-panel bg-white p-5 rounded-xl shadow-sm border-l-4 border-emerald-500">
          <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">{t.stat_safe}</div>
          <div className="text-3xl font-bold text-emerald-600">42</div>
        </div>
        <div className="glass-panel bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-500">
          <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">{t.stat_value}</div>
          <div className="text-3xl font-bold text-blue-600">฿3,850+</div>
        </div>
        <div className="glass-panel bg-white p-5 rounded-xl shadow-sm border-l-4 border-red-500">
          <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">{t.stat_avoid}</div>
          <div className="text-3xl font-bold text-red-600">26</div>
        </div>
      </div>

      {/* Strategic Plan */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <i className="fa-solid fa-chess-knight text-amber-600"></i> {t.plan_title}
          </h2>
          <span className="text-xs text-slate-400 font-mono">120 Mins</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {renderPlanCard('0-15 min', '🥣', t.step1_t, t.step1_d, ['Lobster Bisque', 'Mussels (Tomato)', 'Arancini'])}
          {renderPlanCard('15-45 min', '🥗', t.step2_t, t.step2_d, ['Avocado Salad', 'Quinoa Salad', 'Smoked Duck'])}
          {renderPlanCard('45-75 min', '🍖', t.step3_t, t.step3_d, ['BBQ Pork Ribs', 'River Prawns', 'Pork Belly'])}
          {renderPlanCard('75-100 min', '🍝', t.step4_t, t.step4_d, ['Truffle Pizza (1pc)', 'Linguine Vongole'])}
          {renderPlanCard('100-120 min', '☕', t.step5_t, t.step5_d, ['Mille-Feuille', 'Berry Sorbet', 'Hot Coffee'])}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;