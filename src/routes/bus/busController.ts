import express, {Router} from "express";
import {getAllBuses, getSingleBus} from './getBuses';
import {postBus} from "./postBus";
import {updateBus} from "./updateBus";
import {deleteBus} from "./deleteBus";
import {getBetweenLocation} from "./getBetweenLocation";
import {getRemainingSeats} from "./getRemainingSeats";

const router: Router = express.Router();
router.use(express.json());

router.get('/getBetweenLocation', getBetweenLocation);
router.get("/", getAllBuses);
router.get("/:id", getSingleBus);
router.get('/getRemainingSeats/:id', getRemainingSeats);
router.post("/newBus", postBus);
router.patch("/updateBus/:id", updateBus);
router.delete("/deleteBus/:id", deleteBus);

export default router;
