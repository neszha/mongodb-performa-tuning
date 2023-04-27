import { Router } from 'express'
import controllers from './controllers.js'

const route = Router()

/** API: Megambil data peserta menggunakan username. */
route.get('/api/participants/search/with-index', controllers.getParticipantByClassAndRoomWithIndex) // Menggunakan index terpisah.
route.get('/api/participants/search/with-compound-index', controllers.getParticipantByClassAndRoomWithCompoundIndex) // Menggunakan compound index.
route.get('/api/participants/:username/no-index', controllers.getParticipantByUsernameNoIndex) // Tanpa index.
route.get('/api/participants/:username/with-index', controllers.getParticipantByUsernameWithIndex) // Menggunakan index.

/** API: Mengambil data tes lengkap. */
route.get('/api/exams/:examId/no-caching', controllers.getExamInfoByIdNoCaching) // Tanpa caching.
route.get('/api/exams/:examId/with-caching', controllers.getExamInfoByIdWithCaching) // Menggunakan caching.

/** API: Pendukung test. */
route.get('/api/exams', controllers.getExams)
route.get('/api/class-and-room', controllers.getClassAndRoom)

export default route