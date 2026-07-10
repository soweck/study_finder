import { User } from "../user.js";
const user = {
  id: 1,
  name: "Andrew",
  friends: [2, 3, 4, 5, 6, 7, 10, 11, 12],
};

export const createUser = (overrides = {}) => {
  return new User({ ...user, ...overrides });
};
