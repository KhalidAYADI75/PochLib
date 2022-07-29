class BookmarkManager {

    static checkIfBookIsInBookmark(book) {
        let alreadyInBookmark=false;
        for(let key of Object.keys(sessionStorage)) {
            if (book.id==key) {
                alert ('Vous ne pouvez ajouter deux fois le même livre');
                alreadyInBookmark=true;
            }
        }
        return alreadyInBookmark;
    }

    static copyInBookmark(book) {
        var bookmark = document.getElementById("pochlistecontent");
        div=cellConstruction('bookmark',book);
        document.getElementById("pochlistecontent").appendChild(div);
    }

    static removeFromBookmark(book) {
       sessionStorage.removeItem(book.id);
    }

    static saveInBookmark (book) {
        sessionStorage.setItem(book.id, JSON.stringify(book));
    }

    static loadingBooksFromBookmark() {
        for(let key of Object.keys(sessionStorage)) {
            this.copyInBookmark(JSON.parse(sessionStorage.getItem(key)));
        }
    }
}