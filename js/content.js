//Use the existed data if this website has been set before
var leftBar, rightBar;

//1. Searching in the storage to see whether this domain has been documented
$(function(){
  chrome.runtime.sendMessage('askURL', function(res){
    var the_url = res.url;
    chrome.storage.sync.get(the_url, function(item){
      if(item[the_url]){
       //Accepted the existed data and then create the bar.
       //app = item[Object.keys(item)[0]];
       app = item[the_url];
       createExisedBar();
     }else{
       console.log('This page havent been stored before');
       creteBlankBar();
     }
    });
  })
})


//2. Getting message from popup window to turn on/off the bar and adjusting color
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    console.log(request);
    if(request.signal == 'toggle'){
      if(app.status == false){
        var urlArray = request.url.split('/');
        app.url = urlArray[2];
      }
      switchStatus();
      sendResponse({status:app.status});
    }
    else if (request.signal == 'change') { //change the hue data when finished change
      store_status();
    }
  }
)

function switchStatus(){
  $(leftBar).toggle();
  $(rightBar).toggle();
  if(app.status == false){
    app.status = true;
  }else{
    app.status = false;
  }
  store_status();
}

//receving the color data and change the Hue
chrome.runtime.onConnect.addListener(function(port){
  port.onMessage.addListener(function(msg){
    app.currentHue = parseInt(msg.color);
    $(leftBar).css('background-color', `rgb(${app.currentHue},${app.currentHue},${app.currentHue})`);
    $(rightBar).css('background-color', `rgb(${app.currentHue},${app.currentHue},${app.currentHue})`);
    //here we don't need to store the data synchronus, for needing to wait for the change happened
  });
})

//This function is used to store the lastest status
// $(function(){
//   chrome.storage.sync.clear(function(){
//     console.log('has remove all the data');
//   })
// });

// 3. Storing the data into storage.
function store_status(){
  chrome.storage.sync.set({[app.url]:app}, function(){
    //notify that we saved
    console.log('setting saved');
  })

  chrome.storage.sync.get(null, function(item){
    console.log(item);
  })

}
