import {
  Post,
  Course,
  Contributor,
  EmergencyContact,
  InfoNotice,
  SponsorProduct,
} from "./types";

/**
 * List of medical professionals who contribute content to the platform.
 * To add a new contributor, create an object following the Contributor interface.
 */
export const CONTRIBUTORS: Contributor[] = [
  {
    id: "GC-GNAI-01",
    name: "ARIA GenAI",
    type: "TeamMember",
    role: "Generative AI Assistant",
    credentials: ["Not Applicable"],
    bio: "A.R.I.A. (Applied Research & Insights Assistant) Generative Artifical Intelligence is Medliz’s generative artificial intelligence collaborator, supporting the development of articles and educational content through the synthesis and structuring of information.",
    fullBio:
      "A.R.I.A. (Applied Research & Insights Assistant) is Medliz’s generative artificial intelligence system, designed to support the creation of educational and editorial content across the platform. Acting as a research and drafting partner, A.R.I.A. assists in synthesising information, structuring articles, and accelerating the development of courses and learning materials. It represents a composite workflow built on leading generative AI technologies, contributing to the drafting, refinement, and organisation of content. All outputs involving A.R.I.A. are reviewed, validated, and curated by the Medliz team to ensure accuracy, clarity, and alignment with medical and educational standards, with A.R.I.A. serving to augment — not replace — professional judgement.",
    image: "/visualAssets/images/avif/profile-contributor-lizia.avif",
  },
  {
    id: "TM-ERMS-01",
    name: "Elizabeth R. Mushambi",
    type: "TeamMember",
    role: "Founder & CEO",
    credentials: [
      "Nursing Science Master's Degree - University of Zimbabwe",
      "Trauma Life Support Instructor Certificate - Jamaica Rescue Academy",
      "Nursing Education Bachelor's Degree - Chinhoyi University of Technology",
    ],
    bio: "Elizabeth R. Mushambi is an experienced emergency nursing professional based in the UK, with expertise spanning trauma life support, ICU care, and medical education.",
    fullBio:
      "Elizabeth R. Mushambi is a highly skilled healthcare professional based in Oldbury, United Kingdom, with a distinguished career in emergency medicine and nursing. She has held numerous clinical and leadership roles at MARS Zimbabwe — including Flight Nurse, ICU Advanced Nurse Practitioner, and Head of Operations and Training — and has served as an ITLS Instructor for International Trauma Life Support since 2023. A committed educator, Elizabeth has lectured in Emergency Medical Care at the Women's University in Africa and the University of Zimbabwe. She holds a Master's degree in Nursing Science and is a certified BLS and ACLS Instructor with the American Heart Association.",
    image: "/visualAssets/images/avif/profile-contributor-emush.avif",
    socials: {
      website: "https://www.researchgate.net/profile/Elizabeth-Mushambi",
      email: "mushambiliz@gmail.com",
      linkedin:
        "https://www.linkedin.com/in/elizabeth-r-mushambi-ba431553/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BdMA7tfmZRx6Tm95cmiuFmg%3D%3D",
      facebook: "https://www.facebook.com/elizabeth.matoramushambi/",
    },
  },
  {
    id: "TM-AEMS-02",
    name: "Anesu E. Mushambi",
    type: "TeamMember",
    role: "Site Editor",
    bio: "TBA",
    fullBio: "TBA",
    image: "/visualAssets/images/avif/profile-contributor-amush.avif",
    socials: {
      linkedin:
        "https://www.linkedin.com/in/anesu-mushambi-382a6a196/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BLighvieeTdm7NWxSFSbFBQ%3D%3D",
      instagram: "https://www.instagram.com/anesu.e_?ighs=MXRsZW13MzNmNDN1aQ==",
    },
  },
  {
    id: "TM-TCMB-03",
    name: "Takudzwa C. Mabika",
    type: "TeamMember",
    role: "Site Manager and Developer",
    credentials: [
      "Computer Science and Business Computing Bachelor's Degree - University of Cape Town",
    ],
    bio: "Takudzwa Clinton Mabika is a designer and developer at Medliz, responsible for the platform's design, development, and overall user experience, with a background in Computer Science and Business Computing from the University of Cape Town.",
    fullBio:
      "Takudzwa Clinton Mabika is a designer and developer at Medliz, where he leads the end-to-end design and development of the platform, shaping its user experience, visual identity, and technical implementation. Working independently, he has been responsible for building the site from the ground up, combining design and engineering to deliver a cohesive and functional product. He holds a Bachelor's degree in Computer Science and Business Computing from the University of Cape Town and operates under the studio name 'Voldr Studio', providing freelance design services across brand identity, logo design, and promotional materials including banners, business cards, and flyers, with a focus on creating clear, effective, and visually consistent solutions aligned with user needs and business goals.",
    image: "/visualAssets/images/avif/profile-contributor-tmab.avif",
    socials: {
      email: "t.clinton.mabika@outlook.com",
      linkedin:
        "https://www.linkedin.com/in/takudzwa-clinton-mabika/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BWKSsxTDUToa6Op8a17Yp%2BA%3D%3D",
      github: "https://github.com/T-Clinton-Mabika",
    },
  },
  {
    id: "LT-DOFA-01",
    name: "Donna Farine",
    type: "Benefactor",
    role: "Industry: Bakery",
    bio: "Donna Farine is a UK-based boutique baking business founded and run by Sharai Gumbo, specialising in handcrafted scones and cake confectioneries, with custom orders available.",
    fullBio:
      "Donna Farine is a boutique baking business founded and run by Sharai Gumbo, a passionate baker based in the UK. A one-woman operation, Donna Farine is built on Sharai's love for creating beautifully handcrafted baked goods, with a speciality in scones and cake confectioneries. The business caters to customers seeking quality homemade treats, offering a bespoke custom order service for those looking for something truly special — whether for everyday indulgence or memorable occasions. With skill, creativity, and a personal touch in every bake, Sharai has built Donna Farine into a trusted name for delicious, made-with-love creations.",
    image: "/visualAssets/images/avif/profile-benefactor-lt-donnaFarine.avif",
    socials: {
      email: "donsharai@gmail.com",
      phone: "+44 7911 123456",
      instagram: "https://www.instagram.com/donnafarine/",
      twitter: "https://x.com/donnafarine",
      facebook:
        "https://www.facebook.com/people/Donna-Farine/100075842006001/?mibextid=wwXIfr&rdid=deFMDvdIjw3q8hLO&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17RJ2TnciR%2F%3Fmibextid%3DwwXIfr",
    },
  },
  {
    id: "LT-MBCS-02",
    name: "Make It Bright Cleaning Solutions",
    type: "Benefactor",
    role: "Industry: Cleaning Services",
    bio: "Make It Bright Cleaning Solutions is a UK-based cleaning company founded in 2022, providing professional cleaning services to homeowners in and around Adwick le Street, Doncaster.",
    fullBio:
      "Make It Bright Cleaning Solutions Ltd is a professional cleaning company established in 2022 and based in Adwick le Street, Doncaster, UK. The company offers a range of cleaning services tailored to meet the needs of homeowners and residential clients across the local area. With a focus on quality and reliability, Make It Bright Cleaning Solutions is committed to delivering thorough, dependable cleaning services to help households maintain clean, comfortable living spaces.",
    image: "/visualAssets/images/avif/profile-benefactor-lt-makeItBright.avif",
    socials: {
      website:
        "https://www.checkatrade.com/trades/makeitbrightcleaningsolutionsltd",
    },
  },
  {
    id: "ST-KZMB-01",
    name: "Kudzai EZ Mabika",
    type: "Benefactor",
    role: "Industry: Print and Design",
    bio: "Kudzai EZ Mabika is a Johannesburg-based graphic designer and print specialist, helping clients bring their ideas to life through custom advertisement materials and personalised print products.",
    fullBio:
      "Kudzai EZ Mabika is a creative professional based in Johannesburg, South Africa, operating at the intersection of graphic design and print production. With a keen eye for visual communication, Kudzai works closely with clients to produce bespoke advertisement materials — from promotional print collateral to branded designs crafted for maximum impact. Beyond commercial work, he specialises in creating personalised mementos such as custom canvas prints, giving clients the opportunity to transform their most meaningful images into lasting pieces of wall art for their homes. Whether helping a business get noticed or helping a family preserve a cherished memory, Kudzai brings the same care, creativity, and attention to detail to every project.",
    image: "/visualAssets/images/avif/profile-benefactor-st-kezMabika.avif",
    socials: {
      email: "kudzaiemabika@gmail.com",
    },
  },
];

