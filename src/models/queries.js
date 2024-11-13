const { prisma } = require("./pool");
async function createUser(firstName, lastName, username, password) {
  try {
    const createdUser = await prisma.user.create({
      data: {
        firstName: firstName,
        lasName: lastName,
        username: username,
        password: password,
      },
    });
    return createdUser;
  } catch (error) {
    return error;
  }
}
async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        folders: true,
      },
    });

    return users;
  } catch (error) {
    return error;
  }
}

async function getUserFolders(userID) {
  try {
    const folders = await prisma.user.findMany({
      where: {
        id: userID,
      },
      select: {
        folders: true,
      },
    });

    return folders[0].folders;
  } catch (error) {
    return error;
  }
}

async function createFolder(userID, folderName) {
  try {
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
  } catch (error) {
    return error;
  }
}

async function getFolderContents(folderID) {
  try {
    const folderContents = await prisma.folder.findUnique({
      where: {
        id: folderID,
      },
      include: {
        files: true,
      },
    });
    return folderContents;
  } catch (error) {
    return error;
  }
}

async function deleteFolderAndContents(folderID) {
  const deleteFiles = prisma.file.deleteMany({
    where: {
      ownerID: folderID,
    },
  });

  const deleteFolder = prisma.folder.delete({
    where: {
      id: folderID,
    },
  });
  try {
    const transaction = await prisma.$transaction([deleteFiles, deleteFolder]);
  } catch (error) {
    return error;
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserFolders,
  createFolder,
  getFolderContents,
  deleteFolderAndContents,
};
