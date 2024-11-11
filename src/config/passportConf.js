const passport = require("passport");
const LocalStrategy = require("passport-local");
const prisma = require("../models/queries");
const crypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          usernmae: username,
        },
      });
      if (!user) {
        return done(null, false, { message: "Wrong username" });
      } else {
        const hashedPassword = await crypt.hash(password, 12);
        const match = await crypt.compare(user.password, hashedPassword);
        if (match) {
          return done(true, user);
        } else {
          return false, null, { message: "Wrong password" };
        }
      }
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user) => {
  return done(null, user.id);
});

passport.deserializeUser((userID) => {
  try {
    const user = prisma.user.findUnique({
      where: {
        id: userID,
      },
    });
    if (!user) {
      done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});
