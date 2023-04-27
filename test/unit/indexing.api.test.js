import axios from 'axios'
import dotenv from 'dotenv'
import random from "random"

dotenv.config()

describe("Mengambil 20 data peserta menggunakan username:", () => {
    const port = process.env.PORT || 8000
    const baseURL = `http://localhost:${port}`
    const usernames = []

    beforeAll(() => {
        // Generate random 19 username.
        for (let i = 0; i < 19; i++) {
           const indexRandom = random.int(0, 2_500_000)
           usernames.push(`U-${indexRandom}`)
        }
        // Menambahkan 1 username yang tidak terdaftar.
        usernames.push('no-username')
    })

    test("Username tidak menggunakan index.", async () => {
        const promises = []
        usernames.forEach(username => {
            const url = `${baseURL}/api/participants/${username}/no-index`
            promises.push(axios.get(url))
        })
        await Promise.all(promises).catch(() => {})
        .finally(() => {
            expect(true).toEqual(true)
        })
    }, 1 * 60 * 1000)

    test("Username menggunakan index.", async () => {
        const promises = []
        usernames.forEach(username => {
            const url = `${baseURL}/api/participants/${username}/with-index`
            promises.push(axios.get(url))
        })
        await Promise.all(promises).catch(() => {})
        .finally(() => {
            expect(true).toEqual(true)
        })
    }, 1 * 60 * 1000)

})