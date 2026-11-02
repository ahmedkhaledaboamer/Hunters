import type { Service } from '../entities';

export const services: Service[] = [
{
  slug: 'digital-transformation',
  image: "/e7b9f78b-8c03-4b66-a20a-45818409571c.webp",
  index: 1,
  category: 'consulting',
  icon: 'compass',
  title: { ar: 'التحول الرقمي والاستشارات التقنية', en: 'Digital Transformation & Technology Consulting' },
  short: {
    ar: 'تطوير البنية التشغيلية والتقنية للمؤسسة من التقييم إلى القياس.',
    en: 'Evolving operational and technical foundations — from assessment to measurement.'
  },
  summary: {
    ar: 'نساعد المؤسسات على تطوير بنيتها التشغيلية والتقنية من خلال:',
    en: 'We help organizations develop their operational and technical infrastructure through:'
  },
  capabilities: [
  { ar: 'تقييم النضج الرقمي والقدرات التقنية الحالية.', en: 'Assessing digital maturity and current technical capabilities.' },
  { ar: 'تحليل الإجراءات والعمليات وتحديد فرص التحسين.', en: 'Analyzing procedures and processes to identify improvement opportunities.' },
  { ar: 'إعداد استراتيجيات التحول الرقمي وخارطة التنفيذ.', en: 'Preparing digital transformation strategies and implementation roadmaps.' },
  { ar: 'إعادة تصميم الإجراءات وسير العمل بين الإدارات.', en: 'Redesigning procedures and workflows across departments.' },
  { ar: 'اختيار الأنظمة والمنصات التقنية المناسبة.', en: 'Selecting the right systems and technology platforms.' },
  { ar: 'تكامل الأنظمة وتوحيد مصادر البيانات.', en: 'Integrating systems and unifying data sources.' },
  { ar: 'إدارة المشاريع التقنية ومتابعة التنفيذ.', en: 'Managing technology projects and following up on execution.' },
  { ar: 'وضع مؤشرات الأداء وقياس نتائج التحول.', en: 'Defining KPIs and measuring transformation outcomes.' }],

  industries: ['government', 'industrial', 'service-companies'],
  related: ['erp-enterprise', 'automation-integration', 'business-intelligence']
},
{
  slug: 'artificial-intelligence',
  image: "/1f9a226c-ef70-40ca-b110-b7e076324db0.webp",
  index: 2,
  category: 'ai',
  icon: 'brain',
  title: { ar: 'حلول الذكاء الاصطناعي', en: 'Artificial Intelligence Solutions' },
  short: {
    ar: 'مساعدات ووكلاء ذكيون وتحليلات تدعم القرار ضمن ضوابط معتمدة.',
    en: 'Assistants, agents and analytics that support decisions within approved controls.'
  },
  summary: {
    ar: 'نوظف تقنيات الذكاء الاصطناعي لتطوير حلول تدعم الأعمال وتُحسن جودة القرارات وكفاءة التشغيل.',
    en: 'We apply artificial intelligence to build solutions that support the business and improve decision quality and operational efficiency.'
  },
  capabilities: [
  { ar: 'المساعدات الذكية لخدمة العملاء والمبيعات.', en: 'Intelligent assistants for customer service and sales.' },
  { ar: 'وكلاء الذكاء الاصطناعي لتنفيذ مهام محددة ضمن ضوابط معتمدة.', en: 'AI agents that execute defined tasks within approved controls.' },
  { ar: 'تحليل البيانات واستخراج الرؤى التجارية.', en: 'Data analysis and business insight extraction.' },
  { ar: 'أتمتة معالجة المستندات والمعلومات.', en: 'Automated document and information processing.' },
  { ar: 'أنظمة التفاعل الذكي مع العملاء عبر القنوات الرقمية.', en: 'Intelligent customer engagement across digital channels.' },
  { ar: 'التنبؤ بالطلب والاتجاهات عند توافر البيانات المناسبة.', en: 'Demand and trend forecasting where suitable data is available.' },
  { ar: 'تخصيص تجربة العملاء والمحتوى التسويقي.', en: 'Personalized customer experiences and marketing content.' },
  { ar: 'دمج نماذج الذكاء الاصطناعي مع الأنظمة المؤسسية.', en: 'Integrating AI models with enterprise systems.' },
  { ar: 'بناء قواعد المعرفة والمساعدات المعتمدة على بيانات المؤسسة.', en: 'Knowledge bases and assistants grounded in organizational data.' }],

  note: {
    ar: 'نصمم الحلول وفق طبيعة الاستخدام، ومتطلبات الأمان والخصوصية، وجودة البيانات، ومستوى الإشراف البشري المطلوب.',
    en: 'We design each solution around its use case, security and privacy requirements, data quality, and the level of human oversight required.'
  },
  industries: ['hospitality', 'service-companies', 'ecommerce-retail', 'healthcare'],
  related: ['ai-marketing', 'business-intelligence', 'automation-integration']
},
{
  slug: 'software-engineering',
  image: "/9d614069-5a9c-4af5-91d5-48427d1f7a46.webp",
  index: 3,
  category: 'engineering',
  icon: 'code',
  title: { ar: 'تطوير البرمجيات والمنصات الرقمية', en: 'Software Engineering & Digital Platforms' },
  short: {
    ar: 'منصات SaaS وتطبيقات وبوابات وواجهات برمجية مصممة للتوسع.',
    en: 'SaaS platforms, apps, portals and APIs engineered to scale.'
  },
  summary: {
    ar: 'نصمم ونطور حلولاً برمجية تلائم احتياجات الأعمال وتدعم التوسع المستقبلي.',
    en: 'We design and build software that fits business needs and supports future growth.'
  },
  capabilities: [
  { ar: 'تطوير منصات SaaS القائمة على الاشتراكات.', en: 'Subscription-based SaaS platform development.' },
  { ar: 'تطوير تطبيقات الهواتف الذكية لنظامي iOS وAndroid.', en: 'Mobile applications for iOS and Android.' },
  { ar: 'تصميم وتطوير المواقع والمنصات الإلكترونية.', en: 'Website and web platform design and development.' },
  { ar: 'تطوير الأنظمة الداخلية وتطبيقات الأعمال.', en: 'Internal systems and business applications.' },
  { ar: 'بناء واجهات برمجية API وربط الخدمات.', en: 'Building APIs and connecting services.' },
  { ar: 'تطوير بوابات العملاء والخدمات الرقمية.', en: 'Customer portals and digital services.' },
  { ar: 'تصميم قواعد البيانات والهياكل البرمجية.', en: 'Database and software architecture design.' },
  { ar: 'تطوير لوحات التحكم والتقارير التشغيلية.', en: 'Dashboards and operational reporting.' },
  { ar: 'الصيانة التقنية والتحديثات والتطوير المستمر.', en: 'Technical maintenance, updates and continuous development.' }],

  industries: ['tech-providers', 'ecommerce-retail', 'government'],
  related: ['ui-ux-design', 'automation-integration', 'artificial-intelligence']
},
{
  slug: 'erp-enterprise',
  image: "/0dea776c-c90c-4260-98e0-fa38c7abb5f7.webp",
  index: 4,
  category: 'enterprise',
  icon: 'layers',
  title: { ar: 'تخطيط موارد المؤسسات والأنظمة الإدارية', en: 'ERP & Enterprise Systems' },
  short: {
    ar: 'ربط الإدارات في بيئة تشغيلية موحدة تناسب حجم المؤسسة.',
    en: 'Connecting departments in one unified operating environment, sized to fit.'
  },
  summary: {
    ar: 'نساعد المؤسسات على ربط إداراتها في بيئة تشغيلية موحدة، بما يتناسب مع حجم المؤسسة وطبيعة نشاطها.',
    en: 'We help organizations connect their departments in a unified operating environment, matched to their size and activity.'
  },
  capabilities: [
  { ar: 'الإدارة المالية والمحاسبية.', en: 'Finance and accounting.' },
  { ar: 'المشتريات والموردين.', en: 'Procurement and suppliers.' },
  { ar: 'الموارد البشرية وشؤون الموظفين.', en: 'Human resources and employee affairs.' },
  { ar: 'إدارة المشاريع والمهام.', en: 'Project and task management.' },
  { ar: 'المخزون والمستودعات والأصول.', en: 'Inventory, warehouses and assets.' },
  { ar: 'المبيعات وعلاقات العملاء.', en: 'Sales and customer relationships.' },
  { ar: 'العقود والمستندات.', en: 'Contracts and documents.' },
  { ar: 'الصيانة وإدارة أوامر العمل.', en: 'Maintenance and work-order management.' },
  { ar: 'التقارير التنفيذية ومؤشرات الأداء.', en: 'Executive reporting and KPIs.' },
  { ar: 'تكامل البيانات بين الإدارات والأنظمة.', en: 'Data integration across departments and systems.' }],

  note: {
    ar: 'ويُحدد نطاق التنفيذ وفق تحليل احتياجات العميل، سواء من خلال تطوير نظام مخصص أو تهيئة حلول قائمة وربطها.',
    en: 'Implementation scope is defined by analyzing client needs — whether through a custom-built system or by configuring and connecting existing solutions.'
  },
  industries: ['industrial', 'facility-management', 'government', 'healthcare'],
  related: ['business-intelligence', 'automation-integration', 'digital-transformation']
},
{
  slug: 'automation-integration',
  image: "/ecc013b3-f668-4d9f-8041-25121ad57ea5.webp",
  index: 5,
  category: 'engineering',
  icon: 'workflow',
  title: { ar: 'الأتمتة الذكية وتكامل الأنظمة', en: 'Intelligent Automation & Systems Integration' },
  short: {
    ar: 'تحويل الإجراءات المتكررة إلى تدفقات عمل رقمية منظمة.',
    en: 'Turning repetitive procedures into structured digital workflows.'
  },
  summary: {
    ar: 'نحوّل الإجراءات المتكررة إلى تدفقات عمل رقمية منظمة، تقلل التدخل اليدوي وتدعم سرعة الإنجاز.',
    en: 'We turn repetitive procedures into structured digital workflows that reduce manual intervention and speed up delivery.'
  },
  capabilities: [
  { ar: 'أتمتة الإجراءات الإدارية والتشغيلية.', en: 'Automating administrative and operational procedures.' },
  { ar: 'تصميم تدفقات العمل بين الإدارات.', en: 'Designing cross-department workflows.' },
  { ar: 'تكامل أنظمة CRM وERP والمنصات الرقمية.', en: 'Integrating CRM, ERP and digital platforms.' },
  { ar: 'أتمتة الإشعارات والتقارير والمتابعات.', en: 'Automating notifications, reports and follow-ups.' },
  { ar: 'ربط البريد الإلكتروني والرسائل والقنوات المعتمدة.', en: 'Connecting email, messaging and approved channels.' },
  { ar: 'أتمتة استقبال الطلبات وتوجيهها إلى المسؤول المختص.', en: 'Automated request intake and routing to the right owner.' },
  { ar: 'تطوير آليات الموافقات والتصعيد والمتابعة.', en: 'Approval, escalation and follow-up mechanisms.' },
  { ar: 'تصميم عمليات آلية باستخدام منصات الأتمتة المناسبة.', en: 'Automated processes on the right automation platforms.' },
  { ar: 'مراقبة تنفيذ التدفقات ومعالجة الأخطاء.', en: 'Monitoring workflow execution and handling errors.' }],

  industries: ['surveillance-smart-buildings', 'service-companies', 'facility-management', 'healthcare'],
  related: ['erp-enterprise', 'artificial-intelligence', 'software-engineering']
},
{
  slug: 'business-intelligence',
  image: "/9428f1f9-7870-4890-8f1c-a52e533a8d96.webp",
  index: 6,
  category: 'enterprise',
  icon: 'activity',
  title: { ar: 'ذكاء الأعمال وتحليلات البيانات', en: 'Business Intelligence & Data Analytics' },
  short: {
    ar: 'من التقارير التقليدية إلى رؤية تشغيلية تعتمد على البيانات.',
    en: 'From traditional reports to a data-driven operational view.'
  },
  summary: {
    ar: 'نساعد الإدارة على الانتقال من التقارير التقليدية إلى رؤية تشغيلية تعتمد على البيانات.',
    en: 'We help leadership move from traditional reports to a data-driven operational view.'
  },
  capabilities: [
  { ar: 'بناء لوحات مؤشرات الأداء KPI Dashboards.', en: 'Building KPI dashboards.' },
  { ar: 'تحليل أداء الإدارات والمشاريع.', en: 'Department and project performance analysis.' },
  { ar: 'تحليل المبيعات والعملاء والإيرادات.', en: 'Sales, customer and revenue analysis.' },
  { ar: 'قياس كفاءة العمليات والإنتاجية.', en: 'Measuring process efficiency and productivity.' },
  { ar: 'توحيد البيانات من مصادر متعددة.', en: 'Unifying data from multiple sources.' },
  { ar: 'تطوير التقارير التنفيذية الدورية.', en: 'Periodic executive reporting.' },
  { ar: 'دعم التخطيط والتوقعات المبنية على البيانات.', en: 'Data-driven planning and forecasting.' },
  { ar: 'توفير مؤشرات تساعد على اكتشاف الانحرافات والمخاطر.', en: 'Indicators that surface deviations and risks.' }],

  industries: ['industrial', 'ecommerce-retail', 'government', 'healthcare'],
  related: ['erp-enterprise', 'artificial-intelligence', 'digital-transformation']
},
{
  slug: 'ai-marketing',
  image: "/fa3dec85-2592-4e88-bfb0-f93573d7c94f.webp",
  index: 7,
  category: 'growth',
  icon: 'trending',
  title: { ar: 'التسويق الذكي ونمو الأعمال', en: 'AI Marketing & Business Growth' },
  short: {
    ar: 'ربط التكنولوجيا بالأهداف التجارية للتسويق والمبيعات.',
    en: 'Connecting technology to commercial goals across marketing and sales.'
  },
  summary: {
    ar: 'نربط التكنولوجيا بالأهداف التجارية لتطوير التسويق والمبيعات وتجربة العملاء.',
    en: 'We connect technology to commercial goals to advance marketing, sales and customer experience.'
  },
  capabilities: [
  { ar: 'إعداد استراتيجيات التسويق الرقمي.', en: 'Digital marketing strategies.' },
  { ar: 'أتمتة الحملات التسويقية والمتابعات.', en: 'Campaign and follow-up automation.' },
  { ar: 'إدارة العملاء المحتملين وتأهيلهم.', en: 'Lead management and qualification.' },
  {
    ar: 'تطوير حلول التسويق عبر WhatsApp والبريد الإلكتروني والرسائل النصية، وفق ضوابط القنوات المعتمدة.',
    en: 'WhatsApp, email and SMS marketing solutions within approved channel policies.'
  },
  { ar: 'بناء مسارات تحويل العملاء من الاهتمام إلى الشراء.', en: 'Conversion journeys from interest to purchase.' },
  { ar: 'تحليل أداء الحملات والعائد التسويقي.', en: 'Campaign performance and marketing return analysis.' },
  { ar: 'تخصيص المحتوى والعروض بناءً على البيانات المتاحة.', en: 'Personalized content and offers based on available data.' },
  { ar: 'تطوير آليات الاحتفاظ بالعملاء وتنشيطهم.', en: 'Customer retention and reactivation mechanisms.' },
  { ar: 'ربط أنشطة التسويق بأنظمة CRM والمبيعات.', en: 'Connecting marketing activity to CRM and sales systems.' }],

  industries: ['ecommerce-retail', 'hospitality', 'service-companies'],
  related: ['artificial-intelligence', 'ui-ux-design', 'business-intelligence']
},
{
  slug: 'ui-ux-design',
  image: "/435c0ac9-60bc-42dc-91ab-62d53c7ffa2e.webp",
  index: 8,
  category: 'design',
  icon: 'pen',
  title: { ar: 'تجربة المستخدم وتصميم المنتجات الرقمية', en: 'UI/UX & Digital Product Design' },
  short: {
    ar: 'تجارب رقمية توازن بين سهولة الاستخدام والأهداف التجارية.',
    en: 'Digital experiences balancing usability with business goals.'
  },
  summary: {
    ar: 'نصمم تجارب رقمية توازن بين سهولة الاستخدام، والأهداف التجارية، والكفاءة التشغيلية.',
    en: 'We design digital experiences that balance usability, business goals and operational efficiency.'
  },
  capabilities: [
  { ar: 'أبحاث المستخدمين وتحليل الاحتياجات.', en: 'User research and needs analysis.' },
  { ar: 'تصميم رحلات العملاء.', en: 'Customer journey design.' },
  { ar: 'تصميم واجهات التطبيقات والمنصات.', en: 'Application and platform interface design.' },
  { ar: 'إعداد النماذج الأولية واختبار قابلية الاستخدام.', en: 'Prototyping and usability testing.' },
  { ar: 'تصميم لوحات التحكم وتجارب الموظفين.', en: 'Dashboard and employee experience design.' },
  { ar: 'تحسين تجربة التحويل والشراء.', en: 'Conversion and checkout optimization.' },
  { ar: 'تطوير أنظمة تصميم موحدة للمنتجات الرقمية.', en: 'Unified design systems for digital products.' }],

  industries: ['tech-providers', 'ecommerce-retail', 'hospitality'],
  related: ['software-engineering', 'ai-marketing', 'digital-transformation']
}];


export const serviceCategories = ['consulting', 'ai', 'engineering', 'enterprise', 'growth', 'design'] as const;