/**
 * Emergency contact numbers organized by country.
 * These are displayed on the Important Information page.
 */
export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    country: "United States",
    services: [{ name: "General Emergency Hotline", number: "911" }],
  },
  {
    country: "United Kingdom",
    services: [{ name: "General Emergency Hotline", number: "999" }],
  },
  {
    country: "South Africa",
    services: [
      { name: "Police", number: "10111" },
      { name: "Ambulance", number: "10177" },
      { name: "General Emergency Hotline", number: "112" },
    ],
  },
  {
    country: "Zimbabwe",
    services: [
      { name: "Police", number: "995" },
      { name: "Ambulance", number: "994" },
      { name: "Fire", number: "993" },
    ],
  },
];

/**
 * Short health tips and official notices.
 * 'type' can be 'tip', 'notice', or 'info' which affects the icon displayed.
 */
export const INFO_NOTICES: InfoNotice[] = [
  /* =========================== HEALTH ALERTS =========================== */
  {
    id: "HA-NOTICE-01",
    title: "Global Infant Formula Recall: Cereulide Toxin Contamination",
    content:
      "For babies who rely entirely on formula, repeated feedings can increase the amount of toxin consumed, and using contaminated formula for rehydration can worsen illness.",
    details:
      "Multi-country recalls of infant formula and related products have been initiated after cereulide toxin was detected in batches of multiple internationally distributed brands. The contamination has been traced to arachidonic acid (ARA) oil used as an ingredient. As of 25 February 2026, affected products were distributed across 99 countries and territories, with 144 suspected and confirmed cases reported across 10 countries in three WHO regions. WHO rates the overall public health risk as moderate, citing the particular vulnerability of infants to rapid dehydration and the ongoing uncertainty around the full extent of contaminated product distribution.",
    type: "notice",
    source: "World Health Organization (WHO)",
    sourceLink:
      "https://www.who.int/emergencies/disease-outbreak-news/item/2026-DON596",
    noticeDate: "2026-03-13",
  },
  {
    type: "notice",
    id: "HA-NOTICE-02",
    title: "Mpox: New Recombinant Virus Strain Detected Globally",
    noticeDate: "14-02-2026",
    content:
      "Transmission of this recombinant virus already involves at least four countries in three WHO regions, and is therefore likely to be more widespread than currently documented.",
    details:
      "A recombinant monkeypox virus (MPXV) strain combining genetic elements from both clade Ib and clade IIb has been detected in two cases — one in the United Kingdom and one in India — linked to travel in Asia and the Arabian Peninsula respectively. The cases occurred several weeks apart with near-identical viral sequences, suggesting a common origin and likely wider circulation than currently documented. Both patients recovered without severe outcomes and no secondary cases were identified through contact tracing. WHO's overall mpox risk assessment remains unchanged: moderate for men who have sex with men with new or multiple partners and for sex workers, and low for the general population.",
    source: "World Health Organization (WHO)",
    sourceLink:
      "https://www.who.int/emergencies/disease-outbreak-news/item/2026-DON595",
  },

  /* =========================== SITE UPDATES ============================ */
  {
    type: "info",
    id: "SU-NOTICE-01",
    title: "Courses now live",
    noticeDate: "30-04-2026",
    content:
      "Our Med-Courses Page is now live and packed full of educational content just for you!",
    details:
      "The Med-Course Page is now live and active with several courses on offer to help you better educate yourself in the medical space. Courses are carefully designed to be relevant and interactive with quizzes included in some course modules. So hop over there now to begin learning and improving!",
    source: "Medliz Admin",
  },
  {
    type: "info",
    id: "SU-NOTICE-02",
    title: "Articles now available",
    noticeDate: "30-04-2026",
    content:
      "Our Med-Blog Page is now live and filled with insightful reads curated just for you!",
    details:
      "The Medliz Blog is now live and active, featuring a growing collection of posts covering health, wellness, and everything in between. Articles are carefully written to be informative, engaging, and relevant to your everyday life. Head over now to explore the latest posts and stay up to date with all things Medliz!",
    source: "Medliz Admin",
  },

  /* =========================== WELLNESS TIPS =========================== */
  {
    type: "tip",
    id: "WT-NOTICE-01",
    title: "Hydration Tip",
    noticeDate: "29-04-2026",
    content:
      "Drinking 2 liters of water daily can significantly improve cognitive function.",
    details:
      "Hydration is critical for brain health. Even mild dehydration can impair concentration, memory, and mood. The general recommendation is about 2 liters (8 glasses) a day, but this can vary based on activity level, climate, and individual needs. Try carrying a reusable water bottle and setting reminders to drink throughout the day to maintain optimal hydration levels.",
    source: "ARIA GenAI",
  },
  {
    type: "tip",
    id: "WT-NOTICE-02",
    title: "Managing Sleep and Tiredness",
    noticeDate: "20-03-2026",
    content:
      "Reasons why you might feel tired and advice about what you can do to prevent tiredness.",
    details:
      "The NHS provides guidance on understanding and managing tiredness, covering the common causes of fatigue and practical strategies to improve sleep quality. Resources include self-help tips for fighting tiredness and a bedtime meditation video to support better rest. Lifestyle adjustments such as maintaining a consistent sleep schedule, reducing caffeine, and practising relaxation techniques before bed can all make a significant difference. Persistent or unexplained fatigue should be discussed with a GP.",
    source: "National Health Service (NHS) UK",
    sourceLink: "https://www.nhs.uk/live-well/sleep-and-tiredness/",
  },
  {
    type: "tip",
    id: "WT-NOTICE-03",
    title: "5 Steps to Better Mental Wellbeing",
    noticeDate: "16-12-2022",
    content:
      "Evidence suggests there are 5 steps you can take to improve your mental health and wellbeing. Trying these things could help you feel more positive and able to get the most out of life.",
    details:
      "The NHS outlines five evidence-based steps to improve mental health and wellbeing: connect with other people, be physically active, learn new skills, give to others, and pay attention to the present moment through mindfulness. Simple daily actions — such as sharing a meal with family, picking up a new hobby, volunteering in your community, or practising mindfulness — can meaningfully boost mood, build resilience, and foster a greater sense of purpose over time.",
    source: "National Health Service (NHS) UK",
    sourceLink:
      "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/five-steps-to-mental-wellbeing/",
  },
];

