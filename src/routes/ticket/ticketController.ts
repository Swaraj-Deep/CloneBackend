import express, {Router} from "express";
import {getAllTickets, getSingleTicket} from "./getTickets";
import {postTicket} from "./postTicket";
import {updateTicket} from "./updateTicket";
import {deleteTicket} from "./deleteTicket";
import {cancelBookedTicket} from "./cancelBookedTicket";

const router = Router();
router.use(express.json());

router.get('/', getAllTickets);
router.get('/:id', getSingleTicket);
router.post('/newTicket', postTicket);
router.patch('/updateTicket/:id', updateTicket);
router.delete('/deleteTicket/:id', deleteTicket);
router.delete('/cancelTicket/:id', cancelBookedTicket);

export default router;
