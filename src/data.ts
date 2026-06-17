export type HeroSlide = {
  id: string;
  name: string;
  eyebrow: string;
  location: string;
  type: string;
  color: string;
  media:
    | { kind: "video"; src: string; poster: string }
    | { kind: "image"; image: string; alt: string };
};

export type Project = {
  name: string;
  city: "Surat" | "Vapi" | "Silvassa";
  type: string;
  image: string;
  year: string;
  description: string;
};

export type Milestone = {
  year: string;
  title: string;
  body: string;
  image: string;
};

export type Office = {
  city: string;
  address: string;
  phone: string;
  email: string;
  image: string;
};

export type ProcessStage = {
  number: string;
  title: string;
  body: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "brand-film",
    name: "Pramukh",
    eyebrow: "A class of its own",
    location: "Gujarat",
    type: "Since 1993",
    color: "#8e6d3d",
    media: {
      kind: "video",
      src: "/media/pramukh-film.mp4",
      poster: "/media/about-video-poster-1800.webp",
    },
  },
  {
    id: "one-tapi",
    name: "One Tapi",
    eyebrow: "Exclusive riverside living",
    location: "Surat",
    type: "5 BHK residences",
    color: "#102238",
    media: {
      kind: "image",
      image: "one-tapi",
      alt: "One Tapi riverside residence",
    },
  },
  {
    id: "agastya",
    name: "Agastya",
    eyebrow: "An enduring address",
    location: "Surat",
    type: "4 BHK apartments",
    color: "#796553",
    media: {
      kind: "image",
      image: "agastya",
      alt: "Agastya residential towers",
    },
  },
];

export const projects: Project[] = [
  {
    name: "One Tapi",
    city: "Surat",
    type: "5 BHK residences & penthouses",
    image: "one-tapi",
    year: "Ongoing",
    description:
      "Sculptural riverside homes designed around generous light, expansive views, and a distinctly private arrival.",
  },
  {
    name: "Agastya",
    city: "Surat",
    type: "4 BHK apartments",
    image: "agastya",
    year: "Ongoing",
    description:
      "A composed residential landmark where thoughtful planning and quiet material richness shape daily life.",
  },
  {
    name: "Orbit 5",
    city: "Surat",
    type: "Showrooms & offices",
    image: "orbit-5",
    year: "Ongoing",
    description:
      "A business address with a confident skyline presence, layered retail frontage, and efficient commercial floors.",
  },
  {
    name: "Revanta",
    city: "Surat",
    type: "3 BHK apartments",
    image: "revanta",
    year: "Ongoing",
    description:
      "Contemporary homes created for useful space, lasting comfort, and a strong neighborhood connection.",
  },
  {
    name: "Aranya III",
    city: "Surat",
    type: "Exclusive 3 BHK apartments",
    image: "aranya-3",
    year: "Ongoing",
    description:
      "A green, measured community balancing modern architecture with calm outdoor living.",
  },
  {
    name: "Aristo",
    city: "Vapi",
    type: "3, 4 & 5 BHK apartments",
    image: "aristo",
    year: "Ongoing",
    description:
      "Elevated family residences with a broad amenity mix and a carefully resolved sense of scale.",
  },
  {
    name: "Vedanta",
    city: "Vapi",
    type: "3 & 4 BHK apartments",
    image: "vedanta",
    year: "Ongoing",
    description:
      "Well-connected homes shaped by efficient plans, natural light, and dependable execution.",
  },
  {
    name: "Shivanta",
    city: "Silvassa",
    type: "2 & 3 BHK apartments",
    image: "shivanta",
    year: "Ongoing",
    description:
      "A welcoming residential address that makes everyday comfort feel considered rather than ordinary.",
  },
];

export const milestones: Milestone[] = [
  {
    year: "1993",
    title: "A foundation built on trust",
    body: "Pramukh began with a clear promise: build responsibly, communicate honestly, and stay accountable to every detail.",
    image: "marina-bay",
  },
  {
    year: "60+",
    title: "Projects delivered",
    body: "Residential and commercial developments across South Gujarat have become enduring addresses for thousands of families and businesses.",
    image: "revanta",
  },
  {
    year: "17M+",
    title: "Square feet developed",
    body: "Scale is treated as a responsibility, supported by integrated planning, disciplined construction, and long-term stewardship.",
    image: "orbit-5",
  },
  {
    year: "13,000+",
    title: "Homes built",
    body: "Every home carries the same practical ambition: thoughtful space, reliable delivery, and value that lasts beyond handover.",
    image: "agastya",
  },
];

export const offices: Office[] = [
  {
    city: "Surat",
    address:
      "10th Floor, Orbit-2, Beside Celestial Dreams, Vesu Canal Road, Vesu, Surat 395007.",
    phone: "+91 99789 86778",
    email: "inquiry@pramukh.com",
    image: "surat",
  },
  {
    city: "Vapi",
    address: "Pramukh House, Vapi-Daman Main Road, Chala, Vapi 396191.",
    phone: "+91 74062 58000",
    email: "inquiry@pramukh.com",
    image: "vapi",
  },
  {
    city: "Silvassa",
    address:
      "Pramukh Realty, Shop 1-4, Building A, Yogi Milan, Silvassa, Dadra and Nagar Haveli.",
    phone: "+91 63597 78000",
    email: "inquiry.silvassa@pramukh.com",
    image: "silvassa",
  },
];

export const processStages: ProcessStage[] = [
  {
    number: "01",
    title: "Vision",
    body: "We start with the place, its people, and the long-term value a project should create.",
  },
  {
    number: "02",
    title: "Planning",
    body: "Commercial, architectural, and operational decisions are aligned before complexity reaches site.",
  },
  {
    number: "03",
    title: "Development",
    body: "Approvals, teams, procurement, and schedules move through one accountable development structure.",
  },
  {
    number: "04",
    title: "Construction",
    body: "Quality, safety, and progress are tracked continuously with direct ownership of every trade.",
  },
  {
    number: "05",
    title: "Delivery",
    body: "Handover is planned as carefully as construction, with clarity around every final detail.",
  },
  {
    number: "06",
    title: "Beyond",
    body: "Our responsibility continues through operations, relationships, and the life of the community.",
  },
];

export const facts = [
  ["60+", "Projects delivered"],
  ["17M+", "Sq. ft. developed"],
  ["13,000+", "Homes built"],
  ["20+", "Ongoing projects"],
  ["2.7M+", "Sq. ft. under development"],
  ["6,700+", "Homes under construction"],
] as const;

export const principles = [
  {
    number: "01",
    title: "Premium within reach",
    body: "High-quality homes and commercial spaces, thoughtfully planned around real value rather than empty excess.",
    image: "aranya-3",
  },
  {
    number: "02",
    title: "Transparency that performs",
    body: "Clear communication, disciplined systems, and dependable execution keep every stakeholder aligned.",
    image: "orbit-5",
  },
  {
    number: "03",
    title: "Guiding principles",
    body: "Commitment, quality, timely delivery, trust, teamwork, equality, ethics, and excellence.",
    image: "one-tapi",
  },
] as const;
