import '../src/database/index.js'
import events from '../src/utils/events.js'
import { ParticipantModel } from "../src/database/models/index.js"

const classId = '641f4b6138a21edf832d6e4b'
const roomId = '6449f783ac2883419e3aeadb'
const batchSize = 100_000
const totalData = 2_500_000

console.clear()
events.on('mongodb-connected', async () => {
    let count = 0
    while (count < totalData) {
        console.log(`Menyiapkan data ${batchSize} dummy...`)
        const participants = []
        for (let i = count; i < count + batchSize && i < totalData; i++) {
            const data = {
                username: 'U-' + i,
                password: 'P-' + i,
                studentId: 'ID-' + i,
                name: 'Participant-' + i,
                schoolName: '-',
                classId,
                roomId,
                session: '1'
            }
            participants.push(data)
        }
        console.log(`Import ${participants.length} data ke database....`)
        await ParticipantModel.insertMany(participants)
        count += batchSize
        console.log(`Proses import ${count} selesai.`)
    }
    process.exit()
})
