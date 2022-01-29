import 'dotenv/config'
import express from 'express'
const app = express()
import mongoose from 'mongoose'
import { subscribersRouter } from './routes/subscribers'

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

app.use('/subscribers', subscribersRouter)

app.listen(3000, () => console.log('server started'))
