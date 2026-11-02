import type { Phase, Pillar } from '../entities';

export const phases: Phase[] = [
{
  id: 'discover',
  index: 1,
  icon: 'search',
  name: 'Discover',
  title: { ar: 'الاكتشاف والتحليل', en: 'Discovery & Analysis' },
  description: {
    ar: 'فهم نموذج الأعمال، وتحليل العمليات الحالية، وتحديد التحديات والاحتياجات والأهداف ومؤشرات النجاح.',
    en: 'Understand the business model, analyze current operations, and define challenges, needs, goals and success metrics.'
  },
  outputs: [
  { ar: 'تقرير تحليل الوضع الحالي', en: 'Current-state analysis report' },
  { ar: 'تحديد المتطلبات والأولويات', en: 'Requirements and priorities' }]

},
{
  id: 'architect',
  index: 2,
  icon: 'compass',
  name: 'Architect',
  title: { ar: 'الاستراتيجية والتصميم', en: 'Strategy & Design' },
  description: {
    ar: 'إعداد التصور المستقبلي للحل، وتصميم سير العمل، وتحديد الأنظمة والتكاملات والبيانات المطلوبة.',
    en: 'Shape the future-state solution, design workflows, and define the systems, integrations and data required.'
  },
  outputs: [
  { ar: 'خارطة طريق', en: 'Roadmap' },
  { ar: 'نطاق عمل', en: 'Scope of work' },
  { ar: 'تصميم وظيفي وتقني', en: 'Functional & technical design' }]

},
{
  id: 'build',
  index: 3,
  icon: 'code',
  name: 'Build & Integrate',
  title: { ar: 'التطوير والتكامل', en: 'Development & Integration' },
  description: {
    ar: 'تطوير الحل أو تهيئته، وربطه بالأنظمة المطلوبة، وتجهيز الصلاحيات والواجهات والتقارير والأتمتة.',
    en: 'Build or configure the solution, connect it to required systems, and set up permissions, interfaces, reports and automation.'
  },
  outputs: [{ ar: 'نسخة تشغيلية وفق نطاق المشروع المعتمد', en: 'A working release within the approved project scope' }]
},
{
  id: 'validate',
  index: 4,
  icon: 'shield',
  name: 'Validate',
  title: { ar: 'الاختبار والتحقق', en: 'Testing & Validation' },
  description: {
    ar: 'اختبار الوظائف والتكاملات والأمان والأداء، والتحقق من دقة البيانات، ومعالجة الملاحظات.',
    en: 'Test functionality, integrations, security and performance; verify data accuracy and resolve feedback.'
  },
  outputs: [
  { ar: 'نتائج الاختبارات', en: 'Test results' },
  { ar: 'قائمة الملاحظات', en: 'Issue log' },
  { ar: 'اعتماد الجاهزية وفق معايير القبول', en: 'Readiness sign-off against acceptance criteria' }]

},
{
  id: 'deploy',
  index: 5,
  icon: 'rocket',
  name: 'Deploy & Enable',
  title: { ar: 'الإطلاق والتبني', en: 'Launch & Adoption' },
  description: {
    ar: 'إطلاق الحل وفق خطة معتمدة، وتدريب المستخدمين، وتوثيق الإجراءات، ومراقبة الاستقرار التشغيلي.',
    en: 'Launch under an approved plan, train users, document procedures and monitor operational stability.'
  },
  outputs: [
  { ar: 'نظام جاهز للاستخدام', en: 'Production-ready system' },
  { ar: 'وثائق تشغيل', en: 'Operating documentation' },
  { ar: 'خطة دعم', en: 'Support plan' }]

},
{
  id: 'optimize',
  index: 6,
  icon: 'gauge',
  name: 'Optimize',
  title: { ar: 'القياس والتحسين', en: 'Measurement & Optimization' },
  description: {
    ar: 'متابعة مؤشرات الأداء، وتحليل النتائج، ومعالجة أوجه القصور، واقتراح التحسينات والتوسعات.',
    en: 'Track KPIs, analyze results, address gaps, and propose improvements and expansions.'
  },
  outputs: [
  { ar: 'تقارير أداء', en: 'Performance reports' },
  { ar: 'توصيات تطوير', en: 'Development recommendations' },
  { ar: 'خطة تحسين مستمر', en: 'Continuous-improvement plan' }]

}];


