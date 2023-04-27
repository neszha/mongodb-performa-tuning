import dotenv from 'dotenv'
import mongoose from 'mongoose'
import events from '../utils/events.js'

/** Membuat koneksi ke server MongoDB. */
dotenv.config()
const connection = process.env.MONGO_CONNECTION
mongoose.set('strictQuery', false) // Mengatur opsi strictQuery menjadi false
mongoose.set('runValidators', true)

mongoose.connect(connection).then(() => {
    console.log('Terkoneksi ke server MongoDB.')
    events.emit('mongodb-connected')
}).catch((err) => {
    console.log(err)
    process.exit()
})
