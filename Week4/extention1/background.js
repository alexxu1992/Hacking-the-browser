console.log("for a better facebook interface");

var imgGroup = ['chuanjing.jpg','liangzi.jpg','masheng.jpg','neitian.jpg','guchuan.jpg'];

function callback(details){
  console.log(details);
  var ranNum = Math.floor(5*Math.random());
  console.log(ranNum);
  var imgName = imgGroup[ranNum];
  var replacement = chrome.extension.getURL(imgName);
  return {redirectUrl: replacement};
}

var filter ={
  urls: ['<all_urls>'],   //  <-- only run for facebook urls
  types: [ 'sub_frame' ]           //  <-- only for img requests in the main frame
}

var extraInfo = ['blocking'];

chrome.webRequest.onBeforeRequest.addListener(callback,filter,extraInfo);
