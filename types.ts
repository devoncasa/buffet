
export interface MenuItem {
  n: string; // Name
  c: string; // Category
  h: string; // Highlight
  cost: number;
  val: number;
  s: number; // Status: 0=Avoid, 1=Neutral, 2=Recommended, 3=Must Try
  r_th: string; // Recommendation TH
  r_en: string; // Recommendation EN
  // New Details
  ing_th: string;
  ing_en: string;
  kcal: number;
  protein: string;
  fat: string;
  carbs: string;
  sugar?: string; // Specific for beverages or desserts
}

export type Lang = 'th' | 'en';

export interface TranslationSet {
  nav_dash: string;
  nav_menu: string;
  nav_bev: string;
  nav_dash_short: string;
  nav_menu_short: string;
  nav_bev_short: string;
  filter_all: string;
  filter_rec: string;
  filter_avoid: string;
  cat_all: string;
  th_menu: string;
  th_cat: string;
  th_key: string;
  th_val: string;
  th_status: string;
  click_hint: string;
  modal_ing: string;
  modal_nutri_grid: string;
  modal_nutri_highlight: string;
  modal_cost: string;
  modal_cost_sub: string;
  modal_val: string;
  modal_val_sub: string;
  modal_advice: string;
  modal_close: string;
  about_title: string;
  about_sub: string;
  about_atmosphere: string;
  about_atm_desc: string;
  about_why: string;
  about_why_desc: string;
  stat_total: string;
  stat_safe: string;
  stat_value: string;
  stat_avoid: string;
  plan_title: string;
  plan_name_1: string; plan_why_1: string;
  plan_name_2: string; plan_why_2: string;
  plan_name_3: string; plan_why_3: string;
  plan_name_4: string; plan_why_4: string;
  plan_name_5: string; plan_why_5: string;
  step1_t: string; step1_d: string;
  step2_t: string; step2_d: string;
  step3_t: string; step3_d: string;
  step4_t: string; step4_d: string;
  step5_t: string; step5_d: string;
  bev_advice_title: string;
  bev_advice_desc: string;
  bev_soft: string;
  bev_mock: string;
  bev_coffee: string;
  bev_spec: string;
  nutri_cal: string;
  nutri_prot: string;
  nutri_fat: string;
  nutri_carb: string;
  nutri_sugar: string;
}

export interface Translations {
  th: TranslationSet;
  en: TranslationSet;
}
