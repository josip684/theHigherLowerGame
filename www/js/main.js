window.onload=function(){
  $("#btn_novi_spil").on("click", get_a_new_deck);
  $("#btn_veca").on("click", igraj);
  $("#btn_manja").on("click", igraj);
  $("#btn_veca").on("click", veca);
  $("#btn_manja").on("click", manja);
  //$("#btn_nove_karte").on("click", newCards);
}
var id_deck;
//
console.log(id_deck);
var zahtjev;
var zahtjev2;
var remaining;
var broj_tocnih = 0;
var broj_NEtocnih = 0;
var potez = "";
var velike_karte = {
  "JACK":11,
  "QUEEN":12,
  "KING":13,
  "ACE":14
}

var prva_karta;
var druga_karta;

var ostalo_karata;

function veca(){
  potez = "<< veća >>";
}
function manja(){
  potez = "<< manja >>";
}

function get_a_new_deck(){
  var nekiDeck = "q769w9kc3k5f";
  var url2 = "https://deckofcardsapi.com/api/deck/"+nekiDeck+"/draw/?count=2";
  console.log("--------URL2-----: ", url2);
  zahtjev = new XMLHttpRequest();
  zahtjev.onreadystatechange = Metoda;
  zahtjev.open("GET","https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1", true);

   zahtjev.send();

}

function Metoda(){

  if(zahtjev.status == 200 && zahtjev.readyState == 4){

    var obj = JSON.parse(zahtjev.responseText);
    var str = JSON.stringify(obj);
    id_deck = obj.deck_id;
    remaining = obj.remaining;

    document.getElementById("spil").value ="Deck_ID = "+id_deck;
    document.getElementById("remaining").innerHTML ="Remaining cards = "+ remaining;

  }
}

function igraj(){
  console.log("Ušao u igraj");
  zahtjev2 = new XMLHttpRequest();
  console.log("Deklariran zahtjev");
  zahtjev2.onreadystatechange = Metoda2;
  console.log("Iza metoda 2 on ready");
  var url = "https://deckofcardsapi.com/api/deck/"+id_deck+"/draw/?count=2";
  console.log(url);
  zahtjev2.open("GET",url, true);

  zahtjev2.send();
  console.log("Zahtjev2 je poslan");
  //67z3ccyii2j7f
  //q769w9kc3k5f

}

function Metoda2(){
    console.log("Ušao u Metoda2");
  if(zahtjev2.status == 200 && zahtjev2.readyState == 4){
      console.log("Ušao u if metode2");
    var obj_karte = JSON.parse(zahtjev2.responseText);
    var str_karte = JSON.stringify(obj_karte);
    if(ostalo_karata==0){
      get_a_new_deck();
    }
    var prva_karta = obj_karte.cards[0].image;
    var druga_karta = obj_karte.cards[1].image;
    ostalo_karata = obj_karte.remaining;

    document.getElementById("remaining").innerHTML="Ostalo karata: " + ostalo_karata;
    console.log("Prva karta "+ prva_karta);
    console.log("Druga karta "+ druga_karta);
    document.getElementById("img_prva").src=prva_karta;
    document.getElementById("img_druga").src=druga_karta;

    var prva = obj_karte.cards[0].value;
    var druga = obj_karte.cards[1].value;
    console.log("VRIJEDNOST PRVA: "+ prva);
    console.log("VRIJEDNOST DRUGA: "+ druga);

    if(prva in velike_karte){
      console.log("Prva je velika");
      prva =  velike_karte[prva];
      console.log("Nova vrijednost prve: ",prva);
    }
    if(druga in velike_karte){
      console.log("Druga je velika");
      druga =  velike_karte[druga];
      console.log("Nova vrijednost druge: ",druga);
    }

    if(prva > druga && potez == "<< veća >>"){
      broj_tocnih++;
    //  alert("Pogodili ste, Vaš potez je ", potez);
    //  console.log("Potez je: ", potez);
      document.getElementById("tocan_odg").innerHTML = "Broj točnih odgovora: " +broj_tocnih;
      document.getElementById("pogodak_promasaj").innerHTML = "Pogodak!";
    }
    else if (prva < druga && potez == "<< veća >>") {
      broj_NEtocnih++;
      //alert("Promašili ste, Vaš potez je ", potez);
      document.getElementById("netocan_odg").innerHTML = "Broj netočnih odgovora: " +broj_NEtocnih;
      document.getElementById("pogodak_promasaj").innerHTML = "Promašaj!";
    }
    else if (prva == druga && potez == "<< veća >>"){
      //alert("Ponuđene karte su jednake, igra se nastavlja");
      document.getElementById("pogodak_promasaj").innerHTML = "Ponuđene karte su jednake, igra se nastavlja!";
    }
    else if(prva < druga && potez == "<< manja >>"){
      broj_tocnih++;
      //alert("Pogodili ste, Vaš potez je ", potez);
      document.getElementById("tocan_odg").innerHTML = "Broj točnih odgovora: " +broj_tocnih;
      document.getElementById("pogodak_promasaj").innerHTML = "Pogodak!";
    }
    else if (prva > druga && potez == "<< manja >>") {
      broj_NEtocnih++;
    //  alert("Promašili ste, Vaš potez je ", potez);
      document.getElementById("netocan_odg").innerHTML = "Broj netočnih odgovora: " +broj_NEtocnih;
      document.getElementById("pogodak_promasaj").innerHTML = "Promašaj!!";
    }
    else if (prva == druga && potez == "<< manja >>"){
      //alert("Ponuđene karte su jednake, igra se nastavlja");
      document.getElementById("pogodak_promasaj").innerHTML = "Ponuđene karte su jednake, igra se nastavlja!";
    }
    else{
      alert("Ponovno odigraj!");
    }


  }
}
