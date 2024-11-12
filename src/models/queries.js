const { prisma } = require("./pool");
async function createUser(firstName, lastName, username, password) {
  const createdUser = await prisma.user.create({
    data: {
      firstName: firstName,
      lasName: lastName,
      username: username,
      password: password,
    },
  });
  return createdUser;
}
async function getUsers() {
  const users = await prisma.user.findMany();

  return users;
}
module.exports = {
  createUser,
  getUsers,
};
