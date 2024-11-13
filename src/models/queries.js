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
  const users = await prisma.user.findMany({
    include: {
      folders: true,
    },
  });

  return users;
}

async function getUserFolders(userID) {
  const folders = await prisma.user.findMany({
    where: {
      id: userID,
    },
    select: {
      folders: true,
    },
  });

  return folders[0].folders;
}

async function createFolder(userID, folderName) {
  const result = await prisma.folder.create({
    data: {
      name: folderName,
      owner: {
        connect: {
          id: userID,
        },
      },
    },
  });
}

module.exports = {
  createUser,
  getUsers,
  getUserFolders,
  createFolder,
};
