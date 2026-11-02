import type { FaqItem, HeroSlide, L, Pillar } from '../entities';

export const heroSlides: HeroSlide[] = [
{
  id: 'intelligence',
  eyebrow: 'H HUNTERS TECHNOLOGY SOLUTIONS',
  title: { ar: 'نعيد هندسة الأعمال لعصر الذكاء الاصطناعي', en: 'Engineering the Intelligence of Business' },
  subtitle: {
    ar: 'نصمم ونطور ونكامل الحلول الذكية التي تحول البيانات إلى رؤى، والعمليات إلى أنظمة أكثر كفاءة.',
    en: 'We design, develop and integrate intelligent solutions that turn data into insight and operations into more efficient systems.'
  },
  scene: 'network'
},
{
  id: 'connected',
  eyebrow: 'THE INTELLIGENT BUSINESS MODEL',
  title: { ar: 'تقنيات ذكية. عمليات مترابطة. نمو قابل للقياس.', en: 'Intelligent Technologies. Connected Operations. Measurable Growth.' },
  subtitle: {
    ar: 'مؤسسة مترابطة. بيانات موحدة. عمليات أكثر ذكاءً.',
    en: 'A connected organization. Unified data. Smarter operations.'
  },
  scene: 'flow'
},
{
  id: 'engagement',
  eyebrow: 'AI FOR CUSTOMER SERVICE & SALES',
  title: { ar: 'ما بعد الأتمتة. نحو تفاعل ذكي.', en: 'Beyond Automation. Toward Intelligent Engagement.' },
  subtitle: {
    ar: 'نطوّر حلولاً ذكية تساعد المؤسسات على تحسين تفاعلها مع العملاء وتنظيم عمليات البيع والخدمة عبر القنوات الرقمية.',
    en: 'We build intelligent solutions that help organizations improve customer engagement and organize sales and service across digital channels.'
  },
  scene: 'mesh'
},
{
  id: 'reimagined',
  eyebrow: "LET'S BUILD WHAT'S NEXT",
  title: { ar: 'أعمالكم، بتصوّر جديد يقوده الذكاء.', en: 'Your Business. Reimagined Through Intelligence.' },
  subtitle: {
    ar: 'الخطوة الأولى تبدأ بفهم أهدافكم وتصميم مسار واضح لتحقيقها.',
    en: 'The first step begins with understanding your goals and designing a clear path to achieve them.'
  },
  scene: 'orbit'
}];


export const philosophyShifts: {from: L;to: L;}[] = [
{ from: { ar: 'من الأنظمة المنفصلة', en: 'From disconnected systems' }, to: { ar: 'إلى منظومة مترابطة', en: 'to a connected ecosystem' } },
{ from: { ar: 'من الإجراءات اليدوية', en: 'From manual procedures' }, to: { ar: 'إلى العمليات الذكية', en: 'to intelligent operations' } },
{ from: { ar: 'من البيانات المتفرقة', en: 'From scattered data' }, to: { ar: 'إلى القرارات المدعومة بالذكاء', en: 'to AI-backed decisions' } },
{ from: { ar: 'من التشغيل التقليدي', en: 'From traditional operations' }, to: { ar: 'إلى النمو القابل للتوسع', en: 'to scalable growth' } }];


export const whyPillars: Pillar[] = [
{
  id: 'business-first',
  icon: 'target',
  title: { ar: 'التفكير من منظور الأعمال', en: 'Business-First Thinking' },
  description: {
    ar: 'نبدأ من أهداف الأعمال والتحديات الفعلية، وليس من التكنولوجيا وحدها.',
    en: 'We start from business goals and real challenges — not from technology alone.'
  }
},
{
  id: 'integrated',
  icon: 'network',
  title: { ar: 'حلول متكاملة', en: 'Integrated Solutions' },
  description: {
    ar: 'نركز على ترابط الأنظمة والبيانات والعمليات ضمن بيئة تشغيل متكاملة.',
    en: 'We focus on connecting systems, data and processes within one integrated operating environment.'
  }
},
{
  id: 'ai-driven',
  icon: 'sparkles',
  title: { ar: 'ابتكار يقوده الذكاء الاصطناعي', en: 'AI-Driven Innovation' },
  description: {
    ar: 'نوظف الذكاء الاصطناعي حيث يقدم قيمة عملية قابلة للتقييم.',
    en: 'We apply AI where it delivers practical value that can be assessed.'
  }
},
{
  id: 'execution',
  icon: 'rocket',
  title: { ar: 'تنفيذ موجّه بالنتائج', en: 'Execution-Oriented Delivery' },
  description: {
    ar: 'نحوّل الخطط والتصورات إلى نطاقات عمل ومخرجات ومراحل تنفيذ واضحة.',
    en: 'We turn plans and concepts into clear scopes, deliverables and execution phases.'
  }
},
{
  id: 'scalable',
  icon: 'layers',
  title: { ar: 'بنية قابلة للتوسع', en: 'Scalable Architecture' },
  description: {
    ar: 'نراعي احتياجات التوسع والتطوير عند تصميم الحلول.',
    en: 'We account for growth and evolution when designing solutions.'
  }
},
{
  id: 'measurable',
  icon: 'gauge',
  title: { ar: 'أداء قابل للقياس', en: 'Measurable Performance' },
  description: {
    ar: 'نربط المبادرات بمؤشرات أداء وأهداف متفق عليها.',
    en: 'We tie initiatives to agreed KPIs and goals.'
  }
},
{
  id: 'continuous',
  icon: 'repeat',
  title: { ar: 'تحسين مستمر', en: 'Continuous Improvement' },
  description: {
    ar: 'ننظر إلى التقنية بوصفها قدرة مستمرة على التطوير، وليست مشروعًا ينتهي بمجرد الإطلاق.',
    en: 'We see technology as an ongoing capability to evolve — not a project that ends at launch.'
  }
}];


