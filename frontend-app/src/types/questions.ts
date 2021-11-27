export interface QuestionItemData {
  _id?: string;
  theme: QuestionThemes;
  lang: QuestionLang;
  text: string;
  options: string[];
  correctOption: number;
  reward: number;
  materials: string;
  image?: Array<string>;
}

export enum QuestionThemes {
  JAVASCRIPT = "javascript",
  HTML = "html",
  CSS = "css",
  VUE = "vue",
  REACT = "react",
  PYTHON = "python",
}

export enum QuestionLang {
  RUSSIAN = "ru",
  ENGLISH = "en",
}

export interface QuestionsFilters {
  lang: string;
  category: string;
}
