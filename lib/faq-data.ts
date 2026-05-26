export interface FaqItem {
  q: string;
  a: string;
  /** If present, render primary/secondary language pills after the answer text */
  languages?: {
    primary: string[];
    secondary: string[];
  };
}

export interface FaqSection {
  title: string;
  items: FaqItem[];
}

export const FAQ_SECTIONS: FaqSection[] = [
  {
    title: "Getting started",
    items: [
      {
        q: "Which package is right for me?",
        a: "If you're new to structured training, online coaching is a great starting point — low commitment, high value. If you want hands-on guidance and accountability, go for an in-person package. If you want the best of both worlds with daily support, hybrid coaching is the one. Not sure? Send a message and we'll figure it out together.",
      },
      {
        q: "What languages do you coach in?",
        a: "Coaching is conducted fully in English or Dutch. I also have a decent understanding of Spanish, French, and German, so if you're more comfortable in one of those languages feel free to reach out — I'll do my best to help.",
        languages: {
          primary: ["English", "Dutch"],
          secondary: ["Spanish", "French", "German"],
        },
      },
      {
        q: "Do I need prior training experience?",
        a: "No. All programs are built around your current fitness level, whether you're a complete beginner or coming back after a long break. The first session or onboarding call is always used to assess where you are and set realistic goals.",
      },
      {
        q: "How do I get started?",
        a: "Reach out via the contact form or WhatsApp. We'll have a short intro call to talk about your goals, pick the right package, and book your first session or start date. The whole process takes less than 15 minutes.",
      },
    ],
  },
  {
    title: "Sessions",
    items: [
      {
        q: "Where do sessions take place?",
        a: "Sessions can take place at a gym of your choice, outdoors, or at your home if you have enough space. We'll agree on the location before you book. Travel within a reasonable distance is included — longer distances may apply an extra fee.",
      },
      {
        q: "What if I need to cancel or reschedule a session?",
        a: "Cancellations with at least 24 hours notice can be rescheduled at no cost. Cancellations with less than 24 hours notice are counted as a used session. Life happens — but this policy keeps the schedule fair for everyone.",
      },
      {
        q: "Do unused sessions roll over to the next month?",
        a: "No. Sessions are valid for 30 days from the date of purchase and do not roll over. This keeps your training consistent and your progress on track.",
      },
      {
        q: "How does the bring-a-friend deal work?",
        a: "Both of you train together in the same session at the same time. Each person pays 75% of the regular 1-on-1 price, so together you pay 150% and both save 25%. Both people must book and attend the same sessions — the discount doesn't apply if one person trains alone.",
      },
    ],
  },
  {
    title: "Hybrid & online",
    items: [
      {
        q: "How does online coaching actually work day-to-day?",
        a: "You receive a personalised workout program at the start of each cycle, train on your own schedule, and check in weekly via WhatsApp or a short voice note. Your program is reviewed and updated every two weeks based on your progress. You have direct access during set hours for questions, form checks, or adjustments.",
      },
      {
        q: "What's the difference between online and hybrid coaching?",
        a: "Online coaching is fully remote — you train independently with a program and weekly check-ins. Hybrid adds 4 in-person sessions per month, so you get hands-on technique coaching, real-time feedback, and a stronger accountability structure on top of everything online coaching includes.",
      },
      {
        q: "What does the 12-week transformation include?",
        a: "The 12-week program is a structured hybrid package split into four phases: Foundation, Build, Intensity, and Peak. It includes 16 in-person sessions total, a fully personalised nutrition plan, weekly check-ins, WhatsApp access, and before-and-after progress photos. It's designed for people who are serious about making a visible change in 3 months.",
      },
      {
        q: "What equipment do I need for online coaching?",
        a: "It depends on your goals and what you have access to. Programs can be written for a full gym, a home gym, or minimal equipment. Just let me know your setup during onboarding and the program will be built around it.",
      },
    ],
  },
  {
    title: "Nutrition",
    items: [
      {
        q: "Is a full meal plan included?",
        a: "In-person and online packages include nutrition guidelines — practical guidance on calories, macros, meal timing, and food choices tailored to your goals. The 12-week transformation package includes a full nutrition plan. If you want a detailed meal plan added to any other package, ask and we can discuss it.",
      },
      {
        q: "Can you work around food allergies or dietary preferences?",
        a: "Yes. All nutrition guidance is personalised. Whether you're vegetarian, have intolerances, or just have strong food preferences, the plan will work around what you actually eat and enjoy.",
      },
    ],
  },
  {
    title: "Payment",
    items: [
      {
        q: "How do I pay?",
        a: "Payment is accepted via bank transfer (Banrural, BAC, or similar), Tigo Money, or cash. All packages are prepaid before the first session or start date. You'll receive a confirmation once payment is received.",
      },
      {
        q: "Can I pause or cancel my monthly package?",
        a: "You can cancel with 7 days notice before your next billing date. Pausing for medical reasons or emergencies can be arranged on a case-by-case basis.",
      },
      {
        q: "Are there any discounts available?",
        a: "The bring-a-friend deal is the main discount — both people save 25% compared to training 1-on-1. The 12-week transformation package is also priced lower than paying month-by-month. Referral discounts may be available — ask about them when you sign up.",
      },
    ],
  },
];
