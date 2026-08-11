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

// Directory tools removed — MeToolkit's current focus is the built-in
// utility tools (calculator, cash counter, tax calculator, etc.) rather
// than a third-party tool directory. Re-populate this with real, verified
// listings when the directory relaunches.
export const tools: Tool[] = [];
export const categories: Category[] = [];
export const totalToolsIndexed = 0;

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter((t) => t.category.toLowerCase() === categorySlug.toLowerCase());
}

export function getRelatedTools(tool: Tool, limit = 3): Tool[] {
  return tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, limit);
}

export type Testimonial = { name: string; role: string; quote: string };
export type SiteFAQ = { question: string; answer: string };
export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "6", label: "Free tools" },
  { value: "100%", label: "Runs in your browser" },
  { value: "0", label: "Sign-ups required" },
  { value: "5", label: "Guides published" }
];

export const testimonials: Testimonial[] = [];

export const faqs: SiteFAQ[] = [
  {
    question: "Is MeToolkit free to use?",
    answer:
      "Yes. Every tool on MeToolkit — the calculator, cash counter, tax calculator, and more — is free, with no sign-up required."
  },
  {
    question: "Do you store what I enter into a tool?",
    answer:
      "No. Every calculation runs locally in your browser. Nothing you type into a tool is sent to a server, except the cash counter's optional history, which is saved only in your own browser via localStorage."
  },
  {
    question: "How often are new tools added?",
    answer:
      "We add new tools based on what's actually useful and searched for — expect a steady stream of new calculators and utilities."
  },
  {
    question: "Can I suggest a tool?",
    answer: "Yes — use the contact page to suggest a tool you'd find useful."
  }
];

// ---- Blog ----

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] };

