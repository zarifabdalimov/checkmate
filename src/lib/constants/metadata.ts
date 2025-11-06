type LocalizedMetadata = {
  // Brand information
  BRAND_NAME: string;
  TAGLINE: string;
  BRAND_FULL: string;

  // Common descriptions
  MAIN_DESCRIPTION: string;
  LANDING_DESCRIPTION: string;

  // Common phrases
  TRANSFORM_TESTING: string;
  AI_POWERED_TOOLS: string;
  PERSONALIZED_FEEDBACK: string;

  // Authors and creators
  AUTHOR: string;
  CREATOR: string;

  // Keywords
  KEYWORDS: string[];

  // OpenGraph defaults
  OG_TYPE: "website";
  OG_LOCALE: string;
  TWITTER_CARD: "summary_large_image";

  // Page titles
  HOME_PAGE_TITLE: string;

  // Page-specific descriptions
  PAGES: {
    SIGN_IN: {
      title: string;
      description: string;
      ogTitle: string;
    };
    SIGN_UP: {
      title: string;
      description: string;
      ogTitle: string;
    };
    VERIFY_EMAIL: {
      title: string;
      description: string;
      ogTitle: string;
    };
    DASHBOARD: {
      title: string;
      description: string;
      ogTitle: string;
    };
    GROUPS: {
      title: string;
      description: string;
      ogTitle: string;
    };
    STUDENTS: {
      title: string;
      description: string;
      ogTitle: string;
    };
    TESTS: {
      title: string;
      description: string;
      ogTitle: string;
    };
  };
};

