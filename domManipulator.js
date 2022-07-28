class domManipulator {

function createBookElement(parent,book) {
    parent.appendChild(componentCreation('div','Titre',book.titre));
    parent.appendChild(componentCreation('div','Id',book.id));
    parent.appendChild(componentCreation('div','Description',book.description));
}
function componentCreation(divOrImg,entitled,elementbook) {
    var creationDiv = document.createElement(divOrImg);
    if (divOrImg=='img') {
        creationDiv.src=elementbook;
    } else {
        creationDiv.textContent = entitled +" : "+elementbook;
    }
    return creationDiv;
}



}