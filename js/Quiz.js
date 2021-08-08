class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question element
    var question = new Question()
    question.hide()
    //write code to change the background color here
    background("red")
    //write code to show a heading for showing the result of Quiz
    var title = createElement('h2')
    title.html("Quiz Results")
    title.position(0,350)

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      fill("Blue");
      textSize(25);
      text("people who answered correctly are green!!!")
    }
    //write code to add a note here

    //write code to highlight contest who answered correctly
    for(var plr in allContestants ){
      var correct = "2";
      if(correct == allContestants[plr].answer){
        fill("green")
      }
      else 
        fill("red")
    }
  }

}
