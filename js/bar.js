function createExisedBar(){
  console.log(app);
  var hue = `rgb(${app.currentHue},${app.currentHue},${app.currentHue})`;

  leftBar = $("<div id = 'leftBar''></div>")
  .appendTo("body")
  .css({'width':`${app.l_width}px`, 'height':`${app.l_height}px`, 'top':`${app.l_top}px`,
  'left':`${app.l_left}px`, 'background-color':hue})
  .hide();

  rightBar = $("<div id ='rightBar''></div>")
  .appendTo("body")
  .css({'width':`${app.r_width}px`, 'height':`${app.r_height}px`, 'top':`${app.r_top}px`,
  'left':`${app.r_left}px`, 'background-color':hue})
  .hide();

  append_attribute();

}
//create these two drag bar
function creteBlankBar(){
  console.log('now create two blanky bar ');
  leftBar = $("<div id = 'leftBar'></div>")
  .appendTo("body")
  .css({'width':'100px', 'height':'300px', 'top':'0px', 'left':'0px','background-color':'gray'})
  .hide();

  rightBar = $("<div id ='rightBar'></div>")
  .appendTo("body")
  .css({'width':'100px', 'height':'300px', 'top':'0px', 'left':'400px','background-color':'gray'})
  .hide();

  append_attribute();
}


//make them draggable and resizable
function append_attribute(){
    $(leftBar).draggable();
    $(rightBar ).draggable();
    $(leftBar).resizable();
    $(rightBar).resizable();

    if(app.status == true){
      $(leftBar).show();
      $(rightBar).show();
    }

    append_event();
};

//get the position of the bars when settled down
function append_event(){
  $(leftBar).on('dragstop',function(event){
    app.l_left = $(this).offset().left;
    app.l_top = $(this).offset().top - $(document).scrollTop();
    store_status();
  })

  $(rightBar).on('dragstop',function(event){
    app.r_left = $(this).offset().left;
    app.r_top = $(this).offset().top - $(document).scrollTop();
    store_status();
  })

  //get the dimensions of the bars when adjusting
  var doit;
  $(leftBar).resize(function(event){
    app.l_width = $(this).width();
    app.l_height = $(this).height();
    clearTimeout(doit);
    doit = setTimeout(function(){
      store_status();
    },100)
  });

  $(rightBar).resize(function(event){
    app.r_width = $(this).width();
    app.r_height = $(this).height();
    clearTimeout(doit);
    doit = setTimeout(function(){
      store_status();
    },100)
  });
}

//global attribute
var app = {
  url: '',
  status: false,

  l_top:0,
  l_left:0,
  l_width:0,
  l_height:0,

  r_top:0,
  r_left:0,
  r_width:0,
  r_height:0,

  currentHue:0
}
