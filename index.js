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
        .then(function(resultatRechercheLivres) {
        afficheResultatDansTableau(resultatRechercheLivres);
        effaceDonneesSaisies();
        })
        .catch (function(err) {
        alert ("Erreur de traitement");
        })
    }
});

function afficheResultatDansTableau(resultatRechercheLivres) {
    let lesLivres = [];
    lesLivres = recupTousLesLivres(resultatRechercheLivres.items);
    document.getElementById("container").innerHTML="";
    if (lesLivres.length==0) {
      document.getElementById("container").innerHTML="</br>Aucun livre n'a été trouvé</br></br></br>";
    } else {
       affichageDesLivres(lesLivres);
    }

}

function effaceDonneesSaisies() {
    document.getElementById("titre_livre").value="";
    document.getElementById("auteur").value="";
}

function affichageDesLivres(lesLivres) {
     var Container = document.getElementById("container");
     for (let i=0;i<lesLivres.length;i++) {
        div=constructionCellule(0,lesLivres,i)
        document.getElementById("container").appendChild(div);
    }
}

function constructionCellule(rechercheOuBookmark,lesLivres,indice) {
    let lIcone;
    var div = document.createElement("div");
    div.style.height = "370px";
    div.style.border = "1px solid grey";
    div.style.padding = "10px";
    let leTitre = "</b></br><b>Titre : "+lesLivres[indice].titre+"</b>";
    if (rechercheOuBookmark==0) {
        lIcone = "<span style='float:right;color:green;cursor:pointer' onclick=\'copieLivreDansBookmark(" +indice+ ")\' class='fa fa-bookmark fa-2x'></span></br></br>";
    } else {
        lIcone = "<span style='float:right;color:green;cursor:pointer' onclick=\'supprimeDeBookmark(" +indice+ ")\' class='fa fa-trash fa-2x'></span></br></br>";
    }
    let lId = "<i>Id : "+lesLivres[indice].id+"</i></br></br>";
    let lAuteur = "Auteur : "+lesLivres[indice].auteur+"</br></br>";
    let laDescription =  "Description : "+lesLivres[indice].description+"</br></br></br>";
    let lImage = "<img width='80px' src="+lesLivres[indice].image+"/>";
    div.innerHTML =leTitre+lIcone+lId+lAuteur+laDescription+lImage;
    div.setAttribute('id','livre-'+indice);
    return div;

}

function copieLivreDansBookmark(indiceLivre) {
var divDestination = document.createElement("div");
divDestination.setAttribute('id','pochlist-'+indiceLivre);
var divSource = document.getElementById('livre-'+indiceLivre);
document.getElementById("pochlistecontent").appendChild(divDestination);
divDestination.innerHTML = divSource.innerHTML;
divDestination.style.height = "370px";
divDestination.style.border = "1px solid grey";
divDestination.style.padding = "10px";

}

