export interface QuestionItemData {
  _id?: string;
  theme: QuestionThemes;
  lang: QuestionLang;
  text: string;
  options: string[];
  correctOption: number;
  reward: number;
  materials: string;
  image?: string;
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
