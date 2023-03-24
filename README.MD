# 开启 rtmp 服务

```shell
cd ./rtmp-server

npm i

node server.js
```

# ffmpeg 推流命令
```shell
安装 ffmpeg
// 拿到桌面视频，封装格式 mp4 的 h264 视频流
ffmpeg -re -f gdigrab -i desktop -video_size 1920x1080 -c:v libx264 -preset ultrafast -tune zerolatency -b:v 500k -pix_fmt yuv420p -profile:v baseline -c:a aac -crf 28 -movflags empty_moov+default_base_moof+frag_keyframe -b:a 500k -f mp4 rtmp://localhost/live/stream1
```