export type BlogFAQ = { question: string; answer: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  toolHref: string;
  toolLabel: string;
  blocks: BlogBlock[];
  faqs: BlogFAQ[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "emi-calculator-guide",
    title: "EMI Calculator: How Loan EMI Is Actually Calculated (With Formula & Example)",
    excerpt:
      "The exact formula lenders use to calculate your EMI, a worked example, and what really moves your monthly payment.",
    date: "2026-08-01",
    readMinutes: 6,
    toolHref: "/emi-calculator",
    toolLabel: "Try the EMI Calculator",
    blocks: [
      { type: "p", text: "Every EMI you've ever paid — for a home, a car, or a personal loan — comes from the same formula. Lenders don't negotiate this number by feel; it's fixed math based on three inputs. Once you understand the formula, you can sanity-check any loan offer in seconds instead of trusting whatever number a sales agent quotes you." },
      { type: "h2", text: "What is an EMI?" },
      { type: "p", text: "EMI stands for Equated Monthly Installment — a fixed monthly payment that covers part principal and part interest. In the early months of a loan, most of your EMI goes toward interest; toward the end, most of it goes toward principal. The EMI amount itself never changes (unless the interest rate does), but its split between principal and interest shifts every month." },
      { type: "h2", text: "The EMI formula" },
      { type: "p", text: "EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ − 1)" },
      { type: "h3", text: "What each variable means" },
      { type: "list", items: [
        "P — Principal, the loan amount you're borrowing",
        "r — Monthly interest rate (annual rate ÷ 12 ÷ 100)",
        "n — Loan tenure in months (years × 12)"
      ]},
      { type: "h2", text: "Worked example" },
      { type: "p", text: "Take a ₹10,00,000 loan at 9% annual interest for 20 years. Monthly rate r = 9 ÷ 12 ÷ 100 = 0.0075. Tenure n = 20 × 12 = 240 months. Plugging into the formula gives an EMI of ₹8,997 — try the same numbers in the calculator above and you'll get the identical figure, since it's the same formula banks use." },
      { type: "h2", text: "What actually changes your EMI" },
      { type: "h3", text: "Interest rate" },
      { type: "p", text: "A 1% rate difference sounds small but compounds significantly over 20 years. On the ₹10L example above, moving from 9% to 10% raises the EMI from ₹8,997 to ₹9,650 — about ₹1.5 lakh more in total interest over the loan." },
      { type: "h3", text: "Loan tenure" },
      { type: "p", text: "Stretching tenure lowers your EMI but increases total interest paid, since you're paying interest for more months. Shortening tenure does the opposite — higher EMI, but you close the loan faster and pay less interest overall." },
      { type: "h3", text: "Prepayment" },
      { type: "p", text: "Paying extra toward principal — even occasionally — reduces the outstanding balance the formula is calculated on going forward, which either shortens your tenure or lowers future EMIs, depending on what your lender allows." },
      { type: "h2", text: "Common mistakes when estimating EMI" },
      { type: "list", items: [
        "Using the annual rate directly instead of dividing by 12 for the monthly rate",
        "Forgetting that processing fees and insurance add-ons aren't part of the EMI formula but do add to your real cost",
        "Comparing loan offers by EMI alone instead of total interest paid over the full tenure"
      ]}
    ],
    faqs: [
      { question: "Does a lower EMI always mean a cheaper loan?", answer: "No. A lower EMI usually means a longer tenure, which increases total interest paid over the life of the loan. Compare total interest, not just the monthly figure." },
      { question: "Why did my bank quote a slightly different EMI than the calculator?", answer: "Banks sometimes round differently or include processing fees and insurance premiums folded into the EMI. The core formula is identical; small differences usually come from these add-ons." },
      { question: "Does prepayment always reduce my EMI?", answer: "It depends on your lender's policy. Some reduce the EMI while keeping tenure the same; others keep the EMI the same and shorten the tenure instead. Ask your lender which option they apply by default." },
      { question: "Is the EMI the same every month for the entire loan?", answer: "Yes, for a fixed-rate loan the EMI amount stays constant throughout — only the split between principal and interest within that fixed amount changes each month." }
    ]
  },
  {
    slug: "cash-denomination-counter-guide",
    title: "Cash Denomination Counting: A Faster, Error-Free Method for Shops and Cashiers",
    excerpt:
      "Why manual tally sheets cause counting errors at closing time, and how a denomination-based approach fixes it.",
    date: "2026-08-03",
    readMinutes: 5,
    toolHref: "/cash-counter",
    toolLabel: "Try the Cash Counter",
    blocks: [
      { type: "p", text: "If you've ever closed a cash counter at the end of a shift, you know the drill: separate the notes by value, count each stack, multiply, add it all up, and hope the total matches the register. One misplaced note and you're recounting the whole drawer." },
      { type: "h2", text: "Why manual cash counting goes wrong" },
      { type: "p", text: "Most counting errors don't come from miscounting a stack — they come from arithmetic mistakes made while tired, at the end of a long shift, doing multiplication in your head across nine different denominations." },
      { type: "h3", text: "The usual failure points" },
      { type: "list", items: [
        "Multiplying a denomination by the wrong count after losing track mid-tally",
        "Forgetting to include coins in the final total",
        "Writing down a subtotal correctly but adding the column wrong"
      ]},
      { type: "h2", text: "The denomination-based method" },
      { type: "p", text: "Instead of running a mental total, separate your cash by denomination first — all ₹500 notes together, all ₹200 together, and so on. Count each pile once, enter the count against that denomination, and let the subtotal calculate itself. This removes the multiplication step from your head entirely." },
      { type: "h2", text: "Why the total should read out in words" },
      { type: "p", text: "A grand total in digits is easy to misread — a ₹1,23,456 total can look like ₹12,3456 at a glance if you're scanning quickly. Reading the amount in words (\"One Lakh Twenty Three Thousand Four Hundred Fifty Six\") is how cheques and formal receipts have avoided this exact error for decades, and it catches a wrongly-placed zero instantly." },
      { type: "h2", text: "Keeping a record without extra paperwork" },
      { type: "p", text: "A running history of your last several counts — timestamped, one tap to restore — replaces the habit of scribbling totals on a notepad that gets thrown out the next day. If a total looks off later, you can check what the drawer actually held at each count." }
    ],
    faqs: [
      { question: "Does this work for coins as well as notes?", answer: "Yes — a denomination counter should handle both. In India, ₹10 circulates as both a note and a coin, so it's worth tracking separately if your drawer has both." },
      { question: "Is a digital cash counter accurate for large amounts?", answer: "Yes — since it's doing arithmetic rather than estimating, accuracy doesn't degrade with larger totals the way manual mental math does." },
      { question: "Can I use this to prepare a bank deposit slip?", answer: "Yes — the denomination breakdown and total are exactly what most bank deposit slips ask for, and having the amount in words ready avoids a second manual calculation at the counter." }
    ]
  },
  {
    slug: "old-vs-new-tax-regime-2026",
    title: "Old vs New Tax Regime (FY 2026-27): Which One Actually Saves You More?",
    excerpt:
      "A side-by-side look at both regimes' slabs, rebates, and the deduction threshold where the old regime starts winning.",
    date: "2026-08-05",
    readMinutes: 7,
    toolHref: "/tax-calculator",
    toolLabel: "Try the Tax Calculator",
    blocks: [
      { type: "p", text: "Since the new tax regime became the default option, the old regime hasn't disappeared — it's still available if you opt in, and for some income levels it genuinely results in lower tax. The right answer depends almost entirely on how many deductions you actually claim." },
      { type: "h2", text: "New regime slabs (FY 2025-26 / FY 2026-27)" },
      { type: "list", items: [
        "Up to ₹4,00,000 — Nil",
        "₹4,00,000 – ₹8,00,000 — 5%",
        "₹8,00,000 – ₹12,00,000 — 10%",
        "₹12,00,000 – ₹16,00,000 — 15%",
        "₹16,00,000 – ₹20,00,000 — 20%",
        "₹20,00,000 – ₹24,00,000 — 25%",
        "Above ₹24,00,000 — 30%"
      ]},
      { type: "p", text: "The new regime also gives a standard deduction of ₹75,000 for salaried taxpayers and a rebate of up to ₹60,000 that effectively brings tax to zero for taxable income up to ₹12,00,000 — meaning gross salary up to about ₹12.75 lakh can be entirely tax-free under this regime." },
      { type: "h2", text: "Old regime slabs" },
      { type: "list", items: [
        "Up to ₹2,50,000 — Nil",
        "₹2,50,000 – ₹5,00,000 — 5%",
        "₹5,00,000 – ₹10,00,000 — 20%",
        "Above ₹10,00,000 — 30%"
      ]},
      { type: "p", text: "The old regime has a lower standard deduction (₹50,000) and a smaller rebate (up to ₹12,500, applicable only if taxable income stays under ₹5,00,000) — but it allows deductions the new regime doesn't: Section 80C investments, HRA, home loan interest, and more." },
      { type: "h2", text: "Where the old regime starts winning" },
      { type: "p", text: "As a rule of thumb, if your total deductions under the old regime (80C, HRA, home loan interest, 80D, etc.) cross roughly ₹4-4.5 lakh a year, the old regime often works out cheaper — because those deductions directly shrink your taxable income before slabs are even applied. Below that deduction level, the new regime's lower rates and higher rebate usually win." },
      { type: "h3", text: "Who typically benefits from the old regime" },
      { type: "list", items: [
        "Those paying significant home loan interest",
        "Those with a large HRA claim in a metro city",
        "Those maxing out 80C (₹1.5L) plus 80D health insurance premiums"
      ]},
      { type: "h3", text: "Who typically benefits from the new regime" },
      { type: "list", items: [
        "Those with few or no major deductions to claim",
        "Freelancers and consultants without HRA or a home loan",
        "Anyone whose salary sits fully or mostly below the ₹12.75L tax-free threshold"
      ]},
      { type: "h2", text: "The only reliable way to know" },
      { type: "p", text: "Run your actual numbers through both regimes rather than relying on a rule of thumb — the crossover point shifts slightly depending on exactly which deductions apply to you. That's the only way to see the real rupee difference for your specific income." }
    ],
    faqs: [
      { question: "Can I switch between regimes every year?", answer: "Salaried individuals can choose either regime each financial year when filing. Those with business income have more restricted switching rules — check current rules or ask a CA if you have business income." },
      { question: "Does the new regime allow any deductions at all?", answer: "It allows a few, including the standard deduction and employer's NPS contribution, but it excludes most common ones like 80C, HRA, and home loan interest on a self-occupied property." },
      { question: "Is the new regime the default now?", answer: "Yes, the new regime is the default option — you have to actively opt for the old regime if you want it." },
      { question: "Does this calculation include surcharge?", answer: "No — surcharge applies only above ₹50 lakh income and adds complexity beyond a basic estimate. For income above that threshold, get a precise calculation from a CA." }
    ]
  },
  {
    slug: "percentage-formulas-guide",
    title: "3 Percentage Formulas Everyone Should Know (With Examples)",
    excerpt:
      "The three percentage calculations that cover almost every real-world situation — discounts, marks, and growth.",
    date: "2026-08-06",
    readMinutes: 4,
    toolHref: "/percentage-calculator",
    toolLabel: "Try the Percentage Calculator",
    blocks: [
      { type: "p", text: "Percentage confusion almost always comes down to using the wrong formula for the situation, not bad arithmetic. There are really only three formulas that cover nearly every everyday case." },
      { type: "h2", text: "1. X% of Y — finding a portion" },
      { type: "p", text: "Formula: (X ÷ 100) × Y" },
      { type: "p", text: "Use this for discounts, tips, and tax. Example: a 20% discount on a ₹2,500 item is (20 ÷ 100) × 2500 = ₹500 off, making the final price ₹2,000." },
      { type: "h2", text: "2. X is what percent of Y — finding the rate" },
      { type: "p", text: "Formula: (X ÷ Y) × 100" },
      { type: "p", text: "Use this to find marks percentage, conversion rates, or what share something represents. Example: scoring 450 out of 500 is (450 ÷ 500) × 100 = 90%." },
      { type: "h2", text: "3. Percentage change — finding growth or decline" },
      { type: "p", text: "Formula: ((New − Old) ÷ Old) × 100" },
      { type: "p", text: "Use this for salary hikes, price changes, or year-over-year comparisons. Example: a salary moving from ₹40,000 to ₹46,000 is ((46000 − 40000) ÷ 40000) × 100 = 15% increase." },
      { type: "h2", text: "The one mistake that causes most errors" },
      { type: "p", text: "Percentage change always divides by the OLD value, not the new one — dividing by the wrong number is the single most common percentage mistake. A drop from ₹100 to ₹80 is a 20% decrease, but going back from ₹80 to ₹100 is a 25% increase, not 20%, because the base value changed." }
    ],
    faqs: [
      { question: "Why is a 20% drop not undone by a 20% increase?", answer: "Because percentage change is always calculated against the current base value. Once a value drops, the base for calculating the recovery percentage is smaller, so a bigger percentage increase is needed to return to the original number." },
      { question: "How do I calculate percentage increase in salary?", answer: "Use formula 3: ((New salary − Old salary) ÷ Old salary) × 100." },
      { question: "How do I find what percentage one number is of another?", answer: "Use formula 2: divide the part by the whole and multiply by 100." }
    ]
  },
  {
    slug: "how-to-calculate-exact-age",
    title: "How to Calculate Your Exact Age in Years, Months, and Days",
    excerpt:
      "Why simple subtraction gets your age wrong, and the correct way to calculate it down to the day.",
    date: "2026-08-07",
    readMinutes: 4,
    toolHref: "/age-calculator",
    toolLabel: "Try the Age Calculator",
    blocks: [
      { type: "p", text: "Subtracting birth year from the current year gives you a rough age, but it's wrong for roughly a third of the year — anyone whose birthday hasn't happened yet this year is a year younger than that subtraction suggests." },
      { type: "h2", text: "Why simple subtraction fails" },
      { type: "p", text: "If you were born in 2000 and it's currently before your birthday this year, subtracting 2000 from the current year overstates your age by exactly one year. The calculation needs to check whether the birth month and day have already occurred in the current year." },
      { type: "h2", text: "The correct method" },
      { type: "list", items: [
        "Start with years = current year − birth year",
        "If the current month/day is before the birth month/day, subtract 1 from years",
        "Calculate the remaining months and days by comparing the birth date to the same date pattern in the current year"
      ]},
      { type: "h2", text: "Why exact age matters beyond curiosity" },
      { type: "h3", text: "Eligibility cutoffs" },
      { type: "p", text: "School admissions, government exams, and some job applications use exact age cutoffs — being even a day over or under an age limit can change eligibility." },
      { type: "h3", text: "Legal and financial dates" },
      { type: "p", text: "Insurance premiums, pension eligibility, and certain legal thresholds are calculated from exact date of birth, not the calendar year alone." },
      { type: "h2", text: "Total days lived — more than a novelty" },
      { type: "p", text: "Counting total days lived is mostly a fun milestone (turning 10,000 days old, for instance), but it's calculated the same reliable way: the difference between two calendar dates, accounting for leap years automatically." }
    ],
    faqs: [
      { question: "Why do age calculators need my exact date of birth?", answer: "Because age in years, months, and days depends on comparing full dates, not just years — the month and day determine whether a birthday has already passed this year." },
      { question: "Do leap years affect age calculation?", answer: "They affect total day counts (a leap year has one extra day), but they don't affect the years/months/days breakdown, since that's calculated by comparing calendar dates directly." },
      { question: "Can I calculate someone's age as of a future or past date, not just today?", answer: "Yes — the calculation works the same way for any reference date, not just today, which is useful for eligibility checks tied to a specific cutoff date." }
    ]
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
