// /src/routes/eventoRoutes.js
import express from 'express';
import { addEvento } from '../controllers/eventController.js';

const router = express.Router();

router.post('/eventos', addEvento);

export default router;