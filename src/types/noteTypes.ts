export interface BaseNote {
  title: string;
  body: string;
  uid: string;
}

export interface Note extends BaseNote {
  id: string;
  updatedAt: string;
}
