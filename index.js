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
        div=constructionCellule(0,lesLivres[i])
        document.getElementById("container").appendChild(div);
    }
}

function constructionCellule(rechercheOuBookmark,leLivre) {

    var div = document.createElement("div");
    div.style.height = "370px";
    div.style.border = "1px solid grey";
    div.style.padding = "20px";

    var div1 = document.createElement("div");
    div1.textContent = "Titre : "+leLivre.titre;
    div1.setAttribute('style','font-weight:bold;margin-top:20px;');
    div.appendChild(div1);

    var span = document.createElement("span");
    if (rechercheOuBookmark==0) {
        span.setAttribute('class','fa fa-bookmark fa-2x');
    } else {
        span.setAttribute('class','fa fa-trash fa-2x');
    }
    span.setAttribute('style','float:right;font-weight:bold;position:relative;top:-20px;color:green');
    span.addEventListener('click', function() {
        if (span.getAttribute('class')=='fa fa-bookmark fa-2x') {
            copieLivreDansBookmark(leLivre);
        } else {
            supprimeLivreDesFavoris(leLivre);
        }
    });
    span.addEventListener('mouseover', function() {
        span.setAttribute('style','float:right;font-weight:bold;position:relative;top:-20px;color:green;cursor:pointer');
    });
    div.appendChild(span);

    var div1 = document.createElement("div");
    div1.textContent = "Id : "+leLivre.id;
    div1.setAttribute('style','font-style:italic;margin-top:20px;');
    div.appendChild(div1);

    var div1 = document.createElement("div");
    div1.textContent = "Auteur : "+leLivre.auteur;
    div1.setAttribute('style','margin-top:20px;');
    div.appendChild(div1);

    var div1 = document.createElement("div");
    div1.textContent = "Description : "+leLivre.description;
    div1.setAttribute('style','margin-top:20px;');
    div.appendChild(div1);

    var img = document.createElement("img");
    img.src=leLivre.image;
    img.setAttribute('style','margin-top:30px;width:80px');
    div.appendChild(img);
    return div;

}

function copieLivreDansBookmark(leLivre) {
    var bookmark = document.getElementById("pochlistecontent");
    div=constructionCellule(1,leLivre);
    document.getElementById("pochlistecontent").appendChild(div);
}
function supprimeLivreDesFavoris(leLivre) {

}