/**
 * blog posts for the Med-Blog section.
 * 'contributorId' in metadata must match IDs in the CONTRIBUTORS array.
 */
export const POSTS_DATA: Post[] = [
  {
    id: "AE-BFAK001-AI",
    slug: "basic-first-aid",
    title: "Basic First Aid Skills Everyone Should Know",
    excerpt:
      "Emergencies rarely announce themselves — a child chokes, a worker slices their hand, a congregation member collapses. In those first critical minutes, the person standing closest determines the outcome. That person could be you.",
    metadata: {
      contributorId: ["GC-GNAI-01", "TM-ERMS-01"],
      useofAI: true,
      publishedDate: "2026-05-01",
      tags: ["Prevention", "Emergency Skills"],
      rating: null,
      reviewCount: 0,
      duration: 10,
      durationUnit: "min",
    },
    contentPath:
      "/markdownContent/articles/ae-bfak001-ai-basicFirstAidEveryoneShouldKnow.md",
    image:
      "/visualAssets/images/avif/article-cover-ae-bfak001-ai-basicFirstAidEveryoneShouldKnow.avif",
  },
  {
    id: "AE-GHGU002-AI",
    slug: "gut-health-guide",
    title: "Gut Health: Understanding Your Body's Most Underestimated System",
    excerpt:
      "The gut is home to trillions of microorganisms that shape your immunity, metabolism, and even your mood. Here is what the science says about the microbiome, what damages it, and how to support it.",
    metadata: {
      contributorId: ["GC-GNAI-01", "TM-ERMS-01"],
      useofAI: true,
      publishedDate: "2026-05-01",
      tags: ["Gut Health", "Microbiome", "Nutrition"],
      rating: null,
      reviewCount: 0,
      duration: 12,
      durationUnit: "min",
    },
    contentPath: "/markdownContent/articles/ae-ghgu002-ai-gutHealthGuide.md",
    image:
      "/visualAssets/images/avif/article-cover-ae-ghgu002-ai-gutHealthGuide.avif",
  },
  {
    id: "AE-NDEG003-AI",
    slug: "nutrition-and-diet-evidence-based-guide",
    title: "Nutrition & Diet Evidence Based Guide",
    excerpt:
      "Every year brings a new wave of dietary trends — but what does the evidence actually support? From ultra-processed foods to the Mediterranean diet, here is a clear-eyed look at what nutrition science consistently shows.",
    metadata: {
      contributorId: ["GC-GNAI-01", "TM-ERMS-01"],
      useofAI: true,
      publishedDate: "2026-05-01",
      tags: ["Nutrition", "Diet", "Prevention"],
      rating: null,
      reviewCount: 0,
      duration: 9,
      durationUnit: "min",
    },
    contentPath:
      "/markdownContent/articles/ae-ndeg003-ai-nutritionAndDietEvidenceBasedGuide.md",
    image:
      "/visualAssets/images/avif/article-cover-ae-ndeg003-ai-nutritionAndDietEvidenceBasedGuide.avif",
  },
  {
    id: "AE-SLRE004-AI",
    slug: "sleep-and-recovery",
    title: "Sleep & Recovery: Why Rest Is the Most Underrated Pillar of Health",
    excerpt:
      "Sleep is not a luxury — it is a biological necessity. Discover what actually happens while you sleep, what chronic sleep deprivation does to the body and brain, and what the evidence says about improving your rest.",
    metadata: {
      contributorId: ["GC-GNAI-01", "TM-ERMS-01"],
      useofAI: true,
      publishedDate: "2026-05-01",
      tags: ["Sleep", "Recovery", "Wellness"],
      rating: null,
      reviewCount: 0,
      duration: 10,
      durationUnit: "min",
    },
    contentPath: "/markdownContent/articles/ae-slre004-ai-sleepAndRecovery.md",
    image:
      "/visualAssets/images/avif/article-cover-ae-slre004-ai-sleepAndRecovery.avif",
  },
  {
    id: "AE-UNDB005-AI",
    slug: "understanding-diabetes",
    title:
      "Understanding Diabetes: Type, Risks, and What Modern Management Looks Like",
    excerpt:
      "Over 530 million people are living with diabetes worldwide — yet the condition remains widely misunderstood. From the artificial pancreas to GLP-1 drugs, here is what modern diabetes care looks like in 2025.",
    metadata: {
      contributorId: ["GC-GNAI-01", "TM-ERMS-01"],
      useofAI: true,
      publishedDate: "2026-05-01",
      tags: ["Diabetes", "Chronic Disease", "Management"],
      rating: null,
      reviewCount: 0,
      duration: 11,
      durationUnit: "min",
    },
    contentPath:
      "/markdownContent/articles/ae-undb005-ai-understandingDiabetes.md",
    image:
      "/visualAssets/images/avif/article-cover-ae-undb005-ai-understandingDiabetes.avif",
  },
];

