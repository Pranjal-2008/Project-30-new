class Game {
    constructor (){

    }
  getState(){
      database.ref ('gameState').on("value",(data)=>{
          gameState = data.val();
      })

  }
  updateState (state){
    database.ref ('gameState').update({
        gameState : state,
    })
  }
  async start(){
    if (gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }
    car1 = createSprite(100,200);
    car1.addImage(C1);
    car2 = createSprite(300,200);
    car2.addImage(C2);
    car3 = createSprite(500,200);
    car3.addImage(C3);
    car4 = createSprite(700,200);
    car4.addImage(C4);
    cars = [car1, car2, car3, car4];
    passFinish = false;
  }
  play(){
    form.hide();
    Player.getPlayerInfo();
    player.getFinishedPlayers();

    if (allPlayers != undefined){
      background(ground);
      image (track,0,-displayHeight * 4,displayWidth,displayHeight * 5);

      var index = 0;
      var x = 200;
      var y;

      for(var plr in allPlayers){
        index = index+1;
        x = x+200;
        y = displayHeight - allPlayers[plr].distance;
        cars[index - 1].x = x;
        cars[index - 1].y = y;

        if (index === player.index){
          fill("red");
          ellipse(x,y,60,60);
          textSize(15);
          stroke(255);
          text("YOU",x,y+60);
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
      }
    }
    if (keyIsDown(UP_ARROW)&& player.index!=null && passFinish === false){
      player.distance = player.distance + 15;
      player.update();
      console.log(player.distance);
    }
    if (player.distance>3000 && passFinish === false){
      Player.updateFinishedPlayers();
      player.rank = finishedPlayers;
      player.update();
      passFinish = true;
    }
    drawSprites();
  }
  displayRank(){
    camera.position.x = 0;
    camera.position.y = 0;
    Player.getPlayerInfo();
    textAlign(CENTER);
    textSize(40);

    for (var plr in allPlayers){
      if (allPlayers[plr].rank === 1){
        text("FIRST "+ allPlayers[plr].name,0,85);
      }
      else if (allPlayers[plr].rank === 2){
        text("SECOND "+ allPlayers[plr].name,0,185);
      }
      else if (allPlayers[plr].rank === 3){
        text("THIRD "+ allPlayers[plr].name,0,285);
      }
      else {
        text("FOURTH "+ allPlayers[plr].name,0,385);
      }
    }
  }
}