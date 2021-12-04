import express, {Router} from "express";
import {getAllLocations, getSingleLocation} from "./getLocations";
import {postLocation} from "./postLocation";
import {updateLocation} from "./updateLocation";
import {deleteLocation} from "./deleteLocation";

const router = Router();
router.use(express.json());

router.get('/', getAllLocations);
router.get('/:id', getSingleLocation);
router.post('/newLocation', postLocation);
router.patch('/updateLocation/:id', updateLocation);
router.delete('/deleteLocation/:id', deleteLocation);

export default router;