export const modelLayers: Pillar[] = [
{
  id: 'data',
  icon: 'database',
  title: { ar: 'طبقة البيانات', en: 'Data Layer' },
  description: { ar: 'جمع البيانات وتنظيمها والتحقق من جودتها.', en: 'Collecting, organizing and validating the quality of data.' }
},
{
  id: 'systems',
  icon: 'server',
  title: { ar: 'طبقة الأنظمة', en: 'Systems Layer' },
  description: {
    ar: 'ربط أنظمة المؤسسة، مثل ERP وCRM وإدارة المشاريع والمخزون.',
    en: 'Connecting enterprise systems such as ERP, CRM, project management and inventory.'
  }
},
{
  id: 'automation',
  icon: 'workflow',
  title: { ar: 'طبقة الأتمتة', en: 'Automation Layer' },
  description: {
    ar: 'تنفيذ المهام والإشعارات والموافقات وتوجيه الطلبات وفق قواعد محددة.',
    en: 'Executing tasks, notifications, approvals and request routing according to defined rules.'
  }
},
{
  id: 'ai',
  icon: 'brain',
  title: { ar: 'طبقة الذكاء الاصطناعي', en: 'AI Layer' },
  description: {
    ar: 'تحليل المعلومات، وتوليد الرؤى، والمساعدة في تنفيذ المهام ضمن الصلاحيات المعتمدة.',
    en: 'Analyzing information, generating insights and assisting with tasks within approved permissions.'
  }
},
{
  id: 'management',
  icon: 'gauge',
  title: { ar: 'طبقة الإدارة والتحكم', en: 'Management & Control Layer' },
  description: {
    ar: 'لوحات المؤشرات، وتقارير الأداء، ومتابعة المسؤوليات والاستثناءات.',
    en: 'KPI dashboards, performance reports, and tracking of responsibilities and exceptions.'
  }
},
{
  id: 'governance',
  icon: 'shield',
  title: { ar: 'طبقة الحوكمة', en: 'Governance Layer' },
  description: {
    ar: 'إدارة الوصول، وحماية البيانات، وسجلات التدقيق، والمراجعة البشرية حيث يلزم.',
    en: 'Access management, data protection, audit trails, and human review where required.'
  }
}];


export const executiveItems: L[] = [
{ ar: 'لوحات متابعة تنفيذية موحدة.', en: 'Unified executive dashboards.' },
{ ar: 'مؤشرات الأداء لكل إدارة.', en: 'KPIs for every department.' },
{ ar: 'متابعة الأهداف والخطط والمبادرات.', en: 'Tracking goals, plans and initiatives.' },
{ ar: 'تقارير الإنجاز والانحرافات.', en: 'Progress and deviation reports.' },
{ ar: 'تنبيهات التأخير والمخاطر التشغيلية.', en: 'Delay and operational-risk alerts.' },
{ ar: 'متابعة المسؤوليات والمواعيد النهائية.', en: 'Tracking ownership and deadlines.' },
{ ar: 'تقارير دورية مدعومة بتحليل البيانات.', en: 'Periodic reports backed by data analysis.' },
{ ar: 'آليات تصعيد واضحة للمشكلات التي تتطلب قرارًا إداريًا.', en: 'Clear escalation for issues that need a management decision.' }];


export const customerAiItems: L[] = [
{ ar: 'الرد على الاستفسارات المتكررة على مدار الساعة وفق الإعدادات المعتمدة.', en: 'Answering recurring inquiries around the clock, per approved settings.' },
{ ar: 'تصنيف استفسارات العملاء وتوجيهها.', en: 'Classifying and routing customer inquiries.' },
{ ar: 'استقبال الطلبات وتسجيلها في الأنظمة المرتبطة.', en: 'Capturing requests and logging them in connected systems.' },
{ ar: 'جدولة المواعيد وإرسال التذكيرات.', en: 'Scheduling appointments and sending reminders.' },
{ ar: 'متابعة العملاء المحتملين وفق قواعد العمل.', en: 'Following up leads according to business rules.' },
{ ar: 'إعداد رسائل وعروض مخصصة.', en: 'Preparing personalized messages and offers.' },
{ ar: 'تحليل التفاعلات ومؤشرات رضا العملاء.', en: 'Analyzing interactions and satisfaction indicators.' },
{ ar: 'تصعيد الحالات المعقدة إلى الموظفين المختصين.', en: 'Escalating complex cases to the right staff.' },
{ ar: 'دعم فرق المبيعات بمعلومات منظمة عن العملاء والفرص.', en: 'Equipping sales teams with structured customer and opportunity information.' }];


