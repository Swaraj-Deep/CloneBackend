import express, {Router} from "express";
import {getAllBuses} from './getBuses';

const router: Router = express.Router();
router.use(express.json());

router.get("/buses", getAllBuses);
router.get("/buses/:id", (req, res, next) => {
});
router.post("/newBus", (req, res, next) => {
});
router.patch("/updateBus/:id", (req, res, next) => {
});
router.delete("/deleteBus/:id", (req, res, next) => {
});

export default router;
