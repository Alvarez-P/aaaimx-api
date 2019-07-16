const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const jwt = require('express-jwt');
const { SECRET_TOKEN, WHITE_LIST } = require('./config')
const CollaboratorRouter = require('../collaborators/routes');
const ProjectRouter = require('../projects/routes');
const ResearchRouter = require('../researches/routes');
const UserRouter = require('../accounts/routes');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app middlewares
app.use(cors())
app.use(jwt({
  secret: SECRET_TOKEN
}).unless({ method: 'GET', path: WHITE_LIST }));
app.use('/projects', ProjectRouter);
app.use('/collaborators', CollaboratorRouter);
app.use('/researches', ResearchRouter);
app.use('/accounts', UserRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



const connection = require('../dao/connection')

async function test() {
  const { Collaborator, Partner } = await connection()
  let coll = {
    name: 'Mauricio Gabriel',
    lastname: 'Orozco-del-Castillo',
    active: true,
    Adscription: {
      institute: 'Tecnológico Nacional de México / I.T. Mérida'
    },
  }
  let coll2 = {
    name: 'Raul Aarmin',
    lastname: 'Novelo-Cruz',
    active: true,
    Adscription: {
      institute: 'Tecnológico Nacional de México / I.T. Mérida'
    },
  }

  let itm = {
    institute: 'Tecnológico Nacional de México / I.T. Mérida',
    sc_partner: false
  }
  const cond = {
    where: {
      name: coll.name,
      lastname: coll.lastname
    }
  }
  console.log(p)
  if (!p)
    p = await Partner.create(itm)
  else
    p = await Partner.update(p, { where: itm })

  

}

module.exports = app;
