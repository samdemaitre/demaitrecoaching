export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "#",
    children: [
      {
        label: "Personal Training",
        href: "/services/personal-training",
        subtitle: "In-person · Guatemala City",
      },
      {
        label: "Hybrid Coaching",
        href: "/services/hybrid-coaching",
        subtitle: "In-person + online",
      },
      {
        label: "Online Coaching",
        href: "/services/online-coaching",
        subtitle: "Worldwide · Fully remote",
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const BRAND = {
  name: "De Maître Coaching",
  tagline: "Tailored Training. Elevated Life.",
  email: "sam.demaitre@gmail.com",
  phone: "+502 5555 0000",
  location: "Guatemala City, GT",
  instagram: "@demaitrecoaching",
  trainerName: "Samuel de Maître",
  trainerShort: "Sam",
};

export const STATS = [
  { value: "400+", label: "Clients Trained" },
  { value: "11", label: "Years Experience" },
  { value: "100%", label: "Tailored to You" },
];

export const PILLARS = [
  {
    title: "Strength",
    body: "Progressive overload programmes built around your goals, schedule, and available equipment.",
  },
  {
    title: "Nutrition",
    body: "Practical, sustainable nutrition guidance that fits your lifestyle — no extreme dieting.",
  },
  {
    title: "Accountability",
    body: "Regular check-ins, progress tracking, and constant support to keep you on track.",
  },
  {
    title: "Longevity",
    body: "Train for a lifetime. We build habits and movement quality that serve you for decades.",
  },
];

export const PERSONAL_TRAINING_INCLUDES = [
  "Bespoke Programme Design",
  "Nutrition Coaching",
  "In-Gym Sessions",
  "Progress Tracking",
  "WhatsApp Support",
];

export const HYBRID_INCLUDES = [
  "Custom Programme",
  "In-Person Sessions",
  "Weekly Check-ins",
  "Continuous Support",
];

export const ONLINE_INCLUDES = [
  "Custom Training Programme",
  "Nutrition Guidelines",
  "Weekly Video Check-ins",
  "24/7 Message Support",
];

export const PERSONAL_TRAINING_PLANS = [
  {
    name: "Starter",
    price: "Q 2,400",
    frequency: "2×/week sessions",
    featured: false,
    features: [
      "Custom programme design",
      "Nutrition guidelines",
      "Monthly review",
      "WhatsApp support",
    ],
  },
  {
    name: "Performance",
    price: "Q 3,600",
    frequency: "3×/week sessions",
    featured: true,
    badge: "Most Popular",
    features: [
      "Everything in Starter",
      "Weekly check-in call",
      "Body composition tracking",
      "Priority WhatsApp support",
    ],
  },
  {
    name: "Elite",
    price: "Q 4,800",
    frequency: "5×/week sessions",
    featured: false,
    features: [
      "Everything in Performance",
      "Daily check-ins",
      "Full meal planning",
      "Unlimited access",
    ],
  },
];

export const HYBRID_PLANS = [
  {
    name: "Hybrid Essentials",
    price: "Q 3,200",
    frequency: "4× in-person/month",
    featured: false,
    features: [
      "4× in-person sessions/month",
      "Online programme design",
      "Weekly video check-in",
      "Nutrition guidelines",
      "App-based tracking",
    ],
  },
  {
    name: "Full Hybrid",
    price: "Q 4,400",
    frequency: "8× in-person/month",
    featured: true,
    badge: "Best Value",
    features: [
      "8× in-person sessions/month",
      "Full nutrition coaching",
      "Weekly video check-in",
      "Priority WhatsApp support",
      "Body composition analysis",
    ],
  },
];

export const CREDENTIALS = [
  {
    title: "Bachelor in Physical Education & Movement Science",
    desc: "Specialisation in Personal Training",
  },
  {
    title: "11+ Years Experience",
    desc: "Training elite clients across Guatemala and internationally",
  },
  {
    title: "400+ Clients",
    desc: "Helped over 400 driven individuals transform their bodies",
  },
  {
    title: "Specialised in Body Recomposition",
    desc: "Simultaneous fat loss and muscle gain protocols",
  },
];
