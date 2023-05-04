import express from "express";
import userController from "../controllers/user-controller.js";
const router = express.Router();

router.post('/signup', userController.registration);
router.post('/signin', userController.login);
router.get('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUser);
router.get('/profile/:id', userController.getProfile)
router.get('/auth', userController.checkCookie);
router.post('/reset', userController.resetPassword);
router.get('/setpassword/:link', userController.checkResetLink)
router.put('/setpassword/:link', userController.setNewPassword);
router.put('/assign-password', userController.assignNewPassword);
router.put('/update-profile', userController.updateProfile);
router.post('/requests/roles', userController.createRolesRequest);
router.put('/responds/roles', userController.rolesRespond);
router.get('/roles-requests', userController.rolesRequests)

export default router;