import { ResponseComposition, RestContext, RestRequest } from 'msw';
import { ratingsData as reviewsData } from './fixtures/reviews';
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
  getRestaurantById(
    req: RestRequest,
    res: ResponseComposition,
    ctx: RestContext
  ) {
    const { restaurantId } = req.params;
    const restaurant = restaurantsData.find((r) => r.id === restaurantId);
    const reviews = reviewsData;
    return res(
      // Respond with a 200 status code
      ctx.json({
        ...restaurant,
        reviews,
      })
    );
  },
};

export default RestaurantHandler;
