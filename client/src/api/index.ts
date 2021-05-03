import axios from 'axios';

const SERVER_URL = 'http://localhost:5000/v1';

export async function getRestaurantList() {
  const resp = await axios.get(`${SERVER_URL}/restaurant`);
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  return resp.data;
}

export async function getRestaurantById(restaurantId: string) {
  const resp = await axios.get(`${SERVER_URL}/restaurant/${restaurantId}`);
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  return resp.data;
}
