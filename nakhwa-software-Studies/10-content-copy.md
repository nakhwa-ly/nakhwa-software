# 10 — المحتوى الكامل (Content Copy)

> هذا الملف يحتوي على **جميع النصوص** التي ستظهر في الموقع، بـ AR و EN.
> Claude Code: انسخ هذه النصوص حرفياً إلى `messages/ar.json` و `messages/en.json`.

---

## 📄 `messages/ar.json` — الكامل

```json
{
  "meta": {
    "home": {
      "title": "نخوة للحلول البرمجية - تطوير تطبيقات وبرمجيات احترافية",
      "description": "نبني تطبيقات الموبايل والمواقع الإلكترونية وأنظمة إدارة الأعمال بأعلى معايير الجودة. شريكك التقني في ليبيا والمنطقة."
    },
    "services": {
      "title": "خدماتنا - نخوة للحلول البرمجية",
      "description": "خدمات تطوير شاملة: تطبيقات موبايل، مواقع إلكترونية، أنظمة إدارة، وأكثر."
    },
    "portfolio": {
      "title": "أعمالنا - نخوة للحلول البرمجية",
      "description": "تصفح مشاريعنا السابقة وحلولنا المبتكرة."
    },
    "about": {
      "title": "من نحن - نخوة للحلول البرمجية",
      "description": "تعرّف على نخوة، قصتنا، مهمتنا، وقيمنا."
    },
    "contact": {
      "title": "تواصل معنا - نخوة للحلول البرمجية",
      "description": "ابدأ مشروعك معنا. نحن هنا للإجابة على استفساراتك."
    }
  },

  "navbar": {
    "home": "الرئيسية",
    "services": "خدماتنا",
    "portfolio": "أعمالنا",
    "about": "من نحن",
    "contact": "تواصل معنا",
    "cta": "احصل على عرض سعر"
  },

  "hero": {
    "badge": "🚀 شريكك التقني الموثوق",
    "headline": "نبني المستقبل",
    "headlineHighlight": "سطراً بسطر",
    "subheadline": "نخوة للحلول البرمجية — نحوّل أفكارك إلى تطبيقات احترافية بإتقان حرفي وتقنيات الجيل القادم.",
    "ctaPrimary": "ابدأ مشروعك",
    "ctaSecondary": "تصفح أعمالنا",
    "trustText": "موثوقون من قبل أكثر من 15 عميلاً"
  },

  "services": {
    "sectionBadge": "خدماتنا",
    "sectionTitle": "حلول برمجية تواكب طموحك",
    "sectionSubtitle": "نقدم خدمات تطوير متكاملة مصممة لتلبية احتياجات أعمالك بكفاءة وجودة عالية",
    "mobile": {
      "title": "تطبيقات الموبايل",
      "description": "تطبيقات Flutter عالية الأداء لنظامي iOS و Android بتجربة مستخدم سلسة وتصميم احترافي."
    },
    "web": {
      "title": "تطوير المواقع",
      "description": "مواقع وتطبيقات ويب حديثة باستخدام Next.js و React مع تركيز على الأداء و SEO."
    },
    "businessSystems": {
      "title": "أنظمة إدارة الأعمال",
      "description": "حلول ERP و CRM مخصصة تساعدك على إدارة عملياتك بكفاءة وأتمتة المهام المتكررة."
    },
    "database": {
      "title": "تكامل قواعد البيانات",
      "description": "تصميم وتنفيذ قواعد بيانات قوية باستخدام Supabase, Firebase, و PostgreSQL مع أمان عالٍ."
    },
    "delivery": {
      "title": "تطبيقات التوصيل والمتاجر",
      "description": "حلول جاهزة وقابلة للتخصيص للمطاعم، المتاجر، وشركات التوصيل مع لوحات تحكم متكاملة."
    },
    "consulting": {
      "title": "الاستشارات التقنية",
      "description": "مراجعة الأكواد، استشارات Architecture، وقيادة تقنية تساعدك على اتخاذ القرارات الصحيحة."
    },
    "learnMore": "اقرأ المزيد"
  },

  "features": {
    "sectionBadge": "لماذا نخوة؟",
    "sectionTitle": "أكثر من مجرد فريق تطوير",
    "sectionSubtitle": "نحن شركاؤك في النجاح، ملتزمون بإيصالك إلى أعلى المستويات",
    "localExpertise": {
      "title": "خبرة محلية",
      "description": "نفهم السوق الليبي والعربي، ونتحدث بلغة عملائك"
    },
    "globalQuality": {
      "title": "جودة عالمية",
      "description": "نطبق معايير دولية في كل سطر كود نكتبه"
    },
    "ongoingSupport": {
      "title": "دعم مستمر",
      "description": "فريقنا معك حتى بعد التسليم، لأن النجاح رحلة لا حدث"
    },
    "fastDelivery": {
      "title": "تسليم سريع",
      "description": "منهجية Agile وتسليمات دورية تضمن وصولك للسوق بسرعة"
    }
  },

  "portfolio": {
    "sectionBadge": "أعمالنا",
    "sectionTitle": "مشاريع نفخر بها",
    "sectionSubtitle": "نخبة من المشاريع التي نفذناها لعملاء يثقون بنا",
    "viewAll": "شاهد جميع المشاريع",
    "viewProject": "عرض التفاصيل",
    "filters": {
      "all": "الكل",
      "mobile": "موبايل",
      "web": "ويب",
      "systems": "أنظمة"
    },
    "projects": {
      "lamia": {
        "title": "بيتزا لاميا",
        "description": "تطبيق توصيل متكامل بثلاثة تطبيقات: العميل، الإدارة، السائق",
        "tags": ["Flutter", "Supabase", "Google Maps"]
      },
      "inventory": {
        "title": "نظام إدارة المخزون",
        "description": "نظام ERP متكامل لشركة محلية مع تقارير ذكية",
        "tags": ["Next.js", "PostgreSQL", "Charts"]
      },
      "education": {
        "title": "منصة تعليمية",
        "description": "تطبيق تعليمي تفاعلي يدعم الفصول الافتراضية",
        "tags": ["Flutter", "Firebase", "WebRTC"]
      }
    }
  },

  "stats": {
    "projects": "مشروع مكتمل",
    "clients": "عميل سعيد",
    "years": "سنوات خبرة",
    "coffee": "فنجان قهوة"
  },

  "testimonials": {
    "sectionBadge": "آراء عملائنا",
    "sectionTitle": "ماذا يقولون عنا",
    "items": [
      {
        "quote": "فريق نخوة قدّم لنا تطبيقاً تجاوز توقعاتنا. الاحترافية والالتزام بالمواعيد ميزتهم الحقيقية.",
        "name": "أحمد المحمودي",
        "role": "المدير العام",
        "company": "شركة لاميا للأطعمة"
      },
      {
        "quote": "تعاملنا مع شركات كثيرة، لكن نخوة تختلف. يفهمون احتياجك من النظرة الأولى ويترجمونه إلى حلول عملية.",
        "name": "سارة الفهري",
        "role": "المؤسسة",
        "company": "منصة تعليمية ليبية"
      },
      {
        "quote": "الدعم بعد التسليم كان مفاجأة سارة. هؤلاء لا يبيعون كود، بل يبنون شراكات.",
        "name": "محمد عبد الله",
        "role": "رائد أعمال",
        "company": "Tech Startup"
      }
    ]
  },

  "contact": {
    "sectionBadge": "تواصل معنا",
    "sectionTitle": "هل لديك مشروع في ذهنك؟",
    "sectionSubtitle": "املأ النموذج وسنتواصل معك خلال 24 ساعة",
    "name": "الاسم الكامل",
    "namePlaceholder": "أدخل اسمك الكامل",
    "email": "البريد الإلكتروني",
    "emailPlaceholder": "you@example.com",
    "phone": "رقم الهاتف",
    "phonePlaceholder": "+218 9X XXX XXXX",
    "company": "اسم الشركة",
    "companyPlaceholder": "اختياري",
    "service": "الخدمة المطلوبة",
    "selectService": "اختر خدمة",
    "services": {
      "mobile": "تطوير تطبيقات الموبايل",
      "web": "تطوير المواقع الإلكترونية",
      "businessSystems": "أنظمة إدارة الأعمال",
      "database": "تكامل قواعد البيانات",
      "delivery": "تطبيقات التوصيل",
      "consulting": "استشارات تقنية",
      "other": "أخرى"
    },
    "budget": "الميزانية المتوقعة",
    "selectBudget": "اختر الميزانية",
    "budgets": {
      "less1k": "أقل من 1,000$",
      "1kTo5k": "1,000$ - 5,000$",
      "5kTo10k": "5,000$ - 10,000$",
      "more10k": "أكثر من 10,000$",
      "notSure": "غير محدد"
    },
    "message": "تفاصيل المشروع",
    "messagePlaceholder": "أخبرنا عن مشروعك وأهدافك...",
    "submit": "إرسال الرسالة",
    "submitting": "جارٍ الإرسال...",
    "success": "🎉 تم استلام رسالتك بنجاح! سنتواصل معك قريباً.",
    "error": "حدث خطأ، يرجى المحاولة مرة أخرى",
    "info": {
      "phone": "الهاتف",
      "email": "البريد الإلكتروني",
      "location": "الموقع",
      "locationValue": "طرابلس، ليبيا",
      "hours": "ساعات العمل",
      "hoursValue": "الأحد - الخميس: 9:00 - 18:00"
    }
  },

  "ctaBanner": {
    "title": "جاهز لبدء مشروعك؟",
    "subtitle": "دعنا نحوّل فكرتك إلى حقيقة. فريقنا في انتظارك.",
    "button": "تواصل معنا الآن"
  },

  "about": {
    "hero": {
      "badge": "من نحن",
      "title": "نخوة — ليست مجرد كلمة، بل التزام",
      "subtitle": "نؤمن بأن البرمجيات الجيدة تبدأ بفهم حقيقي لاحتياجات العميل"
    },
    "story": {
      "title": "قصتنا",
      "content": "بدأت نخوة برؤية بسيطة: تقديم حلول برمجية تليق بطموحات المنطقة. منذ تأسيسنا، التزمنا بثلاثة مبادئ: الجودة، الشفافية، والنخوة في خدمة عملائنا."
    },
    "mission": {
      "title": "مهمتنا",
      "content": "تمكين الشركات والمشاريع من تحقيق أهدافها من خلال حلول برمجية مبتكرة، موثوقة، وقابلة للتطور."
    },
    "values": {
      "title": "قيمنا",
      "items": [
        {
          "title": "الإتقان",
          "description": "كل سطر كود يحمل توقيعنا، وكل مشروع يحمل سمعتنا"
        },
        {
          "title": "الشفافية",
          "description": "تواصل واضح في كل مرحلة، لا مفاجآت، لا تعقيدات"
        },
        {
          "title": "الالتزام",
          "description": "المواعيد عهد، والوعد دين"
        },
        {
          "title": "النخوة",
          "description": "لا نتخلى عن مشروع، ولا نترك عميلاً في منتصف الطريق"
        }
      ]
    }
  },

  "footer": {
    "description": "نخوة للحلول البرمجية — شريكك التقني لبناء مستقبل رقمي مزدهر.",
    "quickLinks": "روابط سريعة",
    "services": "خدماتنا",
    "contact": "تواصل معنا",
    "rights": "جميع الحقوق محفوظة",
    "copyright": "© 2026 نخوة للحلول البرمجية"
  },

  "common": {
    "loading": "جارٍ التحميل...",
    "error": "حدث خطأ",
    "retry": "إعادة المحاولة",
    "close": "إغلاق",
    "next": "التالي",
    "previous": "السابق"
  }
}
```

