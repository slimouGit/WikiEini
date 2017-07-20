/**
Script behandelt Interaktion mit dem Select-Feld fuer Sprachwechsel 
**/

function changeLocation(menuObj) {
  //Inhalt aus Input-Feld wird zwischengespeichert
  inputText = document.getElementById("searchInput").value;
  
  var i = menuObj.selectedIndex;
  if(i > 0) {
    
    window.location = menuObj.options[i].value;
  }

  showChangeLanguageAlert();//animateApp.js

  document.getElementById("searchInput").value = inputText;
  document.getElementById('searchInput').select();
};