const METADATA_BY_LOCALE: Record<string, LocalizedMetadata> = {
  en: {
    // Brand information
    BRAND_NAME: "Checkmate",
    TAGLINE: "AI-Powered Education Platform",
    BRAND_FULL: "Checkmate - AI-Powered Education Platform",

    // Common descriptions
    MAIN_DESCRIPTION:
      "Transform testing with AI intelligence. Empower teachers to create intelligent assessments and provide students with personalized feedback and AI-powered study assistance.",
    LANDING_DESCRIPTION:
      "Transform testing with AI intelligence. Create comprehensive tests instantly, save hours with automated grading, and provide personalized feedback to help students succeed.",

    // Common phrases
    TRANSFORM_TESTING: "Transform testing with AI intelligence",
    AI_POWERED_TOOLS: "AI-powered tools",
    PERSONALIZED_FEEDBACK: "personalized feedback",

    // Authors and creators
    AUTHOR: "Checkmate Team",
    CREATOR: "Checkmate",

    // Keywords
    KEYWORDS: [
      "education",
      "AI",
      "testing",
      "assessment",
      "teachers",
      "students",
      "grading",
      "feedback",
    ],

    // OpenGraph defaults
    OG_TYPE: "website" as const,
    OG_LOCALE: "en_US",
    TWITTER_CARD: "summary_large_image" as const,

    // Page titles
    HOME_PAGE_TITLE: "Home",

    // Page-specific descriptions
    PAGES: {
      SIGN_IN: {
        title: "Sign In",
        description:
          "Sign in to your Checkmate account to access your dashboard, manage tests, and track student progress.",
        ogTitle: "Sign In to Checkmate",
      },
      SIGN_UP: {
        title: "Sign Up",
        description:
          "Create your free Checkmate account and start transforming your testing experience with AI-powered assessments and automated grading.",
        ogTitle: "Sign Up for Checkmate",
      },
      VERIFY_EMAIL: {
        title: "Verify Email",
        description:
          "Verify your email address to complete your Checkmate account setup and start using AI-powered educational tools.",
        ogTitle: "Verify Your Email - Checkmate",
      },
      DASHBOARD: {
        title: "Dashboard",
        description:
          "Welcome to your Checkmate dashboard. Access all your teaching tools, view analytics, and manage your educational content in one place.",
        ogTitle: "Dashboard - Checkmate",
      },
      GROUPS: {
        title: "Groups",
        description:
          "Manage your student groups and organize your classes. Create, edit, and track group performance with Checkmate's intelligent group management system.",
        ogTitle: "Groups - Checkmate",
      },
      STUDENTS: {
        title: "Students",
        description:
          "Manage your students and track their academic progress. View detailed analytics, assign groups, and monitor individual performance with AI-powered insights.",
        ogTitle: "Students - Checkmate",
      },
      TESTS: {
        title: "Tests",
        description:
          "Create, manage, and analyze your tests with AI-powered tools. Generate comprehensive assessments, automate grading, and provide personalized feedback to students.",
        ogTitle: "Tests - Checkmate",
      },
    },
  },
  cs: {
    // Brand information
    BRAND_NAME: "Checkmate",
    TAGLINE: "AI platforma pro vzdělávání",
    BRAND_FULL: "Checkmate - AI platforma pro vzdělávání",

    // Common descriptions
    MAIN_DESCRIPTION:
      "Transformujte testování s umělou inteligencí. Umožněte učitelům vytvářet inteligentní hodnocení a poskytovat studentům personalizovanou zpětnou vazbu a studijní asistenci.",
    LANDING_DESCRIPTION:
      "Transformujte testování s umělou inteligencí. Vytvářejte komplexní testy okamžitě, ušetřete hodiny s automatickým hodnocením a poskytněte personalizovanou zpětnou vazbu pro úspěch studentů.",

    // Common phrases
    TRANSFORM_TESTING: "Transformujte testování s umělou inteligencí",
    AI_POWERED_TOOLS: "AI nástroje",
    PERSONALIZED_FEEDBACK: "personalizovaná zpětná vazba",

    // Authors and creators
    AUTHOR: "Checkmate Tým",
    CREATOR: "Checkmate",

    // Keywords
    KEYWORDS: [
      "vzdělávání",
      "AI",
      "testování",
      "hodnocení",
      "učitelé",
      "studenti",
      "známkování",
      "zpětná vazba",
    ],

    // OpenGraph defaults
    OG_TYPE: "website" as const,
    OG_LOCALE: "cs_CZ",
    TWITTER_CARD: "summary_large_image" as const,

    // Page titles
    HOME_PAGE_TITLE: "Domovská stránka",

    // Page-specific descriptions
    PAGES: {
      SIGN_IN: {
        title: "Přihlášení",
        description:
          "Přihlaste se ke svému účtu Checkmate pro přístup k nástěnce, správu testů a sledování pokroku studentů.",
        ogTitle: "Přihlášení do Checkmate",
      },
      SIGN_UP: {
        title: "Registrace",
        description:
          "Vytvořte si bezplatný účet Checkmate a začněte transformovat své testování s AI hodnocením a automatickým známkováním.",
        ogTitle: "Registrace do Checkmate",
      },
      VERIFY_EMAIL: {
        title: "Ověření emailu",
        description:
          "Ověřte svou emailovou adresu pro dokončení nastavení účtu Checkmate a začněte používat AI vzdělávací nástroje.",
        ogTitle: "Ověření emailu - Checkmate",
      },
      DASHBOARD: {
        title: "Nástěnka",
        description:
          "Vítejte na vaší nástěnce Checkmate. Přístup ke všem vašim vzdělávacím nástrojům, zobrazení analytiky a správa vzdělávacího obsahu na jednom místě.",
        ogTitle: "Nástěnka - Checkmate",
      },
      GROUPS: {
        title: "Skupiny",
        description:
          "Spravujte skupiny studentů a organizujte své třídy. Vytvářejte, upravujte a sledujte výkon skupin s inteligentním systémem správy skupin Checkmate.",
        ogTitle: "Skupiny - Checkmate",
      },
      STUDENTS: {
        title: "Studenti",
        description:
          "Spravujte své studenty a sledujte jejich akademický pokrok. Prohlížejte detailní analytiku, přiřazujte skupiny a monitorujte individuální výkon s AI insights.",
        ogTitle: "Studenti - Checkmate",
      },
      TESTS: {
        title: "Testy",
        description:
          "Vytvářejte, spravujte a analyzujte své testy s AI nástroji. Generujte komplexní hodnocení, automatizujte známkování a poskytujte personalizovanou zpětnou vazbu studentům.",
        ogTitle: "Testy - Checkmate",
      },
    },
  },
  de: {
    // Brand information
    BRAND_NAME: "Checkmate",
    TAGLINE: "KI-gestützte Bildungsplattform",
    BRAND_FULL: "Checkmate - KI-gestützte Bildungsplattform",

    // Common descriptions
    MAIN_DESCRIPTION:
      "Transformieren Sie Tests mit KI-Intelligenz. Ermöglichen Sie Lehrern, intelligente Bewertungen zu erstellen und Schülern personalisiertes Feedback und KI-gestützte Lernhilfe zu bieten.",
    LANDING_DESCRIPTION:
      "Transformieren Sie Tests mit KI-Intelligenz. Erstellen Sie umfassende Tests sofort, sparen Sie Stunden mit automatischer Bewertung und bieten Sie personalisiertes Feedback für den Erfolg der Schüler.",

    // Common phrases
    TRANSFORM_TESTING: "Transformieren Sie Tests mit KI-Intelligenz",
    AI_POWERED_TOOLS: "KI-gestützte Tools",
    PERSONALIZED_FEEDBACK: "personalisiertes Feedback",

    // Authors and creators
    AUTHOR: "Checkmate Team",
    CREATOR: "Checkmate",

    // Keywords
    KEYWORDS: [
      "Bildung",
      "KI",
      "Tests",
      "Bewertung",
      "Lehrer",
      "Schüler",
      "Benotung",
      "Feedback",
    ],

    // OpenGraph defaults
    OG_TYPE: "website" as const,
    OG_LOCALE: "de_DE",
    TWITTER_CARD: "summary_large_image" as const,

    // Page titles
    HOME_PAGE_TITLE: "Startseite",

    // Page-specific descriptions
    PAGES: {
      SIGN_IN: {
        title: "Anmelden",
        description:
          "Melden Sie sich bei Ihrem Checkmate-Konto an, um auf Ihr Dashboard zuzugreifen, Tests zu verwalten und den Fortschritt der Schüler zu verfolgen.",
        ogTitle: "Bei Checkmate anmelden",
      },
      SIGN_UP: {
        title: "Registrieren",
        description:
          "Erstellen Sie Ihr kostenloses Checkmate-Konto und beginnen Sie, Ihre Testerfahrung mit KI-gestützten Bewertungen und automatischer Benotung zu transformieren.",
        ogTitle: "Bei Checkmate registrieren",
      },
      VERIFY_EMAIL: {
        title: "E-Mail verifizieren",
        description:
          "Verifizieren Sie Ihre E-Mail-Adresse, um die Einrichtung Ihres Checkmate-Kontos abzuschließen und KI-gestützte Bildungstools zu nutzen.",
        ogTitle: "E-Mail verifizieren - Checkmate",
      },
      DASHBOARD: {
        title: "Dashboard",
        description:
          "Willkommen in Ihrem Checkmate-Dashboard. Greifen Sie auf alle Ihre Lehrtools zu, sehen Sie Analysen und verwalten Sie Ihre Bildungsinhalte an einem Ort.",
        ogTitle: "Dashboard - Checkmate",
      },
      GROUPS: {
        title: "Gruppen",
        description:
          "Verwalten Sie Ihre Schülergruppen und organisieren Sie Ihre Klassen. Erstellen, bearbeiten und verfolgen Sie die Gruppenleistung mit Checkmates intelligentem Gruppenverwaltungssystem.",
        ogTitle: "Gruppen - Checkmate",
      },
      STUDENTS: {
        title: "Schüler",
        description:
          "Verwalten Sie Ihre Schüler und verfolgen Sie ihren akademischen Fortschritt. Sehen Sie detaillierte Analysen, weisen Sie Gruppen zu und überwachen Sie die individuelle Leistung mit KI-Einblicken.",
        ogTitle: "Schüler - Checkmate",
      },
      TESTS: {
        title: "Tests",
        description:
          "Erstellen, verwalten und analysieren Sie Ihre Tests mit KI-Tools. Generieren Sie umfassende Bewertungen, automatisieren Sie die Benotung und bieten Sie personalisiertes Feedback für Schüler.",
        ogTitle: "Tests - Checkmate",
      },
    },
  },
};

// Get metadata for a specific locale (defaults to English)
export const getMetadataForLocale = (
  locale: string = "en",
): LocalizedMetadata => {
  return METADATA_BY_LOCALE[locale] || METADATA_BY_LOCALE.en;
};

// For backward compatibility - default to English
export const METADATA_CONSTANTS = METADATA_BY_LOCALE.en;

// Helper functions for creating metadata
export const createPageMetadata = (
  pageKey: keyof LocalizedMetadata["PAGES"],
  locale: string = "en",
) => {
  const metadata = getMetadataForLocale(locale);
  const page = metadata.PAGES[pageKey];
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.ogTitle,
      description: page.description,
    },
    twitter: {
      title: page.ogTitle,
      description: page.description,
    },
  };
};
