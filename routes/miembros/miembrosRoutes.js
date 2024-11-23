import { Router } from 'express';
import {
  allMiembrosController,
  findMiembroController,
  createMiembroController,
  updateMiembroController,
  deleteMiembroController
} from '../../controllers/miembros/miembrosController.js'; 

const miembrosRouter = Router();

// Rutas (Routes) para Miembros (Individuos)
miembrosRouter.get('/', allMiembrosController);
miembrosRouter.get('/:id', findMiembroController);
miembrosRouter.post('/', createMiembroController);
miembrosRouter.put('/:id', updateMiembroController);
miembrosRouter.delete('/:id', deleteMiembroController);

export default miembrosRouter;
