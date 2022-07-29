class ClickManager {

    static clickButtonAddBook() {
        if (form_search.style.display=='none') {
          form_search.style.display=""; }
        else {
            form_search.style.display="none";
        }
    }

    static clickForSearch(event) {
        event.preventDefault();
        if ((document.getElementById("title_book").value == "") || (document.getElementById("author").value == "")) {
            alert ("Vous devez saisir le titre et l'auteur du livre");
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
    }

}