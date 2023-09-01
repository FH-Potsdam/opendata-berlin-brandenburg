const videos = require('./videos.json');

const videoMap = {};

videos.forEach((v, vi) => {
  videoMap[v.id] = vi;
});

module.exports = videoMap;