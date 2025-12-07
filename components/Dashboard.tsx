
import React, { useState } from 'react';
import { Lang, TranslationSet } from '../types';

interface DashboardProps {
  t: TranslationSet;
  lang: Lang;
}

const Dashboard: React.FC<DashboardProps> = ({ t }) => {
  const [activePlan, setActivePlan] = useState<number>(0);

  // Configuration for the 5 plans
  const plans = [
    {
      name: t.plan_name_1,
      why: t.plan_why_1,
      steps: [
        ['Lobster Bisque', 'Mussels (Tomato)', 'Arancini'],
        ['Avocado Salad', 'Quinoa Salad', 'Smoked Duck'],
        ['BBQ Pork Ribs', 'River Prawns', 'Pork Belly'],
        ['Truffle Pizza (1pc)', 'Linguine Vongole'],
        ['Mille-Feuille', 'Berry Sorbet', 'Hot Coffee']
      ]
    },
    {
      name: t.plan_name_2,
      why: t.plan_why_2,
      steps: [
        ['Shrimp Salad', 'Steamed Mussels'],
        ['Smoked Duck', 'Chicken BBQ'],
        ['BBQ Pork Ribs', 'River Prawns'],
        ['Seafood Rigatoni (Toppings)', 'Chicken Roll'],
        ['Espresso', 'Americano']
      ]
    },
    {
      name: t.plan_name_3,
      why: t.plan_why_3,
      steps: [
        ['Avocado Salad', 'Shrimp Salad'],
        ['Quinoa Salad', 'Roasted Veggies'],
        ['Chicken Roll', 'Seafood Pesto'],
        ['Seafood Pesto Spaghetti'],
        ['Berry Sorbet', 'Fresh Water']
      ]
    },
    {
      name: t.plan_name_4,
      why: t.plan_why_4,
      steps: [
        ['Pumpkin Soup', 'Tomato Soup'],
        ['Baby Kale Salad', 'Avocado Salad'],
        ['Chicken Roll', 'Sea Bass (if avail)'],
        ['Mushroom Pizza', 'Truffle Soup'],
        ['Hot Coffee', 'Ginger Ale']
      ]
    },
    {
      name: t.plan_name_5,
      why: t.plan_why_5,
      steps: [
        ['Lobster Bisque', 'Truffle Soup'],
        ['Avocado Salad', 'Parma Ham Arancini'],
        ['Smoked Duck', 'Pork Belly', 'BBQ Ribs'],
        ['Truffle Pizza', 'Linguine Vongole'],
        ['Macadamia Ice Cream', 'Tiramisu']
      ]
    }
  ];

  const currentPlan = plans[activePlan];

  const renderPlanCard = (time: string, icon: string, title: string, desc: string, items: string[]) => {
    return (
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative overflow-hidden group hover:border-amber-300 transition-colors h-full">
        <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded-bl">{time}</div>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl mb-3 shadow-sm">{icon}</div>
        <h3 className="font-bold text-sm mb-1 text-slate-800">{title}</h3>
        <p className="text-[10px] text-slate-500 mb-3 uppercase tracking-wide">{desc}</p>
        <ul className="text-xs space-y-2 text-slate-600">
          {items.map((item, i) => (
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
          <div className="text-3xl font-bold text-slate-800">77</div>
        </div>
        <div className="glass-panel bg-white p-5 rounded-xl shadow-sm border-l-4 border-emerald-500">
          <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">{t.stat_safe}</div>
          <div className="text-3xl font-bold text-emerald-600">48</div>
        </div>
        <div className="glass-panel bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-500">
          <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">{t.stat_value}</div>
          <div className="text-3xl font-bold text-blue-600">฿4,200+</div>
        </div>
        <div className="glass-panel bg-white p-5 rounded-xl shadow-sm border-l-4 border-red-500">
          <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">{t.stat_avoid}</div>
          <div className="text-3xl font-bold text-red-600">29</div>
        </div>
      </div>

      {/* Strategic Plan */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <i className="fa-solid fa-chess-knight text-amber-600"></i> {t.plan_title}
          </h2>
          
          {/* Plan Selector */}
          <div className="flex flex-wrap gap-2">
             {plans.map((p, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActivePlan(idx)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    activePlan === idx 
                      ? 'bg-amber-600 text-white shadow-md transform scale-105' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {p.name}
                </button>
             ))}
          </div>
        </div>
        
        {/* Plan Explanation Banner */}
        <div className="mb-6 bg-amber-50 border border-amber-100 rounded-lg p-4 flex gap-3 items-start">
           <i className="fa-solid fa-quote-left text-amber-400 text-xl mt-1"></i>
           <div>
              <h4 className="text-amber-900 font-bold text-sm mb-1">{currentPlan.name}</h4>
              <p className="text-amber-800 text-sm leading-relaxed">{currentPlan.why}</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
