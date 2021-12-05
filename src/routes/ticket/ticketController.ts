import express, {Router} from "express";
import {getAllTickets, getSingleTicket} from "./getTickets";
import {postTicket} from "./postTicket";
import {updateTicket} from "./updateTicket";
import {deleteTicket} from "./deleteTicket";

const router = Router();
router.use(express.json());

router.get('/', getAllTickets);
router.get('/:id', getSingleTicket);
router.post('/newTicket', postTicket);
router.patch('/updateTicket/:id', updateTicket);
router.delete('/deleteTicket/:id', deleteTicket);

export default router;