/**
 * educational courses for the Med-Courses section.
 * Each course contains multiple modules, and modules can optionally have a quiz.
 * Content is written in Markdown.
 */
export const COURSES_DATA: Course[] = [
  {
    id: "CS-FOCP001",
    slug: "foundations-of-clinical-practice",
    title: "The Foundations of Clinical Practice",
    description:
      "This course covers the foundational principles of clinical practice, including patient-centred care, medical ethics, communication techniques, professional standards, and accurate medical documentation. It equips healthcare professionals with the ethical and practical tools needed for every patient interaction.",
    prerequisites: ["None"],
    targetAudience: ["Medical Students", "Junior Doctors", "Nursing Students"],
    language: "English",
    metadata: {
      contributorId: ["TM-ERMS-01", "GC-GNAI-01"],
      useofAI: true,
      publishedDate: "2026-05-01",
      tags: [
        "Patient Care",
        "Medical Ethics",
        "Communication",
        "Professional Standards",
      ],
      rating: null,
      reviewCount: 0,
    },
    difficulty: "Beginner",
    duration: 1.5,
    durationUnit: "hrs",
    image:
      "visualAssets/images/avif/course-cover-cs-focp001-foundationsOfClinicalPractice.avif",
    modules: [
      {
        id: "CS-FOCP001-MDPC01",
        title: "Patient-Centred Care and Medical Ethics",
        contentPath:
          "/markdownContent/courses/cs-focp001-mdpc01-patientCentredCareAndMedicalEthics.md",
        quiz: {
          questions: [
            {
              id: "CS-FOCP001-MDPC01-QZ1-01",
              text: "What is the primary goal of patient-centered care?",
              options: [
                "Patient Comfort",
                "Efficiency",
                "Cost Reduction",
                "Doctor Convenience",
              ],
              correctIndex: 0,
            },
            {
              id: "CS-FOCP001-MDPC01-QZ1-02",
              text: "Which of these is a core ethical principle in medicine?",
              options: ["Profitability", "Autonomy", "Speed", "Popularity"],
              correctIndex: 1,
            },
            {
              id: "CS-FOCP001-MDPC01-QZ1-03",
              text: "How often should patient records be updated?",
              options: [
                "Weekly",
                "Monthly",
                "After every interaction",
                "Annually",
              ],
              correctIndex: 2,
            },
            {
              id: "CS-FOCP001-MDPC01-QZ1-04",
              text: "Which ethical principle refers to the obligation to do good for the patient?",
              options: [
                "Non-maleficence",
                "Justice",
                "Beneficence",
                "Autonomy",
              ],
              correctIndex: 2,
            },
            {
              id: "CS-FOCP001-MDPC01-QZ1-05",
              text: "What does 'non-maleficence' mean in medical ethics?",
              options: [
                "Treating all patients equally",
                "Do no harm",
                "Respecting patient decisions",
                "Providing the best available treatment",
              ],
              correctIndex: 0,
            },
            {
              id: "CS-FOCP001-MDPC01-QZ1-06",
              text: "Which communication approach is most appropriate when breaking bad news to a patient?",
              options: [
                "Deliver all information as quickly as possible",
                "Use a structured approach with empathy and clarity",
                "Delegate the task to a junior colleague",
                "Use technical jargon to appear professional",
              ],
              correctIndex: 1,
            },
            {
              id: "CS-FOCP001-MDPC01-QZ1-07",
              text: "A patient refuses a recommended treatment. What is the correct first response?",
              options: [
                "Proceed with treatment regardless",
                "Contact the patient's family to override the decision",
                "Discharge the patient immediately",
                "Respect the decision if the patient has capacity",
              ],
              correctIndex: 3,
            },
          ],
          passingScore: 60,
          duration: 18,
          durationUnit: "min",
          difficulty: "Easy",
        },
      },
      {
        id: "CS-FOCP001-MDCD02",
        title: "Clinical Documentation and Record Keeping",
        contentPath:
          "/markdownContent/courses/cs-focp001-mdcd02-clinicalDocumentationAndRecordKeeping.md",
      },
    ],
  },
  {
    id: "CS-CDDM002",
    slug: "clinical-diagnostics-and-decision-making",
    title: "Clinical Diagnostics & Decision Making",
    description:
      "This course explores the structured methods clinicians use to move from presenting symptoms to an accurate diagnosis. It covers the diagnostic process, cognitive biases, clinical decision support tools, managing uncertainty, and the recognition of red flag symptoms.",
    prerequisites: ["The Foundations of Clinical Practice"],
    targetAudience: [
      "Medical Students",
      "Junior Doctors",
      "Nursing Students",
      "Clinical Trainees",
    ],
    language: "English",
    metadata: {
      contributorId: ["GC-GNAI-01", "TM-ERMS-01"],
      useofAI: true,
      publishedDate: "2026-05-01",
      tags: [
        "Clinical Diagnostics",
        "Decision Making",
        "Clinical Reasoning",
        "Cognitive Bias",
        "Decision Support",
      ],
      rating: null,
      reviewCount: 0,
    },
    difficulty: "Beginner",
    duration: 45,
    durationUnit: "min",
    image:
      "visualAssets/images/avif/course-cover-cs-cddm002-clinicalDiagnosticsAndDecisionMaking.avif",
    modules: [
      {
        id: "CS-CDDM002-MDDP01",
        title: "The Diagnostic Process and Clinical Reasoning",
        contentPath:
          "/markdownContent/courses/cs-cddm002-mddp01-theDiagnosticProcessAndClinicalReasoning.md",
        quiz: {
          questions: [
            {
              id: "CS-CDDM002-MDDP01-QZ1-01",
              text: "What is the correct order of the diagnostic process?",
              options: [
                "Investigations → History → Examination → Diagnosis",
                "History → Examination → Investigations → Differential → Working Diagnosis",
                "Working Diagnosis → History → Investigations → Examination",
                "Differential → Investigations → History → Working Diagnosis",
              ],
              correctIndex: 1,
            },
            {
              id: "CS-CDDM002-MDDP01-QZ1-02",
              text: "Which cognitive bias involves fixating on an initial diagnosis and failing to update it?",
              options: [
                "Availability bias",
                "Framing effect",
                "Anchoring bias",
                "Premature closure",
              ],
              correctIndex: 2,
            },
            {
              id: "CS-CDDM002-MDDP01-QZ1-03",
              text: "A clinician diagnoses a condition they saw three times last week in a similar patient. This is an example of:",
              options: [
                "Anchoring bias",
                "Availability bias",
                "Framing effect",
                "Confirmation bias",
              ],
              correctIndex: 1,
            },
            {
              id: "CS-CDDM002-MDDP01-QZ1-04",
              text: "Which of the following is a red flag symptom requiring urgent escalation?",
              options: [
                "Sudden-onset severe headache",
                "Mild fatigue lasting one week",
                "Intermittent headache relieved by paracetamol",
                "Low-grade fever in an otherwise well adult",
              ],
              correctIndex: 0,
            },
            {
              id: "CS-CDDM002-MDDP01-QZ1-05",
              text: "What is the primary purpose of a differential diagnosis?",
              options: [
                "To justify ordering investigations to the patient",
                "To document the final diagnosis for the medical record",
                "To identify the cheapest treatment option",
                "To generate a ranked list of possible diagnoses before committing to one",
              ],
              correctIndex: 3,
            },
            {
              id: "CS-CDDM002-MDDP01-QZ1-06",
              text: "The CURB-65 score is a clinical decision tool used in the management of:",
              options: [
                "Deep vein thrombosis",
                "Pneumonia",
                "Pulmonary embolism",
                "Sepsis",
              ],
              correctIndex: 1,
            },
            {
              id: "CS-CDDM002-MDDP01-QZ1-07",
              text: "Which of the following best describes 'premature closure' in clinical reasoning?",
              options: [
                "Refusing to change a diagnosis once a treatment has begun",
                "Ordering too many investigations too early",
                "Stopping the diagnostic process after reaching a plausible diagnosis without fully ruling out alternatives",
                "Accepting a referral bias in the clinical history",
              ],
              correctIndex: 2,
            },
            {
              id: "CS-CDDM002-MDDP01-QZ1-08",
              text: "A patient presents with haemoptysis and unexplained weight loss over three months. What is the appropriate initial action?",
              options: [
                "Escalate urgently and initiate investigation for serious underlying pathology",
                "Refer to physiotherapy",
                "Treat empirically with antibiotics",
                "Reassure the patient and review in six weeks",
              ],
              correctIndex: 0,
            },
          ],
          passingScore: 60,
          duration: 20,
          durationUnit: "min",
          difficulty: "Easy",
        },
      },
    ],
  },
  {
    id: "CS-ACLP003",
    slug: "advanced-clinical-leadership",
    title: "Advanced Clinical Leadership",
    description:
      "This advanced course examines the leadership competencies and quality improvement frameworks required of senior clinicians. Topics include crew resource management, managing clinical deterioration, psychological safety, resilience, clinical governance, PDSA methodology, root cause analysis, and the senior clinician's role in organisational quality.",
    prerequisites: [
      "The Foundations of Clinical Practice",
      "Clinical Diagnostics & Decision Making",
    ],
    targetAudience: [
      "Senior Clinicians",
      "Consultants",
      "Registrars",
      "Clinical Leads",
      "Advanced Nurse Practitioners",
    ],
    language: "English",
    metadata: {
      contributorId: ["GC-GNAI-01", "TM-ERMS-01"],
      useofAI: true,
      publishedDate: "2026-05-01",
      tags: [
        "Clinical Leadership",
        "Crew Resource Management",
        "Quality Improvement",
        "Clinical Governance",
      ],
      rating: null,
      reviewCount: 0,
    },
    difficulty: "Advanced",
    duration: 1.5,
    durationUnit: "hrs",
    image:
      "visualAssets/images/avif/course-cover-cs-aclp003-advancedClinicalLeadership.avif",
    modules: [
      {
        id: "CS-ACLP003-MDLT01",
        title: "Leading Clinical Teams Under Pressure",
        contentPath:
          "/markdownContent/courses/cs-aclp003-mdlt01-leadingClinicalTeamsUnderPressure.md",
      },
      {
        id: "CS-ACLP003-MDQI02",
        title: "Quality Improvement and Clinical Governance",
        contentPath:
          "/markdownContent/courses/cs-aclp003-mdqi02-qualityImprovementAndClinicalGovernance.md",
        quiz: {
          questions: [
            {
              id: "CS-ACLP003-MDQI02-QZ1-01",
              text: "What is the correct sequence of the PDSA cycle?",
              options: [
                "Plan → Do → Study → Act",
                "Plan → Study → Do → Act",
                "Do → Plan → Study → Act",
                "Study → Plan → Act → Do",
              ],
              correctIndex: 0,
            },
            {
              id: "CS-ACLP003-MDQI02-QZ1-02",
              text: "Which type of QI metric measures the result of care (e.g., 30-day readmission rate)?",
              options: [
                "Process metric",
                "Balancing metric",
                "Outcome metric",
                "Structure metric",
              ],
              correctIndex: 2,
            },
            {
              id: "CS-ACLP003-MDQI02-QZ1-03",
              text: "What is the purpose of a 'balancing metric' in quality improvement?",
              options: [
                "To measure baseline performance before a PDSA cycle",
                "To ensure financial targets are met alongside clinical targets",
                "To compare performance across different NHS trusts",
                "To detect unintended consequences of an improvement intervention",
              ],
              correctIndex: 3,
            },
            {
              id: "CS-ACLP003-MDQI02-QZ1-04",
              text: "Root cause analysis (RCA) is primarily intended to:",
              options: [
                "Attribute blame to the individual responsible for an error",
                "Identify the systemic and contributing factors behind an adverse event",
                "Determine whether disciplinary action is required",
                "Generate a report for the Care Quality Commission",
              ],
              correctIndex: 1,
            },
            {
              id: "CS-ACLP003-MDQI02-QZ1-05",
              text: "An Ishikawa (fishbone) diagram is used in quality improvement to:",
              options: [
                "Organise potential causes of a problem into categories",
                "Plot control charts showing variation over time",
                "Map patient journeys from referral to discharge",
                "Display run chart data for a PDSA cycle",
              ],
              correctIndex: 0,
            },
            {
              id: "CS-ACLP003-MDQI02-QZ1-06",
              text: "Which of the following best describes clinical governance?",
              options: [
                "The framework through which organisations are accountable for continuously improving quality and safeguarding standards",
                "The process of credentialing new medical staff",
                "A statutory body that investigates clinical complaints",
                "A national benchmarking database for hospital performance",
              ],
              correctIndex: 0,
            },
            {
              id: "CS-ACLP003-MDQI02-QZ1-07",
              text: "Which of the following is NOT a core pillar of clinical governance?",
              options: [
                "Clinical audit",
                "Risk management",
                "Pharmaceutical supply chain management",
                "Education and training",
              ],
              correctIndex: 2,
            },
            {
              id: "CS-ACLP003-MDQI02-QZ1-08",
              text: "When conducting a mortality and morbidity (M&M) review, the primary aim should be to:",
              options: [
                "Determine whether the clinical team acted negligently",
                "Identify learning points and system improvements to prevent recurrence",
                "Produce documentation for use in medical litigation",
                "Assess whether further investigation by management is required",
              ],
              correctIndex: 1,
            },
            {
              id: "CS-ACLP003-MDQI02-QZ1-09",
              text: "Which CRM principle involves the receiver repeating back an instruction to confirm they have understood it correctly?",
              options: [
                "Shared mental model",
                "Assertive challenge",
                "Situational awareness",
                "Closed-loop communication",
              ],
              correctIndex: 3,
            },
          ],
          passingScore: 50,
          duration: 22,
          durationUnit: "min",
          difficulty: "Hard",
        },
      },
    ],
  },
  {
    id: "CS-PPSA004",
    slug: "pharmacology-and-patient-safety",
    title: "Pharmacology and Patient Safety",
    description:
      "This comprehensive course covers the core principles of pharmacology and safe prescribing practice. From foundational PK/PD concepts to adverse drug reactions, medication safety systems, and antibiotic stewardship, this course equips clinicians with the knowledge and habits to prescribe safely and responsibly.",
    prerequisites: ["The Foundations of Clinical Practice"],
    targetAudience: [
      "Medical Students",
      "Junior Doctors",
      "Pharmacists",
      "Nurse Prescribers",
      "Clinical Trainees",
    ],
    language: "English",
    metadata: {
      contributorId: ["GC-GNAI-01", "TM-ERMS-01"],
      useofAI: true,
      publishedDate: "2026-05-01",
      tags: [
        "Pharmacology",
        "Prescribing",
        "Adverse Drug Reactions",
        "Drug Interactions",
        "Medication Safety",
      ],
      rating: null,
      reviewCount: 0,
    },
    difficulty: "Intermediate",
    duration: 3,
    durationUnit: "hrs",
    image:
      "visualAssets/images/avif/course-cover-cs-ppsa004-pharmacologyAndPatientSafety.avif",
    modules: [
      {
        id: "CS-PPSA004-MDCP01",
        title: "Core Principles of Pharmacology",
        contentPath:
          "/markdownContent/courses/cs-ppsa004-mdcp01-corePrinciplesOfPharmacology.md",
      },
      {
        id: "CS-PPSA004-MDAD02",
        title: "Adverse Drug Reactions and Drug Interactions",
        contentPath:
          "/markdownContent/courses/cs-ppsa004-mdad02-adverseDrugReactionsAndDrugInteractions.md",
        quiz: {
          questions: [
            {
              id: "CS-PPSA004-MDAD02-QZ1-01",
              text: "Which type of adverse drug reaction (ADR) is dose-dependent and predictable?",
              options: [
                "Type B (Bizarre)",
                "Type D (Delayed)",
                "Type E (End-of-use)",
                "Type A (Augmented)",
              ],
              correctIndex: 3,
            },
            {
              id: "CS-PPSA004-MDAD02-QZ1-02",
              text: "A patient on long-term corticosteroids develops adrenal suppression. This is classified as which type of ADR?",
              options: ["Type A", "Type B", "Type C", "Type F"],
              correctIndex: 2,
            },
            {
              id: "CS-PPSA004-MDAD02-QZ1-03",
              text: "Rifampicin reduces the efficacy of warfarin. What pharmacokinetic mechanism underlies this interaction?",
              options: [
                "Enzyme inhibition",
                "Enzyme induction",
                "Protein binding displacement",
                "Reduced renal excretion",
              ],
              correctIndex: 1,
            },
            {
              id: "CS-PPSA004-MDAD02-QZ1-04",
              text: "A patient on simvastatin is prescribed clarithromycin for a chest infection. What is the primary concern?",
              options: [
                "Reduced clarithromycin efficacy due to enzyme induction",
                "Additive QT prolongation leading to arrhythmia",
                "Reduced antibiotic absorption due to altered gastric motility",
                "Elevated simvastatin levels due to enzyme inhibition, increasing myopathy risk",
              ],
              correctIndex: 3,
            },
            {
              id: "CS-PPSA004-MDAD02-QZ1-05",
              text: "Serotonin syndrome is most likely to occur with which drug combination?",
              options: [
                "Metformin + ramipril",
                "Warfarin + aspirin",
                "SSRI + tramadol",
                "Beta-blocker + calcium channel blocker",
              ],
              correctIndex: 2,
            },
            {
              id: "CS-PPSA004-MDAD02-QZ1-06",
              text: "Which of the following ADR presentations should prompt urgent assessment for QT prolongation?",
              options: [
                "Ankle swelling in a patient on amlodipine",
                "Dry cough in a patient on an ACE inhibitor",
                "Palpitations and near-syncope in a patient on an antipsychotic",
                "Mild nausea in a patient started on metformin",
              ],
              correctIndex: 2,
            },
            {
              id: "CS-PPSA004-MDAD02-QZ1-07",
              text: "To which system should UK healthcare professionals report suspected adverse drug reactions?",
              options: [
                "Yellow Card scheme",
                "MedWatch",
                "EudraVigilance",
                "VigiBase",
              ],
              correctIndex: 0,
            },
            {
              id: "CS-PPSA004-MDAD02-QZ1-08",
              text: "What percentage of adverse drug reactions are classified as Type A (augmented)?",
              options: [
                "Approximately 65%",
                "Approximately 80%",
                "Approximately 50%",
                "Approximately 20%",
              ],
              correctIndex: 1,
            },
            {
              id: "CS-PPSA004-MDAD02-QZ1-09",
              text: "ACE inhibitor combined with a potassium-sparing diuretic most commonly risks causing:",
              options: [
                "Hypernatraemia",
                "Hyponatraemia",
                "Hypokalaemia",
                "Hyperkalaemia",
              ],
              correctIndex: 3,
            },
            {
              id: "CS-PPSA004-MDAD02-QZ1-10",
              text: "Which of the following best describes a pharmacodynamic drug interaction?",
              options: [
                "Two drugs with similar mechanisms produce additive or synergistic effects",
                "One drug displaces another from plasma protein binding sites",
                "One drug alters the metabolism of another via CYP450 enzymes",
                "One drug reduces the absorption of another from the GI tract",
              ],
              correctIndex: 0,
            },
          ],
          passingScore: 65,
          duration: 25,
          durationUnit: "min",
          difficulty: "Medium",
        },
      },
      {
        id: "CS-PPSA004-MDSP03",
        title: "Safe Prescribing and Medication Error Prevention",
        contentPath:
          "/markdownContent/courses/cs-ppsa004-mdsp03-safePrescribingAndMedicationErrorPrevention.md",
      },
      {
        id: "CS-PPSA004-MDAS04",
        title: "Antibiotic Stewardship and Antimicrobial Resistance",
        contentPath:
          "/markdownContent/courses/cs-ppsa004-mdas04-antibioticStewardshipAndAntimicrobialResistance.md",
        quiz: {
          questions: [
            {
              id: "CS-PPSA004-MDAS04-QZ1-01",
              text: "According to the World Health Organisation projections, how many deaths annually could be caused by drug-resistant infections by 2050 if no action is taken?", // ⚠️ Typo corrected — see notes below
              options: ["1 million", "5 million", "10 million", "25 million"],
              correctIndex: 2,
            },
            {
              id: "CS-PPSA004-MDAS04-QZ1-02",
              text: "Which resistance mechanism does MRSA use to resist beta-lactam antibiotics?",
              options: [
                "Beta-lactamase production",
                "Altered penicillin-binding protein (PBP2a)",
                "Efflux pump overexpression",
                "Reduced outer membrane permeability",
              ],
              correctIndex: 1,
            },
            {
              id: "CS-PPSA004-MDAS04-QZ1-03",
              text: "What is the recommended timing for sending microbiological specimens relative to starting antibiotics?",
              options: [
                "After 48 hours of antibiotic therapy",
                "At the same time as administering the first antibiotic dose",
                "Before starting antibiotics wherever possible",
                "Only if the patient fails to respond within 72 hours",
              ],
              correctIndex: 2,
            },
            {
              id: "CS-PPSA004-MDAS04-QZ1-04",
              text: "De-escalation in antibiotic prescribing refers to:",
              options: [
                "Switching from oral to IV antibiotics for severe infections",
                "Stopping all antibiotics once the patient is afebrile",
                "Reducing the frequency of antibiotic dosing to minimise side effects",
                "Narrowing the spectrum of antimicrobial therapy once culture and sensitivity results are available",
              ],
              correctIndex: 3,
            },
            {
              id: "CS-PPSA004-MDAS04-QZ1-05",
              text: "Which of the following is NOT a core principle of antibiotic stewardship?",
              options: [
                "Right drug",
                "Right patient",
                "Right duration",
                "Right prescriber grade",
              ],
              correctIndex: 3,
            },
            {
              id: "CS-PPSA004-MDAS04-QZ1-06",
              text: "ESBL-producing E. coli primarily resists antibiotics through which mechanism?",
              options: [
                "Efflux pumps",
                "Target site modification",
                "Beta-lactamase enzyme production",
                "Reduced membrane permeability",
              ],
              correctIndex: 2,
            },
            {
              id: "CS-PPSA004-MDAS04-QZ1-07",
              text: "A patient with a urinary tract infection is responding well to IV co-amoxiclav. Cultures confirm a sensitive organism. The appropriate stewardship action at 48 hours is:",
              options: [
                "Switch to an appropriate oral antibiotic (IV-to-oral switch)",
                "Continue IV antibiotics for the full 14-day course",
                "Add a second IV antibiotic to broaden cover",
                "Stop all antibiotics as the patient is improving",
              ],
              correctIndex: 0,
            },
            {
              id: "CS-PPSA004-MDAS04-QZ1-08",
              text: "A patient requests antibiotics for a common cold. The correct response is:",
              options: [
                "Prescribe a short course of amoxicillin to prevent secondary bacterial infection",
                "Prescribe antibiotics to maintain the therapeutic relationship",
                "Explain that common colds are viral and antibiotics will not help, and discuss appropriate symptomatic management",
                "Refer the patient to a specialist for further assessment",
              ],
              correctIndex: 2,
            },
            {
              id: "CS-PPSA004-MDAS04-QZ1-09",
              text: "Which antibiotic prescription review is considered a cornerstone of stewardship programmes?",
              options: [
                "12-hour review",
                "48 to 72 hour review with culture results",
                "Weekly ward round review",
                "Review only if the patient deteriorates",
              ],
              correctIndex: 1,
            },
            {
              id: "CS-PPSA004-MDAS04-QZ1-10",
              text: "Which of the following is listed by the World Health Organisation as a key driver of antimicrobial resistance?", // ⚠️ Typo corrected — see notes below
              options: [
                "Overuse and inappropriate prescribing of antibiotics in human medicine",
                "Increased vaccination rates in high-income countries",
                "Expansion of generic antibiotic manufacturing",
                "Improved sanitation in healthcare settings",
              ],
              correctIndex: 0,
            },
          ],
          passingScore: 65,
          duration: 25,
          durationUnit: "min",
          difficulty: "Medium",
        },
      },
    ],
  },
];

