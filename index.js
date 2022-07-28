//Initialisation
const button_addbook=document.getElementById("bt_add");
const button_search=document.getElementById("bt_search");
const form_search=document.getElementById("divformsearch");
form_search.style.display='none';
//sessionStorage.clear();
loadingBooksFromBookmark();

// Déclencheur clique sur le bouton ajouter un book
button_addbook.addEventListener('click',function() {
    if (form_search.style.display=='none') {
      form_search.style.display=""; }
    else {
        form_search.style.display="none";
    }
});

// Déclencheur clique sur le bouton rechercher
button_search.addEventListener('click',function(event) {
    event.preventDefault();
    if ((document.getElementById("title_book").value == "") || (document.getElementById("author").value == "")) {
        alert ("Vous devez saisir le titre et l'author du book");
    } else {
        const tbook=document.getElementById("title_book").value;
        const author=document.getElementById("author").value;
        fetch("https://www.googleapis.com/books/v1/volumes?q="+tbook+"inauthor:"+author+"&key=AIzaSyB9_kmuvdfj1aK_QY8c3JwHzDAYcsWd0HU")
        .then(function(res) {
        if (res.ok) {
        return (res.json());
        }
        })
        .then(function(bookSearchResults) {
        showResults(bookSearchResults);
        deleteEnteredData();
        })
        .catch (function(err) {
        alert ("Erreur de traitement");
        })
    }
});

function showResults(bookSearchResults) {
    let books = [];
    books = getAllBooks(bookSearchResults.items);
    document.getElementById("container").innerHTML="";
    if (books.length==0) {
      document.getElementById("container").innerHTML="</br>Aucun book n'a été trouvé</br></br></br>";
    } else {
       showAllBooks(books);
    }
}

function deleteEnteredData() {
    document.getElementById("title_book").value="";
    document.getElementById("author").value="";
}

function showAllBooks(books) {
     var Container = document.getElementById("container");
     for (let i=0;i<books.length;i++) {
        div=cellConstruction('search',books[i])
        document.getElementById("container").appendChild(div);
    }
}

function cellConstruction(searchOrBookmark,book) {
    var divParent = document.createElement("div");
    divParent.style.height = "370px";
    divParent.style.border = "1px solid grey";
    divParent.style.padding = "20px";
    var span=domManipulator.iconCreation(divParent,'search');
    domManipulator.createBookElement(divParent,book);
    span.addEventListener('click', function() { clickOnIcon(span,book); });

    return divParent;

 /*   var divParent = document.createElement("div");
    divParent.style.height = "370px";
    divParent.style.border = "1px solid grey";
    divParent.style.padding = "20px";

    creationComposant('div','Titre',divParent,lebook.titre,'font-weight:bold;margin-top:20px;');

    var span = document.createElement("span");
    if (rechercheOuBookmark=='recherche') {
        span.setAttribute('class','fa fa-bookmark fa-2x');
    } else {
        span.setAttribute('class','fa fa-trash fa-2x');
    }
    span.setAttribute('style','float:right;font-weight:bold;position:relative;top:-20px;color:green');
    divParent.appendChild(span);

    creationComposant('div','Id',divParent,lebook.id,'font-style:italic;margin-top:20px;');
    creationComposant('div','author',divParent,lebook.author,'margin-top:20px;');
    creationComposant('div','Description',divParent,lebook.description,'margin-top:20px;');
    creationComposant('img','',divParent,lebook.image,'margin-top:30px;width:80px');

    span.addEventListener('click', function() {
        let dejaDansBookmark;
        if (span.getAttribute('class')=='fa fa-bookmark fa-2x') {
            dejaDansBookmark=checkIfBookIsInBookmark(lebook);
            if (dejaDansBookmark==false) {
                 copyInBookmark(lebook);
                 saveInBookmark(lebook);
            }
        } else {
            removeFromBookmark(lebook);
        }
    });
    span.addEventListener('mouseover', function() {
        span.setAttribute('style','float:right;font-weight:bold;position:relative;top:-20px;color:green;cursor:pointer');
    });
    return divParent; */
}

function checkIfBookIsInBookmark(book) {
    let alreadyInBookmark=false;
    for(let key of Object.keys(sessionStorage)) {
        if (book.id==key) {
            alert ('Vous ne pouvez ajouter deux fois le même book');
            alreadyInBookmark=true;
        }
    }
    return alreadyInBookmark;
}

function copyInBookmark(book) {
    var bookmark = document.getElementById("pochlistecontent");
    div=cellConstruction('bookmark',book);
    document.getElementById("pochlistecontent").appendChild(div);
}

function removeFromBookmark(book) {
   sessionStorage.removeItem(book.id);
}

function saveInBookmark (book) {
    sessionStorage.setItem(book.id, JSON.stringify(book));
}

function loadingBooksFromBookmark() {
    for(let key of Object.keys(sessionStorage)) {
        copyInBookmark(JSON.parse(sessionStorage.getItem(key)));
    }
}
 function getAllBooks(allBooks) {
    let arrayOfBooks = [];
    for (let i=0;i<allBooks.length;i++) {
        arrayOfBooks.push(new book(allBooks[i]));
    }
    return arrayOfBooks;
}

function clickOnIcon(span,book) {
    let dejaDansBookmark;
    if (span.getAttribute('class')=='fa fa-bookmark fa-2x') {
        dejaDansBookmark=checkIfBookIsInBookmark(book);
        if (dejaDansBookmark==false) {
            copyInBookmark(book);
            saveInBookmark(book);
        }
    } else {
        removeFromBookmark(book);
    }
}