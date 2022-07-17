export interface BaseNote {
  title: string;
  body: string;
}

export interface Note extends BaseNote {
  id: number;
  updatedAt: string;
}
