import { rest } from 'msw';
import { SERVER_URL } from '../api';
import RestaurantHandler from './restaurant.handler';

export const handlers = [
  // Handles a POST /login request
  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session
    localStorage.setItem('authToken', 'true');
    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),

  rest.get(`${SERVER_URL}/restaurant`, RestaurantHandler.getRestaurants),
  // Handles a GET /user request
  rest.get(
    `${SERVER_URL}/restaurant/:restaurantId`,
    RestaurantHandler.getRestaurantById
  ),
];