---

## 📄 `messages/en.json` — الكامل

```json
{
  "meta": {
    "home": {
      "title": "Nakhwa Software Solutions - Professional App & Software Development",
      "description": "We build mobile apps, websites, and business management systems with the highest quality standards. Your technical partner in Libya and the region."
    },
    "services": {
      "title": "Our Services - Nakhwa Software Solutions",
      "description": "Comprehensive development services: mobile apps, websites, management systems, and more."
    },
    "portfolio": {
      "title": "Our Work - Nakhwa Software Solutions",
      "description": "Browse our previous projects and innovative solutions."
    },
    "about": {
      "title": "About Us - Nakhwa Software Solutions",
      "description": "Learn about Nakhwa, our story, mission, and values."
    },
    "contact": {
      "title": "Contact Us - Nakhwa Software Solutions",
      "description": "Start your project with us. We're here to answer your questions."
    }
  },

  "navbar": {
    "home": "Home",
    "services": "Services",
    "portfolio": "Portfolio",
    "about": "About",
    "contact": "Contact",
    "cta": "Get a Quote"
  },

  "hero": {
    "badge": "🚀 Your Trusted Tech Partner",
    "headline": "Building the Future",
    "headlineHighlight": "Line by Line",
    "subheadline": "Nakhwa Software Solutions — Transforming your ideas into professional applications with artisanal precision and next-generation technologies.",
    "ctaPrimary": "Start Your Project",
    "ctaSecondary": "View Our Work",
    "trustText": "Trusted by 15+ clients"
  },

  "services": {
    "sectionBadge": "Our Services",
    "sectionTitle": "Software Solutions That Match Your Ambition",
    "sectionSubtitle": "We deliver integrated development services designed to meet your business needs efficiently",
    "mobile": {
      "title": "Mobile Apps",
      "description": "High-performance Flutter applications for iOS and Android with seamless UX and professional design."
    },
    "web": {
      "title": "Web Development",
      "description": "Modern websites and web apps using Next.js and React, focused on performance and SEO."
    },
    "businessSystems": {
      "title": "Business Systems",
      "description": "Custom ERP and CRM solutions that help you manage operations efficiently and automate repetitive tasks."
    },
    "database": {
      "title": "Database Integration",
      "description": "Designing and implementing robust databases using Supabase, Firebase, and PostgreSQL with high security."
    },
    "delivery": {
      "title": "Delivery & E-commerce",
      "description": "Ready and customizable solutions for restaurants, stores, and delivery companies with integrated dashboards."
    },
    "consulting": {
      "title": "Technical Consulting",
      "description": "Code reviews, architecture consulting, and technical leadership to help you make the right decisions."
    },
    "learnMore": "Learn More"
  },

  "features": {
    "sectionBadge": "Why Nakhwa?",
    "sectionTitle": "More Than Just a Dev Team",
    "sectionSubtitle": "We are your success partners, committed to elevating you to the highest levels",
    "localExpertise": {
      "title": "Local Expertise",
      "description": "We understand the Libyan and Arab market, and speak your clients' language"
    },
    "globalQuality": {
      "title": "Global Quality",
      "description": "We apply international standards in every line of code"
    },
    "ongoingSupport": {
      "title": "Ongoing Support",
      "description": "Our team is with you even after delivery, because success is a journey"
    },
    "fastDelivery": {
      "title": "Fast Delivery",
      "description": "Agile methodology and iterative deliveries ensure quick market entry"
    }
  },

  "portfolio": {
    "sectionBadge": "Our Work",
    "sectionTitle": "Projects We're Proud Of",
    "sectionSubtitle": "A selection of projects we've delivered for clients who trust us",
    "viewAll": "View All Projects",
    "viewProject": "View Details",
    "filters": {
      "all": "All",
      "mobile": "Mobile",
      "web": "Web",
      "systems": "Systems"
    },
    "projects": {
      "lamia": {
        "title": "Pizza Lamia",
        "description": "Complete delivery app with three applications: customer, admin, and driver",
        "tags": ["Flutter", "Supabase", "Google Maps"]
      },
      "inventory": {
        "title": "Inventory Management System",
        "description": "Integrated ERP system for a local company with smart reports",
        "tags": ["Next.js", "PostgreSQL", "Charts"]
      },
      "education": {
        "title": "Educational Platform",
        "description": "Interactive educational app supporting virtual classrooms",
        "tags": ["Flutter", "Firebase", "WebRTC"]
      }
    }
  },

  "stats": {
    "projects": "Completed Projects",
    "clients": "Happy Clients",
    "years": "Years of Experience",
    "coffee": "Cups of Coffee"
  },

  "testimonials": {
    "sectionBadge": "Client Testimonials",
    "sectionTitle": "What They Say About Us",
    "items": [
      {
        "quote": "Nakhwa delivered an app that exceeded our expectations. Professionalism and meeting deadlines are their real advantage.",
        "name": "Ahmed Al-Mahmoudi",
        "role": "General Manager",
        "company": "Lamia Food Company"
      },
      {
        "quote": "We've worked with many companies, but Nakhwa is different. They understand your needs at first glance and translate them into practical solutions.",
        "name": "Sara Al-Fehri",
        "role": "Founder",
        "company": "Libyan Education Platform"
      },
      {
        "quote": "Post-delivery support was a pleasant surprise. These guys don't sell code, they build partnerships.",
        "name": "Mohammed Abdullah",
        "role": "Entrepreneur",
        "company": "Tech Startup"
      }
    ]
  },

  "contact": {
    "sectionBadge": "Get in Touch",
    "sectionTitle": "Have a Project in Mind?",
    "sectionSubtitle": "Fill out the form and we'll get back to you within 24 hours",
    "name": "Full Name",
    "namePlaceholder": "Enter your full name",
    "email": "Email",
    "emailPlaceholder": "you@example.com",
    "phone": "Phone Number",
    "phonePlaceholder": "+218 9X XXX XXXX",
    "company": "Company Name",
    "companyPlaceholder": "Optional",
    "service": "Service Needed",
    "selectService": "Select a service",
    "services": {
      "mobile": "Mobile App Development",
      "web": "Web Development",
      "businessSystems": "Business Systems",
      "database": "Database Integration",
      "delivery": "Delivery Apps",
      "consulting": "Technical Consulting",
      "other": "Other"
    },
    "budget": "Expected Budget",
    "selectBudget": "Select budget",
    "budgets": {
      "less1k": "Less than $1,000",
      "1kTo5k": "$1,000 - $5,000",
      "5kTo10k": "$5,000 - $10,000",
      "more10k": "More than $10,000",
      "notSure": "Not sure yet"
    },
    "message": "Project Details",
    "messagePlaceholder": "Tell us about your project and goals...",
    "submit": "Send Message",
    "submitting": "Sending...",
    "success": "🎉 Your message has been received! We'll get back to you soon.",
    "error": "An error occurred, please try again",
    "info": {
      "phone": "Phone",
      "email": "Email",
      "location": "Location",
      "locationValue": "Tripoli, Libya",
      "hours": "Working Hours",
      "hoursValue": "Sun - Thu: 9:00 - 18:00"
    }
  },

  "ctaBanner": {
    "title": "Ready to Start Your Project?",
    "subtitle": "Let's turn your idea into reality. Our team is waiting for you.",
    "button": "Contact Us Now"
  },

  "about": {
    "hero": {
      "badge": "About Us",
      "title": "Nakhwa — Not Just a Word, It's a Commitment",
      "subtitle": "We believe great software starts with a true understanding of client needs"
    },
    "story": {
      "title": "Our Story",
      "content": "Nakhwa started with a simple vision: delivering software solutions worthy of the region's ambitions. Since our founding, we've committed to three principles: quality, transparency, and dedication in serving our clients."
    },
    "mission": {
      "title": "Our Mission",
      "content": "Empowering businesses and projects to achieve their goals through innovative, reliable, and scalable software solutions."
    },
    "values": {
      "title": "Our Values",
      "items": [
        {
          "title": "Craftsmanship",
          "description": "Every line of code carries our signature, every project carries our reputation"
        },
        {
          "title": "Transparency",
          "description": "Clear communication at every stage, no surprises, no complications"
        },
        {
          "title": "Commitment",
          "description": "Deadlines are a pledge, and a promise is a debt"
        },
        {
          "title": "Dedication",
          "description": "We don't abandon a project, nor leave a client halfway"
        }
      ]
    }
  },

  "footer": {
    "description": "Nakhwa Software Solutions — Your tech partner for building a prosperous digital future.",
    "quickLinks": "Quick Links",
    "services": "Services",
    "contact": "Contact",
    "rights": "All rights reserved",
    "copyright": "© 2026 Nakhwa Software Solutions"
  },

  "common": {
    "loading": "Loading...",
    "error": "An error occurred",
    "retry": "Retry",
    "close": "Close",
    "next": "Next",
    "previous": "Previous"
  }
}
```

---

## 📝 ملاحظات للنسخ

1. **انسخ كل محتوى الـ JSON بدون تعديل** (إلا إذا أردت تغييرات نصية)
2. تأكد من حفظ الملفات بترميز **UTF-8**
3. تأكد من صحة JSON syntax — استخدم validator إذا شككت
4. الأرقام في العربية (مثل ساعات العمل) استخدم الأرقام العادية، Tailwind سيتعامل معها

---

**الخطوة التالية:** اقرأ `11-implementation-roadmap.md`
