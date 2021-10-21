class ManagerGate{
  drawGateScene(){
    fill(255);
    textAlign(CENTER);
    textSize(40);
    text("Press the ' f ' key!", width /2 , 40);
  }
  
  gateFilter(){
    if(key === 'f'){
      img = gate;
      for(let i = 0; i < 200; i++){
        addLine();
      }
    }
  }
}
