class DomManipulator {

    static cellConstruction(searchOrBookmark,book) {
        var divParent = document.createElement("div");
        divParent.style.height = "370px";
        divParent.style.border = "1px solid grey";
        divParent.style.padding = "20px";
        if (searchOrBookmark=='search') {
            var span=this.iconCreation(divParent,'search');
        } else {
            var span=this.iconCreation(divParent,'bookmark');
        }
        this.createBookElement(divParent,book);
        span.addEventListener('click', function() {
            BookmarkManager.clickOnIcon(span,book);
        });
        return divParent;
    }

    static createBookElement(parent,book) {
        parent.appendChild(this.componentCreation('h3','Titre',book.title));
        parent.appendChild(this.componentCreation('i','Id',book.id));
        parent.appendChild(this.componentCreation('p','Auteur',book.author));
        parent.appendChild(this.componentCreation('p','Description',book.description));
        parent.appendChild(this.componentCreation('img','',book.image));
    }

    static componentCreation(typeOfTag,entitled,elementbook) {
        var creationTag = document.createElement(typeOfTag);
        if (typeOfTag=='img') {
            creationTag.src=elementbook;
            creationTag.setAttribute('class','image');
        } else {
            creationTag.textContent = entitled+" : "+elementbook;
            creationTag.setAttribute('class',entitled);
        }
        return creationTag;
    }

    static iconCreation(parent,searchOrBookmark) {
        var span = document.createElement('span');
        if (searchOrBookmark=='search') {
            span.setAttribute('class','fa fa-bookmark fa-2x');
        } else {
            span.setAttribute('class','fa fa-trash fa-2x');
        }
        parent.appendChild(span);
        return span;
    }
}