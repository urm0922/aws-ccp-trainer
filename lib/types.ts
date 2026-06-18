export type Domain = "クラウドの概念" | "セキュリティとコンプライアンス" | "クラウドテクノロジーとサービス" | "請求、料金、サポート";

export type Choice = { id: string; text: string; explanation: string };
export type Question = {
  id: string;
  domain: Domain;
  prompt: string;
  choices: Choice[];
  correctChoiceId?: string;
  correctChoiceIds?: string[];
  explanation: string;
  difficulty?: "基礎" | "標準" | "応用";
  source?: string;
  reviewedAt?: string;
};

export type AnswerRecord = {
  questionId: string;
  selectedChoiceId?: string;
  selectedChoiceIds?: string[];
  correct: boolean;
  answeredAt: string;
  sessionId?: string;
  mode?: "practice" | "mock60" | "mock65";
};

export type MockResult = {
  id: string;
  mode: "mock60" | "mock65";
  total: number;
  correct: number;
  durationSeconds: number;
  completedAt: string;
};
