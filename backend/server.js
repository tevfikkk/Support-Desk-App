const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')
const app = express()

// Connect to database
connectDB()

// Middleware
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false,
  })
)

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../', 'frontend', 'index.html')
  )
} else {
  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to the Support Desk API',
    })
  })
}

//Middleware ERROR
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
