const roles = ['user', 'owner', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['createReview', 'deleteReview']);
roleRights.set(roles[1], ['manageRestaurants', 'createReview', 'deleteReview', 'addResponse']);
roleRights.set(roles[2], ['getUsers', 'manageUsers', 'deleteReview']);

module.exports = {
  roles,
  roleRights,
};
