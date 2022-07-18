//Initialisation
const bouton_addbook=document.getElementById("bt_add");
const bouton_search=document.getElementById("bt_search");
const form_search=document.getElementById("divformsearch");
form_search.style.display='none';
sessionStorage.clear();

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

//----------------------S'EXECUTE APRES CLIC SUR LE BOUTON RECHERCHER------------------------------------------

function afficheResultatDansTableau(value) {

    console.log(Object.values(value));
    document.getElementById("tabResult").innerHTML="";
    if ((Object.values(value)[1])==0) {
        document.getElementById("tabResult").innerHTML="</br>Aucun livre n'a été trouvé</br></br></br>";
    } else {
        let nbVolume=Object.values(value)[2].length;
        const tbl = document.createElement("table");
        tbl.width = '100%';
        const tblBody = document.createElement("tbody");
        let i=0;
        let cpt=0;
        while (i<nbVolume) {
            const row = document.createElement("tr");
            for (let j = 0; j < 2; j++) {
                const cell = document.createElement("td");
                cell.style.verticalAlign = "top";
                ajoutBookmark(cell,cpt);
                ajoutIntitule('Titre',cell,value,cpt);
                ajoutIntitule('Id',cell,value,cpt);
                ajoutIntitule('Auteur',cell,value,cpt);
                ajoutIntitule('Description',cell,value,cpt);
                ajoutImage(cell,value,cpt);
                row.appendChild(cell);
                cpt=cpt+1;
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

//----------AJOUT DU BOOKMARK , LIVRE , ID , AUTEUR , DESCRIPTION et IMAGE DANS LE TABLEAU RESULTATS DE RECHERCHE------------

function ajoutBookmark(cell,cpt) {
    var span = document.createElement("span");
    span.setAttribute('class', 'fa fa-bookmark fa-2x');
    span.setAttribute('id', cpt);
    span.setAttribute("style", "color:green;float:right;margin:10px");
    cell.appendChild(span);

    span.addEventListener('mouseover',function() {
       document.getElementById(cpt).style.cursor = "pointer";
    });

    span.addEventListener('click',function() {
        InsertionLivreDansFavori(cpt);
    });
}

function ajoutIntitule(intitule,cell,value,cpt) {
    var div = document.createElement("div");
    div.setAttribute('id',intitule+'_'+cpt);
    switch (intitule) {
        case 'Titre' :
            div.innerHTML = "</br>"+ "Titre : " + Object.values(value)[2][cpt]['volumeInfo']['title']+"</br></br>";
            div.style.fontWeight = 'bold';
            break;
        case 'Id' :
            div.innerHTML = "Id : " + Object.values(value)[2][cpt]['id']+"</br></br>";
            div.style.fontStyle = "italic";
            break;
        case 'Auteur' :
            div.innerHTML = "Auteur : " + Object.values(value)[2][cpt]['volumeInfo']['authors'][0]+"</br></br>";
            break;
        case 'Description' :
              if (Object.values(value)[2][cpt]['volumeInfo']['description']) {
                   div.innerHTML = "Description : " + Object.values(value)[2][cpt]['volumeInfo']['description']+"</br></br>";
                } else {
                   div.innerHTML = "Description : Information manquante "+"</br></br>";
                }
                div.innerHTML = div.innerHTML.substr(0,200);
    }
    div.style.margin = '10px';
    cell.appendChild(div);
}

function ajoutImage(cell,value,cpt) {
    var img = document.createElement("img");
    img.setAttribute('id','Image_'+cpt);
    try {
        img.setAttribute('src', Object.values(value)[2][cpt]['volumeInfo']['imageLinks']['thumbnail']);
    } catch (error) {
        img.setAttribute('src', "unavailable.png");
    }
    img.setAttribute("style", "height:200px;margin:10px");
    cell.appendChild(img);
}

//------------------------------------S EXECUTE APRES CLIC SUR L ICONE BOOKMARK------------------------------

function InsertionLivreDansFavori(indice) {

    if (sessionStorage.length==0) {
        creationTableauEtInsertionPremierLivre(indice);
        sessionStorage.setItem('Titre_'+indice,document.getElementById('Titre_'+indice).textContent);
        sessionStorage.setItem('Id_'+indice,document.getElementById('Id_'+indice).textContent);
        sessionStorage.setItem('Auteur_'+indice,document.getElementById('Auteur_'+indice).textContent);
        sessionStorage.setItem('Description_'+indice,document.getElementById('Description_'+indice).textContent);
        sessionStorage.setItem('Image_'+indice,document.getElementById('Image_'+indice).getAttribute('src'));

    } else {
        let nbreLivreEnFavori=sessionStorage.length/5;

    }


}

//---------------------------------CREATION DU TABLEAU MA POCHLIST-----------------------------------------------

function creationTableauEtInsertionPremierLivre(indice) {
    const tbl = document.createElement("table");
    tbl.width = '100%';
    tbl.setAttribute("border", "2");
    const tblBody = document.createElement("tbody");
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.style.width='50%';
    cell.style.verticalAlign = "top";
    insertionTrash(cell,indice);
    insertionIntituleLivre('Titre',cell,indice);
    insertionIntituleLivre('Id',cell,indice);
    insertionIntituleLivre('Auteur',cell,indice);
    insertionIntituleLivre('Description',cell,indice);
    insertionImage(cell,indice);
    row.appendChild(cell);
    const cell1 = document.createElement("td");
    cell1.style.width='50%';
    row.appendChild(cell1);
    tblBody.appendChild(row);
    tbl.appendChild(tblBody);
    document.getElementById("MaPochList").appendChild(tbl);

}


//---------- INSERTION DU TITRE , ID , AUTEUR , DESCRIPTION et IMAGE DANS LE TABLEAU MA POCHLIST------------

function insertionIntituleLivre (intitule,cell,indice) {
    var div = document.createElement("div");
    div.setAttribute('id',intitule+'_'+indice);
    div.setAttribute('id','favori_'+intitule+'_'+indice);
    div.innerHTML ="</br>"+ document.getElementById(intitule+'_'+indice).textContent+"</br>";
    div.style.margin = '10px';
    switch (intitule) {
        case 'Titre' :
            div.style.fontWeight = 'bold';
            break;
        case 'Id' :
            div.style.fontStyle = "italic";
            break;
    }
    cell.appendChild(div);
}
function insertionTrash(cell,indice) {
    var span = document.createElement("span");
    span.setAttribute('class','fa fa-trash fa-2x');
    span.setAttribute('id','trash_'+indice);
    span.setAttribute("style", "color:green;float:right;margin:10px");
    cell.appendChild(span);
}

function insertionImage(cell,indice) {
    var img = document.createElement("img");
    img.setAttribute('id','favori_Image_'+indice);
    img.setAttribute('src',document.getElementById('Image_'+indice).getAttribute('src'));
    img.setAttribute("style", "height:200px;margin:10px");
    cell.appendChild(img);
}

