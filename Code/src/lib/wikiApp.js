

/**
Script fuehrt Wikipedia-Anbindung, Routing, Directives, Services, ... (AngularJS)
**/

(function() {

//--------------------------------------------------------------------------------------------
var app = angular.module("wikiEini", ["ngRoute", "ngSanitize", "ui.bootstrap"]);
    //--------------------------------------------------------------------------------------------

    //Routing configurieren
    app.config(function($routeProvider){
        $routeProvider
        //Templates laden
        .when("/",{
            templateUrl: "pages/start.html",
            controller: "StartController"
        })
        .when("/results/:endpoint", {
            templateUrl: "pages/results.html",
            controller: "ResultsController"
        })
        //falls nichts zutrifft
        .otherwise({
            redirect: "/"
        });
    });
    //--------------------------------------------------------------------------------------------

    //Wikipedia Service definieren
    app.service("wikipediaService", function($http, $timeout){
        return {
            endpoints: {
                'de': {
                    src: imgDe,
                    title: languageDe,
                    url: endpointDe
                },
                'en': {
                    src: imgEn,
                    title: languageEn,
                    url: endpointEng
                },
                'fr': {
                    src: imgFr,
                    title: languageFr,
                    url: endpointFr
                }
            },
            query: function(endpoint, keyword){
                var url = this.endpoints[endpoint].url;
                //jsonp-request an Server stellen inkl. URL und Parameter
                return $http.jsonp(url, {
                params: {
                    format: "json",
                    action: "query",
                    generator: "search",
                    gsrlimit: "20",
                    prop: "extracts",
                    exintro: 1,
                    exsentences: 5,
                    exlimit: "max",
                    gsrsearch: keyword,
                    callback: "JSON_CALLBACK"//AngularJS verlangt feste Callback-Bezeichnung JSON_CALLBACK
                }
            }).then(function(data){

                onSearching = true;

               	//das Ergebnis wird in outcome abgelegt
            	outcome = data.data.query;
            	
            	//es wird geprueft, ob es Resultate gibt
            	showProgressBar(); //ProgressBar wird eingeblendet
            	languageChangeVisible = false; //gewaehrleistet, dass Seitenwechsel angezeigt werden kann
                showLanguageIconVisible = true; //Icon zur Sprachwahl kann angezeigt werden
                

            	//ES GIBT KEINE FUNDE
            	if(outcome==undefined){
            	    canvasApp(3);//Animation bei erfolgloser Suche
            		//Meldung, falls kein Fund
            		$timeout(function(){
            		    showNoMatches();//Funktion in animateApp.js
            		}, 3000);
            		results = false;//fuer Einblendung Icon, Abfrage in animateApp.js

            		//Formular wird bei erfolgreichem Fund ausgeblendet
                    $timeout(function(){
                        hideProgressBar();
                        showLanguageIcon();
                    }, 5000);

                    document.getElementById('searchInput').select();

                    return false;

            		}
            	//ES GIBT FUNDE
            	else{
            	    //console.log(outcome.pages);
            	    einiIsSleeping = false;
            	    aniRuns = true;
            	    
            	    showFormularIconVisible = true; //Icon zum Einblenden des Formulars kann angezeigt werden
                    showEiniDisableIconVisible = true;
                
                    canvasApp(2);//Animation bei erfolgreicher Such
                    $timeout(function(){
            	        hideNoMatches()
            	    }, 3000);

                    results = true;//fuer Einblendung Icon, Abfrage in animateApp.js

                    //hideProgressBar wird bei erfolgreichem Fund ausgeblendet
                    $timeout(function(){
                        hideFormular();
                    }, 3000);
                    
            		return outcome.pages;
            		};
            	})
            }
        }
    });

    //--------------------------------------------------------------------------------------------
    app.controller("ResultsController", function($scope, $http, $timeout, $routeParams, wikipediaService){
        currentView = 1;
        canvasApp(currentView);//Start-Animation im Controller
        
        $scope.message = "ResultsController";
        $scope.endpoints = wikipediaService.endpoints;

        $timeout(function(){
        searchTemp = document.getElementById("searchInput").value;
        
        if(searchTemp===""){
            return false;
        }
            $scope.searchClick(searchTemp);
        }, 500);

        //------------------------------------------------------------
        $scope.language = $routeParams.endpoint;
        $scope.ask;
        $scope.question;

        if($scope.language=="de"){
        	$scope.language=languageDe;
        	$scope.buttonTxT ="Suche";
        	$scope.ask = "Frag den ";
        	$scope.selectLanguage = "eine andere Sprache wählen";
        	$scope.question = "Was möchtest Du wissen?";
            $scope.url = endpointDe;
            $scope.alertTxT = "es wird gesucht";
            $scope.noResults = "Für diese Anfrage gibt es kein Ergebnis";
        };
        if($scope.language=="en"){
        	$scope.language=languageEn;
        	$scope.buttonTxT ="Search";
        	$scope.ask = "Ask the ";
        	$scope.selectLanguage = "Choose another language";
        	$scope.question = "What do you want to know?";
            $scope.url = endpointEng;
            $scope.alertTxT = "Search is running";
            $scope.noResults = "No result has been achieved";
        };
        if($scope.language=="fr"){
        	$scope.language=languageFr;
        	$scope.buttonTxT ="Recherche";
        	$scope.ask = "Demander au ";
        	$scope.selectLanguage = "Choisir une autre langue";
        	$scope.question = "Que souhaiterais-tu savoir?";
            $scope.url = endpointFr;
            $scope.alertTxT = "cherchant pistes";
            $scope.noResults = "Pas de résultats";
        }
        //-------------------------------------------------------------

        $scope.results = {};//$scope.results als leeres Objekt initialisieren
        $scope.domain = $routeParams.endpoint;//Laenderkennung fuer Link in domain speichern

        $scope.search = document.getElementById("searchInput").value;//search Variable fuer Input-Feld mit ng-if Abfrage zur bedingten Anzeige des Buttons

        //Funktion wird aus IconController aufgerufen
        $scope.$on('openForm', function(event) {
            $scope.search = document.getElementById("searchInput").value;
        });
        
        //Funktionsaufruf nach Button-Klick
        $scope.searchClick = function(keyword){
            var results = wikipediaService.query($routeParams.endpoint, keyword);

            results.then(function(data){//Funtion mit Ergebnis uebergeben
            	//console.log(data);

            	//Aufruf der Progressbar
            	animateProgressBar();

            //Ergebnisse werden erst nach 3 Sekunden angezeigt
            $timeout(function(){
               $scope.results = data;
            }, 3000);
        });
        };

    //Autovervollstaendigung
    angular.extend($scope, {
      getLocation: function(val) {
          //console.log("Get", val);
            return $http.jsonp($scope.url, {
                params: {
                action: 'opensearch',
                format: 'json',
                search: val,
                callback: 'JSON_CALLBACK'
            }
        }).then(function(res) {
          var titles = [];
          //console.log("Results: ", res);
          angular.forEach(res.data[1], function(item) {
            var temp = {};
            temp.Title = item;
            //console.log("Result", temp.Title);
            titles.push(temp);
          });
          return titles;
        });
      }
    });//ENDE angular.extend

    });//ENDE ResultsController

    //--------------------------------------------------------------------------------------------

    app.controller("StartController", function($scope, wikipediaService){
        currentView = 0;
        canvasApp(currentView);//Start-Animation im Controller

        $scope.message = "StartController";
        $scope.endpoints = wikipediaService.endpoints;//Wikipedia Endpunkte definieren

    });

    //--------------------------------------------------------------------------------------------

    app.controller("NavigationController", function($scope,$timeout){
        $scope.message = "NavigationController";
        //console.log("NavigationController loaded");
        $scope.startClick = function(){
            
            canvasApp(0);//Animation bei Rueckkehr auf Start
            
            //onSearching ist bei laufender Suche auf true gesetzt
            //und die Links werden in disableLinks() fuer 2000 Millisekunden deaktiviert
            if(onSearching==true){
                $timeout(function(){
                    disableLinks();
                },500);
            };//in animateApp.js
            
            resetIcons();//in animateApp.js
            
        };
    });

    //--------------------------------------------------------------------------------------------

    app.controller("CanvasController", function($scope){
            $scope.message = "CanvasController";
            //console.log("canvasController loaded");
        });

    //--------------------------------------------------------------------------------------------

    app.controller("IconController", function($scope, $routeParams, wikipediaService){
        $scope.message = "IconController";
        //console.log("IconController loaded");
        $scope.openForm = function(){
        $scope.$broadcast('openForm');
        };
    });

    //--------------------------------------------------------------------------------------------

    
	//--------------------------------------------------------------------------------------------
    //Directives
    
    //Directive fuer Panel
    app.directive("panel", function(){
        return {
        	//welches Template wird gerendert
            templateUrl: "elements/panel.html",
            scope: {
            	//Titel wird uebergeben als Scopevariable
                title: "@"//Textattribut
            },
            //transclude ermoeglicht eingabe von Inhalt
            transclude: true
        }
    });
    
    //Directive fuer List-Group
    app.directive("list-group", function(){
        return {
        	//welches Template wird gerendert
            templateUrl: "elements/list-group.html",
            scope: {
            	//Titel wird uebergeben als Scopevariable
                title: "@"//Textattribut
            },
            //transclude ermoeglicht eingabe von Inhalt
            transclude: true
        }
    });
    
    //Directive fuer Form-Group
    app.directive("form-group", function(){
        return {
        	//welches Template wird gerendert
            templateUrl: "elements/form-group.html",
            scope: {
            	//Titel wird uebergeben als Scopevariable
                title: "@"//Textattribut
            },
            //transclude ermoeglicht eingabe von Inhalt
            transclude: true
        }
    });
    
})();