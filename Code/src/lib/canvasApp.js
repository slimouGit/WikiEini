/**
Script definiert Canvas und alle Funktionen darauf
**/

//--------------------------------------------------------------------------------------------
    
    window.addEventListener("load", init, false);

    //---------------------------------------------------------------------------------

    function init(){
        
        //anhand des Wertes in currentView wird die Animation ausgegeben
        //entweder befindet man sich auf der Startseite oder bei der Ergebnisabfrage
        //gesetzt wird die Variable im jeweiligen Controller in wikiApp.js
        canvasApp(currentView);
        
        //---------------------------------------------------------------------------------
        
        //beim Scrollen wird scrollFunction aufgerufen
        window.addEventListener('scroll', function() {/*console.log("scolling in init()");*/scrollFunction();});
        
        //---------------------------------------------------------------------------------
        
        /**
         * sobald auf den "to top"-Pfeil gedrueckt wird, wird die Animation fuer 1 Sekunde unterbunden
         */ 
         var arrowToScroll = document.getElementById("return-to-top").onclick = function() {
             aniRuns=false;
             setTimeout(function(){aniRuns=true},1000);
         };
    };//ENDE init

    //--------------------------------------------------------------------------------------------
    
    
    
    //--------------------------------------------------------------------------------------------
    function canvasApp(animationEini) {
        
            //Canvas
            if (!document.createElement('canvas').getContext) {
                return;
            }
            var theCanvas = document.getElementById('canvas');
            var context = theCanvas.getContext('2d');
            //--------------------------------------------------------------------------------------------
            
            //Bilder vorladen
            var imageSources = [
                                'img/Sprites/einiStartSprite.png',
                                'img/Sprites/einiSearchSprite.png',
                                'img/Sprites/einiSuccessSprite.png',
                                'img/Sprites/einiExploseSprite.png',
                                'img/Sprites/einiBoringSprite.png',
                                'img/Sprites/einiInpatientSprite.png',
                                'img/Sprites/einiAngrySprite.png',
                                'img/Sprites/einiStartPointAgainSprite.png',
                                'img/Sprites/einiIntroduceSprite.png',
                                'img/Sprites/einiSleepingSprite.png',
                                'img/Sprites/einiSnoringSprite.png',
                                'img/Sprites/einiLookingSprite.png',
                                'img/Sprites/einiWakesUpSprite.png',
                                'img/Sprites/einiResetsSprite.png',
                                'img/Sprites/einiLeavingSprite.png',
                                'img/Sprites/einiArivingSprite.png'
                            ];
            
            var images = new Array();
            
            if(preloaded==true){
                
                setPreloader();
                preloaded=false; //Preloader wird nur einmal durchlaufen
            
                //Ladevorgang mit erstem Bild initialisieren
                loadImage(0);
                
                function loadImage(id) {
                    images[id] = new Image();
                    images[id].addEventListener('load', onImageLoaded);
                    images[id].src = imageSources[id];
                }
                
                function onImageLoaded(e) {
                    //console.log("onImageLoaded with ID: " + (images.length - 1));
    
                    if (images.length < imageSources.length) {
                        loadImage(images.length);
                    } else {
                        onPreloadComplete();
                    }
                }
            
                //Preloader Animation
                function removePreloader() {
                    //console.log("Preloader removed");
                    var preloader = document.getElementById('preloader');
                    preloader.parentNode.removeChild(preloader);
                }
                
                function setPreloader() {
                    //console.log("Preloader");
                    var preloader = new Sonic({
                    width: 50,
                    height: 50,
                    padding: 50,

                    strokeColor: '#636363',

                    pointDistance: .01,
                    stepsPerFrame: 3,
                    trailLength: .7,

                    step: 'fader',

                    setup: function () {
                        this._.lineWidth = 5;
                    },

                    path: [
                        ['arc', 25, 25, 25, 0, 360]
                    ]
                    });

                    document.getElementById('preloader').appendChild(preloader.canvas);

                    preloader.play();
                
                }//ENDE setPreloader()
                
                function onPreloadComplete() {
                    //console.log("onPreloadComplete");
                    removePreloader();
                    document.getElementById("canvas").style.display = "block";
                    
                }//ENDE onPreloadComplete()
                
            }//ENDE if(preloaded==true)
            
            //--------------------------------------------------------------------------------------------
            
            //je nach Wert in animationEini Aufruf von Funktion
            switch(animationEini){
                case 0:
                    startEini();//animateEini("einiStartSprite", 51);
                    break;
                case 1:
                    searchEini();//animateEini("einiSearchSprite", 21);
                    break;
                case 2:
                    succesfulEini();//animateEini("einiSuccessSprite", 43);
                    break;
                case 3:
                    explodingEini();//animateEini("einiExploseSprite", 64);
                    break;
                case 4:
                    boredEini();//animateEini("einiBoringSprite", 20);
                    break;
                case 5:
                    inpatientEini();//animateEini("einiInpatientSprite", 33);
                    break;
                case 6:
                    angryEini();//animateEini("einiAngrySprite", 68);
                    break;
                case 7:
                    pointAgainEini();//animateEini("einiStartPointAgainSprite", 24);
                    break;
                case 8:
                    introducingEini();//animateEini("einiIntroduceSprite", 14);
                    break;
                case 9:
                    sleepingEini();//animateEini("einiSleepingSprite", 2);
                    break;
                case 10://animateEini("einiSnoringSprite", 18);
                    snoringEini();
                    break;
                case 11:
                    sleeplyLookingEini();//animateEini("einiLookingSprite", 5);
                    break;
                case 12:
                    suprisedLookingEini();//animateEini("einiWakesUpSprite", 11);
                    break;
                case 13:
                    resetEini();//animateEini("resetEini", 1);
                case 14:
                    leavingEini();//animateEini("einiLeavingSprite", 28);
                    break;
                case 15:
                    arivingEini();//animateEini("einiArivingSprite", 25);
                    break;
                default: boredEini();
            }//ENDE switch
            //--------------------------------------------------------------------------------------------
            
            numFrames = columns * rows;
            frameID = 0;

            function drawCanvas() {
                
                context.clearRect(0, 0, theCanvas.width, theCanvas.height);
                var sourceX = (frameID % columns) * spriteSize;
                var sourceY = Math.floor((frameID / columns)) * spriteSize;
                context.drawImage(img, sourceX, sourceY, spriteSize, spriteSize, 0, 0, spriteSize, spriteSize);

                if (newState) {
                    frameID++;
                }

                if (frameID == numFrames && newState) {
                    newState = false;
                    clearInterval(intID);
                }
            };//ENDE drawCancas()
            
            const FRAME_RATE = 10;
            var intervalTime = 1000 / FRAME_RATE;
            //ID des Intervall-Timers bei Start speichern
            intID = setInterval(drawCanvas, intervalTime);

    //--------------------------------------------------------------------------------------------

    //jede Animation wird ueber diese generische Funktion aufgerufen
    function animateEini(einiImg, framesColumns){
        /**
         * bevor neue Animation gerendert wird,
         * soll die vorherige beendet werden
         * inkl. gesetzter Timeouts und Intervalle
         **/
        clearInterval(intID);
        clearTimeout(_timeout);
        if(repeatInterval==false){
            clearInterval(_interval);
        }

        //--------------------------------------------------------------------------------------------

        einiIsSleeping = false;
        img.src = einiImg;
        numFrames = framesColumns;
        columns = framesColumns;
        newState = true;

    }//ENDE animateEini()

    //--------------------------------------------------------------------------------------------

    //Start-Animation
    function startEini(){
        countInterval = 0;
        repeatInterval = false;
        einiIsSurprised = false;
        animateEini(imageSources[0], 51);//einiSearchSprite ////animationEini = 1;
        _timeout = setTimeout(function(){
            repeatInterval = true;
            _interval = setInterval(function(){
                animationEini = Math.floor((Math.random() * 2) + 5);//animationEini ist entweder 5 oder 6
                canvasApp(4);
                countInterval++;
                if(countInterval==1){
                    canvasApp(7);
                }
                if(countInterval==2){
                    canvasApp(4);
                }
                if(countInterval>=3){
                    clearInterval(_interval);//Intervall deaktivieren
                    canvasApp(6);
                }
            }, 5000);
        }, 4000);
    };//ENDE startEini()

    //--------------------------------------------------------------------------------------------

    //Animation, wenn Suchformular angezeigt wird
    function searchEini(){

        repeatInterval = false;
        animateEini(imageSources[1], 21); //"einiSearchSprite"

        _timeout = setTimeout(function(){
            canvasApp(5);

            _timeout = setTimeout(function(){
                canvasApp(9);

                repeatInterval = true;//damit folgendes Intervall durchlaeuft

                _interval = setInterval(function(){
                    canvasApp(10);
                    einiIsSleeping = true;
                    einiIsSurprised = true;
                    //Listener auf Input
                    document.getElementById("searchInput").addEventListener("click", lookingUpEini);
                    document.getElementsByTagName("BODY")[0].addEventListener("mouseover", lookingUpEini);
                    document.getElementById("searchInput").addEventListener("keypress", wakingUpEini);

                }, 3000);
            }, 8000);
        }, 6000);
    };//ENDE searchEini()

    //--------------------------------------------------------------------------------------------

    //Animation bei erfolgreichem Fund
    function succesfulEini(){
        repeatInterval = false;
        animateEini(imageSources[2], 43);//"einiSuccessSprite"
    };

    //Animation bei nicht erfolgreicher Suche
    function explodingEini(){
        repeatInterval = false;
        animateEini(imageSources[3], 64);//"einiExploseSprite"
    };

    //--------------------------------------------------------------------------------------------

    /**
     * Animationen werden in Hauptanimationen verwendet
     */
    function boredEini(){
        animateEini(imageSources[4], 20);//"einiBoringSprite"
    };

    function inpatientEini(){
        animateEini(imageSources[5], 33);//"einiInpatientSprite"
    };

    function angryEini(){
        animateEini(imageSources[6], 68);//"einiAngrySprite"
    };

    function pointAgainEini(){
       animateEini(imageSources[7], 24);//"einiStartPointAgainSprite"
    };

    function introducingEini(){
       animateEini(imageSources[8], 14);//"einiIntroduceSprite"
    };

    function sleepingEini(){
       animateEini(imageSources[9], 2);//"einiSleepingSprite"
    };

    function snoringEini(){
       animateEini(imageSources[10], 18);//"einiSnoringSprite"
    };

    function lookingUpEini() {
        if(einiIsSleeping==true){
            canvasApp(11);
        }
    };

    function sleeplyLookingEini(){
        if(einiIsSleeping==true){
            einiLookingSprite = false;
            animateEini(imageSources[11], 5);//"einiLookingSprite"
        }
    };

    function wakingUpEini(){
        if(einiIsSurprised==true){
            canvasApp(12);
        }
    };

    function suprisedLookingEini(){
        if(einiIsSurprised==true){
            einiIsSurprised=false;
            animateEini(imageSources[12], 11);//"einiWakesUpSprite"
            /*nach 0.5 Sekunden startet die Animation searchEini*/
            _timeout = setTimeout(function(){
                canvasApp(1);
            },500);
        }
    };


    //--------------------------------------------------------------------------------------------


    function resetEini(){
        animateEini(imageSources[13], 2);
    };


    //--------------------------------------------------------------------------------------------


    function leavingEini(){
        animateEini(imageSources[14], 40);
        _timeout = setTimeout(function(){
            canvasApp(15);
        },5000);
    };

    function arivingEini(){
        animateEini(imageSources[15], 25);
    };


    };//ENDE canvasApp()
    //--------------------------------------------------------------------------------------------

    //Funktion fuer Animationen waehrend scrollen
    function scrollFunction(){
        var yPosition = window.scrollY;
        //console.log("Vertically: " + yPosition + "px");
        if(yPosition>=200){

            einiIsSleeping = false;//einiIsSleeping auf false, damit der Character auf Hoehe der Eintraege nicht einschlaft
            clearTimeout(_timeout);//aller vorher aktiven Animationen (Einschlafen) werden deaktiviert
            clearInterval(_interval);//aller vorher aktiven Animationen (Einschlafen) werden deaktiviert
            animationEini = 13;//Standard-Character

            if(aniRuns==true){
                aniRuns = false;
                var randomEini = Math.floor((Math.random() * 2) + 7);

                canvasApp(randomEini);
                setTimeout(function(){aniRuns=true},3000);//Funktion erst nach 3 Sekunden wieder aufrufbar
            }
        }
};//ENDE scrollFunction()
    

    