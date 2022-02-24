document.addEventListener('load', mainFunc());

function mainFunc(){

    var preGameSection = document.querySelector('.preGameSection');
    var dificultyButton = document.querySelectorAll('.dificultyButton');
    var startButton = document.querySelectorAll('.startButton');
    var highScore = document.querySelector('.highScore span');
    var actualGame = document.querySelector('.actualGameSection');
    var pointsScored = document.querySelector('.pointsScored');
    var word = document.querySelector('.word');
    var timeLeft = document.querySelector('.timeLeft');
    var input = document.querySelector('.input');
    var afterGameSection = document.querySelector('.afterGameSection');
    var yourScore  = document.querySelector('.yourScore span');
    var backButton = document.querySelector('.backButton');

    var score = 0;
    var gameOn = false;
    var seconds = 4// default to normal
    var secondsLeft = 0;
    


    var wordArray = [
        'absolute',
        'abstract',
        'academic',
        'accepted',
        'accident',
        'accuracy',
        'accurate',
        'achieved',
        'delivery',
        'describe',
        'designer',
        'detailed',
        'diabetes',
        'dialogue',
        'diameter',
        'directly',
        'director',
        'disabled',
        'disaster',
        'disclose',
        'discount',
        'discover',
        'disorder',
        'disposal',
        'distance',
        'distinct',
        'district',
        'minister',
        'ministry',
        'minority',
        'mobility',
        'modeling',
        'moderate',
        'momentum',
        'monetary',
        'moreover',
        'pursuant',
        'quantity',
        'question',
        'rational',
        'reaction',
        'received',
        'strength',
        'striking',
        'struggle',
        'stunning',
        'suburban',
        'suitable',
        'superior',
        'supposed',
        'surgical',
        'surprise',
        'survival',
        'sweeping',
        'swimming',
        'triangle',
        'tropical',
        'turnover',
        'ultimate',
        'umbrella',
        'universe',
        'unlawful',
        'unlikely',
        'valuable',
        'variable',
        'vertical',
        'victoria',
    ];

    //only show preGameSection
    actualGame.style.display = 'none';
    afterGameSection.style.display = 'none';

    //show high score 
    highScore.innerHTML = localStorage.getItem('High Score');
    
    //change dificulty 
    dificultyButton.forEach(e => {
        e.addEventListener('click',changeDificultySelection)
    });
    function changeDificultySelection(){
        dificultyButton.forEach(f => {
            f.style.borderWidth = '1px';
        })
        this.style.borderWidth = '3px';
        if(this.id === 'easy'){
            seconds = 5;
        }else if(this.id === 'normal'){
            seconds = 4;
        }else{
            seconds = 3;
        }
    }

    //Start Game either with button or press enter.
    startButton.forEach(e => {
        e.addEventListener('click', startGame)
    })
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Enter'){
            if (!gameOn){
                startGame();
            }
        }
    })
    
    // countdown ----
    setInterval(() => {
        if(secondsLeft > 0 && gameOn){
            secondsLeft--;
        }
        timeLeft.innerHTML = secondsLeft;
    }, 1000);
    

    function startGame(){
        gameOn = true;
        score = 0;
        secondsLeft = seconds//depending on dificulty chosen
        word.innerHTML = wordArray[Math.floor(Math.random() * wordArray.length - 1)];
        input.value = '';
        pointsScored.innerHTML = score;
        //swich to actualGameSection
        preGameSection.style.display = 'none'
        afterGameSection.style.display = 'none';
        actualGame.style.display = 'block'
        input.focus();
        //show keyboard (for mobiles)
        if(input.getAttribute("inputmode") == 'none'){
            input.setAttribute("inputmode", "text");
        }
        
        //check if game is over or if points are scored.
        setInterval(checkGame, 50);

        function checkGame(){

            //check for game over
            if(secondsLeft == 0){
                gameOn = false;
                yourScore.innerHTML = score;
                //check for new high score
                if(score > localStorage.getItem('High Score')){
                    localStorage.setItem('High Score', score);
                }
                highScore.innerHTML = localStorage.getItem('High Score');
                //swich section to afterGameSection
                actualGame.style.display = 'none';
                input.setAttribute("inputmode", "none");
                afterGameSection.style.display = 'grid';
            }
            
            //check for currect word
            if(input.value.toLowerCase() == word.innerHTML && gameOn){
                secondsLeft = seconds;
                word.innerHTML = wordArray[Math.floor(Math.random() * wordArray.length - 1)];
                input.value = '';
                score++;
                pointsScored.innerHTML = score;
            }

        }// interval 50
        
        
    }//Start Game Function

    //After game section
    backButton.addEventListener('click', backToHome)
    function backToHome(){
        afterGameSection.style.display = 'none';
        preGameSection.style.display = 'grid';
        secondsLeft = seconds;
    }

}
