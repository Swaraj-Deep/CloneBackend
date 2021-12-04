import express, {Router} from "express";
import {getAllBuses, getSingleBus} from './getBuses';
import {postBus} from "./postBus";
import {updateBus} from "./updateBus";
import {deleteBus} from "./deleteBus";

const router: Router = express.Router();
router.use(express.json());

router.get("/", getAllBuses);
router.get("/:id", getSingleBus);
router.post("/newBus", postBus);
router.patch("/updateBus/:id", updateBus);
router.delete("/deleteBus/:id", deleteBus);

export default router;
