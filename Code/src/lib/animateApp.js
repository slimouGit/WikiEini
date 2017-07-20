/**
Script definiert Animationen (jquery)
**/


//Scrollfunktion
$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {        
        $('#return-to-top').fadeIn(200);    
    } else {
        $('#return-to-top').fadeOut(200);   
    }
});

$('#return-to-top').click(function() { 
    aniRuns = false;//Character wird nicht animiert beim hochscrollen -> Pruefung in scrollFunction()
        
    $('body,html').animate({
        scrollTop : 0                      
    }, 500);
});

//------------------------------------------------------------------------------

//Formular animiert ausblenden
function hideFormular(){
    $("#formular").animate({
        left: '0px',
        opacity: '0.0',
        height: '0px',
        width: '100%',
     }, 1500);
     setTimeout(function(){
        showLanguageIcon();
        showFormularIcon();
        showEiniDisableIcon();
        hideProgressBar();
     },2000);
};

//------------------------------------------------------------------------------

//Funktionen zum Ein- und Ausblenden des Icons fuer den Sprachwechsel

function showLanguageIcon(){
    if(showLanguageIconVisible==true){
        $("#languageIcon").animate({
            top: '40px',
            opacity: '0.8',
        }, 1000);
    }
    showLanguageIconVisible = false;
};

function hideLanguageIcon(){
    if(showLanguageIconVisible==false){
        $("#languageIcon").animate({
            top: '0px',
            opacity: '0.0',
        }, 1000);
    }
    showLanguageIconVisible = true;
    moveContentToTop();
};

//------------------------------------------------------------------------------

//Funktionen zum Ein- und Ausblenden des Icons fuer die Formular-Anzeige

function showFormularIcon(){
    if(showFormularIconVisible==true && currentView == 1){
        $("#formularIcon").animate({
            top: '40px',
            opacity: '0.8',
        }, 1000);
    }
    showFormularIconVisible=false;
    moveContentToTop();
};

function hideFormularIcon(){
    if(showFormularIconVisible==false){
        $("#formularIcon").animate({
            top: '0px',
            opacity: '0.0',
        }, 1000);
    }
    showFormularIconVisible=true;
};

//------------------------------------------------------------------------------

//Funktionen zum Ein- und Ausblenden des Icons fuer das Ausblenden des Characters

function showEiniDisableIcon(){
    if(showEiniDisableIconVisible==true && currentView == 1){
        $("#einiIcon").animate({
            top: '40px',
            opacity: '0.8',
        }, 1000);
    }
    showEiniDisableIconVisible=false;
};

function hideEiniDisableIcon(){
    if(showEiniDisableIconVisible==false){
    $("#einiIcon").animate({
        top: '0px',
        opacity: '0.0',
    }, 1000);
    }
    showEiniDisableIconVisible=true;
};

//------------------------------------------------------------------------------

//Funktionen zum Ein- und Ausblenden der Sprachwahl

function showChangeLanguage(){
    if(languageChangeVisible==false){
        $("#changeLanguage").animate({
            right: '-5px',
            opacity: '1.0',
        }, 2000);
    languageChangeVisible = true;
    }
};

function hideChangeLanguage(){
    if(languageChangeVisible==true){
    $("#changeLanguage").animate({
        right: '-300px;',
           opacity: '0.0',
        }, 2000);
    languageChangeVisible = false;
    }
};

//--------------------------------------------------------------------------------

//Funktionen zum Ein- und Ausblenden der Anzeige, dass die Ergebnisse "gleich angezeigt werden"

function showChangeLanguageAlert(){
    $("#changeLanguageText").animate({
        left: '0px',
        opacity: '0.9',
    }, 1000);
    hideChangeLanguageAlert();
};

function hideChangeLanguageAlert(){
    setTimeout(function(){
        $("#changeLanguageText").animate({
            left: '-300px',
            opacity: '0.0',
        }, 3000);
    },3000);
};

//-------------------------------------------------------------------------------

//Funktionen zum Ein- und Ausblenden der Anzeige, dass es keine Ergebnisse gibt

function showNoMatches(){
    $("#noMatch").animate({
        left: '0px',
        opacity: '0.9',
    }, 1000);
    moveContentDown();
    hideNoMatches();
}