export const SPONSOR_PRODUCTS: SponsorProduct[] = [
  {
    id: "ST-AD-CDPP-01",
    name: "Creative Design & Promotional Printing Services",
    sponsorName: "Kudzai EZ Mabika",
    benefactorId: "ST-KZMB-01",
    description:
      "Eye-catching banners, t-shirts, flyers and more — designed and printed to make your brand stand out.",
    longDescription:
      "Make your brand impossible to ignore. From bold, head-turning banners to professionally printed flyers and custom branded t-shirts, every promotional material is designed with creativity and precision to ensure your message lands with impact. Whether you are launching a business, promoting an event, or building brand awareness, get promotional materials that look great, feel premium, and get you noticed. Based in Johannesburg and ready to bring your vision to life.",
    image: "visualAssets/images/avif/advert-cover-benefactor-st-kezMabika.avif",
    logoUrl: "visualAssets/images/avif/profile-benefactor-st-kezMabika.avif",
    link: "mailto:kudzaiemabika@gmail.com?subject=Design/Print Enquiry&body=Hi Kudzai Mabika,%0D%0A%0D%0AI would like to place a design/print enquiry. Here are my details:%0D%0AName: (Please replace this text with your name.)%0D%0AOrder details: (Please replace this text with your order details. Such as type tshirt print, banner design, logo design, etc)%0D%0APreferred date: (Please replace this text with your preferred date to receive your order.)%0D%0AContact Information: (Please replace this text with your contact information, if different to the email you sent this message with.)%0D%0D%0A%0D%0AThank you!",
    cta: "Get in Touch",
  },
  {
    id: "LT-AD-HSAC-01",
    name: "Handcrafted Scones & Cakes",
    sponsorName: "Donna Farine",
    benefactorId: "LT-DOFA-01",
    description:
      "Beautifully handcrafted scones and cakes made with love — custom orders welcome.",
    longDescription:
      "Treat yourself to scones so light and fluffy they melt in your mouth, or indulge in a showstopping cake confection crafted to perfection. At Donna Farine, every bake is made by hand using quality ingredients, delivering that irresistible homemade taste you just cannot get anywhere else. Planning something special? Custom orders are available — whether it is an intimate gathering or a memorable celebration, we will bake something extraordinary just for you. Go on, you deserve it.",
    image:
      "visualAssets/images/avif/advert-cover-benefactor-lt-donnaFarine.avif",
    logoUrl: "visualAssets/images/avif/profile-benefactor-lt-donnaFarine.avif",
    link: "mailto:donsharai@gmail.com?subject=Custom Order Enquiry&body=Hi Donna Farine,%0D%0A%0D%0AI would like to place a custom order. Here are my details:%0D%0A%0D%0AName: (Please replace this text with your name.)%0D%0AOrder details: (Please replace this text with your order details. Such as size of cake, flavour, writing)%0D%0APreferred date: (Please replace this text with your preferred date to receive your order.)%0D%0AContact Information: (Please replace this text with your contact information, if different to the email you sent this message with.)%0D%0D%0A%0D%0AThank you!",
    cta: "Place Order Today",
  },
  {
    id: "LT-AD-PHCS-02",
    name: "Professional Home Cleaning Services",
    sponsorName: "Make It Bright Cleaning Solutions",
    benefactorId: "LT-MBCS-02",
    description:
      "Reliable, thorough professional cleaning services for homeowners in and around Doncaster.",
    longDescription:
      "Come home to a spotless, fresh living space without lifting a finger. Make It Bright Cleaning Solutions delivers thorough, professional cleaning tailored to your home\'s needs — every corner, every surface, every time. Serving homeowners in and around Adwick le Street and Doncaster, we bring the reliability and attention to detail your home deserves. Stop worrying about the cleaning and start enjoying your home the way it was meant to be enjoyed.",
    image:
      "visualAssets/images/avif/advert-cover-benefactor-lt-makeItBright.avif",
    logoUrl: "visualAssets/images/avif/profile-benefactor-lt-makeItBright.avif",
    link: "https://www.checkatrade.com/trades/makeitbrightcleaningsolutionsltd",
    cta: "Book a Clean",
  },
];
