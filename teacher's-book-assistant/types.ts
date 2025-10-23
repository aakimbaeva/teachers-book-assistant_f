
export interface QuizItem {
  question: string;
  answer: string;
}

export interface Entity {
  name: string;
  type: 'PERSON' | 'LOCATION';
  description: string;
}

export interface ChapterAnalysis {
  chapter: number;
  summary: string;
  keywords: string[];
  discussionQuestions: string[];
}

export interface AnalysisData {
  title: string;
  chapters: ChapterAnalysis[];
  quiz: QuizItem[];
  entities: Entity[];
}
