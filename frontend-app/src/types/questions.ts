export interface QuestionItemData {
  _id: string;
  text: string;
  options: string[];
  correctOption: number;
  reward: number;
  materials: string;
  image?: string;
}
