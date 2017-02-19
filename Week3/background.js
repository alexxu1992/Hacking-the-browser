console.log("this is the background script");

chrome.browserAction.onClicked.addListener(function(){
  alert('hello');
});

chrome.browserAction.setTitle({title:'HintXu'});
