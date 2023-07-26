const router = require("express").Router();
const apiRoutes = require("./api-routes");
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes");


// get request
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);

// post, put, delete request
router.use("/api", apiRoutes);


module.exports = router;