//Initialisation
const button_addbook=document.getElementById("bt_add");
const button_search=document.getElementById("bt_search");
const form_search=document.getElementById("divformsearch");
form_search.style.display='none';
//sessionStorage.clear();
BookmarkManager.loadingBooksFromBookmark();

// Déclencheur clique sur le bouton ajouter un book
button_addbook.addEventListener('click',function() {
    ClickManager.clickButtonAddBook();
});

// Déclencheur clique sur le bouton rechercher
button_search.addEventListener('click',function(event) {
    ClickManager.clickForSearch(event);
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
        div=DomManipulator.cellConstruction('search',books[i])
        document.getElementById("container").appendChild(div);
    }
}

 function getAllBooks(allBooks) {
    let arrayOfBooks = [];
    for (let i=0;i<allBooks.length;i++) {
        arrayOfBooks.push(new book(allBooks[i]));
    }
    return arrayOfBooks;
}

