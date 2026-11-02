import type { Consultant, Location, Market, Milestone, Partner, Position } from '../entities';

/* ------------------------------------------------------------------ */
/* PLACEHOLDER DATA — replace with real company content before launch */
/* ------------------------------------------------------------------ */

const partnerAbout = {
  ar: 'نص تجريبي — يُستبدل بنبذة عن الشريك ومجالات التعاون الفعلية.',
  en: 'Placeholder copy — replace with a description of the partner and the actual areas of collaboration.'
};

export const partners: Partner[] = [
{ slug: 'partner-alpha', name: 'Partner Name A', monogram: 'A', category: 'technology', type: { ar: 'شريك تقني', en: 'Technology partner' }, description: { ar: 'منصات أعمال وتطبيقات مؤسسية.', en: 'Business platforms and enterprise applications.' }, about: partnerAbout, capabilities: [{ ar: 'تكامل الأنظمة', en: 'Systems integration' }, { ar: 'تهيئة المنصات', en: 'Platform configuration' }], services: ['erp-enterprise', 'automation-integration'] },
{ slug: 'partner-beta', name: 'Partner Name B', monogram: 'B', category: 'technology', type: { ar: 'شريك تقني', en: 'Technology partner' }, description: { ar: 'أدوات تطوير وإدارة المنتجات.', en: 'Development and product tooling.' }, about: partnerAbout, capabilities: [{ ar: 'تطوير المنتجات', en: 'Product development' }, { ar: 'واجهات برمجية', en: 'APIs' }], services: ['software-engineering', 'ui-ux-design'] },
{ slug: 'partner-gamma', name: 'Partner Name C', monogram: 'C', category: 'cloud', type: { ar: 'شريك سحابي', en: 'Cloud partner' }, description: { ar: 'بنية سحابية واستضافة.', en: 'Cloud infrastructure and hosting.' }, about: partnerAbout, capabilities: [{ ar: 'الاستضافة السحابية', en: 'Cloud hosting' }, { ar: 'النسخ الاحتياطي', en: 'Backup & recovery' }], services: ['software-engineering', 'digital-transformation'] },
{ slug: 'partner-delta', name: 'Partner Name D', monogram: 'D', category: 'cloud', type: { ar: 'شريك بنية تحتية', en: 'Infrastructure partner' }, description: { ar: 'شبكات ومراكز بيانات.', en: 'Networks and data centers.' }, about: partnerAbout, capabilities: [{ ar: 'البنية التحتية', en: 'Infrastructure' }, { ar: 'المراقبة', en: 'Monitoring' }], services: ['automation-integration'] },
{ slug: 'partner-epsilon', name: 'Partner Name E', monogram: 'E', category: 'ai', type: { ar: 'منصة ذكاء اصطناعي', en: 'AI platform' }, description: { ar: 'نماذج لغوية وأدوات ذكاء اصطناعي.', en: 'Language models and AI tooling.' }, about: partnerAbout, capabilities: [{ ar: 'المساعدات الذكية', en: 'Intelligent assistants' }, { ar: 'قواعد المعرفة', en: 'Knowledge bases' }], services: ['artificial-intelligence', 'ai-marketing'] },
{ slug: 'partner-zeta', name: 'Partner Name F', monogram: 'F', category: 'ai', type: { ar: 'منصة ذكاء اصطناعي', en: 'AI platform' }, description: { ar: 'تحليلات وتعلم آلي.', en: 'Analytics and machine learning.' }, about: partnerAbout, capabilities: [{ ar: 'تحليل البيانات', en: 'Data analysis' }, { ar: 'التنبؤ', en: 'Forecasting' }], services: ['business-intelligence', 'artificial-intelligence'] },
{ slug: 'partner-eta', name: 'Partner Name G', monogram: 'G', category: 'channel', type: { ar: 'شريك تنفيذ', en: 'Implementation partner' }, description: { ar: 'تنفيذ ميداني ودعم.', en: 'Field implementation and support.' }, about: partnerAbout, capabilities: [{ ar: 'التنفيذ', en: 'Implementation' }, { ar: 'التدريب', en: 'Training' }], services: ['erp-enterprise', 'digital-transformation'] },
{ slug: 'partner-theta', name: 'Partner Name H', monogram: 'H', category: 'channel', type: { ar: 'شريك قنوات', en: 'Channel partner' }, description: { ar: 'توزيع وتمثيل إقليمي.', en: 'Regional distribution and representation.' }, about: partnerAbout, capabilities: [{ ar: 'الوصول للأسواق', en: 'Market access' }, { ar: 'إدارة الحسابات', en: 'Account management' }], services: ['ai-marketing'] }];


