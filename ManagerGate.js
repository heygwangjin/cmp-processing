/* Class that applies GateFilter */

class ManagerGate{
  drawGateScene(){
    fill(255);
    textAlign(CENTER);
    textSize(40);
    text("Press the ' f ' key!", width / 2, 40);
  }
  
  gateFilter(){
    if(key === 'f'){
      img = gate;
      /* The speed at which the line fills */
      for(let i = 0; i < 400; i++){
        addLine();
      }
    }
  }
}
