const express = require('express');
const app = express();
const server = require('http').Server(app);
const WebSocket = require('ws');
// 子进程
const { spawn } = require('child_process');

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('a user connected');
  let ffmpeg;
  ws.on('message', (message) => {
    message = message.toString('utf-8');
    if (message === 'getVideoStream') {
      console.log('getVideoStream');
      // 收到 'getVideoStream', 开始创建 FFmpeg 子进程，抓取视频
      ffmpeg = spawn('ffmpeg', [
        // '-re', // 以本机帧速率读取输入。主要用于模拟抓取设备或实时输入流
        '-f', 'gdigrab',  // 基于Win32 GDI的屏幕捕获设备。可以捕获Windows桌面屏幕显示区域的画面图像，包含windows窗口显示画面
        '-framerate', '60', // 设置编码为 60 帧
        '-video_size', '1920x1080', // 设置捕获分辨率为 1920x1080
        '-i', 'desktop', // 输入设备是桌面屏幕
        // '-i', '../videos/test.mp4', // 输入视频文件
        '-c:v', 'libx264', // 编码格式 h264
        '-preset', 'superfast',
        '-crf', '30', // 视频质量，越少越好
        '-tune', 'zerolatency',
        '-f', 'mp4',
        '-movflags', 'empty_moov+default_base_moof+frag_keyframe', // 封装浏览器支持的 ISO BMFF 这样的 mp4 封装格式
        '-frag_duration', '16', // 设置编码切片为一帧一切
        'pipe:1'
      ]);
      

      // 监听子进程的 stdout 流，并将输出发送到客户端
      ffmpeg.stdout.on('data', (data) => {
        console.error(data, `stdout.on data - ${new Date().getTime()}`);
        ws.send(data);
      });

      ffmpeg.stderr.on('data', (data) => {
        console.error(`FFmpeg error: ${data}`);
      });
      
      ffmpeg.on('exit', (code, signal) => {
        console.log(`FFmpeg process exited with code ${code} and signal ${signal}`);
      });
    }
  });

  // websocket 关闭后杀掉指令
  ws.on('close', () => {
    ffmpeg.kill('SIGINT');
  });
  
});

server.listen(3000, () => {
  console.log('server started on port 3000');
});
