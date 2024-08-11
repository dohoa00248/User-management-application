import userRouterMongoose from "./user.mongoose.route.js";
import userRouterMysql from "./user.mysql.route.js";
import userRouterSequelize from "./user.sequelize.route.js";
import userRouterMongoDB from "./user.mongodb.route.js";

const routes = (app) => {
    app.use("/api/v1/user", userRouterMongoDB);
    app.use("/api/v2/user", userRouterMongoose);
    app.use("/api/v3/user", userRouterMysql);
    app.use("/api/v4/user", userRouterSequelize);
}

export default routes;