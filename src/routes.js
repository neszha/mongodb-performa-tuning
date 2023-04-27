import { Router } from 'express'
import controllers from './controllers.js'

const route = Router()

/** API mencari data peserta: no-index */
route.get('/api/participants/:username/no-index', controllers.getParticipantByUsernameNoIndex)

/** API mencari data peserta: with-index */
route.get('/api/participants/:username/with-index', controllers.getParticipantByUsernameWithIndex)

export default route