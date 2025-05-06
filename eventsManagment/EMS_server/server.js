const express = require('express');
const app = express();
const router = require('./router/auth-router');
const contactRouter = require('./router/contact-router.js');
const eventRouter = require("../EMS_server/router/event-routes");
const eventRoutes = require("./router/eventRoutes.js");
const exhibitorRoutes = require("./router/exhibitor-routes");
const sessionRoutes = require("./router/sessionRoutes");
const profileRoutes = require('../EMS_server/router/profileRoutes.js');
const cors = require('cors');
require("dotenv").config();  // Corrected dotenv setup

// Middleware to parse JSON bodies
app.use(express.json()); 
const bodyParser = require('body-parser');
app.use(bodyParser.json());


const PORT = process.env.PORT || 5001;

// Database connection
const connectDb = require("./utils/db");

const errorMiddleware = require("./middlewares/error-middleware");


const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
}

app.use(cors(corsOptions));
app.use("/api/auth", router);
app.use("/api/form", contactRouter);
app.use("/api/events", eventRouter);
app.use("/api/events", eventRoutes);
app.use("/api/exhibitors", exhibitorRoutes);
app.use('/api', profileRoutes); 
app.use(errorMiddleware);
app.use("/api/sessions", sessionRoutes); 
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
});