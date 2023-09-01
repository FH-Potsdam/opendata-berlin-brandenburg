const fs = require("fs")
const cors = require("cors")

const express = require('express')
const app = express()
app.use(cors())
const port = 3000

const videoFile = './src/site/_data/videos.json';

const parseVideos = () => {
  const vd = JSON.parse(fs.readFileSync(videoFile, 'utf-8'));
  return vd;
};

app.get('/videos/insert', (req, res) => {
  const videos = parseVideos();
  videos.push({
    "id": req.query.id,
    "file": {
      "de": req.query.file_de,
      "en": req.query.file_en
    },
    "status": req.query.status,
    "title": {
      "de": req.query.title_de,
      "en": req.query.title_en
    },
    "description": {
      "de": req.query.description_de,
      "en": req.query.description_en
    },
    "category": req.query.category,
    "overlays": (req.query.overlays && req.query.overlays.length > 0 && req.query.overlays != null) ? JSON.parse(req.query.overlays) : [],
    "links": req.query.links.split(",")
  })
  fs.writeFileSync(videoFile, JSON.stringify(videos), 'utf-8');
  res.status(200).send('ok');
})

app.get('/videos/update', (req, res) => {
  const videos = parseVideos();
  let id = "notfound";
  videos.forEach((v, vi) => {
    if (v.id === req.query.id) {
      id = vi;
    }
  })
  videos[id] = {
    "id": req.query.id,
    "file": {
      "de": req.query.file_de,
      "en": req.query.file_en
    },
    "status": req.query.status,
    "title": {
      "de": req.query.title_de,
      "en": req.query.title_en
    },
    "description": {
      "de": req.query.description_de,
      "en": req.query.description_en
    },
    "category": req.query.category,
    "overlays": (req.query.overlays && req.query.overlays.length > 0 && req.query.overlays != null) ? JSON.parse(req.query.overlays) : [],
    "links": req.query.links.split(",")
  }
  fs.writeFileSync(videoFile, JSON.stringify(videos), 'utf-8');
  res.status(200).send('ok');
})

app.get('/videos/delete', (req, res) => {
  const videos = parseVideos();
  let id = "notfound";
  videos.forEach((v, vi) => {
    if (v.id === req.query.id) {
      id = vi;
    }
  })
  delete videos[id];
  fs.writeFileSync(videoFile, JSON.stringify(videos.filter(v => v !== null)), 'utf-8');
  res.status(200).send('ok');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})