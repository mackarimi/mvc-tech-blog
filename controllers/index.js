const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js"); // Updated filename
const dashboardRoutes = require("./dashboard-routes.js"); // Updated filename

// Add your API routes here
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
