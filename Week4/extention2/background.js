console.log("welcome to the background");

chrome.commands.getAll(function(commands){
  console.log(commands);
});

chrome.commands.onCommand.addListener(function(command){
  // Getting a list of tabs of the current window.
  chrome.windows.getLastFocused(
   {populate: true},
   function (window)
   {
    var foundSelected = false;
    for (var i = 0; i < window.tabs.length; i++)
    {
     // Finding the selected tab.
     if (window.tabs[i].active)
     {
      foundSelected = true;
     }
     // Finding the next tab.
     if (foundSelected)
     {
       var currentPageIndex = i;
       console.log("current tab id =  " + currentPageIndex);
      // Selecting the ex tab.
      if(currentPageIndex == 0){
        console.log("time to jump");
        chrome.tabs.update(window.tabs[window.tabs.length-1].id,{active:true})
      }else{
        console.log("switch back");
      chrome.tabs.update(window.tabs[currentPageIndex-1].id, {active: true});
      }
      return;
     }
    }
   });
})
