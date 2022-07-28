class domManipulator {

    static createBookElement(parent,book) {
        parent.appendChild(this.componentCreation('h3','Titre',book.title));
        parent.appendChild(this.componentCreation('i','Id',book.id));
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
        span.setAttribute('style','float:right;font-weight:bold;position:relative;color:green');
        parent.appendChild(span);
        return span;
    }
}