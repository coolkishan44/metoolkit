export type Tool = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  pricing: "Free" | "Freemium" | "Paid";
  isAI: boolean;
  featured?: boolean;
};

export type Category = {
  slug: string;
  label: string;
  count: number;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
};

export const tools: Tool[] = [
  {
    slug: "writeflow-ai",
    name: "WriteFlow AI",
    tagline: "Draft, edit, and rewrite long-form content in your brand voice.",
    category: "Writing",
    pricing: "Freemium",
    isAI: true,
    featured: true
  },
  {
    slug: "pixelforge",
    name: "PixelForge",
    tagline: "Generate product mockups from a single photo.",
    category: "Design",
    pricing: "Paid",
    isAI: true,
    featured: true
  },
  {
    slug: "querybase",
    name: "QueryBase",
    tagline: "Turn spreadsheets into a searchable internal database.",
    category: "Productivity",
    pricing: "Freemium",
    isAI: false
  },
  {
    slug: "callscript",
    name: "CallScript",
    tagline: "Transcribes and summarizes sales calls automatically.",
    category: "Sales",
    pricing: "Paid",
    isAI: true,
    featured: true
  },
  {
    slug: "leadsieve",
    name: "LeadSieve",
    tagline: "Scores inbound leads using your past conversion data.",
    category: "Sales",
    pricing: "Paid",
    isAI: true
  },
  {
    slug: "formbuddy",
    name: "FormBuddy",
    tagline: "Drag-and-drop forms with built-in spam filtering.",
    category: "Productivity",
    pricing: "Free",
    isAI: false
  }
];

export const categories: Category[] = [
  { slug: "writing", label: "Writing", count: 38 },
  { slug: "design", label: "Design", count: 24 },
  { slug: "sales", label: "Sales", count: 31 },
  { slug: "productivity", label: "Productivity", count: 46 },
  { slug: "marketing", label: "Marketing", count: 29 },
  { slug: "development", label: "Development", count: 52 }
];

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-pick-an-ai-writing-tool",
    title: "How to pick an AI writing tool that matches your brand voice",
    excerpt:
      "Most tools sound the same out of the box. Here is what actually separates them once you customize.",
    date: "2026-07-10",
    readMinutes: 6
  },
  {
    slug: "sales-call-transcription-compared",
    title: "We compared 7 sales call transcription tools on accuracy",
    excerpt: "Word-error rates, speaker separation, and pricing, tested on the same 20 calls.",
    date: "2026-07-02",
    readMinutes: 8
  },
  {
    slug: "free-vs-paid-design-tools",
    title: "Free vs paid AI design tools: where the gap actually shows up",
    excerpt: "Free tiers are good enough for drafts. Here's exactly where they fall short.",
    date: "2026-06-24",
    readMinutes: 5
  }
];

export const totalToolsIndexed = 220;