export const milestones: Milestone[] = [
{ id: 'm1', year: '20XX', placeholder: true, title: { ar: 'التأسيس', en: 'Founding' }, description: { ar: 'تأسيس اتش هانترز لحلول التكنولوجيا في أبوظبي. — نص تجريبي قابل للتعديل.', en: 'H HUNTERS Technology Solutions is founded in Abu Dhabi. — Editable placeholder.' } },
{ id: 'm2', year: '20XX', placeholder: true, title: { ar: 'أول مشروع مؤسسي', en: 'First enterprise project' }, description: { ar: 'تنفيذ أول مشروع تحول رقمي لمؤسسة. — نص تجريبي.', en: 'Delivery of the first enterprise transformation project. — Placeholder.' } },
{ id: 'm3', year: '20XX', placeholder: true, title: { ar: 'إطلاق وحدة الذكاء الاصطناعي', en: 'AI division launch' }, description: { ar: 'تأسيس فريق متخصص في حلول الذكاء الاصطناعي. — نص تجريبي.', en: 'A dedicated AI solutions team is formed. — Placeholder.' } },
{ id: 'm4', year: '20XX', placeholder: true, title: { ar: 'التوسع الإقليمي', en: 'Regional expansion' }, description: { ar: 'خدمة عملاء في أسواق الخليج. — نص تجريبي.', en: 'Serving clients across Gulf markets. — Placeholder.' } },
{ id: 'm5', year: '20XX', placeholder: true, title: { ar: 'رؤية المستقبل', en: 'Future vision' }, description: { ar: 'الانتقال من الأدوات الرقمية المنفصلة إلى منظومات ذكية مترابطة.', en: 'Moving from disconnected digital tools to connected intelligent ecosystems.' } }];


export const headquarters: Location = {
  id: 'abu-dhabi',
  city: { ar: 'أبوظبي', en: 'Abu Dhabi' },
  country: { ar: 'الإمارات العربية المتحدة', en: 'United Arab Emirates' },
  address: { ar: '[يُضاف العنوان] — أبوظبي، الإمارات العربية المتحدة', en: '[Address to be added] — Abu Dhabi, United Arab Emirates' },
  hours: { ar: 'الإثنين – الجمعة · ٩:٠٠ – ١٨:٠٠ (توقيت الخليج)', en: 'Monday – Friday · 9:00 – 18:00 GST' },
  lon: 54.37,
  lat: 24.45,
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Abu+Dhabi+United+Arab+Emirates',
  image: "/6e2472fd-9929-4b77-a155-2ecbbbacc28f.webp"
};

export const markets: Market[] = [
{ id: 'ksa', name: { ar: 'السعودية', en: 'KSA' }, lon: 46.7, lat: 24.7 },
{ id: 'qatar', name: { ar: 'قطر', en: 'Qatar' }, lon: 51.53, lat: 25.29 },
{ id: 'kuwait', name: { ar: 'الكويت', en: 'Kuwait' }, lon: 47.98, lat: 29.37 },
{ id: 'bahrain', name: { ar: 'البحرين', en: 'Bahrain' }, lon: 50.58, lat: 26.22 },
{ id: 'oman', name: { ar: 'عُمان', en: 'Oman' }, lon: 58.4, lat: 23.59 },
{ id: 'egypt', name: { ar: 'مصر', en: 'Egypt' }, lon: 31.24, lat: 30.04 }];


export const consultants: Consultant[] = [
{ id: 'c1', initials: 'C1', name: { ar: 'اسم المستشار ١', en: 'Consultant Name 1' }, role: { ar: 'مستشار تحول رقمي', en: 'Transformation Consultant' }, specializations: ['digital-transformation', 'erp-enterprise'], languages: ['ar', 'en'] },
{ id: 'c2', initials: 'C2', name: { ar: 'اسم المستشار ٢', en: 'Consultant Name 2' }, role: { ar: 'مهندس حلول ذكاء اصطناعي', en: 'AI Solutions Architect' }, specializations: ['artificial-intelligence', 'business-intelligence'], languages: ['en'] },
{ id: 'c3', initials: 'C3', name: { ar: 'اسم المستشار ٣', en: 'Consultant Name 3' }, role: { ar: 'قائد هندسة البرمجيات', en: 'Engineering Lead' }, specializations: ['software-engineering', 'automation-integration'], languages: ['ar', 'en'] },
{ id: 'c4', initials: 'C4', name: { ar: 'اسم المستشار ٤', en: 'Consultant Name 4' }, role: { ar: 'مستشار نمو وتسويق', en: 'Growth Consultant' }, specializations: ['ai-marketing', 'ui-ux-design'], languages: ['ar'] }];


