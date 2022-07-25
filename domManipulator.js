class domManipulator {

function createBookElement(parent,livre) {
    parent.appendChild(creationComposant('div','Titre',livre.titre));
}
function creationComposant(divOuImg,intitule,elementLivre) {
    var creationDiv = document.createElement(divOuImg);
    if (divOuImg=='img') {
        creationDiv.src=elementLivre;
    } else {
        creationDiv.textContent = "Titre : "+elementLivre;
    }
    return creationDiv;
}



}