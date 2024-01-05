export type AdType = {
  id: number;
  title: string;
  owner: string;
  description: string;
  picture: string;
  location: string;
  price: number;
  category: CategoryType | null;
};

export type AdCardType = Pick<
  AdType,
  'id' | 'title' | 'picture' | 'price' | 'category'
>;

export type CategoryType = {
  id: number;
  name: string;
};

export type UserType = {
  id: number;
  email: string;
};
