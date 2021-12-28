const router = require("express").Router();

router.get("/create", (req, res) => {
  res.render("createRoom");
});

router.get("/join", (req, res) => {
  res.render("joinRoom");
});

router.get("/home", (req, res) => {
  res.render("home",{players : [], roomId : ""});
});

router.get("/", (req, res) => {
    res.render("index");
  });
  
router.get("*", (req, res) => res.redirect("/"));
  
module.exports = router;
