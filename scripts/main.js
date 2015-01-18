var Game = (function(){
  var _game = {}
    , _gameSize = 4
    , _state = []
    , _time = 0
    , _timer;


  //Check if the game is completed or not
  var _checkGameState = function(){

    for(i=0;i<(_gameSize*_gameSize)-1;i++){
      if(_state[i] != i+1){
        //Game is not completed
        return false;
      };
    }

    alert("Congratulations. You completed game in " + _time + " seconds");

    //Clear Timer
    clearInterval(_timer);

    //Game is Complete
    return true;
  };

  //Render Grid as per the state of the Game
  var _drawGrid = function(){
    var table = document.getElementById("numberGrid");

    //Clearing Previous Grid
    table.innerHTML = "";

    for(i=0;i<_gameSize;i++){
      var row = document.createElement("tr");
      for(j=0;j<_gameSize;j++){
        var cell = document.createElement("td");

        cell.setAttribute("data-row", i+1);
        cell.setAttribute("data-column", j+1);
        cell.innerHTML = _state[i*_gameSize + j];

        cell.addEventListener('click', _moveElement);

        row.appendChild(cell);

      }
      table.appendChild(row);
    }

    //Check the status of game if it is completed
    _checkGameState();
  }

  //Move the element if it is possible
  var _moveElement = function(obj){
    var targetObject = obj.target;

    var row = Number(this.getAttribute("data-row"));
    var column = Number(this.getAttribute("data-column"));

    if(column > 0 && _state[(row-1) * _gameSize  + (column-1 -1)] == ""){
      //Swap Left
      _swap((row-1) * _gameSize  + (column-1-1),
      (row-1) * _gameSize  + (column-1));
    } else if(column < _gameSize && _state[(row-1) * _gameSize  + (column-1 +1)] == ""){
      //Swap Right
      _swap((row-1) * _gameSize  + (column-1+1), (row-1) * _gameSize  + (column-1));
    } else if(row > 0 && _state[(row-1-1) * _gameSize  + (column-1)] == ""){
      //Swap Top
      _swap((row-1-1) * _gameSize  + (column-1), (row-1) * _gameSize  + (column-1));
    } else if(row < _gameSize && _state[(row-1+1) * _gameSize  + (column-1)] == ""){
      //Swap Bottom
      _swap((row-1+1) * _gameSize  + (column-1), (row-1) * _gameSize  + (column-1));
    } else {
      //No Swap Possible
    }

    //Update State and redraw the Grid;
    _drawGrid();
  };

  //Swap two cells in the Grid
  var _swap = function(i, j){
    var temp = _state[i];
    _state[i] = _state[j];
    _state[j] = temp;
  }

  //Create a new game based on difficulty level selected
  var _createGame = function(gameSize){

    //Clear Previous timer if any
    if(_timer){
      clearInterval(_timer);
    }
    
    _gameSize = gameSize;

    //Create a blank game board
    for(i=0;i<(_gameSize*_gameSize)-1;i++){
      _state[i] = i+1;
    }
    _state[i] = "";


    //Comment this to test completion of game
    //Randomise the game board
    for(i=0;i<(_gameSize*_gameSize);i++){
    	randomIndex1 = Number.parseInt((Math.random() * 12345) % (_gameSize *_gameSize));
      randomIndex2 = Number.parseInt((Math.random() * 12345) % (_gameSize *_gameSize));
    	_swap(randomIndex1, randomIndex2);
    }


    _drawGrid();

    //Start the timer
    _time = 0;
    _timer = setInterval(function(){
      _time++;
      document.getElementById("gameTimer").innerHTML = _time;
    }, 1000);

  };
  _game.CreateGame = _createGame;

  return _game;
})();
