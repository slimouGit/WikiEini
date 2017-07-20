/**
Script speichert alle initialen Variablen fuer das System
**/

///////////////////////////////////////
//wikiApp
var outcome;//speichert Ergebnis aus Wiki-Abfrage
var searchTemp;//speichert Text aus Input zwischen
var onSearching = false; //Boolean wird bei aktueller Suche auf true gesetzt

//Wikipedia-API
var endpointDe = "https://de.wikipedia.org/w/api.php";
var endpointEng = "https://en.wikipedia.org/w/api.php";
var endpointFr = "https://fr.wikipedia.org/w/api.php";

//Bildpfade
var imgDe = "img/de.jpg";
var imgEn = "img/en.jpg";
var imgFr = "img/fr.jpg";

//Sprache
var languageDe = "Deutsch";
var languageEn = "Englisch";
var languageFr = "Französisch";

///////////////////////////////////////



///////////////////////////////////////
//canvasApp
var animationEini;
var staticEini;
var img = new Image();
var frameID;
var columns;
var spriteSize = 200;
var numFrames;
var rows = 1;
var frameRate = 400;
var newState = true;
var intID;
var currentView;                //currentView speichert 0 oder 1 fuer die jeweils dargestellte Seite
var _timeout;                   //zum gezielten Loeschen des Timeouts
var _interval;                  //zum gezielten Loeschen des Intervalls
var repeatInterval = false;
var countInterval = 0;
var aniRuns = true;             //Hilfsvariable fuer Scrollfunktion

var einiIsSleeping = false;     //Hilfsvariablen fuer Einschlaf/Aufwach-Funktionen
var einiIsSurprised = false;    //Hilfsvariablen fuer Einschlaf/Aufwach-Funktionen
//
var preloaded = true;           //Hilfsvariable gewaehrleistet
/////////////////////////////////////////



///////////////////////////////////////
//animateApp
var showLanguageIconVisible = false;
var showFormularIconVisible = false;
var showEiniDisableIconVisible = false;
var contentDown = false;
var languageChangeVisible = false;
var progressBarVisible = false;
var languageChangeAlertVisible = false;
///////////////////////////////////////



///////////////////////////////////////
//selectOptionsApp
var inputText;
///////////////////////////////////////

