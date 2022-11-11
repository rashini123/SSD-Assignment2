import express from 'express';
import downloadableController from '../controllers/downloadableController.js';
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(downloadableController.createMaterial)
                 .get(downloadableController.getAllMaterials)

router.route('/:id').delete(downloadableController.deleteMaterial)
router.route('/:id').get(downloadableController.getMaterialById)
router.route('/conference/:id').get(downloadableController.getMaterialByConferenceId)

export default router;
