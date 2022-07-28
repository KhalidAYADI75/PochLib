class domManipulator {

    static createBookElement(parent,book) {
        parent.appendChild(this.componentCreation('div','Titre',book.title));
        parent.appendChild(this.componentCreation('div','Id',book.id));
        parent.appendChild(this.componentCreation('div','Description',book.description));
        parent.appendChild(this.componentCreation('img','',book.image));
    }

    static componentCreation(divOrImg,entitled,elementbook) {
        var creationDiv = document.createElement(divOrImg);
        if (divOrImg=='img') {
            creationDiv.src=elementbook;
            creationDiv.setAttribute('class','image');
        } else {
            creationDiv.textContent = entitled+" : "+elementbook;
            creationDiv.setAttribute('class',entitled);
        }
        return creationDiv;
    }
}