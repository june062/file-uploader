const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { prisma } = require("../models/pool");
const crypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
      if (!user) {
        return done(null, false, { message: "Wrong username" });
      } else {
        const match = await crypt.compare(password, user.password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Wrong password" });
        }
      }
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (userID, done) => {
  try {
    const user = await prisma.user.findUnique({
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
