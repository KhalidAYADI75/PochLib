//Initialisation
const bouton_addbook=document.getElementById("bt_add");
const bouton_search=document.getElementById("bt_search");
const form_search=document.getElementById("divformsearch");
form_search.style.display='none';

// Déclencheur clique sur le bouton ajouter un livre
bouton_addbook.addEventListener('click',function() {
    if (form_search.style.display=='none') {
      form_search.style.display=""; }
    else {
        form_search.style.display="none";
    }
});

// Déclencheur clique sur le bouton rechercher
bouton_search.addEventListener('click',function(event) {
    event.preventDefault();
    if ((document.getElementById("titre_livre").value == "") || (document.getElementById("auteur").value == "")) {
        alert ("Vous devez saisir le titre et l'auteur du livre");
    } else {
        const tlivre=document.getElementById("titre_livre").value;
        const auteur=document.getElementById("auteur").value;
        fetch("https://www.googleapis.com/books/v1/volumes?q="+tlivre+"inauthor:"+auteur+"&key=AIzaSyB9_kmuvdfj1aK_QY8c3JwHzDAYcsWd0HU")
        .then(function(res) {
        if (res.ok) {
        return (res.json());
        }
        })
        .then(function(value) {
        afficheResultatDansTableau(value);
        effaceDonneesSaisies();
        })
        .catch (function(err) {
        alert ("Erreur de traitement");
        })
    }
});

function afficheResultatDansTableau(value) {
    console.log (value);
    console.log (Object.values(value)[1]);
    document.getElementById("tabResult").innerHTML="";
    if ((Object.values(value)[1])==0) {
      document.getElementById("tabResult").innerHTML="</br>Aucun livre n'a été trouvé</br></br></br>";
    } else {
      let nbVolume=Object.values(value)[2].length;
      console.log(nbVolume);
      const tbl = document.createElement("table");
      tbl.width = '100%';
      const tblBody = document.createElement("tbody");
      let i=0;
      while (i<nbVolume) {
          const row = document.createElement("tr");
          for (let j = 0; j < 2; j++) {
             const cell = document.createElement("td");
             cell.style.verticalAlign = "top";
             ajoutBookmark(cell);
             ajoutIntitule('Titre',cell,value,i,j);
             ajoutIntitule('Id',cell,value,i,j);
             ajoutIntitule('Auteur',cell,value,i,j);
             ajoutIntitule('Description',cell,value,i,j);
             ajoutImage(cell,value,i,j);
             row.appendChild(cell);
         }
         tblBody.appendChild(row);
         i=i+2;
      }
      tbl.appendChild(tblBody);
      document.getElementById("tabResult").appendChild(tbl);
      tbl.setAttribute("border", "2");
    }

}

function effaceDonneesSaisies() {
    document.getElementById("titre_livre").value="";
    document.getElementById("auteur").value="";
}

function ajoutBookmark(cell) {
    var img = document.createElement("img");
    img.setAttribute('src', 'bookmark.png');
    img.setAttribute("style", "height:50px;float:right;margin:10px");
    cell.appendChild(img);
}

function ajoutIntitule(intitule,cell,value,i,j) {
    var div = document.createElement("div");
    switch (intitule) {
        case 'Titre' :
            div.innerHTML = "</br>"+ "Titre : " + Object.values(value)[2][i+j]['volumeInfo']['title']+"</br></br>";
            div.style.fontWeight = 'bold';
            console.log("titre: "+Object.values(value)[2][i+j]['volumeInfo']['title']);
            break;
        case 'Id' :
            div.innerHTML = "Id : " + Object.values(value)[2][i+j]['id']+"</br></br>";
            div.style.fontStyle = "italic";
            console.log("id: "+Object.values(value)[2][i+j]['id']);
            break;
        case 'Auteur' :
            div.innerHTML = "Auteur : " + Object.values(value)[2][i+j]['volumeInfo']['authors'][0]+"</br></br>";
            console.log("auteur: "+Object.values(value)[2][i+j]['volumeInfo']['authors'][0]);
            break;
        case 'Description' :
        if (Object.values(value)[2][i+j]['volumeInfo']['description']) {
               div.innerHTML = "Description : " + Object.values(value)[2][i+j]['volumeInfo']['description']+"</br></br>";
            } else {
               div.innerHTML = "Description : Information manquante "+"</br></br>";
            }
            console.log("description: "+Object.values(value)[2][i+j]['volumeInfo']['description']);
            div.innerHTML = div.innerHTML.substr(0,200);
    }
    div.style.margin = '10px';
    cell.appendChild(div);
}

function ajoutImage(cell,value,i,j) {
    var img = document.createElement("img");
    try {
        img.setAttribute('src', Object.values(value)[2][i+j]['volumeInfo']['imageLinks']['thumbnail']);
    } catch (error) {
        img.setAttribute('src', "unavailable.png");
    }
    img.setAttribute("style", "height:200px;margin:10px");
    cell.appendChild(img);
}