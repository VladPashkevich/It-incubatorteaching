import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

let videos = [
  { id: 1, title: 'About JS - 01', author: 'it-incubator.eu' },
  { id: 2, title: 'About JS - 02', author: 'it-incubator.eu' },
  { id: 3, title: 'About JS - 03', author: 'it-incubator.eu' },
  { id: 4, title: 'About JS - 04', author: 'it-incubator.eu' },
  { id: 5, title: 'About JS - 05', author: 'it-incubator.eu' },
];

app.get('/', (req: Request, res: Response) => {
  res.send('HELLO IT-INCUBATOR');
});

app.get('/videos', (req: Request, res: Response) => {
  res.send(videos);
});

app.post('/videos', (req: Request, res: Response) => {
  let title = req.body.title;
  if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
    res.sendStatus(400).send({
      errorsMessages: [
        {
          message: 'Incorrect title',
          field: 'title',
        },
      ],
      resultCode: 1,
    });
    return;
  }
  const newVideo = {
    id: +new Date(),
    title: title,
    author: 'it-incubator.eu',
  };
  videos.push(newVideo);
  res.sendStatus(201).send(newVideo);
});

app.put('/videos/:videosId', (req: Request, res: Response) => {
  let title = req.body.title;
  if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
    res.sendStatus(400).send({
      errorsMessages: [
        {
          message: 'Incorrect title',
          field: 'title',
        },
      ],
      resultCode: 1,
    });
    return;
  }

  const id = +req.params.videoId;
  const video = videos.find((v) => v.id === id);

  if (video) {
    video.title = title;
    res.status(204).send(video);
  } else {
    res.send(404);
  }
});

app.get('/videos/:videosId', (req: Request, res: Response) => {
  const id = +req.params.videoId;
  const video = videos.find((v) => v.id === id);

  if (video) {
    res.json(video);
  } else {
    res.send(404);
  }
});

app.delete('/videos/:videosId', (req: Request, res: Response) => {
  const id = +req.params.videoId;
  const newVideos = videos.filter((v) => v.id !== id);

  if (newVideos.length < videos.length) {
    videos = newVideos;
    res.send(204);
  } else {
    res.send(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
