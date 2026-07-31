export type Tool = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  pricing: "Free" | "Freemium" | "Paid";
  isAI: boolean;
  featured?: boolean;
  website: string;
  features: string[];
};

export type Category = {
  slug: string;
  label: string;
  count: number;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type Stat = {
  value: string;
  label: string;
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
    description:
      "WriteFlow AI learns your brand's tone from past content and applies it consistently across blog posts, emails, and product copy. Built for teams that publish often and can't afford to sound inconsistent.",
    category: "Writing",
    pricing: "Freemium",
    isAI: true,
    featured: true,
    website: "https://example.com/writeflow-ai",
    features: [
      "Brand voice profile trained on your existing content",
      "Long-form drafting with section-by-section editing",
      "Tone and readability scoring before you publish",
      "Team workspace with shared style guides"
    ]
  },
  {
    slug: "pixelforge",
    name: "PixelForge",
    tagline: "Generate product mockups from a single photo.",
    description:
      "Upload one product photo and PixelForge places it into realistic lifestyle scenes, packaging mockups, and ad-ready compositions. Aimed at small e-commerce teams without a photo studio budget.",
    category: "Design",
    pricing: "Paid",
    isAI: true,
    featured: true,
    website: "https://example.com/pixelforge",
    features: [
      "Realistic lifestyle scene generation from one photo",
      "Packaging and label mockup templates",
      "Batch export for multiple product listings",
      "Commercial usage rights included"
    ]
  },
  {
    slug: "querybase",
    name: "QueryBase",
    tagline: "Turn spreadsheets into a searchable internal database.",
    description:
      "QueryBase imports messy spreadsheets and turns them into a structured, searchable database your whole team can query without touching a formula.",
    category: "Productivity",
    pricing: "Freemium",
    isAI: false,
    website: "https://example.com/querybase",
    features: [
      "One-click import from CSV, Excel, and Google Sheets",
      "Automatic column type detection and cleanup",
      "Shareable views with row-level permissions",
      "REST API for connecting other tools"
    ]
  },
  {
    slug: "callscript",
    name: "CallScript",
    tagline: "Transcribes and summarizes sales calls automatically.",
    description:
      "CallScript joins your sales calls, transcribes them in real time, and delivers a summary with next steps within minutes of hangup — so reps spend less time on notes and more time selling.",
    category: "Sales",
    pricing: "Paid",
    isAI: true,
    featured: true,
    website: "https://example.com/callscript",
    features: [
      "Real-time transcription with speaker separation",
      "Automatic call summaries and action items",
      "CRM sync for HubSpot and Salesforce",
      "Searchable call library across your team"
    ]
  },
  {
    slug: "leadsieve",
    name: "LeadSieve",
    tagline: "Scores inbound leads using your past conversion data.",
    description:
      "LeadSieve looks at how your past leads actually converted and scores new inbound leads against that pattern, so your sales team calls the right people first.",
    category: "Sales",
    pricing: "Paid",
    isAI: true,
    website: "https://example.com/leadsieve",
    features: [
      "Lead scoring trained on your historical conversions",
      "Real-time alerts for high-intent leads",
      "Native integrations with major CRMs",
      "Weekly scoring accuracy reports"
    ]
  },
  {
    slug: "formbuddy",
    name: "FormBuddy",
    tagline: "Drag-and-drop forms with built-in spam filtering.",
    description:
      "FormBuddy is a straightforward form builder for teams who just need clean forms that don't fill up with spam. No AI gimmicks, just reliable forms.",
    category: "Productivity",
    pricing: "Free",
    isAI: false,
    website: "https://example.com/formbuddy",
    features: [
      "Drag-and-drop form builder",
      "Built-in spam and bot filtering",
      "Conditional logic for multi-step forms",
      "Email and webhook notifications on submit"
    ]
  }
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter(
    (t) => t.category.toLowerCase() === categorySlug.toLowerCase()
  );
}

export function getRelatedTools(tool: Tool, limit = 3): Tool[] {
  return tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, limit);
}

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

export const stats: Stat[] = [
  { value: "220+", label: "Tools indexed" },
  { value: "38", label: "Categories covered" },
  { value: "12k+", label: "Monthly searches" },
  { value: "4.8/5", label: "Average tool rating" }
];

export const testimonials: Testimonial[] = [
  {
    name: "Priya Sharma",
    role: "Founder, D2C brand",
    quote:
      "I stopped opening ten browser tabs to compare tools. MeToolkit's category pages get me to a shortlist in minutes."
  },
  {
    name: "Marcus Webb",
    role: "Sales Ops Lead",
    quote:
      "The pricing tags alone saved us from three demo calls we didn't need. Straightforward and current."
  },
  {
    name: "Ananya Iyer",
    role: "Solo consultant",
    quote:
      "Most directories feel abandoned. This one clearly gets updated — the AI tools section especially."
  }
];

export const faqs: FAQ[] = [
  {
    question: "Is MeToolkit free to use?",
    answer:
      "Yes. Browsing, searching, and comparing every tool in the index is free. Some listed tools have their own paid plans, which we mark clearly on each listing."
  },
  {
    question: "How do you decide which tools get listed?",
    answer:
      "Every tool is reviewed for whether it does what it claims, has clear pricing, and is actively maintained. We remove tools that go stale or get abandoned."
  },
  {
    question: "Can I submit my own tool?",
    answer:
      "Yes — use the \"Submit a tool\" link in the header. We review submissions manually before they go live."
  },
  {
    question: "How often is the index updated?",
    answer:
      "New tools and category counts are updated weekly. Pricing and feature changes are checked on a rolling basis."
  },
  {
    question: "Do you take payment for placement or ranking?",
    answer:
      "No. Featured sections reflect editorial picks, not paid placement. If that changes for any listing, we'll label it clearly."
  }
];
