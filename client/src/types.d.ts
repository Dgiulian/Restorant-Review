export interface IRestaurant {
  id?: string;
  name: string;
  description: string;
  address: string;
  owner?: string;
  reviews?: IReview[];
  rating?: number;
}
export interface ApiResponse<T> {
  results: T;
}

export interface IReview {
  id: string;
  text: string;

  rating: number;
  user: { id?: string; name: string };
  date: string;
  response: string | null;
  response_date: string | null;
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

export interface IAddReviewParams {
  restaurant: string;
  text: string;
  rating: number;
}
export interface IAddResponseParams {
  text: string;
}
