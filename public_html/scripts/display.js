var url = new URL(window.location.href);
var name = url.searchParams.get("name");
var m3u8='./live/'+name+'/index.m3u8';
if(Hls.isSupported()) {
  var video = document.getElementById('video');
  var hls = new Hls();
  hls.loadSource(m3u8);
  hls.attachMedia(video);
  hls.on(Hls.Events.MANIFEST_PARSED,function() {
    video.play();
  });
}else{
  video.src=m3u8;
}