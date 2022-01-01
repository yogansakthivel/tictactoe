import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { fas, faTimes, faRedo } from '@fortawesome/free-solid-svg-icons';
import { far, faCircle } from '@fortawesome/free-regular-svg-icons';
import { noop } from 'rxjs';
  const patterns: string[][] = [
    ['1','2','3'], 
    ['4','5','6'],
    ['7','8','9'],
    ['1','4','7'],
    ['2','5','8'],
    ['3','6','9'],
    ['1','5','9'], 
    ['3','5','7']
  ];
  const possibleMovesConst: string[][] = [
    ['2','3','4','5','7','9'],
    ['1','3','4','5','6','8'],
    ['1','2','5','6','7','9'],
    ['1','2','5','6','7','8'],
    ['1','2','3','4','6','7','8','9'],
    ['2','3','4','5','8','9'],
    ['1','3','4','5','8','9'],
    ['2','4','5','6','7','9'],
    ['1','3','5','6','7','8']
  ];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faTimes = faTimes;
  faCircle = faCircle;
  faRedo = faRedo;
  far = far;
  fas = fas;
  singlePlayerMode: boolean;
  modeSelected: boolean;
  title = 'TicTacToe';
  moveCount: number;
  free = ['1','2','3','4','5','6','7','8','9'];
  player1: string[] = [];
  player2: string[] = [];
  result: string = '';
  disabledPos: string[] = [];
  firstMove: string = 'Computer';
  possibleMoves: string [][]=[];

  constructor(private ref: ChangeDetectorRef) {
      this.moveCount = 0;
      this.singlePlayerMode = true;
      this.modeSelected = false;
      this.possibleMoves = possibleMovesConst;
  }

  findNextPossible(pos: string): string {
    let res = '';
    let index = (+pos)-1;
    let randNum = this.getRandomInt(0,this.possibleMoves[(index)].length);
    // console.log('random num: '+randNum);
    if (this.free.includes(this.possibleMoves[index][randNum])) {
      // console.log("next possible move: "+this.possibleMoves[index][randNum]);
      return this.possibleMoves[index][randNum];
    } else {
      // console.log("impossible move: "+this.possibleMoves[index][randNum]);
      return '';
    }
  }

  move(pos:string) {
    if(!this.free.includes(pos)) {
      return;
    }
    ++this.moveCount;
    if (this.singlePlayerMode) {
      if (this.moveCount % 2 == 0) {
        let index: number = this.free.findIndex((i) => { return i==pos; });
        if (index > -1) {
          this.free.splice(index,1);
          this.player2.push(pos);
        } 
        if (this.moveCount >= 5) {
          this.result = this.checkWhoWon();
          if (this.result.length > 0) {
            this.ref.detectChanges();
            this.reset();
            return;
          }
        }
        (this.firstMove == 'Computer') && this.moveCount < 9 && this.result.length <= 0 ? this.computerMove(pos) : noop;
        this.removePosFromPossibleMoves(pos);
        if (this.moveCount == 9) {
          this.result = this.checkWhoWon();
          this.result.length > 0 ? setTimeout(() => {
            this.ref.detectChanges();
            alert(this.result + ' has won!');
            this.reset();
          },200) : setTimeout(() => {
            alert('Draw!');
            this.reset();
          }, 200);
        }
      } else {
        let index: number = this.free.findIndex((i) => { return i==pos; });
        if (index > -1) {
          this.free.splice(index,1);
          this.player1.push(pos);
        }
        if (this.moveCount >= 5) {
          this.result = this.checkWhoWon();
          if (this.result.length > 0) {
            this.reset();
            return;
          }
        }
        (this.firstMove != 'Computer') && this.moveCount < 9 && this.result.length <= 0 ? this.computerMove(pos) : noop;
        this.removePosFromPossibleMoves(pos);
        if (this.moveCount == 9) {
          this.result = this.checkWhoWon();
          this.ref.detectChanges();
          this.result.length > 0 ? setTimeout(() => {
            this.reset();
          },200) : setTimeout(() => {
            this.reset();
          }, 200);
        }
      }
    } else {
      if (this.moveCount % 2 == 0) {
        let index: number = this.free.findIndex((i) => { return i==pos; });
        if (index > -1) {
          this.free.splice(index,1);
          this.player2.push(pos);
        } 
        if (this.moveCount >= 5) {
          this.result = this.checkWhoWon();
          this.ref.detectChanges();
          this.result.length > 0 ? setTimeout(() => {
            this.reset();
          },200) : noop;
        }
        this.removePosFromPossibleMoves(pos);
        if (this.moveCount == 9) {
          this.result = this.checkWhoWon();
          this.result.length > 0 ? setTimeout(() => {
            this.reset();
          },200) : setTimeout(() => {
            this.reset();
          }, 200);
        }
      } else {
        let index: number = this.free.findIndex((i) => { return i==pos; });
        if (index > -1) {
          this.free.splice(index,1);
          this.player1.push(pos);
        } 
        if (this.moveCount >= 5) {
          this.result = this.checkWhoWon();
          this.result.length > 0 ? setTimeout(() => {
            alert(this.result + ' has won!');
            this.reset();
          },200) : noop;
        }
        this.removePosFromPossibleMoves(pos);
        if (this.moveCount == 9) {
          this.result = this.checkWhoWon();
          this.result.length > 0 ? setTimeout(() => {
            this.reset();
          },200) : setTimeout(() => {
            this.reset();
          }, 200);
        }
      }
    }
  }

  removePosFromPossibleMoves(pos:string) {
    for(let x in this.possibleMoves) {
      let index = this.possibleMoves[x].findIndex((i) => {
        return i === pos;
      });
      if (index > -1) {
        this.possibleMoves[x].splice(index,1);
      }
    }
  }

  computerMove(pos:string) {
    // console.log("findnextpossible: "+pos);
    let nextMovePos = this.findNextPossible(pos);
    if (nextMovePos.length > 0){
      // console.log("Found next possible move: "+nextMovePos);
      this.move(nextMovePos);
    } else {
      this.computerMove(pos);
    }
  }

  checkWhoWon(): string {
    if (this.isPlayer1Won()) {
      if (this.singlePlayerMode && this.firstMove == 'Computer') {
        return 'Computer';
      } else if (this.singlePlayerMode) {
        return 'Player';
      } else {
        return 'Player1';
      }
    } else if (this.isPlayer2Won()) {
      if (this.singlePlayerMode && this.firstMove == 'Computer') {
        return 'Player';
      } else if (this.singlePlayerMode) {
        return 'Computer';
      } else {
        return 'Player2';
      }
    } else {
      return '';
    }
  }

  isPlayer1Won(): boolean {
    let count;
    for(let x of patterns) {
      count = 0;
      for(let y of x) {
         this.player1.includes(y) ? ++count : noop;
      }
      if (count == 3) {
        return true;
      } else {
        continue;
      }
    }
    return count == 3;
  }

  isPlayer2Won(): boolean {
    let count;
    for(let x of patterns) {
      count = 0;
      for(let y of x) {
         this.player2.includes(y) ? ++count : noop;
      }
      if (count == 3) {
        return true;
      } else {
        continue;
      }
    }
    return count == 3;
  }

  player1has(pos:string): boolean {
    return this.player1.includes(pos);
  }

  player2has(pos:string): boolean {
    return this.player2.includes(pos);
  }

  start() {
    this.modeSelected = true;
    if(this.singlePlayerMode) {
      let num = this.getRandomInt(0,2);
      this.firstMove = num ? 'Computer' : 'Player';
      this.firstMove == 'Computer' ? this.move(this.getRandomInt(1,10)+'') : noop;
    }
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  }

  reset() {
    setTimeout( () => {
      this.result.length > 0 ? alert(this.result + " has Won!") : alert("Draw!");
      window.location.reload();
    }, 200);
  }
}
