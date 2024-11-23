import { Router } from 'express';
import {
  allGastosController,
  findGastoController,
  createGastoController,
  updateGastoController,
  deleteGastoController
} from '../../controllers/gastos/gastosController.js'; // Assuming your gastos controller is in `gastosController.js`

const gastosRouter = Router();

// Rutas (Routes) for Gastos (Expenses)
gastosRouter.get('/', allGastosController);
gastosRouter.get('/:id', findGastoController);
gastosRouter.post('/', createGastoController);
gastosRouter.put('/:id', updateGastoController);
gastosRouter.delete('/:id', deleteGastoController);

export default gastosRouter;