import express, {Router} from 'express';
import {getAllUsers, getUser} from "./getUsers";
import {postUser} from "./postUser";
import {updateUser} from "./updateUser";
import {deleteUser} from "./deleteUser";

const router = Router();
router.use(express.json());

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/newUser', postUser);
router.patch('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);

export default router;
