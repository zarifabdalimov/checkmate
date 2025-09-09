export const METADATA_CONSTANTS = {
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
};

// Helper functions for creating metadata
export const createPageMetadata = (
  pageKey: keyof typeof METADATA_CONSTANTS.PAGES,
) => {
  const page = METADATA_CONSTANTS.PAGES[pageKey];
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
