import express, {Router} from 'express';
import {getAllUsers, getUser} from "./getUsers";
import {postUser} from "./postUser";

const router = Router();
router.use(express.json());

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/newUser', postUser);
// router.patch('/updateUser/:id');
// router.delete('/deleteUser/:id');

export default router;
