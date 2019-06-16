import * as bodyParser from 'body-parser';
import * as express from 'express';
import errorMiddleware from './middlewares/errorMiddleware';
import apiRoutes from './routes/apiRoutes';
import {PORT} from './utils/config';

const app = express();
app.use(bodyParser.json());

apiRoutes(app);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`App is running on port ${PORT}!`);
});
