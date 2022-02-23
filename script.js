document.addEventListener('load', mainFunc());

function mainFunc(){

    var timeLeft = document.querySelector('#timeLeft');
    var word = document.querySelector('#word');
    var input = document.querySelector('#input');
    var scoreCounter = document.querySelector('#pointsScored');
    var startButton = document.querySelectorAll('.startButton');
    var highScore = document.querySelector('#highScore span');
    var dificultyButton = document.querySelectorAll('.dificultyButton');
    var preGameSection = document.querySelector('#preGameSection');
    var actualGame = document.querySelector('#actualGame');
    var afterGameSection = document.querySelector('#afterGameSection');
    var pointsScored = document.querySelector('#pointsScored')
    var homeButton = document.querySelector('.homeButton');
    var yourScore  = document.querySelector('#yourScore span');
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

    actualGame.style.display = 'none';
    afterGameSection.style.display = 'none';
    
    //for testing => 
    //preGameSection.style.display = 'none';

    //show score and high score ---
    scoreCounter.innerHTML = score;
    highScore.innerHTML = localStorage.getItem('High Score');
    

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

    //Starting Game ------
    startButton.forEach(e => {
        e.addEventListener('click', makeSureGameNotOn)
    })
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Enter'){
            makeSureGameNotOn();
        }
    })

    function makeSureGameNotOn(){
        if (!gameOn){
            startGame();
        }
    }
    

    // countdown ----
    setInterval(() => {
        if(secondsLeft > 0 && gameOn){
            secondsLeft--;
        }
        timeLeft.innerHTML = secondsLeft;
    }, 1000);
    

    function startGame(){
        gameOn = true;
        preGameSection.style.display = 'none'
        afterGameSection.style.display = 'none';
        actualGame.style.display = 'block'
        input.inputmode("text");
        input.focus();
        secondsLeft = seconds//depending on dificulty chosen
        word.innerHTML = wordArray[Math.floor(Math.random() * wordArray.length - 1)];
        word.style.visibility = 'visible';
        score = 0;
        input.value = '';
    
        
        //check if game is over ------
        setInterval(checkGame, 50);
        function checkGame(){
            
            //check for game over
            if(secondsLeft == 0){
                gameOn = false;

                pointsScored.innerHTML = score;
                //check high score ----
                if(score > localStorage.getItem('High Score')){
                    localStorage.setItem('High Score', score)
                }
                highScore.innerHTML = localStorage.getItem('High Score')

                actualGame.style.display = 'none';
                input.setAttribute("inputmode", "none")
                afterGameSection.style.display = 'grid';
            }
            
            
            //check for currect word
            
            if(input.value.toLowerCase() == word.innerHTML && gameOn){
                secondsLeft = seconds;
                word.innerHTML = wordArray[Math.floor(Math.random() * wordArray.length - 1)];
                input.value = '';
                score++;
            }
            scoreCounter.innerHTML = score;
            yourScore.innerHTML = score;


            //After game section
            homeButton.addEventListener('click', backToHome)
            function backToHome(){
                afterGameSection.style.display = 'none';
                preGameSection.style.display = 'grid';
                secondsLeft = seconds;
            }
            
        }

    }//Start Game Function
    

}
