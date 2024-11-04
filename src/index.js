const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
require("dotenv").config();//llamado del .env
const port = process.env.PORT; //Usa el puerto 5000 en el .env 

// Import MongoDbAtlas
require("./DB/connection");

// Settings
app.set("port", port);  // Utiliza la variable port definida arriba

// Middlewares
app.use(morgan("dev"));
app.use(express.json());



// Routes
app.use("/api/tasks", require("./routes/task.route"));
app.use("/api/Video",require("./routes/Video.route"));
app.use("/api/plans", require("./routes/plan.route"));
app.use("/api/user/preferences", require("./routes/preferences.route"));
app.use("/api/profile", require("./routes/profile.route"));

// Static Files
// Solo necesitas esta línea para servir archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, "public")));

// Starting server

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});
