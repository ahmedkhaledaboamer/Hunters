import type { Industry } from '../entities';

/** Focus areas come from the company profile. Challenges are editable draft copy. */
export const industries: Industry[] = [
{
  slug: 'government',
  icon: 'landmark',
  title: { ar: 'الجهات الحكومية وشبه الحكومية', en: 'Government & Semi-Government' },
  focus: [
  { ar: 'رقمنة الخدمات', en: 'Service digitization' },
  { ar: 'أتمتة الإجراءات', en: 'Procedure automation' },
  { ar: 'تطوير التقارير', en: 'Reporting development' }],

  image: "/ee301a9f-03d5-4c3c-a2e6-ebdd895d3d68.webp",
  challenges: [
  { ar: 'إجراءات ورقية متعددة الخطوات بين الإدارات.', en: 'Multi-step paper procedures spread across departments.' },
  { ar: 'صعوبة متابعة حالة الطلبات والمعاملات.', en: 'Limited visibility into request and transaction status.' },
  { ar: 'تقارير تُجمع يدوياً من مصادر متفرقة.', en: 'Reports compiled manually from scattered sources.' }],

  services: ['digital-transformation', 'automation-integration', 'business-intelligence']
},
{
  slug: 'healthcare',
  icon: 'heart',
  title: { ar: 'القطاع الطبي والرعاية الصحية', en: 'Healthcare & Medical' },
  focus: [
  { ar: 'أنظمة إدارة المستشفيات والعيادات', en: 'Hospital & clinic management systems' },
  { ar: 'المواعيد وتجربة المرضى', en: 'Appointments & patient experience' },
  { ar: 'تحليلات البيانات الطبية والتشغيلية', en: 'Clinical & operational analytics' }],

  image: "/435c0ac9-60bc-42dc-91ab-62d53c7ffa2e.webp",
  challenges: [
  { ar: 'ملفات المرضى موزعة بين أنظمة منفصلة تصعّب الحصول على صورة كاملة.', en: 'Patient records spread across separate systems, with no single complete view.' },
  { ar: 'مواعيد وقوائم انتظار تُدار يدوياً وتؤثر على تجربة المريض.', en: 'Appointments and waiting lists handled manually, affecting the patient experience.' },
  { ar: 'صعوبة متابعة المخزون الطبي والتكاليف والأداء التشغيلي.', en: 'Limited visibility into medical inventory, costs and operational performance.' }],

  services: ['erp-enterprise', 'artificial-intelligence', 'business-intelligence']
},
{
  slug: 'ecommerce-retail',
  icon: 'shopping',
  title: { ar: 'التجارة الإلكترونية والتجزئة', en: 'E-commerce & Retail' },
  focus: [
  { ar: 'المنصات الرقمية', en: 'Digital platforms' },
  { ar: 'إدارة الطلبات', en: 'Order management' },
  { ar: 'تحليلات العملاء', en: 'Customer analytics' }],

  image: "/fa3dec85-2592-4e88-bfb0-f93573d7c94f.webp",
  challenges: [
  { ar: 'قنوات بيع منفصلة عن المخزون والطلبات.', en: 'Sales channels disconnected from inventory and orders.' },
  { ar: 'بيانات عملاء غير موحدة تصعّب التخصيص.', en: 'Fragmented customer data that limits personalization.' },
  { ar: 'متابعة يدوية للطلبات وخدمة ما بعد البيع.', en: 'Manual order tracking and after-sales follow-up.' }],

  services: ['software-engineering', 'ai-marketing', 'business-intelligence']
},
{
  slug: 'facility-management',
  icon: 'hardhat',
  title: { ar: 'المقاولات وإدارة المرافق والصيانة', en: 'Contracting & Facility Management' },
  focus: [
  { ar: 'إدارة المشاريع', en: 'Project management' },
  { ar: 'أوامر العمل', en: 'Work orders' },
  { ar: 'الأصول', en: 'Assets' },
  { ar: 'البلاغات', en: 'Incident reporting' }],

  image: "/7396decc-4313-4eb0-ba97-7222a3748381.webp",
  challenges: [
  { ar: 'أوامر عمل وبلاغات تُدار عبر الهاتف والرسائل.', en: 'Work orders and incidents managed over phone and chat.' },
  { ar: 'ضعف الرؤية على حالة الأصول وجداول الصيانة.', en: 'Little visibility into asset condition and maintenance schedules.' },
  { ar: 'صعوبة ربط تقدم المشاريع بالتكاليف.', en: 'Hard to link project progress with costs.' }],

  services: ['erp-enterprise', 'automation-integration', 'software-engineering']
},
{
  slug: 'surveillance-smart-buildings',
  icon: 'cctv',
  title: { ar: 'أنظمة المراقبة والمباني الذكية', en: 'Surveillance & Smart Buildings' },
  focus: [
  { ar: 'تكامل الأنظمة', en: 'Systems integration' },
  { ar: 'إدارة الخدمات', en: 'Service management' },
  { ar: 'أتمتة العمليات', en: 'Process automation' }],

  image: "/435c0ac9-60bc-42dc-91ab-62d53c7ffa2e.webp",
  challenges: [
  { ar: 'أنظمة ميدانية متعددة لا تتحدث مع بعضها.', en: 'Multiple field systems that do not talk to each other.' },
  { ar: 'تنبيهات كثيرة دون توجيه واضح للمسؤول.', en: 'High alert volume without clear routing to an owner.' },
  { ar: 'إدارة عقود الخدمة والزيارات يدوياً.', en: 'Service contracts and site visits handled manually.' }],

  services: ['automation-integration', 'software-engineering', 'business-intelligence']
},
{
  slug: 'hospitality',
  icon: 'utensils',
  title: { ar: 'المطاعم والضيافة', en: 'Restaurants & Hospitality' },
  focus: [
  { ar: 'الطلبات الرقمية', en: 'Digital ordering' },
  { ar: 'المساعدات الذكية', en: 'Intelligent assistants' },
  { ar: 'إدارة تجربة العملاء', en: 'Customer experience management' }],

  image: "/07e40ff4-c017-4ffd-ac58-71db8caa2838.webp",
  challenges: [
  { ar: 'ضغط الاستفسارات والحجوزات في أوقات الذروة.', en: 'Peak-time pressure on inquiries and reservations.' },
  { ar: 'تجربة عملاء غير متسقة بين الفروع والقنوات.', en: 'Inconsistent guest experience across branches and channels.' },
  { ar: 'بيانات الطلبات لا تُستثمر في القرار.', en: 'Order data that rarely informs decisions.' }],

  services: ['artificial-intelligence', 'ai-marketing', 'ui-ux-design']
},
{
  slug: 'service-companies',
  icon: 'headset',
  title: { ar: 'الشركات الخدمية', en: 'Service Companies' },
  focus: [
  { ar: 'CRM', en: 'CRM' },
  { ar: 'أتمتة المبيعات', en: 'Sales automation' },
  { ar: 'خدمة العملاء', en: 'Customer service' },
  { ar: 'إدارة العمليات', en: 'Operations management' }],

  image: "/56f04271-342f-4245-851b-e193276f52bc.webp",
  challenges: [
  { ar: 'فرص بيع تضيع بسبب ضعف المتابعة.', en: 'Sales opportunities lost to weak follow-up.' },
  { ar: 'طلبات العملاء موزعة على قنوات متعددة.', en: 'Customer requests scattered across many channels.' },
  { ar: 'غياب مؤشرات واضحة لأداء الفرق.', en: 'No clear indicators of team performance.' }],

  services: ['automation-integration', 'artificial-intelligence', 'ai-marketing']
},
{
  slug: 'tech-providers',
  icon: 'cpu',
  title: { ar: 'الشركات التقنية ومزودو الخدمات', en: 'Tech Companies & Service Providers' },
  focus: [
  { ar: 'تطوير المنتجات الرقمية', en: 'Digital product development' },
  { ar: 'المنصات القائمة على الاشتراكات', en: 'Subscription-based platforms' }],

  image: "/ecc013b3-f668-4d9f-8041-25121ad57ea5.webp",
  challenges: [
  { ar: 'الحاجة لإطلاق منتجات بسرعة دون التضحية بالجودة.', en: 'Shipping products quickly without sacrificing quality.' },
  { ar: 'بنية تقنية لا تواكب نمو المشتركين.', en: 'Architecture that struggles as subscribers grow.' },
  { ar: 'تجربة استخدام تحتاج إلى توحيد وتبسيط.', en: 'User experience that needs unifying and simplifying.' }],

  services: ['software-engineering', 'ui-ux-design', 'artificial-intelligence']
},
{
  slug: 'industrial',
  icon: 'factory',
  title: { ar: 'المؤسسات التجارية والصناعية', en: 'Commercial & Industrial Enterprises' },
  focus: [
  { ar: 'تخطيط الموارد', en: 'Resource planning' },
  { ar: 'تحليلات البيانات', en: 'Data analytics' },
  { ar: 'تكامل الأنظمة', en: 'Systems integration' }],

  image: "/0dea776c-c90c-4260-98e0-fa38c7abb5f7.webp",
  challenges: [
  { ar: 'إدارات تعمل بأنظمة وجداول منفصلة.', en: 'Departments running on separate systems and spreadsheets.' },
  { ar: 'تأخر وصول البيانات إلى الإدارة العليا.', en: 'Data reaching leadership too late to act on.' },
  { ar: 'صعوبة التنبؤ بالطلب وإدارة المخزون.', en: 'Difficulty forecasting demand and managing inventory.' }],

  services: ['erp-enterprise', 'business-intelligence', 'digital-transformation']
}];