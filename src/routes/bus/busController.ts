import express, {Router} from "express";
import {getAllBuses, getSingleBus} from './getBuses';
import {postBus} from "./postBus";

const router: Router = express.Router();
router.use(express.json());

router.get("/", getAllBuses);
router.get("/:id", getSingleBus);
router.post("/newBus", postBus);
router.patch("/updateBus/:id", (req, res, next) => {
});
router.delete("/deleteBus/:id", (req, res, next) => {
});

export default router;
