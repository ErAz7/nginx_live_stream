
const streamList = document.querySelector('div#streams');
const emptyListText=streamList.innerHTML;

var getLivesSI;


handleCheckForLives();


function handleCheckForLives()
{
  requestServer({},8080,function(response){
    getLivesSI=setTimeout(function(){
      handleCheckForLives();
    },1000)
    try{
      var response=JSON.parse(response);
    }catch(e){
      console.log(e);
      return;
    }
    if(!response.length)
    {
      streamList.innerHTML=emptyListText;
      return;
    }
    streamList.innerHTML='';
    for(var i=0;i<response.length;i++)
    {
      streamList.innerHTML+='<a href="./display.html?name='+response[i]+'"/>'+response[i]+'</a><BR>';
    }    
  });
}


function requestServer(data,port,callBack)
{
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else {
        var xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var params=data;    
    xhr.open("POST",window.location.href.match(/http(s){0,1}\:\/\/[^\/]+/gi)[0]+":"+port,true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params);


    xhr.onload = function () {    
           console.log('message from server: ',this.responseText.trim());          
           if(callBack)
           {
              callBack(this.responseText.trim());
           }     
    };
}