export const engagementModels: Pillar[] = [
{
  id: 'strategic-consulting',
  icon: 'compass',
  title: { ar: 'الاستشارات الاستراتيجية', en: 'Strategic Consulting' },
  description: { ar: 'تحليل الوضع الحالي وإعداد خارطة التحول.', en: 'Current-state analysis and a transformation roadmap.' }
},
{
  id: 'fixed-scope',
  icon: 'target',
  title: { ar: 'المشاريع محددة النطاق', en: 'Fixed-Scope Projects' },
  description: {
    ar: 'تنفيذ حل وفق متطلبات ومخرجات وجدول زمني معتمد.',
    en: 'Delivering a solution against approved requirements, deliverables and timeline.'
  }
},
{
  id: 'custom-development',
  icon: 'code',
  title: { ar: 'التطوير المخصص', en: 'Custom Development' },
  description: {
    ar: 'تصميم وتطوير أنظمة ومنصات تلائم نموذج أعمال العميل.',
    en: "Designing and building systems and platforms that fit the client's business model."
  }
},
{
  id: 'integration-automation',
  icon: 'workflow',
  title: { ar: 'التكامل والأتمتة', en: 'Integration & Automation' },
  description: { ar: 'ربط الأنظمة وتحسين تدفقات العمل.', en: 'Connecting systems and improving workflows.' }
},
{
  id: 'phased-development',
  icon: 'layers',
  title: { ar: 'التطوير المرحلي', en: 'Phased Development' },
  description: {
    ar: 'تنفيذ الحل على مراحل وفق الأولويات والميزانية.',
    en: 'Delivering the solution in phases, according to priorities and budget.'
  }
},
{
  id: 'support',
  icon: 'repeat',
  title: { ar: 'الدعم والتحسين المستمر', en: 'Support & Continuous Improvement' },
  description: {
    ar: 'متابعة الأداء وتطوير الحل وفق اتفاقية الخدمة.',
    en: 'Monitoring performance and evolving the solution under a service agreement.'
  }
}];


export const valuePropositions: Pillar[] = [
{
  id: 'efficiency',
  icon: 'zap',
  title: { ar: 'الكفاءة التشغيلية', en: 'Operational Efficiency' },
  description: { ar: 'تقليل الخطوات اليدوية وتحسين انسيابية العمل.', en: 'Fewer manual steps and smoother workflows.' }
},
{
  id: 'clarity',
  icon: 'eye',
  title: { ar: 'وضوح الإدارة', en: 'Management Clarity' },
  description: {
    ar: 'توفير رؤية أفضل للأداء والمسؤوليات ومراحل التنفيذ.',
    en: 'Better visibility into performance, responsibilities and execution stages.'
  }
},
{
  id: 'speed',
  icon: 'clock',
  title: { ar: 'سرعة الإنجاز', en: 'Speed of Delivery' },
  description: {
    ar: 'تنظيم تدفقات العمل وتقليل التأخير الناتج عن الإجراءات المتكررة.',
    en: 'Organized workflows and less delay from repetitive procedures.'
  }
},
{
  id: 'decision',
  icon: 'target',
  title: { ar: 'جودة القرار', en: 'Decision Quality' },
  description: { ar: 'توفير بيانات وتقارير تدعم التحليل والتخطيط.', en: 'Data and reports that support analysis and planning.' }
},
{
  id: 'cx',
  icon: 'users',
  title: { ar: 'تجربة عملاء أفضل', en: 'Better Customer Experience' },
  description: {
    ar: 'تطوير قنوات تواصل وخدمة أكثر استجابة وتنظيمًا.',
    en: 'More responsive and organized communication and service channels.'
  }
},
{
  id: 'integration',
  icon: 'network',
  title: { ar: 'التكامل المؤسسي', en: 'Organizational Integration' },
  description: { ar: 'تقليل العزلة بين الأنظمة والإدارات.', en: 'Less isolation between systems and departments.' }
},
{
  id: 'scalability',
  icon: 'layers',
  title: { ar: 'قابلية التوسع', en: 'Scalability' },
  description: { ar: 'تصميم حلول قابلة للتطوير مع نمو الأعمال.', en: 'Solutions designed to evolve as the business grows.' }
},
{
  id: 'control',
  icon: 'scale',
  title: { ar: 'التحكم والمساءلة', en: 'Control & Accountability' },
  description: {
    ar: 'تحسين متابعة المهام والاستثناءات ومؤشرات الأداء.',
    en: 'Better tracking of tasks, exceptions and KPIs.'
  }
}];