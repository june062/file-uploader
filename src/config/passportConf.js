const passport = require("passport");
const LocalStrategy = require("passport-local");
const prisma = require("../models/queries");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    const user = await prisma.user.findUnique({
      where: {
        usernmae: username,
      },
    });
    if (!user) {
      done(/* error, null? */);
    }
  })
);
/* Authenticates the given username and password and passes authenticated user to serialize function */

/* serialize; */
/* Adds user info to session passport object */

/* deserialize; */

/* Retrieves active user from our db and stores that user as req.user object */
