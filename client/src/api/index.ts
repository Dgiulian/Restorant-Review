import axios from 'axios';

export async function getRestaurantList() {
  const resp = await axios.get('http://localhost:5000/v1/restaurant');
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  return resp.data;
}
