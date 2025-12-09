
import React, { useEffect, useState } from 'react';
import { Lang, TranslationSet, DietaryStyle } from '../types';

interface DashboardProps {
  t: TranslationSet;
  lang: Lang;
  diet: DietaryStyle;
}

const Dashboard: React.FC<DashboardProps> = ({ t, diet }) => {
  // Map diets to specific plans
  // 0: Omnivore, 1: Keto, 2: Vegetarian, 3: Pescatarian
  const dietToPlanIndex: { [key in DietaryStyle]: number } = {
    'omnivore': 0,
    'keto': 1,
    'vegetarian': 2,
    'pescatarian': 3
  };

  const [activePlan, setActivePlan] = useState<number>(0);

  // Auto-switch plan when diet changes
  useEffect(() => {
    setActivePlan(dietToPlanIndex[diet] || 0);
  }, [diet]);

  // Ensure t is available
  if (!t) return <div className="p-8 text-center text-slate-400">Loading Dashboard...</div>;

  const plans = [
    {
      name: t.plan_name_1, why: t.plan_why_1,
      steps: [
        ['Lobster Bisque', 'Mussels'],
        ['Avocado Salad', 'Quinoa Salad'],
        ['Aus. Striploin', 'River Prawns'],
        ['Truffle Pizza', 'Linguine Vongole'],
        ['Mille-Feuille', 'Berry Sorbet']
      ]
    },
    {
      name: t.plan_name_2, why: t.plan_why_2,
      steps: [
        ['Mussels (No Toast)', 'Shrimp on Ice'],
        ['Avocado Salad (No Balsamic)'],
        ['Aus. Striploin', 'Smoked Pork Belly'],
        ['Salmon Steak', 'Steak Cafe de Paris'],
        ['Espresso', 'Cheese Platter (from Salad)']
      ]
    },
    {
      name: t.plan_name_3, why: t.plan_why_3,
      steps: [
        ['Truffle Soup', 'Pumpkin Soup'],
        ['Baby Kale Salad', 'Quinoa Salad'],
        ['Mushroom Pizza', 'Truffle Pizza'],
        ['Spinach Cheese', 'Truffle Pasta'],
        ['Avocado Panna Cotta', 'Sorbet']
      ]
    },
    {
      name: t.plan_name_4, why: t.plan_why_4,
      steps: [
        ['Oysters', 'Mussels'],
        ['Avocado Salad', 'Shrimp Salad'],
        ['Pan-Seared Sea Bass', 'Salmon Steak'],
        ['Seafood Pasta', 'Linguine Vongole'],
        ['Berry Sorbet', 'Tea']
      ]
    }
  ];

  const currentPlan = plans[activePlan] || plans[0];

  // Safety check if plans data is not yet fully loaded or malformed
  if (!currentPlan || !currentPlan.steps || currentPlan.steps.length < 5) {
      return <div className="p-8 text-center text-slate-400">Updating Plan Strategy...</div>;
  }

  const renderPlanCard = (time: string, icon: string, title: string, desc: string, items: string[]) => {
    return (
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative overflow-hidden group hover:border-amber-300 transition-colors h-full min-w-[260px] md:min-w-0 snap-center">
        <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded-bl">{time}</div>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl mb-3 shadow-sm">{icon}</div>
        <h3 className="font-bold text-sm mb-1 text-slate-800">{title}</h3>
        <p className="text-[10px] text-slate-500 mb-3 uppercase tracking-wide">{desc}</p>
        <ul className="text-xs space-y-2 text-slate-600">
          {(items || []).map((item, i) => (
            <li key={i} className="flex items-start">
              <i className="fa-solid fa-check text-[10px] text-emerald-500 mr-2 mt-0.5"></i>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div id="view-dashboard" className="space-y-6 animate-fade-in pb-4">
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
              <p className="mb-4 text-justify" dangerouslySetInnerHTML={{ __html: t.about_atm_desc || '' }}></p>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-2 border-l-4 border-emerald-500 pl-3">{t.about_logic}</h3>
              <p className="mb-4 text-justify" dangerouslySetInnerHTML={{ __html: t.about_logic_desc || '' }}></p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="glass-panel bg-white p-4 md:p-5 rounded-xl shadow-sm border-l-4 border-amber-500">
          <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">{t.stat_total}</div>
          <div className="text-2xl md:text-3xl font-bold text-slate-800">85+</div>
        </div>
        <div className="glass-panel bg-white p-4 md:p-5 rounded-xl shadow-sm border-l-4 border-emerald-500">
          <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">{t.stat_safe}</div>
          <div className="text-2xl md:text-3xl font-bold text-emerald-600">Dynamic</div>
        </div>
        <div className="glass-panel bg-white p-4 md:p-5 rounded-xl shadow-sm border-l-4 border-blue-500">
          <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">{t.stat_value}</div>
          <div className="text-2xl md:text-3xl font-bold text-blue-600">Max</div>
        </div>
        <div className="glass-panel bg-white p-4 md:p-5 rounded-xl shadow-sm border-l-4 border-red-500">
          <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">{t.stat_avoid}</div>
          <div className="text-2xl md:text-3xl font-bold text-red-600">Var</div>
        </div>
      </div>

      {/* Strategic Plan */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <i className="fa-solid fa-chess-knight text-amber-600"></i> {t.plan_title}
          </h2>
        </div>
        
        {/* Plan Explanation Banner */}
        <div className="mb-6 bg-amber-50 border border-amber-100 rounded-lg p-4 flex gap-3 items-start">
           <i className="fa-solid fa-quote-left text-amber-400 text-xl mt-1 flex-shrink-0"></i>
           <div>
              <h4 className="text-amber-900 font-bold text-sm mb-1">{currentPlan.name}</h4>
              <p className="text-amber-800 text-sm leading-relaxed">{currentPlan.why}</p>
           </div>
        </div>

        {/* Plan Timeline */}
        <div className="flex flex-nowrap overflow-x-auto gap-4 md:grid md:grid-cols-2 lg:grid-cols-5 pb-4 -mx-4 px-4 md:pb-0 md:mx-0 md:px-0 hide-scrollbar snap-x">
          {renderPlanCard('0-15 min', '🥣', t.step1_t, t.step1_d, currentPlan.steps[0])}
          {renderPlanCard('15-45 min', '🥗', t.step2_t, t.step2_d, currentPlan.steps[1])}
          {renderPlanCard('45-75 min', '🍖', t.step3_t, t.step3_d, currentPlan.steps[2])}
          {renderPlanCard('75-100 min', '🍝', t.step4_t, t.step4_d, currentPlan.steps[3])}
          {renderPlanCard('100-120 min', '☕', t.step5_t, t.step5_d, currentPlan.steps[4])}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
