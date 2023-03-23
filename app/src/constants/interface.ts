export interface IPost {
  id: number;
  title: string;
  content: string;
  createdBy: string;
  createdAt: string;
}

export interface IPostInputs {
  title: string;
  content: string;
  createdBy: string;
}

export interface ISearchPostInputs {
  keyword: string;
}