/**
 * Real coaching scenarios for manager-employee role-play
 * Based on practical management training objectives
 */

export interface Scenario {
  id: number;
  title: string;
  description: string;
  objective: string;
  employeeRole: string;
  keySkills: string;
  managerBrief: string;
  employeeBrief: string;
  employeePhrases: string[];
}

export const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Persona Discovery",
    description: "A coaching session focused on identifying employee strengths, motivations, and growth areas through active dialogue.",
    objective: "Identify employee strengths, motivations, and growth areas",
    employeeRole: "Low engagement, unclear goals",
    keySkills: "Active listening, open-ended questioning, empathy",
    managerBrief: "Your role is to conduct a discovery conversation to understand this employee's strengths, what motivates them, and areas where they want to grow. Use active listening and open-ended questions to draw out their perspective. Avoid making assumptions and focus on understanding their current state of engagement and clarity around their goals.",
    employeeBrief: "You're feeling disengaged at work and unclear about your career direction. You're not sure what your strengths are or how they align with your role. You're open to discussion but need guidance to articulate your thoughts and feelings about your current situation and future aspirations.",
    employeePhrases: [
      "I don't know what I want to do here; I just do my tasks. (Low engagement, unclear goals)",
      "I'm not sure I'm good at anything special. (Self-doubt)",
      "Honestly, I don't see much growth opportunity here. (Lack of motivation)"
    ]
  },
  {
    id: 2,
    title: "Adaptive Feedback",
    description: "Delivering constructive feedback to a high performer who is sensitive to criticism and tends to be defensive.",
    objective: "Deliver feedback constructively based on personality",
    employeeRole: "High performer but sensitive to criticism/Defensive",
    keySkills: "Emotional intelligence, adaptability, framing feedback",
    managerBrief: "You need to provide feedback to a top performer who has some areas for improvement, but they tend to react defensively to criticism. Focus on framing feedback positively, acknowledging their strengths first, and adapting your communication style to their sensitivity. Use emotional intelligence to read their reactions and adjust your approach accordingly.",
    employeeBrief: "You're proud of your high performance and contributions to the team. When receiving feedback, you tend to feel defensive because you work hard and expect recognition. You may interpret constructive feedback as personal criticism. Try to show your natural defensive reactions while being open to the manager's approach.",
    employeePhrases: [
      "I feel like you're always nitpicking.",
      "I've already done my best; I don't think I can improve more. (Defensive)",
      "Why are you focusing on that small mistake? (Defensive)"
    ]
  },
  {
    id: 3,
    title: "Coaching for Improvement",
    description: "A coaching conversation to help an employee who struggles with meeting deadlines discover their own solutions.",
    objective: "Guide employee toward self-discovery of solutions",
    employeeRole: "Struggling with deadlines",
    keySkills: "Coaching techniques, problem-solving, patience",
    managerBrief: "Rather than telling this employee what to do about their deadline issues, use coaching techniques to guide them toward discovering their own solutions. Ask powerful questions, be patient with their thought process, and help them identify the root causes and potential solutions themselves. Focus on building their problem-solving capabilities.",
    employeeBrief: "You've been missing deadlines lately and feel overwhelmed. You're not sure why you're struggling - it could be time management, prioritization, workload, or other factors. You want to improve but need help figuring out what's going wrong and how to fix it. Be open to exploring the causes with your manager's guidance.",
    employeePhrases: [
      "I can't meet these deadlines; it's impossible. (Overwhelmed)",
      "I don't know how to organize myself better. (Lack of skills)",
      "I just feel overwhelmed; I'm not sure what to do first. (Prioritization issue)"
    ]
  },
  {
    id: 4,
    title: "Handling Resistance",
    description: "Engaging with an employee who is resistant to a proposed development plan and finding ways to overcome their objections.",
    objective: "Engage resistant employees positively",
    employeeRole: "Resistant to a proposed development plan",
    keySkills: "Empathy, persuasion, conflict resolution",
    managerBrief: "This employee is pushing back against a development plan you've proposed. Your goal is to understand the root of their resistance, show empathy for their concerns, and work together to find a path forward that addresses both their needs and business requirements. Use persuasion and conflict resolution skills to turn resistance into collaboration.",
    employeeBrief: "You're resistant to the development plan being proposed because you feel it doesn't align with your interests, adds to your workload, or you're skeptical about its value. Express your concerns and objections clearly, but be willing to engage in dialogue if the manager shows understanding of your perspective.",
    employeePhrases: [
      "I don't think this plan fits my style. (Resistance)",
      "I've done training like this before; it didn't help. (Skepticism)",
      "I just don't want to change my way of working. (Stubbornness)"
    ]
  },
  {
    id: 5,
    title: "Career Growth Conversation",
    description: "Aligning an employee's career aspirations with team and organizational objectives while providing meaningful guidance.",
    objective: "Align employee career goals with team/organization objectives",
    employeeRole: "Seeking long-term growth guidance",
    keySkills: "Strategic thinking, vision-setting, trust-building",
    managerBrief: "This employee is seeking guidance on their long-term career growth. Help them understand how their aspirations can align with team and organizational needs. Use strategic thinking to paint a vision of their potential path, build trust by showing genuine investment in their growth, and help them see the bigger picture of how their development benefits everyone.",
    employeeBrief: "You're ambitious and want to grow in your career, but you're not sure about the path forward or how your goals align with what the company needs. You're looking for genuine guidance and want to feel that your manager is invested in your long-term success, not just immediate productivity.",
    employeePhrases: [
      "I want to advance in Almosafer, but I'm not sure how. (Ambition)",
      "I'm worried I'll hit a ceiling here. (Fear of stagnation)",
      "I'm not even sure this role fits my long-term goals. (Uncertainty)"
    ]
  },
  {
    id: 6,
    title: "Positive Feedback - Hidden Talent",
    description: "Coaching a high-performing but shy employee to increase their visibility while respecting their personality style.",
    objective: "Teaching managers to coach visibility while respecting personality",
    employeeRole: "High Performer but Shy (Not Getting Recognition)",
    keySkills: "Spotting hidden talent, Encouraging visibility without forcing personality change, Coaching for confidence and recognition, Advocacy and representation",
    managerBrief: "You have a high-performing team member who consistently delivers excellent work but struggles with visibility due to their shy nature. Your goal is to help them gain recognition without forcing them to change their personality. Focus on coaching them toward confidence, finding ways to showcase their work, and advocating for them while respecting their natural communication style.",
    employeeBrief: "You do excellent work and take pride in your contributions, but you're naturally introverted and don't self-promote. You often feel overlooked in meetings and worry that your good work goes unnoticed. You want recognition but feel uncomfortable with traditional networking and self-promotion approaches.",
    employeePhrases: [
      "I don't really like talking about my work; I just prefer to stay quiet and do it. (Shyness, undervalued)",
      "I don't think people even notice what I do. (Lack of visibility)",
      "I don't feel comfortable presenting in meetings. (Fear of exposure)"
    ]
  },
  {
    id: 7,
    title: "Clear Negative Feedback",
    description: "Delivering direct, clear feedback to an underperforming employee when previous soft approaches haven't worked.",
    objective: "Train managers to deliver clear, firm, and constructive negative feedback when soft feedback fails",
    employeeRole: "Underperformance Scenario — Wrong Estimates, Missed Deadlines, Poor Prep",
    keySkills: "Giving direct, unsugarcoated feedback, Setting clear expectations and accountability, Balancing support with consequences, Holding underperformers to team standards",
    managerBrief: "Previous gentle feedback hasn't led to improvement. This employee continues to provide wrong estimates, miss deadlines, and come unprepared to meetings. You need to deliver clear, firm, direct feedback while still being constructive. Set clear expectations, establish accountability measures, and explain consequences while offering support for improvement.",
    employeeBrief: "You've been struggling with your work quality - your estimates are often wrong, you've missed several deadlines, and you sometimes come to meetings unprepared. You may have heard some feedback before but didn't realize how serious the situation was. You might feel defensive, overwhelmed, or surprised by the directness of the feedback.",
    employeePhrases: [
      "I know the deadline slipped, but I had too many things going on. (Excuses for delays)",
      "The meeting prep wasn't that important; we could wing it. (Dismissing preparation)",
      "Estimation is always hard; everyone gets it wrong. (Normalizing poor estimates)",
      "I thought it wasn't such a big deal last time. (Ignoring previous feedback)"
    ]
  }
];

/**
 * Real team member participants
 */
export const participants: string[] = [
  "Amira Mohiey Eldeen",
  "Haitham Qudaih",
  "Hazem Huzayen",
  "Muhammad Ahmed",
  "Muhammad Talal",
  "Sagar Sreejith",
  "Steni Koilraj",
  "Suhaib Khater",
  "Syed Shahzeb Hasan"
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
