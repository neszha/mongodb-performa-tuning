import { NoIndexParticipantModel, ParticipantModel } from "./database/models/index.js"

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
    }

    /**
     * Method: POST
     */

}