import session from 'express-session'
import { sessionConfig } from '../../config.js'

export const sessionHandler = session(sessionConfig)