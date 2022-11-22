import express from "express";
import controller from "../controllers/UserController";

const router = express.Router();

// router.post("/create", controller.createUser);
router.post("/deleteAll", controller.deleteAll);
router.get("/get/", controller.readAll);
router.get("/get/:userId", controller.readUser);
router.patch("/update/:userId", controller.updateUser);
router.post("/delete/:userId", controller.deleteUser);

router.post("/register", controller.register);

export default router;
