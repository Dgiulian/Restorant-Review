export interface IRestaurant {
  id: string;
  name: string;
  address: string;
  owner: string;
}

export interface ApiResponse<T> {
  results: T;
}
