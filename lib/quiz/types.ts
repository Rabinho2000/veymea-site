import type { VeymeaProfile } from "../../content/quiz/profiles";

export type QuizType = "couple" | "individual";

export type QuizScores = Record<VeymeaProfile, number>;

export type QuizResult = {
  primary: VeymeaProfile;
  secondary: VeymeaProfile | null;
  scores: QuizScores;
  quizType: QuizType;
};

export type LeadRecord = {
  email: string;
  quizType: QuizType;
  primaryProfile: VeymeaProfile;
  secondaryProfile: VeymeaProfile | null;
  marketingConsent: boolean;
  consentVersion: string | null;
  consentAt: string | null;
  createdAt: string;
};
