//Initially accept the query asking for the url then response the url
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse){
  if(message == 'askURL'){
    var currentURL;
    chrome.tabs.query({active: true, currentWindow:true}, function(tabs){
      var tempurl = tabs[0].url.split('/');
      currentURL = tempurl[2];
      sendResponse({url:currentURL});
    })

  }
  return true; //Message Passing problem, this is tricky, it can't send things back without this condition
 })

 //Adding the shortcut Command + Shift + P
 chrome.commands.getAll(function(commands){
   console.log(commands);
 });

 chrome.commands.onCommand.addListener(function(command){
   // Sending toggle signal to content.js
   chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
     chrome.tabs.sendMessage(tabs[0].id, {signal:'toggle', url:tabs[0].url}, function(res){
       if(res.status == false){
         console.log('at least we receive something');
         //$('#switch').html('on');
       }else{
         //$('#switch').html('off');
       }
     })
   });


 })