export const positions: Position[] = [
{ id: 'p1', department: 'engineering', title: { ar: 'مهندس برمجيات أول (مسمى تجريبي)', en: 'Senior Software Engineer (placeholder)' }, type: { ar: 'دوام كامل', en: 'Full-time' }, location: { ar: 'أبوظبي', en: 'Abu Dhabi' }, summary: { ar: 'بناء منصات وأنظمة أعمال قابلة للتوسع.', en: 'Build scalable platforms and business systems.' }, responsibilities: [{ ar: 'تطوير واجهات برمجية وخدمات', en: 'Develop APIs and services' }, { ar: 'مراجعة الشيفرة وضمان الجودة', en: 'Code review and quality' }, { ar: 'التعاون مع فرق التصميم', en: 'Collaborate with design' }] },
{ id: 'p2', department: 'ai', title: { ar: 'مهندس ذكاء اصطناعي (مسمى تجريبي)', en: 'AI Engineer (placeholder)' }, type: { ar: 'دوام كامل', en: 'Full-time' }, location: { ar: 'أبوظبي / هجين', en: 'Abu Dhabi / Hybrid' }, summary: { ar: 'تطوير مساعدات ووكلاء ذكية ضمن ضوابط معتمدة.', en: 'Build assistants and agents within approved controls.' }, responsibilities: [{ ar: 'دمج النماذج مع الأنظمة', en: 'Integrate models with systems' }, { ar: 'بناء قواعد المعرفة', en: 'Build knowledge bases' }, { ar: 'تقييم الجودة والأمان', en: 'Evaluate quality and safety' }] },
{ id: 'p3', department: 'consulting', title: { ar: 'مستشار تحول رقمي (مسمى تجريبي)', en: 'Digital Transformation Consultant (placeholder)' }, type: { ar: 'دوام كامل', en: 'Full-time' }, location: { ar: 'أبوظبي', en: 'Abu Dhabi' }, summary: { ar: 'تحليل العمليات وإعداد خرائط التحول.', en: 'Analyze operations and shape transformation roadmaps.' }, responsibilities: [{ ar: 'ورش عمل مع العملاء', en: 'Client workshops' }, { ar: 'تحليل الوضع الحالي', en: 'Current-state analysis' }, { ar: 'إعداد خارطة الطريق', en: 'Roadmap preparation' }] },
{ id: 'p4', department: 'design', title: { ar: 'مصمم منتجات رقمية (مسمى تجريبي)', en: 'Product Designer (placeholder)' }, type: { ar: 'دوام كامل', en: 'Full-time' }, location: { ar: 'عن بُعد (الخليج)', en: 'Remote (GCC)' }, summary: { ar: 'تصميم تجارب توازن بين سهولة الاستخدام والأهداف التجارية.', en: 'Design experiences that balance usability and business goals.' }, responsibilities: [{ ar: 'أبحاث المستخدمين', en: 'User research' }, { ar: 'النماذج الأولية', en: 'Prototyping' }, { ar: 'أنظمة التصميم', en: 'Design systems' }] },
{ id: 'p5', department: 'engineering', title: { ar: 'مهندس تكامل وأتمتة (مسمى تجريبي)', en: 'Integration & Automation Engineer (placeholder)' }, type: { ar: 'عقد', en: 'Contract' }, location: { ar: 'أبوظبي / هجين', en: 'Abu Dhabi / Hybrid' }, summary: { ar: 'ربط الأنظمة وتصميم تدفقات العمل.', en: 'Connect systems and design workflows.' }, responsibilities: [{ ar: 'تكامل CRM وERP', en: 'CRM & ERP integration' }, { ar: 'بناء التدفقات الآلية', en: 'Build automated flows' }, { ar: 'مراقبة الأخطاء', en: 'Error monitoring' }] }];


export const contactInfo = {
  email: 'info@h.hunters.ai',
  hrEmail: 'hr.hunters2022@gmail.com',
  phone: '+971 50 978 2770',
  /** Still a placeholder (bracketed); hidden in the UI until confirmed. */
  website: '[www.hhunters.ae]'
};

/** Dialable form of a display phone number, for tel: links. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^+d]/g, '')}`;
/** True while a contact value is still a bracketed placeholder. */
export const isPlaceholder = (value: string) => value.startsWith('[');