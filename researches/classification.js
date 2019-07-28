'use strict'
async function classification(researches) {
    let t = ["thesis", "tesis"], pu = ["publication", "publicacion", "publicación"], pre = ["presentation", "presentacion", "presentación"]
    let theses = researches.filter(r => t.includes(r.type.toLowerCase()))
    let publications = researches.filter(r => pu.includes(r.type.toLowerCase()))
    let presentations = researches.filter(r => pre.includes(r.type.toLowerCase()))
    console.log('here')
    return {
        theses,
        publications,
        presentations
    }
}
module.exports = classification;