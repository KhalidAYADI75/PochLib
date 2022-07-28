class domManipulator {

    static createBookElement(parent,book) {
        parent.appendChild(this.componentCreation('h3','Titre',book.title));
        parent.appendChild(this.componentCreation('i','Id',book.id));
        parent.appendChild(this.componentCreation('p','Description',book.description));
        parent.appendChild(this.componentCreation('img','',book.image));
    }

    static componentCreation(typeOfTag,entitled,elementbook) {
        var creationDiv = document.createElement(typeOfTag);
        if (typeOfTag=='img') {
            creationDiv.src=elementbook;
            creationDiv.setAttribute('class','image');
        } else {
            creationDiv.textContent = entitled+" : "+elementbook;
            creationDiv.setAttribute('class',entitled);
        }
        return creationDiv;
    }
}