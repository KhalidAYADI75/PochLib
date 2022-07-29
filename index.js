//Initialisation
const button_addbook=document.getElementById("bt_add");
const button_search=document.getElementById("bt_search");
const form_search=document.getElementById("divformsearch");
form_search.style.display='none';
//sessionStorage.clear();
BookmarkManager.loadingBooksFromBookmark();

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
    if (searchOrBookmark=='search') {
        var span=DomManipulator.iconCreation(divParent,'search');
    } else {
        var span=DomManipulator.iconCreation(divParent,'bookmark');
    }
    DomManipulator.createBookElement(divParent,book);
    span.addEventListener('click', function() {
        clickOnIcon(span,book);
    });

    span.addEventListener('mouseover', function() {
            span.setAttribute('style','float:right;color:green;cursor:pointer');
        });
    return divParent;

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
        dejaDansBookmark=BookmarkManager.checkIfBookIsInBookmark(book);
        if (dejaDansBookmark==false) {
            BookmarkManager.copyInBookmark(book);
            BookmarkManager.saveInBookmark(book);
        }
    } else {
        BookmarkManager.removeFromBookmark(book);
    }
}