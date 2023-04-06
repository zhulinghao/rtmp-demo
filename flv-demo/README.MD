# 1.开启 rtmp 服务

```shell
npm i

node media-server.js
```

# 2.ffmpeg 推流命令
```shell
安装 ffmpeg
// 拿到桌面视频，封装格式 mp4 的 h264 视频流
ffmpeg -re -f gdigrab -framerate 30 -video_size 1920x1080 -i desktop -c:v libx264 -preset superfast -tune zerolatency -f flv rtmp://localhost/live/STREAM_NAME
```

# 3.用liveServer打开flv_demo.html客户端
