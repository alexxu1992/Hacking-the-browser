console.log("HELLO WORLD");

//Play with a wikipedia person, like Trump or Hilary etc.

var userName = prompt(" Hi what is your name");

var pageName = document.getElementById('firstHeading').textContent.split(" ")[1];
console.log(pageName);

function getNodeText(){
  var nodes = [];
  var walker = document.createTreeWalker(document, NodeFilter.SHOW_TEXT, null, null);
  var node = walker.firstChild();
  while(node){
   parentNode = node.parentNode;
   parentTagName = parentNode.tagName;
   if (parentTagName !== "SCRIPT" && parentTagName !== "STYLE" && parentTagName !== "TITLE") {
      nodes.push(node);
    }
   node = walker.nextNode();
  }
  return nodes;
}

var textNodes = getNodeText();


textNodes.forEach(function(textNode){
  var text = textNode.textContent;
  var textHasWordHe = text.indexOf('He') !== -1;
  if(textHasWordHe){
    //textNode.style.backgroundColor = "red";
    //console.log(text);
  }

  var modifiedText = text.replace(/\bHe\s|\bShe\s/i, userName + " ");

  var replace = pageName;
  var re = new RegExp(replace,"g");
  var modifiedText2 = modifiedText.replace(re, userName);

  textNode.textContent = modifiedText2;
});
