const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')

const User = require('./models/user')

require('./database-connection')
const socketService = require('./socket-service')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const vansRouter = require('./routes/vans')
const bookRequestsRouter = require('./routes/book-requests')
const vanBuddyRequestsRouter = require('./routes/van-buddy-requests')
const accountRouter = require('./routes/account')

const app = express()

if (app.get('env') == 'development') {
  /* eslint-disable-next-line */
  app.use(require('connect-livereload')())
  /* eslint-disable-next-line */
  require('livereload')
    .createServer({ extraExts: ['pug'] })
    .watch([`${__dirname}/public`, `${__dirname}/views`])
}

app.set('io', socketService)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(
  session({
    secret: ['thisisasupersecuresecretsecretsecretssssshhhhhhh', 'ssssshhhhhhhsuperextraperfectsecretsecretsssshhhhhh'],
    store: new MongoStore({ mongoUrl: 'mongodb://mongo/caravansary', stringify: false }),
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/api',
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', (req, res, next) => {
  req.session.viewCount = req.session.viewCount || 0
  req.session.viewCount += 1
  next()
})

app.use('/api/', indexRouter)
app.use('/api/users', usersRouter)
app.use('/api/vans', vansRouter)
app.use('/api/book-requests', bookRequestsRouter)
app.use('/api/van-buddy-requests', vanBuddyRequestsRouter)
app.use('/api/account', accountRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send({
    status: err.status,
    message: err.message,
    stack: req.app.get('env') == 'development' ? err.stack : '',
  })
})

module.exports = app
