import express, {Router} from "express";
import {getAllBusLayouts, getSingleBusLayout} from "./getBusLayouts";
import {postBusLayout} from "./postBusLayout";
import {updateBusLayout} from "./updateBusLayout";
import {deleteBusLayout} from "./deleteBusLayout";

const router = Router();
router.use(express.json());
router.get('/', getAllBusLayouts);
router.get('/:id', getSingleBusLayout);
router.post('/newBusLayout', postBusLayout);
router.patch('/updateBusLayout/:id', updateBusLayout);
router.delete('/deleteBusLayout/:id', deleteBusLayout);

export default router;
