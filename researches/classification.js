'use strict'
function classification(researches){
    let t = ["thesis", "tesis"], pu = ["publication", "publicacion", "publicación"], pre = ["presentation", "presentacion", "presentación"]
    let r = [], thesis = [], pub = [], presentation = []
    researches.forEach((element) => {
        if (t.includes(element.type.toLowerCase())) thesis.push(element)
        if (pu.includes(element.type.toLowerCase())) pub.push(element)
        if (pre.includes(element.type.toLowerCase())) presentation.push(element)
    });
    r = [thesis, pub, presentation]
    return r
}
module.exports = classification;