'use strict'
async function classification(researches) {
    let t = ["thesis", "tesis"], pu = ["publication", "publicacion", "publicación"], pre = ["presentation", "presentacion", "presentación"]
    let theses = [], publications = [], presentations = []
    researches.forEach(async (element) => {
        if (t.includes(element.type.toLowerCase())) theses.push(element)
        if (pu.includes(element.type.toLowerCase())) publications.push(element)
        if (pre.includes(element.type.toLowerCase())) presentations.push(element)
    });
    return {
        theses,
        publications,
        presentations
    }
}
module.exports = classification;