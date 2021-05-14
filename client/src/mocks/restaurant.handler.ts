import { ResponseComposition, RestContext, RestRequest } from 'msw';
import { restaurantsData } from './fixtures/restaurants';

const RestaurantHandler = {
  getRestaurants(req: RestRequest, res: ResponseComposition, ctx: RestContext) {
    // Persist user's authentication in the session

    return res(
      // Respond with a 200 status code
      ctx.json({
        results: restaurantsData,

        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 4,
      })
    );
  },
};

export default RestaurantHandler;
