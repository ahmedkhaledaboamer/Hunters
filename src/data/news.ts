import type { NewsArticle } from '../entities';

const IMG = {
  ai: "/1f9a226c-ef70-40ca-b110-b7e076324db0.webp",
  city: "/e7b9f78b-8c03-4b66-a20a-45818409571c.webp",
  meeting: "/9428f1f9-7870-4890-8f1c-a52e533a8d96.webp",
  event: "/c2eadb64-58b4-425f-9fa3-a2cae684df4e.webp",
  code: "/9d614069-5a9c-4af5-91d5-48427d1f7a46.webp"
};

const author = { ar: 'فريق التحرير — نص تجريبي', en: 'Editorial Team — placeholder' };

const placeholderBody = (topic: {ar: string;en: string;}) => [
{
  ar: `هذا مقال تجريبي حول ${topic.ar}. يُستبدل هذا النص بالمحتوى النهائي من فريق اتش هانترز.`,
  en: `This is a placeholder article about ${topic.en}. Replace this text with final content from the H HUNTERS team.`
},
{
  ar: 'نؤمن بأن القيمة الحقيقية للتكنولوجيا تظهر عندما تنعكس على الأداء الفعلي للمؤسسة. لذلك نبدأ بفهم الأعمال وتحليل التحديات قبل تصميم الحل المناسب.',
  en: "We believe the true value of technology shows when it is reflected in an organization's actual performance. That's why we start by understanding the business and its challenges before designing the right solution."
},
{
  ar: 'يمكن أن يتضمن المقال النهائي أمثلة عملية، ودروساً مستفادة، وخطوات مقترحة للمؤسسات التي تبدأ رحلتها الرقمية.',
  en: 'The final article can include practical examples, lessons learned, and suggested next steps for organizations starting their digital journey.'
}];


export const news: NewsArticle[] = [
{
  slug: 'engineering-the-intelligence-of-business',
  category: 'company',
  title: { ar: 'اتش هانترز: نعيد هندسة الأعمال لعصر الذكاء الاصطناعي', en: 'H HUNTERS: Engineering the Intelligence of Business' },
  excerpt: {
    ar: 'نظرة على رؤيتنا لبناء منظومات رقمية مترابطة تدعم النمو والاستدامة.',
    en: 'A look at our vision for building connected digital ecosystems that support growth and sustainability.'
  },
  body: placeholderBody({ ar: 'رؤية الشركة', en: 'the company vision' }),
  date: '2026-10-20',
  readMinutes: 4,
  author,
  image: IMG.city,
  featured: true
},
{
  slug: 'ai-agents-within-approved-controls',
  category: 'ai',
  title: { ar: 'وكلاء الذكاء الاصطناعي ضمن ضوابط معتمدة', en: 'AI Agents Within Approved Controls' },
  excerpt: {
    ar: 'كيف نوازن بين الأتمتة الذكية ومستوى الإشراف البشري المطلوب.',
    en: 'How we balance intelligent automation with the right level of human oversight.'
  },
  body: placeholderBody({ ar: 'وكلاء الذكاء الاصطناعي', en: 'AI agents' }),
  date: '2026-10-08',
  readMinutes: 6,
  author,
  image: IMG.ai,
  featured: true
},
{
  slug: 'from-reports-to-executive-intelligence',
  category: 'ai',
  title: { ar: 'من التقارير التقليدية إلى الذكاء التنفيذي', en: 'From Traditional Reports to Executive Intelligence' },
  excerpt: {
    ar: 'ما الذي تحتاجه القيادات لمعرفة ما أُنجز وما تعثر ولماذا.',
    en: 'What leadership needs to know what was achieved, what stalled, and why.'
  },
  body: placeholderBody({ ar: 'الذكاء التنفيذي', en: 'executive intelligence' }),
  date: '2026-09-24',
  readMinutes: 5,
  author,
  image: IMG.meeting,
  featured: true
},
{
  slug: 'partnership-program-launch',
  category: 'partnerships',
  title: { ar: 'إطلاق برنامج الشراكات الاستراتيجية', en: 'Launching Our Strategic Partnership Program' },
  excerpt: {
    ar: 'خبر تجريبي حول برنامج الشراكات — يُستبدل بالتفاصيل الفعلية.',
    en: 'Placeholder story about the partnership program — replace with real details.'
  },
  body: placeholderBody({ ar: 'برنامج الشراكات', en: 'the partnership program' }),
  date: '2026-09-10',
  readMinutes: 3,
  author,
  image: IMG.code
},
{
  slug: 'regional-technology-event',
  category: 'events',
  title: { ar: 'مشاركتنا في فعالية تقنية إقليمية', en: 'Joining a Regional Technology Event' },
  excerpt: {
    ar: 'خبر تجريبي عن فعالية — يُستبدل باسم الفعالية وتاريخها.',
    en: 'Placeholder event story — replace with the event name and date.'
  },
  body: placeholderBody({ ar: 'فعالية تقنية', en: 'a technology event' }),
  date: '2026-08-28',
  readMinutes: 3,
  author,
  image: IMG.event
},
{
  slug: 'connected-operations-project',
  category: 'projects',
  title: { ar: 'مشروع تجريبي: ربط العمليات بين الإدارات', en: 'Sample Project: Connecting Operations Across Departments' },
  excerpt: {
    ar: 'دراسة حالة تجريبية — تُستبدل بمشروع فعلي بعد موافقة العميل.',
    en: 'Placeholder case study — replace with a real project once the client approves.'
  },
  body: placeholderBody({ ar: 'تكامل العمليات', en: 'operations integration' }),
  date: '2026-08-12',
  readMinutes: 7,
  author,
  image: IMG.meeting
},
{
  slug: 'designing-for-human-oversight',
  category: 'ai',
  title: { ar: 'التصميم مع مراعاة الإشراف البشري', en: 'Designing for Human Oversight' },
  excerpt: {
    ar: 'لماذا تبقى المراجعة البشرية جزءاً أساسياً من الحلول الذكية.',
    en: 'Why human review remains a core part of intelligent solutions.'
  },
  body: placeholderBody({ ar: 'الإشراف البشري', en: 'human oversight' }),
  date: '2026-07-30',
  readMinutes: 5,
  author,
  image: IMG.ai
},
{
  slug: 'abu-dhabi-office',
  category: 'company',
  title: { ar: 'من أبوظبي إلى أسواق الخليج', en: 'From Abu Dhabi to the Gulf Markets' },
  excerpt: {
    ar: 'لماذا اخترنا أبوظبي مقراً لخدمة المنطقة.',
    en: 'Why we chose Abu Dhabi as our base to serve the region.'
  },
  body: placeholderBody({ ar: 'الموقع الاستراتيجي', en: 'our strategic location' }),
  date: '2026-07-14',
  readMinutes: 4,
  author,
  image: IMG.city
}];


export const newsCategories = ['company', 'ai', 'partnerships', 'events', 'projects'] as const;