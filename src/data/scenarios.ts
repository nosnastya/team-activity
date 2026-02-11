/**
 * Real coaching scenarios for manager-employee role-play
 * Based on practical management training objectives
 */

export interface Scenario {
  id: number;
  title: string;
  catchyName: string;
  description: string;
  objective: string;
  employeeRole: string;
  keySkills: string;
  managerBrief: string;
  employeeBrief: string;
  employeePhrases: string[];
  coachingTips?: {
    dos: string[];
    donts: string[];
    powerMove: string;
  };
}

export const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Career Growth Conversation",
    catchyName: "Mapping the Future",
    description:
      "Aligning an employee’s career ambitions with realistic opportunities and team needs.",
    objective: "Align career goals with team and organizational context",
    employeeRole: "Seeking long-term growth guidance",
    keySkills: "Big-picture thinking, trust-building, honest guidance",
    managerBrief:
      "Help the employee explore growth paths honestly. Provide perspective without promising outcomes you don’t control.",
    employeeBrief:
      "You’re ambitious and want to grow but feel uncertain about the path and whether the company can support your goals.",
    employeePhrases: [
      "I want to grow, but I’m not sure how.",
      "I’m worried about hitting a ceiling.",
      "I don’t know if this role fits my long-term goals.",
    ],
    coachingTips: {
      dos: [
        "Explore **multiple paths**, not just promotions.",
        "Be **honest** about constraints and realities.",
        "Focus on **skills and experiences**, not titles.",
        "Clarify what growth **is and isn’t** in your control.",
        "You can reference [Career Growth Framework](/team-activity/CareerGrowth.png) for more information.",
      ],
      donts: [
        "Overpromise outcomes.",
        "Avoid difficult truths.",
        "Make it only about business needs.",
      ],
      powerMove:
        "Ask: **In two years, what would make you proud of this period?**",
    },
  },
  {
    id: 2,
    title: "Adaptive Feedback",
    catchyName: "The Sensitive High Performer",
    description:
      "Delivering constructive feedback to a strong performer who reacts defensively to criticism.",
    objective: "Deliver feedback constructively based on personality",
    employeeRole: "High performer, sensitive to criticism",
    keySkills: "Reading emotions, adjusting tone, clear feedback",
    managerBrief:
      "You need to deliver improvement feedback to a high performer who takes criticism personally. Protect motivation without avoiding the message. Adjust your tone, not your standards.",
    employeeBrief:
      "You’re proud of your performance and expect recognition. Feedback often feels personal, even when it’s meant to be constructive. You may react defensively at first.",
    employeePhrases: [
      "It feels like you’re always focusing on small issues.",
      "I’ve already put in a lot of effort here.",
      "Why is this such a big deal?",
    ],
    coachingTips: {
      dos: [
        "Lead with **specific strengths**, not generic praise.",
        "Ask **permission** before giving feedback to lower defenses.",
        "Slow down when you sense **emotional pushback**.",
        "Separate **intent from impact** clearly.",
      ],
      donts: [
        "Stack multiple feedback points at once.",
        "Argue with emotions or try to logic them away.",
        "Drop the message just to keep things comfortable.",
      ],
      powerMove:
        "Say clearly: **This is not about effort. It’s about impact.**",
    },
  },
  {
    id: 3,
    title: "Clear Negative Feedback",
    catchyName: "Time for Real Talk",
    description:
      "Delivering direct, clear feedback when previous soft approaches have not led to improvement.",
    objective: "Deliver clear, firm, and constructive negative feedback",
    employeeRole:
      "Underperformance: missed deadlines, poor estimates, weak preparation",
    keySkills: "Being direct, setting expectations, holding accountability",
    managerBrief:
      "Previous gentle feedback hasn’t worked. You need to be clear, factual, and direct while staying calm and constructive. Set expectations, explain consequences, and outline what needs to change.",
    employeeBrief:
      "You’ve been struggling with deadlines and preparation but didn’t realize how serious the situation had become. The directness of the feedback may feel uncomfortable or surprising.",
    employeePhrases: [
      "I had too many things going on.",
      "Estimation is hard for everyone.",
      "I didn’t think it was that big of a deal.",
    ],
    coachingTips: {
      dos: [
        "Use **specific examples** and observable facts.",
        "State **expectations and consequences** plainly.",
        "Pause to confirm understanding, not agreement.",
        "Offer support **after** clarity is established.",
      ],
      donts: [
        "Soften the message until it loses meaning.",
        "Compare performance to others.",
        "Delay the conversation to avoid discomfort.",
      ],
      powerMove:
        "Say plainly: **This is serious, and I want you to succeed. That requires change.**",
    },
  },
  {
    id: 4,
    title: "Coaching for Improvement",
    catchyName: "The Deadline Dilemma",
    description:
      "A coaching conversation to help an employee struggling with deadlines identify root causes and solutions.",
    objective: "Guide the employee toward self-discovery of solutions",
    employeeRole: "Struggling with deadlines",
    keySkills: "Coaching through questions, problem-solving, patience",
    managerBrief:
      "Resist the urge to fix the problem. Use questions to help the employee understand what’s actually causing missed deadlines and what they can change themselves.",
    employeeBrief:
      "You feel overwhelmed and behind. You want to improve but aren’t sure whether the issue is prioritization, workload, or time management.",
    employeePhrases: [
      "I can’t keep up with these deadlines.",
      "I don’t know how to organize myself better.",
      "Everything feels urgent.",
    ],
    coachingTips: {
      dos: [
        "Ask what’s **actually** getting in the way.",
        "Separate **symptoms from root causes**.",
        "Let **silence** do the work.",
        "Narrow focus to **one change at a time**.",
      ],
      donts: [
        "Jump straight to tools or advice.",
        "Accept vague explanations.",
        "Take ownership of the problem.",
      ],
      powerMove: "Ask: **Which part of this is in your control this week?**",
    },
  },
  {
    id: 5,
    title: "Persona Discovery",
    catchyName: "Finding Your Spark",
    description:
      "A discovery conversation focused on understanding what drives the employee, where they feel stuck, and what’s missing for them right now.",
    objective: "Identify employee strengths, motivations, and growth areas",
    employeeRole: "Low engagement, unclear goals",
    keySkills: "Listening deeply, asking good questions, showing empathy",
    managerBrief:
      "Your role is to run a discovery conversation, not to fix or guide yet. Focus on listening, understanding what motivates this employee, and where they feel blocked or disengaged. Avoid assumptions. Your goal is clarity, not solutions.",
    employeeBrief:
      "You feel disengaged and unsure about your direction. You’re doing your work but don’t feel particularly motivated or connected to long-term growth. You’re open to talking but struggle to clearly articulate what’s missing.",
    employeePhrases: [
      "I don’t really know what I want here. I just do my tasks.",
      "I’m not sure I’m particularly good at anything.",
      "Honestly, I don’t see much growth for me right now.",
    ],
    coachingTips: {
      dos: [
        "Ask **open questions** and **pause** — give space to think.",
        "Reflect back what you hear using **their exact words**.",
        "Normalize **uncertainty** and remove pressure to have answers.",
        "Stay curious longer than feels comfortable.",
      ],
      donts: [
        "Label or **diagnose** the employee.",
        "Pitch career paths or solutions **too early**.",
        "Turn this into a performance or goal-setting discussion.",
      ],
      powerMove:
        "End by summarizing **one insight the employee expressed**, not one you invented.",
    },
  },
  {
    id: 6,
    title: "Positive Feedback - Hidden Talent",
    catchyName: "The Hidden Gem",
    description:
      "Helping a high-performing but quiet employee gain visibility without forcing personality change.",
    objective: "Coach visibility while respecting personality",
    employeeRole: "High performer, low visibility",
    keySkills: "Advocating, building confidence, showing impact",
    managerBrief:
      "Support visibility in ways that suit the employee’s style. Advocate for their work and make impact visible without forcing extroversion.",
    employeeBrief:
      "You do strong work but don’t self-promote. You want recognition but feel uncomfortable speaking up or presenting.",
    employeePhrases: [
      "I prefer to just do my work quietly.",
      "I don’t think people notice what I contribute.",
      "Presenting makes me uncomfortable.",
    ],
    coachingTips: {
      dos: [
        "Advocate for their work **publicly and consistently**.",
        "Offer **low-pressure** visibility options.",
        "Translate their work into **clear business impact**.",
        "Agree on visibility actions together.",
      ],
      donts: [
        "Push them to behave like extroverts.",
        "Equate silence with low ambition.",
        "Wait for them to self-promote.",
      ],
      powerMove:
        "Say: **I’ll help surface your work. Your job is to keep doing it well.**",
    },
  },
  {
    id: 7,
    title: "Handling Resistance",
    catchyName: "Breaking Through the Wall",
    description:
      "Turning employee resistance into collaboration without lowering standards.",
    objective: "Engage resistant employees constructively",
    employeeRole: "Resistant to development plan",
    keySkills: "Listening under tension, influencing, staying firm",
    managerBrief:
      "Focus on understanding what’s behind the resistance. Keep goals intact while adjusting the path together.",
    employeeBrief:
      "You’re skeptical of the development plan and feel it may not align with your interests or workload.",
    employeePhrases: [
      "This doesn’t really fit how I work.",
      "I’ve tried things like this before.",
      "I don’t want to change my approach.",
    ],
    coachingTips: {
      dos: [
        "Name **resistance** without judgment.",
        "Explore what the employee is **protecting or worried about**.",
        "Adjust the plan without **abandoning the goal**.",
        "Reconfirm expectations explicitly.",
      ],
      donts: [
        "Push harder when resistance appears.",
        "Take pushback personally.",
        "Win the argument at the cost of trust.",
      ],
      powerMove: "Ask: **What part of this feels misaligned for you?**",
    },
  },
];

/**
 * Real team member participants
 */
export const participants: string[] = [
  "Amira Mohiey Eldeen",
  "Bilal Ataallh",
  "Hazem Huzayen",
  "Sagar Sreejith",
  "Steni Koilraj",
  "Syed Shahzeb Hasan",
  "Reham Habbas",
];

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
