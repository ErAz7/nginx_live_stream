const http = require('http');
const fs = require('fs');
const colors = require('colors');


var streams=[];

http.createServer(function(request,response){
    response.setHeader('Access-Control-Allow-Origin', '*');    
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();

      let post_data=body.split('&');    

      let post_data_decoded={};
      let tmp_post;
      for(let i=0;i<post_data.length;i++)
      {
        tmp_post=post_data[i].split('=');
        tmp_post[0]=decodeURIComponent(tmp_post[0]);
        tmp_post[1]=decodeURIComponent(tmp_post[1]);
        post_data_decoded[tmp_post[0]]=tmp_post[1];
      }      

      switch(post_data_decoded.call)
      {
        case 'publish':
          response.setHeader('Location', post_data_decoded.name);
          response.statusCode = 308;
          streams.push(post_data_decoded.name);
          console.log(('new stream: '+post_data_decoded.name).green.bold);
        break;
        case 'publish_done':
          response.statusCode = 200;
          streams.splice(streams.indexOf(post_data_decoded.name),1);
          console.log(('stream closed: '+post_data_decoded.name).red.bold);
        break;
      }
      console.log(('live streams: '+streams).cyan.bold);
      response.end(); 
    });
    

}).listen(8000);







http.createServer(function(request,response){
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.statusCode = 200;
    response.end(JSON.stringify(streams)); 
}).listen(8080);
