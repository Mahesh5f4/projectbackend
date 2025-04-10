"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./config/data-source");
const project_routes_1 = __importDefault(require("./routes/project.routes"));
const savedProject_route_1 = require("./routes/savedProject.route");
const app = (0, express_1.default)(); // ✅ Moved this up
const PORT = 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/projects', project_routes_1.default);
app.use('/api/saved', savedProject_route_1.savedRoutes); // ✅ Moved this after app is defined
// Connect to DB and start server
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('✅ Connected to MySQL DB');
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
})
    .catch((error) => console.error('❌ DB connection error:', error));
