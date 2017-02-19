$(window).on('load', init)

var app = {
  fool: null,
  foolX : 0,
  foolY : 0,
  pfoolX: 0,
  pfoolY: 0,
  mouseX: 0,
  mouseY: 0,
  pmouseX:0,
  pmouseY:0,
  mouseMove: false,
  count:0,
  dist:200
}

function init(){
  app.fool = $('#fool');
  var left = app.fool.offset().left;
  var top = app.fool.offset().top;
  app.foolX = left + (1/2) * app.fool.width();
  app.foolY = top + (1/2) * app.fool.height();
  app.pfoolX = app.foolX;
  app.pfoolY = app.foolY;
  $(document).on('mousemove', escape);
  setInterval(calSpeed, 60);
  app.fool.on('click', countadd);
}

function escape(event){
  app.mouseX = event.pageX;
  app.mouseY = event.pageY;
  app.mouseMove = true;
  app.dist = Math.sqrt(Math.pow(app.mouseX - app.foolX, 2) + Math.pow(app.mouseY - app.foolY, 2));
  //calSpeed();
}

function calSpeed(){
  if(app.mouseMove && app.dist < 300){
    //app.dist = Math.sqrt(Math.pow(app.mouseX - app.foolX, 2) + Math.pow(app.mouseY - app.foolY, 2));

    var offsetX = app.pfoolX- app.mouseX;
    var offsetY = app.pfoolY- app.mouseY;
    app.foolX = app.pfoolX + 200/offsetX;
    app.foolY = app.pfoolY + 200/offsetY;
    if(app.foolX < 30 || app.foolX > $(window).width() - 30){
      app.foolX = 500 * Math.random() + 400;
      //app.foolY = 1000 * Math.random();
      app.fool.css({top: app.foolY - 30, left: app.foolX -40});

    }
    if(app.foolY < 30 || app.foolY > $(window).height() - 30){
      app.foolY = 100 * Math.random() + 400;
      //app.foolX = 1000 * Math.random();
      app.fool.css({top: app.foolY - 30, left:app.foolX - 40});
    }

    app.fool.css({top: app.foolY - 30, left: app.foolX - 40})

    app.pfoolX = app.foolX;
    app.pfoolY = app.foolY;
  }
  if(app.mouseX == app.pmouseX && app.mouseY == app.pmouseY){
    app.mouseMove = false;
  }
  app.pmouseX = app.mouseX;
  app.pmouseY = app.mouseY;
}

function countadd(){
  app.count++;
  $('#foolNum').html(app.count);
  console.log(app.count);
}
