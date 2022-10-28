import { Router } from "express";

import infoController from "../controllers/infoController.js";

const infoRoute = new Router()

infoRoute.get('/', infoController)

export default infoRoute