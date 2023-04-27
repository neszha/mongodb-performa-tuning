import axios from 'axios'
import dotenv from 'dotenv'
import random from 'random'

dotenv.config()
const port = process.env.PORT || 8000
const baseURL = `http://localhost:${port}`

describe("[CACHING] Mengambil 100 kali data tes menggunakan ID yang sama:", () => {
    const loopTotal = 100
    let examId = ''

    beforeAll(async() => {
        // Mendapatkan semua exams ID.
        const url = `${baseURL}/api/exams`
        const response = await axios.get(url)
        const ids = response.data.data.map(item => item._id)
        examId = ids[random.int(0, ids.length - 1)]
    })

    test("API tidak mengguanakan caching data.", async () => {
        const array = new Array(loopTotal)
        for (const item of array.entries()) {
            const url = `${baseURL}/api/exams/${examId}/no-caching`
            await axios.get(url).catch(() => {})
        }
        expect(true).toEqual(true)
    }, 1 * 60 * 1000)

    test("API mengguanakan caching data.", async () => {
        const array = new Array(loopTotal)
        for (const item of array.entries()) {
            const url = `${baseURL}/api/exams/${examId}/witch-caching`
            await axios.get(url).catch(() => {})
        }
        expect(true).toEqual(true)
    }, 1 * 60 * 1000)

})

describe("[CACHING] Mengambil 100 kali data tes menggunakan ID acak:", () => {
    const loopTotal = 100
    let examIds = []

    beforeAll(async() => {
        // Mendapatkan semua exams ID.
        const url = `${baseURL}/api/exams`
        const response = await axios.get(url)
        examIds = response.data.data.map(item => item._id)
    })

    test("API tidak mengguanakan caching data.", async () => {
        const array = new Array(loopTotal)
        for (const item of array.entries()) {
            const examId = examIds[random.int(0, examIds.length - 1)]
            const url = `${baseURL}/api/exams/${examId}/no-caching`
            await axios.get(url).catch(() => {})
        }
        expect(true).toEqual(true)
    }, 1 * 60 * 1000)

    test("API mengguanakan caching data.", async () => {
        const array = new Array(loopTotal)
        for (const item of array.entries()) {
            const examId = examIds[random.int(0, examIds.length - 1)]
            const url = `${baseURL}/api/exams/${examId}/witch-caching`
            await axios.get(url).catch(() => {})
        }
        expect(true).toEqual(true)
    }, 1 * 60 * 1000)

})