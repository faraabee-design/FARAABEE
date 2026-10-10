export interface SiteTheme {
  primaryColor: string;       // default: #183F32
  secondaryColor: string;     // default: #285844
  accentColor: string;        // default: #AFC7A5
  accentLightColor: string;   // default: #E3EBDD
  backgroundColor: string;    // default: #FAF9F3
  surfaceColor: string;       // default: #FFFFFF
  textColor: string;          // default: #26312B
  headerBgColor: string;      // default: #FAF9F3
  headerTextColor: string;    // default: #183F32
  footerBgColor: string;      // default: #183F32
  footerTextColor: string;    // default: #FAF9F3
  buttonBgColor: string;      // default: #183F32
  buttonTextColor: string;    // default: #FFFFFF
  bannerBgColor: string;      // default: #183F32
  bannerTextColor: string;    // default: #FAF9F3
  fontHeading: string;        // 'Cormorant Garamond' | 'Playfair Display' | 'Cinzel' | 'Inter' | 'Lora' | 'Montserrat'
  fontBody: string;           // 'Plus Jakarta Sans' | 'Inter' | 'Lora' | 'Montserrat'
  borderRadius: string;       // 'rounded-xl' | 'rounded-2xl' | 'rounded-3xl' | 'rounded-lg' | 'rounded-none'
}

export interface TextCustomization {
  text: string;
  fontFamily?: string;   // e.g. 'Playfair Display', 'Cormorant Garamond', 'Cinzel', 'Inter', 'Noto Nastaliq Urdu'
  color?: string;        // hex or css color
  fontSize?: string;     // e.g. 'text-sm', 'text-base', 'text-lg', 'text-2xl', 'text-4xl'
  fontWeight?: string;   // e.g. 'font-normal', 'font-medium', 'font-semibold', 'font-bold'
}

export interface SiteCopyContent {
  // 1. Top Announcement Bar
  announcementText: TextCustomization;

  // 2. Hero Section
  heroBadge: TextCustomization;
  heroHeading: TextCustomization;
  heroUrduHeading: TextCustomization;
  heroSubtitle: TextCustomization;
  heroBtnPrimary: TextCustomization;
  heroBtnSecondary: TextCustomization;

  // 3. Trust Strip / 4 Promises
  trustItem1Title: TextCustomization;
  trustItem1Desc: TextCustomization;
  trustItem2Title: TextCustomization;
  trustItem2Desc: TextCustomization;
  trustItem3Title: TextCustomization;
  trustItem3Desc: TextCustomization;
  trustItem4Title: TextCustomization;
  trustItem4Desc: TextCustomization;

  // 4. Featured Section
  featuredBadge: TextCustomization;
  featuredHeading: TextCustomization;
  featuredSubtitle: TextCustomization;

  // 5. Why Farabi / Botanical Philosophy
  whyFarabiBadge: TextCustomization;
  whyFarabiHeading: TextCustomization;
  whyFarabiParagraph1: TextCustomization;
  whyFarabiParagraph2: TextCustomization;

  // 6. Craftsmanship & Botanical Story
  storyBadge: TextCustomization;
  storyHeading: TextCustomization;
  storyParagraph1: TextCustomization;
  storyParagraph2: TextCustomization;
  storyQuote: TextCustomization;

  // 7. Journal Preview Section
  journalBadge: TextCustomization;
  journalHeading: TextCustomization;
  journalSubtitle: TextCustomization;

  // 8. Footer Section
  footerBrandBio: TextCustomization;
  footerUrduTagline: TextCustomization;
  footerDisclaimer: TextCustomization;
}

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  theme: Partial<SiteTheme>;
}
