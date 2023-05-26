import connectLivereload from 'connect-livereload';
import dotenv from 'dotenv';
import express from 'express';
import livereload from 'livereload';
import gameController from './controllers/game/game.controller';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public/assets'));

/** using ejs as template engine */
app.set('view engine', 'ejs');
app.set('views', 'public/views');

/** live reload */
if (process.env.NODE_ENV !== 'production') {
  console.log('Development mode with live reload');

  const liveReloadServer = livereload.createServer();
  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/');
    }, 100);
  });
  app.use(connectLivereload());
}

app.get('/', (_, res) => {
  res.render('index', {
    title: 'Footbal Game',
    header: 'Football Game',
    body: ''
  });
});

app.use('/game', gameController);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server listening on port 3000');
});