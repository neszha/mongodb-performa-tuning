import { Router } from 'express'
import controllers from './controllers.js'

const route = Router()

/** API: Megambil data peserta menggunakan username. */
route.get('/api/participants/:username/no-index', controllers.getParticipantByUsernameNoIndex) // Tanpa index.
route.get('/api/participants/:username/with-index', controllers.getParticipantByUsernameWithIndex) // Menggunakan index.

/** API: Mengambil data tes lengkap. */
route.get('/api/exams/:examId/no-caching', controllers.getExamInfoByIdNoCaching) // Tanpa caching.
route.get('/api/exams/:examId/with-caching', controllers.getExamInfoByIdWithCaching) // Menggunakan caching.

/** API: Pendukung test. */
route.get('/api/exams', controllers.getExams)

export default route