'use strict'

const Sequelize = require('sequelize')
let sequelize = null
const config = require('./config')
const CollaboratorModel = require('../models/collaborator')
const ResearchModel = require('../models/research')
const UserModel = require('../models/user')
const connection = require('./connection')

async function setup() {
    let force = true
    await connection(force)
}

setup()