function hideNoMatches(){
    setTimeout(function(){
        $("#noMatch").animate({
            left: '-300px',
            opacity: '0.0',
        }, 3000);
    },3000);
}

//--------------------------------------------------------------------------------

//Funktionen zum Hoch- und Runterbewegen der des Formularfeldes

function moveContentDown(){
    if(contentDown == false && currentView == 1){
        $("#contentView").animate({
            top: '30px',
        }, 2000);
        document.getElementById('searchInput').select();
    contentDown = true;
    }
};

function moveContentToTop(){
    if(contentDown == true){
        $("#contentView").animate({
            top: '0px',
        }, 2000);
    contentDown = false;
    }
};

//------------------------------------------------------------------------------

//Funktionen zum Ein- und Ausblenden des Ladebalkens

function showProgressBar(){
    if(progressBarVisible==false){
        $("#myProgress").animate({
            width: '100%',
            height: '20px',
        },1500);
    progressBarVisible = true;
    }
};

function hideProgressBar(){
    if(progressBarVisible==true){
        $("#myProgress").animate({
            width: '0%',
            height: '0px',
        },1500);
        progressBarVisible = false;
    }
};

//------------------------------------------------------------------------------

/*
* Funktion deaktiviert alle klickbaren Links fuer 2000 Millisekunden
* wird ausgefuehrt, wenn Anfrage gestartet wird, vor fertiger Ausgabe zurueck 
* auf Start gewechselt und sofort wieder auf Anfrageseite gewechselt wird
* Aufruf aus wikiApp.js
*/
function disableLinks(){
    $("a").each(function() {
        $( this ).addClass( "linkDisabled" );
    });
    setTimeout(function(){
        $("a").each(function() {
            $( this ).removeClass( "linkDisabled" );
        onSearching=false;
    });
    },2000);
}

//------------------------------------------------------------------------------

/*
* Funktion setzt alle Icons zurueck und die Kontroll-Variablen wieder auf false
* Aufruf aus wikiApp.js
*/
function resetIcons(){

    showLanguageIconVisible = false;//falls Wert noch auf true
    //bei Wechsel auf Startseite werden alle Icons ausgeblendet, auch wenn nicht aktiv 
    hideLanguageIcon();
    hideFormularIcon();
    hideEiniDisableIcon();
            
    //da in den Funktionen zum Ausblenden, die Variablen auf true gestezt werden,
    //werden sie folgend mit false initialisiert
    showLanguageIconVisible = false;
    showFormularIconVisible = false;
    showEiniDisableIconVisible = false;
        
    hideChangeLanguage();
    
    setTimeout(function(){ if(currentView==0){resetIcons();} }, 4000);//Gewaehrleistung, dass alle Icons auf Startview eingeblendet werden
}

//------------------------------------------------------------------------------

//Klick auf die Icons werden behandelt

$(document).ready(function(){
    
    $("#languageIcon").click(function(){
        onSearching=false;
        showChangeLanguage();
    });

    //------------------------------------------------------------------------------

    $("#formularIcon").click(function(){
        if(currentView == 0){hideFormularIcon()};
        aniRuns = false;
        onSearching=false;
        $("#formular").animate({
            left: '0px',
            opacity: '1',
            height: '200px',
            width: '100%'
        },2000);

        $('body,html').animate({
            scrollTop : 0 // Scroll to top of body
        }, 500);
        canvasApp(1);//Animation startet, sobald das Formular ausgefahren ist
        setTimeout(function(){
            hideFormularIcon();
            hideEiniDisableIcon();
        },1500);
        moveContentDown();

    });

    //------------------------------------------------------------------------------
    
    $("#einiIcon").click(function(){
        if(currentView == 0){hideEiniDisableIcon()};
        canvasApp(14);//Animation lauft waehrend verschieben der Canvas
        aniRuns = false;
        $("#canvas").animate({
            left: '120%',
            opacity: '1.0',
         }, 8000);
         
        setTimeout(function(){
        aniRuns = true;
            canvasApp(15);//Animation lauft waehrend zuruecksetzen der Canvas
            $("#canvas").animate({
                left: '50%',
                opacity: '1.0'
            }, 2500);
        },8000);
    });

});//ENDE ready(function()

//------------------------------------------------------------------------------