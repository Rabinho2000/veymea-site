import { PROFILE_ORDER, type VeymeaProfile } from "../../content/quiz/profiles";
import type { QuizScores } from "./types";

export function createEmptyScores(): QuizScores {
  return { play: 0, warm: 0, fresh: 0, slow: 0 };
}

export function scoreAnswer(
  scores: QuizScores,
  weights: Partial<Record<VeymeaProfile, number>>,
): QuizScores {
  const next = { ...scores };
  for (const profile of PROFILE_ORDER) {
    const weight = weights[profile];
    if (typeof weight === "number" && weight > 0) {
      next[profile] += weight;
    }
  }
  return next;
}

export function scoreQuiz(
  answers: Array<Partial<Record<VeymeaProfile, number>>>,
): QuizScores {
  return answers.reduce<QuizScores>(
    (scores, weights) => scoreAnswer(scores, weights),
    createEmptyScores(),
  );
}

export function determinePrimary(scores: QuizScores): VeymeaProfile {
  return PROFILE_ORDER.reduce((best, profile) =>
    scores[profile] > scores[best] ? profile : best,
  );
}

export function determineSecondary(
  scores: QuizScores,
  primary: VeymeaProfile,
): VeymeaProfile | null {
  const candidates = PROFILE_ORDER.filter((p) => p !== primary);
  const sorted = candidates.sort((a, b) => scores[b] - scores[a]);
  if (scores[sorted[0]] === 0) return null;
  return sorted[0];
}
