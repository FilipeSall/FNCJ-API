import express from 'express';
import { addInstituicao, getAllInstituicoes } from '../controllers/instituicaoController.js';

const router = express.Router();

router.post('/instituicoes', addInstituicao);
router.get('/instituicoes', getAllInstituicoes);

export default router;