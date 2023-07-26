const commentRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const userRoutes = require("./user-routes");
const router = require("express").Router();


// redirecting
router.use("/comments", commentRoutes); 
router.use("/posts", postRoutes); 
router.use("/users", userRoutes); 


module.exports = router;