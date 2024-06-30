import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/mongo.mjs';
import colors from 'colors';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import cors from 'cors';
import authRouter from './routes/authRoutes.mjs';
import coursesRouter from './routes/coursesRoutes.mjs';
import usersRouter from './routes/userRoutes.mjs';

import path from 'path';
import { fileURLToPath } from 'url';
import { errorHandler } from './middleware/errorHandler.mjs';

dotenv.config({ path: './config/config.env' });

connectDb();

const fileName = fileURLToPath(import.meta.url);
const dirname = path.dirname(fileName);
global.__appdir = dirname;

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__appdir, 'public')));
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());

const limit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minuters fönster
  limit: 100,
});

app.use(limit);
app.use(cors());
app.use(hpp());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/courses', coursesRouter);
app.use('/api/v1/users', usersRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5010;

const server = app.listen(PORT, () =>
  console.log(`Server is running on port: ${PORT}`.yellow)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error message: ${err.message}`.red);
  server.close(() => process.exit(1));
});
