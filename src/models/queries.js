const prisma = require("./pool");
async function createUser(firstName, lastName, username, password) {
  const createdUser = await prisma.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
    },
  });
  return createUser;
}
module.exports = {
  createUser,
};
