const faker = require('faker');
const { Restaurant } = require('../../../src/models');

describe('Restaurant model', () => {
  describe('Restaurant validation', () => {
    let newRestaurant;
    beforeEach(() => {
      newRestaurant = {
        name: faker.company.companyName(),
        address: faker.address.direction().toLowerCase(),
        rating: 1,
        image: faker.image.image(),
      };
    });

    test('should correctly validate a valid restaurant', async () => {
      await expect(new Restaurant(newRestaurant).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if name not present', async () => {
      delete newRestaurant.name;
      await expect(new Restaurant(newRestaurant).validate()).rejects.toThrow();
    });
  });

  /*   describe('Restaurant toJSON()', () => {
    test('should not return restaurant password when toJSON is called', () => {
      const newRestaurant = {
        name: faker.company.companyName(),
        address: faker.address.direction().toLowerCase(),
        rating: 1,
        image: faker.image.image(),
      };
      expect(new Restaurant(newRestaurant).toJSON()).not.toHaveProperty('password');
    });
  }); */
});
