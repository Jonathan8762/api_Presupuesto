import { Router } from 'express';
import {
  allAhorrosController,
  findAhorroController,
  createAhorroController,
  updateAhorroController,
  deleteAhorroController
} from '../../controllers/ahorro/ahorroController.js';

const ahorroRouter = Router();


// Rutas 
ahorroRouter.get('/', allAhorrosController);
ahorroRouter.get('/:id', findAhorroController);
ahorroRouter.post('/', createAhorroController);
ahorroRouter.put('/:id', updateAhorroController);
ahorroRouter.delete('/:id', deleteAhorroController);

export default ahorroRouter;