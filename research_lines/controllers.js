const connection = require('../dao/connection')

// const { encodePassword } = require('../../utils/service')

async function createOrUpdate(line) {
    const { InteresedAreas } = await connection()
    let cond
    let existingResearchLine

    if (line.topic) {
        cond = {
            where: {
                topic: line.topic
            }
        }
    }
    existingResearchLine = await InteresedAreas.findOne(cond)

    if (existingResearch) {
        const updated = await InteresedAreas.update(line, cond)
        return updated ? InteresedAreas.findOne(cond) : existingResearchLine
    }

    const result = await InteresedAreas.create(line)
    return result.toJSON()
}

async function getResearchLines(researchlines) {
    for (let index = 0; index < researchlines.length; index++) {
        let coll = researchlines[index]
        console.log(coll)
        coll.dataValues.projects = await coll.getProjects();
        let researches = await coll.getResearches();
        let t = ["thesis", "tesis"], pu = ["publication", "publicacion", "publicación"], pre = ["presentation", "presentacion", "presentación"]
        let thesis = [], pub = [], presentation = []
        researches.forEach((element) => {
            if(t.includes(element.type.toLowerCase())) thesis.push(element)
            if(pu.includes(element.type.toLowerCase())) pub.push(element)
            if(pre.includes(element.type.toLowerCase())) presentation.push(element)
        });
        coll.dataValues.researches_thesis = thesis 
        coll.dataValues.researches_publication = pub 
        coll.dataValues.researches_presentation = presentation 
    }
    return researchlines
}

module.exports = {
    createOrUpdate,
    getResearchLines
}