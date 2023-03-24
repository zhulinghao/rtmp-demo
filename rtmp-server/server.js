const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30
  },
  http: {
    port: 8000,
    mediaroot: './server/media',
    webroot: './public',
    allow_origin: '*'
  },
  // relay: {
  //   ffmpeg: '/usr/local/bin/ffmpeg',
  //   tasks: [
  //     {
  //       app: 'live',
  //       mode: 'push',
  //       edge: 'rtmp://live.twitch.tv/app/<stream_key>'
  //     }
  //   ]
  // }
};

const nms = new NodeMediaServer(config);

nms.on('prePublish', (id, StreamPath, args) => {
  console.log(`[NodeEvent on prePublish]: id=${id}, StreamPath=${StreamPath}, args=${JSON.stringify(args)}`);

  // 处理流数据
});

nms.run();