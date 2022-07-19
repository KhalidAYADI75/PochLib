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
    console.log('deded');
    console.log(lesLivres.length);
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
        var div = document.createElement("div");
        div.innerHTML=lesLivres[i].titre;
        document.getElementById("container").appendChild(div);
        var div = document.createElement("div");
        div.innerHTML=lesLivres[i].id;
        document.getElementById("container").appendChild(div);
    }

/*    let numberOfRows = 10;
    let i = 0;
    let x = numberOfRows;
    for (i =  0; i < x ; i++) {
        var div = document.createElement("div");
        div.innerHTML = 'mlazejdmlazdmlkazjdmlkzajdlmkazjdmlkazjadlmkazjd';
        document.getElementById("container").appendChild(div);

        var div = document.createElement("div");
        div.innerHTML = 'frfrfrfrf';
        document.getElementById("container").appendChild(div);
    } */
}




