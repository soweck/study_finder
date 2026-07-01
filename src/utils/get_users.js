const mapUsers = (users) => {
  return new Map(users.map((user) => [user.id, user]));
};
export default async function loadUsers() {
  try {
    const response = await fetch("/src/data/users.json");
    const data = await response.json();
    return mapUsers(data);
  } catch (error) {
    console.log(error);
  }
}
