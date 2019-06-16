import * as bodyParser from 'body-parser';
import * as express from 'express';
import errorMiddleware from './middlewares/errorMiddleware';
import {PORT} from './utils/config';
import apiRoutes from "./routes/apiRoutes";

const app = express();
app.use(bodyParser.json());

apiRoutes(app);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`App is running on port ${PORT}!`);
});
