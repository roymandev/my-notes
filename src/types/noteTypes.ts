export interface BaseNote {
  title: string;
  body: string;
}

export interface Note extends BaseNote {
  id: string;
  uid: string;
  updatedAt: string;
}
