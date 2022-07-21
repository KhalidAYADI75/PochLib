//Initialisation
const bouton_addbook=document.getElementById("bt_add");
const bouton_search=document.getElementById("bt_search");
const form_search=document.getElementById("divformsearch");
form_search.style.display='none';
//sessionStorage.clear();
chargementLivreDuBookmark();

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
        div=constructionCellule('recherche',lesLivres[i])
        document.getElementById("container").appendChild(div);
    }
}

function constructionCellule(rechercheOuBookmark,leLivre) {
    var divParent = document.createElement("div");
    divParent.style.height = "370px";
    divParent.style.border = "1px solid grey";
    divParent.style.padding = "20px";

    creationComposant('div','Titre',divParent,leLivre.titre,'font-weight:bold;margin-top:20px;');

    var span = document.createElement("span");
    if (rechercheOuBookmark=='recherche') {
        span.setAttribute('class','fa fa-bookmark fa-2x');
    } else {
        span.setAttribute('class','fa fa-trash fa-2x');
    }
    span.setAttribute('style','float:right;font-weight:bold;position:relative;top:-20px;color:green');
    divParent.appendChild(span);

    creationComposant('div','Id',divParent,leLivre.id,'font-style:italic;margin-top:20px;');
    creationComposant('div','Auteur',divParent,leLivre.auteur,'margin-top:20px;');
    creationComposant('div','Description',divParent,leLivre.description,'margin-top:20px;');
    creationComposant('img','',divParent,leLivre.image,'margin-top:30px;width:80px');

    span.addEventListener('click', function() {
        let dejaDansBokkmark;
        if (span.getAttribute('class')=='fa fa-bookmark fa-2x') {
            dejaDansBokkmark=verifieSiLivreDansBookmark(leLivre);
            if (dejaDansBokkmark==false) {
                 copieLivreDansBookmark(leLivre);
                 enregistreLivreDansBookmark(leLivre);
            }
        } else {
            retireLivreDesFavoris(leLivre);
        }
    });
    span.addEventListener('mouseover', function() {
        span.setAttribute('style','float:right;font-weight:bold;position:relative;top:-20px;color:green;cursor:pointer');
    });
    return divParent;
}

function creationComposant(divOuImg,intitule,leParent,elementLivre,leStyle) {
    var creationDiv = document.createElement(divOuImg);
    if (divOuImg=='img') {
        creationDiv.src=elementLivre;
    } else {
        creationDiv.textContent = "Titre : "+elementLivre;
    }
    creationDiv.setAttribute('style',leStyle);
    leParent.appendChild(creationDiv);
}

function verifieSiLivreDansBookmark(leLivre) {
    let dejaDansBookmark=false;
    for(let key of Object.keys(sessionStorage)) {
        if (leLivre.id==key) {
            alert ('Vous ne pouvez ajouter deux fois le même livre');
            dejaDansBookmark=true;
        }
    }
    return dejaDansBookmark;
}

function copieLivreDansBookmark(leLivre) {
    var bookmark = document.getElementById("pochlistecontent");
    div=constructionCellule('bookmark',leLivre);
    document.getElementById("pochlistecontent").appendChild(div);
}

function retireLivreDesFavoris(leLivre) {
    sessionStorage.removeItem(leLivre.id);
    //location.reload();
}

function enregistreLivreDansBookmark (leLivre) {
    sessionStorage.setItem(leLivre.id, JSON.stringify(leLivre));
}

function chargementLivreDuBookmark() {
    for(let key of Object.keys(sessionStorage)) {
        copieLivreDansBookmark(JSON.parse(sessionStorage.getItem(key)));
    }
}