import { QuestionModel } from "./database/models/index.js"
import { NoIndexParticipantModel, ParticipantModel, ExamModel, ManagerModel } from "./database/models/index.js"
import redis from "./database/redis.db.js"

export default {
    /**
     * Method: GET
     */
    async getParticipantByUsernameNoIndex(req, res) {
        const response = {type: 'no-index'}

        // Mengambil parameter.
        const username = req.params.username

        // Mengambil data di dalam database.
        const participant = await NoIndexParticipantModel.findOne({username}).lean()
        if(!participant) {
            response.msg = 'Peserta tidak ditemukan!'
            return res.status(404).json(response)
        }

        // Kembalikan respon.
        response.data = participant
        return res.json(response)
    },

    async getParticipantByUsernameWithIndex(req, res) {
        const response = {type: 'with-index'}

        // Mengambil parameter.
        const username = req.params.username

        // Mengambil data di dalam database.
        const participant = await ParticipantModel.findOne({username}).lean()
        if(!participant) {
            response.msg = 'Peserta tidak ditemukan!'
            return res.status(404).json(response)
        }

        // Kembalikan respon.
        response.data = participant
        return res.json(response)
    },

    async getExamInfoByIdNoCaching(req, res) {
        const response = {type: 'no-caching'}

        // Mengambil parameter.
        const examId = req.params.examId

        // Mengambil data test.
        const test = await ExamModel.findOne({_id: examId})
            .populate({
                path: 'participants.id',
                select: {
                    username: 1, name: 1
                }
            })
            .lean()
        if(!test) {
            response.msg = 'Data tidak ditemukan!'
            return res.status(404).json(response)
        }

        // Mengambil data daftar soal.
        let questionIds = []
        test.question.groups.forEach(group => {
            questionIds = questionIds.concat(group.questions)
        })
        const questions = await QuestionModel.find({_id: questionIds}).lean()
        test.question.list = questions

        // Kembalikan respon.
        response.data = test
        return res.json(response)
    },

    async getExamInfoByIdWithCaching(req, res) {
        const response = { type: 'with-caching', from: 'MongoDB' }

        // Mengambil parameter.
        const examId = req.params.examId

        // Mengecek dan mengambil data dari redis.
        const cacheKey = `cache:exams-info:${examId}`
        const cacheTestString = await redis.get(cacheKey)
        if(cacheTestString) {
            const cacheTest = JSON.parse(cacheTestString)
            response.data = cacheTest
            response.from = 'Redis'
            return res.json(response)
        }

        // Mengambil data test.
        const test = await ExamModel.findOne({_id: examId})
            .populate({
                path: 'participants.id',
                select: { username: 1, name: 1 }
            })
            .lean()
        if(!test) {
            response.msg = 'Data tidak ditemukan!'
            return res.status(404).json(response)
        }

        // Mengambil data daftar soal.
        let questionIds = []
        test.question.groups.forEach(group => {
            questionIds = questionIds.concat(group.questions)
        })
        const questions = await QuestionModel.find({_id: questionIds}).lean()
        test.question.list = questions

        // Cache data ke dalam redis.
        redis.set(cacheKey, JSON.stringify(test), {EX: 5})

        // Kembalikan respon.
        response.data = test
        return res.json(response)
    }

    /**
     * Method: POST
     */

}