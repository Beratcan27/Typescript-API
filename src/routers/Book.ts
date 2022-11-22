import express from "express";
import controller from "../controllers/BookController";

const router = express.Router();

router.get("/get/", controller.readAll);
router.get("/get/:bookId", controller.readBook);
router.post("/create/", controller.createBook);
router.patch("/update/:bookId", controller.updateBook);
router.delete("/delete/:bookId", controller.deleteBook);


export default router;