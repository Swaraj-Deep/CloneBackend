import express, {Router} from "express";
import {deleteCompany} from "./deleteCompany";
import {getAllCompanies, getSingleCompany} from "./getCompanies";
import {postCompany} from "./postCompany";
import {updateCompany} from "./updateCompany";

const router = Router();
router.use(express.json());

router.get('/', getAllCompanies);
router.get('/:id', getSingleCompany);
router.post('/newCompany', postCompany);
router.patch('/updateCompany/:id', updateCompany);
router.delete('/deleteCompany/:id', deleteCompany);

export default router;
