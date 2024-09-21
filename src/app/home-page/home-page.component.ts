import { Component, OnInit } from '@angular/core';
import { PredictionEvent } from '../prediction-event';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  gesture: String = "";
  xpos: number = 0;
  ypos: number = 0;
  /*
  minX: Number = 100; --> 20
  maxX: Number = 0;   --> 580
  minY: Number = 100; --> 10
  maxY: Number = 0;   --> 430
  */
  board: string[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  played: Boolean[][] = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
  ];
  currI: number = 0;
  currJ: number = 0;
  state: number = 1;
  winner: string = "???";
  p1score: number = 0;
  p2score: number = 0;
  styleText: string[][] = [
    ["white", "white", "white"],
    ["white", "white", "white"],
    ["white", "white", "white"]
  ];
  styleBorder: string[][] = [
    ["blue", "blue", "blue"],
    ["blue", "blue", "blue"],
    ["blue", "blue", "blue"]
  ];
  gameStart: Boolean = false;
  timer: number = 0;
  nIntervIdTimer: any;
  timerOn: Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  //gets gesture prediction from handtracker and uses it to perform relevant action
  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
    this.xpos = event.getXPos();
    this.ypos = event.getYPos();

    /*
    if (this.xpos < this.minX) {
      this.minX = this.xpos;
    }
    if (this.xpos > this.maxX) {
      this.maxX = this.xpos;
    }
    if (this.ypos < this.minY) {
      this.minY = this.ypos;
    }
    if (this.ypos > this.maxY) {
      this.maxY = this.ypos;
    }
    */

    if (!this.gameStart) {
      if (this.gesture == "Two Open Hands") {
        this.gameStart = true;
        this.startTimer();
      }
    }
    else {
      if ( (this.gesture == "Closed Hand") || (this.gesture == "Hand Pinching") ) {
        this.changeBox();
      }
      else if (this.gesture == "Open Hand") {
        this.playTurn();
      }
      else if (this.gesture == "Two Hands Pointing") {
        this.resetBoard();
      }
      else if (this.gesture == "Two Closed Hands") {
        this.resetGame();
      }
      else if (this.gesture == "One Open Hand & One Closed Hand") {
        this.pauseTimer();
      }
      else if (this.gesture == "One Hand Pointing & One Closed Hand") {
        this.resumeTimer();
      }
    }
  }

  //starts timer at the start of a player's turn
  startTimer() {
    this.timer = 10;
    this.nIntervIdTimer = setInterval(() => this.updateTimer(), 1000);
    this.timerOn = true;
  }

  //updates timer every second and switches player turn if timer ran out
  updateTimer() {
    if (this.timerOn) {
      if (this.timer <= 0) {
        if (this.state == 1) {
          this.state = 2;
        }
        else {
          this.state = 1;
        }
        this.pauseTimer();
        this.startTimer();
      }
      else {
        this.timer -= 1;
      }
    }
  }

  //pauses timer when one open and one closed hand detected
  pauseTimer() {
    if (this.timerOn) {
      clearInterval(this.nIntervIdTimer);
      this.nIntervIdTimer = null;
      this.timerOn = false;
    }
  }

  //resumes timer when one pointing and one closed hand detected
  resumeTimer() {
    if (!this.timerOn) {
      this.nIntervIdTimer = setInterval(() => this.updateTimer(), 1000);
      this.timerOn = true;
    }
  }

  //changes current position on board, called when closed/pinching hand movement is detected
  changeBox() {
    if (this.ypos <= 120) {
      if (this.xpos <= 180) {
        this.setCurrIJ(0, 0);
      }
      else if (this.xpos <= 360) {
        this.setCurrIJ(0, 1);
      }
      else {
        this.setCurrIJ(0, 2);
      }
    }
    else if (this.ypos <= 240) {
      if (this.xpos <= 180) {
        this.setCurrIJ(1, 0);
      }
      else if (this.xpos <= 360) {
        this.setCurrIJ(1, 1);
      }
      else {
        this.setCurrIJ(1, 2);
      }
    }
    else {
      if (this.xpos <= 180) {
        this.setCurrIJ(2, 0);
      }
      else if (this.xpos <= 360) {
        this.setCurrIJ(2, 1);
      }
      else {
        this.setCurrIJ(2, 2);
      }
    }
    this.resetCurr();
  }

  //sets current I and J on board
  setCurrIJ(i: number, j: number) {
    this.currI = i;
    this.currJ = j;
  }

  //changes color of border to red and green for the active box and resets rest
  resetCurr() {
    this.styleBorder = [ ["blue","blue","blue"], ["blue","blue","blue"], ["blue","blue","blue"] ];
    if (this.state == 1) {
      this.styleBorder[this.currI][this.currJ] = "red";
    }
    else {
      this.styleBorder[this.currI][this.currJ] = "green";
    } 
  }

  //plays turn when open hand detected
  playTurn() {
    if (!this.played[this.currI][this.currJ]) {
      if (this.state == 1) {
        this.board[this.currI][this.currJ] = "X";
        this.styleText[this.currI][this.currJ] = "#FF8D68";
        this.state = 2;
      }
      else {
        this.board[this.currI][this.currJ] = "O";
        this.styleText[this.currI][this.currJ] = "#8DBD61"; //#ED6146 //#FF662A //#8DC6BF //#7FB3EE //#9AE1E2
        this.state = 1;
      }
      this.played[this.currI][this.currJ] = true;
      //check if board is full then stop timer
      if (this.boardFull()) {
        this.pauseTimer();
        this.checkWin();
      }
      else {
        this.pauseTimer();
        this.startTimer();
        this.checkWin();
      }
    }
  }

  boardFull(): Boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!this.played[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  //checks if a player has won after every turn
  checkWin() {
    //row 1
    if ( (this.board[0][0] == this.board[0][1]) && (this.board[0][1] == this.board[0][2]) && (this.board[0][0] == "X") ) {
      this.pWin(1, "row 1");
      this.colorBorder([0,0] , [0,1] , [0,2]);
    }
    else if ( (this.board[0][0] == this.board[0][1]) && (this.board[0][1] == this.board[0][2]) && (this.board[0][0] == "O") ) {
      this.pWin(2, "row 1");
      this.colorBorder([0,0] , [0,1] , [0,2]);
    }
    
    //row 2
    else if ( (this.board[1][0] == this.board[1][1]) && (this.board[1][1] == this.board[1][2]) && (this.board[1][0] == "X") ) {
      this.pWin(1, "row 2");
      this.colorBorder([1,0] , [1,1] , [1,2]);
    }
    else if ( (this.board[1][0] == this.board[1][1]) && (this.board[1][1] == this.board[1][2]) && (this.board[1][0] == "O") ) {
      this.pWin(2, "row 2");
      this.colorBorder([1,0] , [1,1] , [1,2]);
    }

    //row 3
    else if ( (this.board[2][0] == this.board[2][1]) && (this.board[2][1] == this.board[2][2]) && (this.board[2][0] == "X") ) {
      this.pWin(1, "row 3");
      this.colorBorder([2,0] , [2,1] , [2,2]);
    }
    else if ( (this.board[2][0] == this.board[2][1]) && (this.board[2][1] == this.board[2][2]) && (this.board[2][0] == "O") ) {
      this.pWin(2, "row 3");
      this.colorBorder([2,0] , [2,1] , [2,2]);
    }

    //column 1
    else if ( (this.board[0][0] == this.board[1][0]) && (this.board[1][0] == this.board[2][0]) && (this.board[0][0] == "X") ) {
      this.pWin(1, "column 1");
      this.colorBorder([0,0] , [1,0] , [2,0]);
    }
    else if ( (this.board[0][0] == this.board[1][0]) && (this.board[1][0] == this.board[2][0]) && (this.board[0][0] == "O") ) {
      this.pWin(2, "column 1");
      this.colorBorder([0,0] , [1,0] , [2,0]);
    }

    //column 2
    else if ( (this.board[0][1] == this.board[1][1]) && (this.board[1][1] == this.board[2][1]) && (this.board[0][1] == "X") ) {
      this.pWin(1, "column 2");
      this.colorBorder([0,1] , [1,1] , [2,1]);
    }
    else if ( (this.board[0][1] == this.board[1][1]) && (this.board[1][1] == this.board[2][1]) && (this.board[0][1] == "O") ) {
      this.pWin(2, "column 2");
      this.colorBorder([0,1] , [1,1] , [2,1]);
    }

    //column 3
    else if ( (this.board[0][2] == this.board[1][2]) && (this.board[1][2] == this.board[2][2]) && (this.board[0][2] == "X") ) {
      this.pWin(1, "column 3");
      this.colorBorder([0,2] , [1,2] , [2,2]);
    }
    else if ( (this.board[0][2] == this.board[1][2]) && (this.board[1][2] == this.board[2][2]) && (this.board[0][2] == "O") ) {
      this.pWin(2, "column 3");
      this.colorBorder([0,2] , [1,2] , [2,2]);
    }

    //diagonal 1
    else if ( (this.board[0][0] == this.board[1][1]) && (this.board[1][1] == this.board[2][2]) && (this.board[0][0] == "X") ) {
      this.pWin(1, "diagonal 1");
      this.colorBorder([0,0] , [1,1] , [2,2]);
    }
    else if ( (this.board[0][0] == this.board[1][1]) && (this.board[1][1] == this.board[2][2]) && (this.board[0][0] == "O") ) {
      this.pWin(2, "diagonal 1");
      this.colorBorder([0,0] , [1,1] , [2,2]);
    }

    //diagonal 2
    else if ( (this.board[0][2] == this.board[1][1]) && (this.board[1][1] == this.board[2][0]) && (this.board[0][2] == "X") ) {
      this.pWin(1, "diagonal 2");
      this.colorBorder([0,2] , [1,1] , [2,0]);
    }
    else if ( (this.board[0][2] == this.board[1][1]) && (this.board[1][1] == this.board[2][0]) && (this.board[0][2] == "O") ) {
      this.pWin(2, "diagonal 2");
      this.colorBorder([0,2] , [1,1] , [2,0]);
    }
  }

  //changes variables when a player wins a round
  pWin(player: number, pattern: string) {
    this.winner = `Player ${player} by ${pattern}`;
    if (player == 1) {
      this.p1score += 1;
    }
    else {
      this.p2score += 1;
    }
    this.played = [ [true,true,true], [true,true,true], [true,true,true] ];
    this.pauseTimer();
  }

  //changes color of borders to yellow for the winning boxes
  colorBorder(box1: number[], box2: number[], box3: number[]) {
    this.styleBorder[box1[0]][box1[1]] = "yellow";
    this.styleBorder[box2[0]][box2[1]] = "yellow";
    this.styleBorder[box3[0]][box3[1]] = "yellow";
  }

  //resets board when two pointing hands detected
  resetBoard() {
    this.board = [ ["","",""], ["","",""], ["","",""] ];
    this.played = [ [false,false,false], [false,false,false], [false,false,false] ];
    this.state = 1;
    this.winner = "???";
    this.setCurrIJ(0, 0);
    this.resetCurr();
    this.styleText = [ ["white","white","white"], ["white","white","white"], ["white","white","white"] ];
    this.styleBorder = [ ["blue","blue","blue"], ["blue","blue","blue"], ["blue","blue","blue"] ];
    this.pauseTimer();
    this.startTimer();
  }

  //resets game when two closed hands detected
  resetGame() {
    this.resetBoard();
    this.p1score = 0;
    this.p2score = 0;
    this.pauseTimer();
    this.startTimer();
  }

}
