
//To turn on or turn off the switch
$('#switch').click(function(){
  console.log("this is pop up js");
  chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {signal:'toggle', url:tabs[0].url}, function(res){
      if(res.status == false){
        $('#switch').html('on');
      }else{
        $('#switch').html('off');
      }
    })
  });
});

//Here we sent the color hue back to the content script
var hue;
$('#colorControl').on('input', function(){
  hue = $(this).val();
  chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
    var port = chrome.tabs.connect(tabs[0].id, {name:'aboutHue'});
    port.postMessage({color:hue});
  })
});

$('#colorControl').on('change',function(){
  chrome.tabs.query({active:true, currentWindow:true},function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {signal:'change'});
  })
})
