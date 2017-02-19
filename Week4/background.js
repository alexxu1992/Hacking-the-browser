console.log("this is the background script");

function callback(details){
  var method = details.method;
  var type = details.type;
  var url = details.url;

  console.log(method, type, url);

  if (details.url.indexOf('http:') !== -1) {
    return { cancel: true };
  }
}

var filter = {
  urls: ['<all_urls>']
};

var extraInfo = ['blocking'];

chrome.webRequest.onBeforeRequest.addListener(
  callback, filter, extraInfo);

chrome.browserAction.setTitle({title:'HintXu'});
