const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js"); // Updated filename
const dashboardRoutes = require("./dashboard-routes.js"); // Updated filename

// Add your API routes here
router.use("/api", apiRoutes); // API routes
router.use("/", homeRoutes); // Routes for the homepage
router.use("/dashboard", dashboardRoutes); // Routes for the dashboard

// Handle 404 error for any undefined routes
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
