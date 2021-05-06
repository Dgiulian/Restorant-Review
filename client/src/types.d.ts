export interface IRestaurant {
  id: string;
  name: string;
  address: string;
  owner: string;
}

export interface ApiResponse<T> {
  results: T;
}

export interface IReview {
  id: string;
  name: string;
  rating: number;
  review: string;
  date: Date;
  response: string | null;
  response_date: Date | null;
}

interface FormElements<T> extends HTMLFormElement {
  readonly elements: T;
}

export interface IUser {
  email: string;
  id: string;
  isEmailVerified: boolean;
  name: 'string';
  role: 'owner' | 'admin' | 'user';
}
