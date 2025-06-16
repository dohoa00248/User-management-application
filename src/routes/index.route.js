import authRouter from './auth.js';
import userRouterMongoose from './user.mongoose.route.js';
import userRouterMysql from './user.mysql.route.js';
import userRouterSequelize from './user.sequelize.route.js';
import userRouterMongoDB from './user.mongodb.route.js';
import homeRouter from './home.route.js';

const routes = (app) => {
  app.use('/', homeRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/user', userRouterMongoDB);
  app.use('/api/v2/user', userRouterMongoose);
  app.use('/api/v3/user', userRouterMysql);
  app.use('/api/v4/user', userRouterSequelize);
  app.use('/api/v1/auth', authRouter);
};

export default routes;
