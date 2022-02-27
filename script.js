document.addEventListener('load', mainFunc());

function mainFunc(){

    var preGameSection = document.querySelector('.preGameSection');
    var dificultyButton = document.querySelectorAll('.dificultyButton');
    var startButton = document.querySelectorAll('.startButton');
    var highScore = document.querySelector('.highScore span');
    var actualGame = document.querySelector('.actualGameSection');
    var pointsScored = document.querySelector('.pointsScored');
    var word = document.querySelector('.word');
    var timeBarArray = document.querySelectorAll('.timeBarArray')
    var input = document.querySelector('.input');
    var afterGameSection = document.querySelector('.afterGameSection');
    var yourScore  = document.querySelector('.yourScore span');
    var backButton = document.querySelector('.backButton');
    var wordArrayEasy = [
        'able',
        'acid',
        'aged',
        'also',
        'area',
        'army',
        'away',
        'baby',
        'back',
        'ball',
        'band',    
        'bank',    
        'base',
        'bath',
        'bear',
        'call',
        'calm',
        'came',
        'camp',
        'card',
        'care',
        'case',
        'cash',
        'dark',
        'data',
        'date',
        'dawn',
        'earn',
        'ease',
        'east',
        'easy',
        'face',
        'fact',
        'fail',
        'fair',
        'fall',
        'gave',
        'gear',
        'gene',
        'gift',
        'hair',
        'half',
        'hall',
        'hand',
        'hang',
        'idea',
        'inch',
        'into',
        'iron',
        'jack',
        'jane',
        'jean',
        'keep',
        'kent',
        'kept',
        'lane',
        'last',
        'late',
        'lead',
        'left',
        'mail',
        'main',
        'make',
        'male',
        'neck',
        'need',
        'news',
        'palm',
        'park',
        'rail',
        'rain',
        'rank',
        'side',
        'sign',
        'site',
    ]
    var wordArrayNormal = [
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
    var wordArrayHard = [
        'susceptible',
        'proselytize',
        'expectorate',
        'fluctuation',
        'prestigious',
        'symmetrical',
        'precalculus',
        'sponsorship',
        'stockbroker',
        'resuscitate',
        'chocolatier',
        'directional',
        'indirection',
        'particulate',
        'conditioner',
        'reanimation',
        'affirmation',
        'affirmative',
        'venturesome',
        'advancement',
        'accompanist',
        'abandonment',
        'thermometry',
        'examination',
        'aspergillum',
        'teaspoonful',
        'insinuation',
        'antinuclear',
        'impeachment',
        'peacekeeper',
        'doublethink',
        'doublespeak',
        'thenceforth',
        'kitchenette',
        'inauthentic',
        'calisthenic',
        'earthenware',
        'hyphenation',
        'stegosaurus',
        'negotiation',
        'egomaniacal',
        'egotistical',
        'conurbation',
        'wheelbarrow',
        'chowderhead',
        'witenagemot',
        'verisimilar',
        'cytogenesis',
        'incongruity',
        'incongruous',
        'eschatology',
        'pastoralism',
        'culmination',
        'disorganize',
        'benediction',
        'malediction',
        'concomitant',
        'commemorate',
        'survivalist',
        'survivalism',
        'clairvoyant',
        'esotericism',
        'impulsivity',
        'concatenate',
        'acclimatize',
        'abolishment',
        'quadrupedal',
        'eucharistic',
        'impeachable',
        'melancholia',
        'rediscovery',
        'expectation',
        'incredulous',
        'kinesthetic',
        'kinesthesia',
        'corporality',
        'physicality',
        'contingency',
        'recognition',
        'penetration',
        'consolation',
        'procreative',
        'infertility',
        'ejaculation',
        'wherewithal',
        'subsistence',
        'procreation',
    ]
    var arrayOfLevelChosen = wordArrayNormal;//default to normal
    var score = 0;
    var gameOn = false;
    var barNum;
    

    
    actualGame.style.display = 'none';
    afterGameSection.style.display = 'none';
    //preGameSection.style.display = 'none'

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
        if(this.id === 'easyButton'){
            arrayOfLevelChosen = wordArrayEasy;
        }else if(this.id === 'normalButton'){
            arrayOfLevelChosen = wordArrayNormal;
        }else{
            arrayOfLevelChosen = wordArrayHard;
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
    
    // countdown time bar----
    setInterval(() => {
        if(barNum > -1 && gameOn){
            timeBarArray[barNum].style.display = "none";
            barNum--;
        }else if (barNum == -1){
            barNum--
        }
    }, 500);
    
    function startGame(){
        gameOn = true;
        score = 0;
        word.innerHTML = arrayOfLevelChosen[Math.floor(Math.random() * arrayOfLevelChosen.length - 1)];
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
        barNum = 8;
        //check if game is over or if points are scored.
        setInterval(checkGame, 50);

        function checkGame(){

            //check for game over
            if(barNum == -2 && gameOn){
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
                timeBarArray.forEach(e => e.style.display = "block")
            }
            
            //check for currect word
            if(input.value.toLowerCase() == word.innerHTML && gameOn){
                barNum = 8
                word.innerHTML = arrayOfLevelChosen[Math.floor(Math.random() * arrayOfLevelChosen.length - 1)];
                input.value = '';
                score++;
                pointsScored.innerHTML = score;
                timeBarArray.forEach(e => e.style.display = "block")
            }

        }// interval 50
        
        
    }//Start Game Function

    //After game section
    backButton.addEventListener('click', backToHome)
    function backToHome(){
        afterGameSection.style.display = 'none';
        preGameSection.style.display = 'grid';
    }

}
