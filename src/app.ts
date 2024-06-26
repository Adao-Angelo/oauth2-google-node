import express from "express";
import session from "express-session";
import passport from "./auth";
import { SESSION_SECRET } from "./config";

const app = express();

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/login", (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

app.get("/profile", (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect("/login");
  }

  const user = req.user as any;
  res.json({
    name: user.displayName,
    email: user.emails[0].value,
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