export const governancePractices: L[] = [
{ ar: 'إدارة صلاحيات الوصول حسب الدور الوظيفي.', en: 'Role-based access management.' },
{ ar: 'حماية البيانات أثناء النقل والتخزين وفق التصميم المعتمد.', en: 'Protecting data in transit and at rest per the approved design.' },
{ ar: 'تسجيل العمليات والتغييرات المهمة.', en: 'Logging significant operations and changes.' },
{ ar: 'تحديد سياسات الاحتفاظ بالبيانات والوصول إليها.', en: 'Defining data retention and access policies.' },
{ ar: 'مراعاة الخصوصية في تطبيقات الذكاء الاصطناعي.', en: 'Privacy considerations in AI applications.' },
{ ar: 'مراجعة المخرجات الحساسة وتحديد مستويات التدخل البشري.', en: 'Reviewing sensitive outputs and defining levels of human intervention.' },
{ ar: 'توثيق التكاملات ومصادر البيانات.', en: 'Documenting integrations and data sources.' },
{ ar: 'اختبار الحلول قبل إطلاقها.', en: 'Testing solutions before launch.' },
{ ar: 'وضع خطط النسخ الاحتياطي والاستعادة عند تضمينها في نطاق المشروع.', en: 'Backup and recovery plans when included in project scope.' },
{ ar: 'مراعاة المتطلبات القانونية والتنظيمية ذات الصلة بنشاط العميل.', en: "Observing legal and regulatory requirements relevant to the client's activity." }];


/** Answers are drawn from statements in the company profile. */
export const serviceFaqs: FaqItem[] = [
{
  id: 'scope',
  question: { ar: 'كيف يُحدد نطاق العمل؟', en: 'How is the scope of work defined?' },
  answer: {
    ar: 'تُحدد المسؤوليات والجدول الزمني والتكاليف ومعايير القبول ومستوى الدعم في العرض الفني والتجاري والعقد الخاص بكل مشروع.',
    en: "Responsibilities, timeline, costs, acceptance criteria and support level are defined in each project's technical and commercial proposal and contract."
  }
},
{
  id: 'results',
  question: { ar: 'هل تضمنون نسب تحسين محددة؟', en: 'Do you guarantee specific improvement percentages?' },
  answer: {
    ar: 'تُحدد النتائج المستهدفة ومؤشرات قياسها لكل مشروع على حدة، ولا تُفترض نسب تحسين ثابتة دون قياس فعلي.',
    en: 'Target outcomes and their metrics are defined per project. We never assume fixed improvement percentages without actual measurement.'
  }
},
{
  id: 'phased',
  question: { ar: 'هل يمكن التنفيذ على مراحل؟', en: 'Can the work be delivered in phases?' },
  answer: {
    ar: 'نعم، يمكن تنفيذ الحل على مراحل وفق الأولويات والميزانية ضمن نموذج التطوير المرحلي.',
    en: 'Yes — through our phased development model, the solution can be delivered in stages according to priorities and budget.'
  }
},
{
  id: 'governance',
  question: { ar: 'كيف تتعاملون مع الحوكمة وحماية البيانات؟', en: 'How do you handle governance and data protection?' },
  answer: {
    ar: 'نحدد الضوابط المطلوبة بالتعاون مع العميل، وفق طبيعة البيانات والقطاع والمتطلبات التنظيمية والعقدية.',
    en: 'We define the required controls together with the client, based on the nature of the data, the sector, and regulatory and contractual requirements.'
  }
}];


export const chatScript: {from: 'user' | 'assistant' | 'system';text: L;}[] = [
{ from: 'user', text: { ar: 'مرحباً، أرغب في حجز موعد صيانة لمكتبنا الأسبوع القادم.', en: "Hi, I'd like to book a maintenance visit for our office next week." } },
{ from: 'assistant', text: { ar: 'بكل سرور. لدينا مواعيد متاحة يوم الثلاثاء ١٠:٠٠ صباحاً أو الأربعاء ٢:٠٠ ظهراً.', en: 'Happy to help. We have Tuesday at 10:00 AM or Wednesday at 2:00 PM available.' } },
{ from: 'user', text: { ar: 'الثلاثاء مناسب. هل يمكنكم أيضاً مراجعة عقد الخدمة؟', en: 'Tuesday works. Can you also review our service contract?' } },
{ from: 'assistant', text: { ar: 'تم تأكيد الثلاثاء ١٠:٠٠ وإرسال تذكير. سأحوّل طلب العقد إلى مدير الحساب المختص.', en: "Tuesday 10:00 is confirmed and a reminder is set. I'll route the contract request to your account manager." } },
{ from: 'system', text: { ar: 'تم تسجيل الطلب في النظام · تصعيد إلى موظف مختص', en: 'Request logged in CRM · Escalated to a specialist' } }];