import axios from 'axios'
import dotenv from 'dotenv'
import random from 'random'

dotenv.config()
const port = process.env.PORT || 8000
const baseURL = `http://localhost:${port}`

describe("[INDEX] Mengambil 20 data peserta menggunakan username:", () => {
    const usernames = []

    beforeAll(() => {
        // Generate random 15 username terdaftar.
        for (let i = 0; i < 15; i++) {
           const indexRandom = random.int(0, 2_500_000)
           usernames.push(`U-${indexRandom}`)
        }
        // Menambahkan 5 username yang tidak terdaftar.
        for (let i = 0; i < 5; i++) {
            usernames.push(`no-username-${i}`)
        }
    })

    test("Username tidak menggunakan index.", async () => {
        for (const username of usernames) {
            const url = `${baseURL}/api/participants/${username}/no-index`
            await axios.get(url).catch(() => {})
        }
        expect(true).toEqual(true)
    }, 1 * 60 * 1000)

    test("Username menggunakan index.", async () => {
        for (const username of usernames) {
            const url = `${baseURL}/api/participants/${username}/with-index`
            await axios.get(url).catch(() => {})
        }
        expect(true).toEqual(true)
    }, 1 * 60 * 1000)

})

describe("[COMPOUND INDEX] Mencari data peserta menggunakan ID kelas & ID ruangan:", () => {
    const queries = [] // {classId, roomId}

    beforeAll(async () => {
        // Mengambil data kelas dan ruangan.
        const url = `${baseURL}/api/class-and-room`
        const response = await axios.get(url)
        const {classes, rooms} = response.data

        // Membuat semua kombinasi kelas dan ruangan.
        const classIds = classes.map(item => item._id)
        const roomIdIds = rooms.map(item => item._id)
        for (let i = 0; i < classIds.length; i++) {
            for (let j = 0; j < roomIdIds.length; j++) {
                const query = {
                    classId: classIds[i], roomId: roomIdIds[j]
                }
                queries.push(query)
            }
        }
    })

    test("Fild classId dan roomId menggunakan index secara terpisah.", async () => {
        for (const query of queries) {
            const url = `${baseURL}/api/participants/search/with-index?classId=${query.classId}&roomId=${query.roomId}`
            await axios.get(url).catch(() => {})
        }
        expect(true).toEqual(true)
    }, 1 * 60 * 1000)

    test("Fild classId dan roomId menggunakan compound index.", async () => {
        for (const query of queries) {
            const url = `${baseURL}/api/participants/search/with-compound-index?classId=${query.classId}&roomId=${query.roomId}`
            await axios.get(url).catch(() => {})
        }
        expect(true).toEqual(true)
    }, 1 * 60 * 1000)

})