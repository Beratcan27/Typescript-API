import { ValidateSchema, Schemas } from "./../middlewares/ValidateSchema";
import express from "express";
import controller from "../controllers/AuthorController";

const router = express.Router();

router.get("/get/", ValidateSchema(Schemas.author.create), controller.readAll);
router.get("/get/:authorId", controller.readAuthor);
router.post("/create/", controller.createAuthor);
router.patch(
  "/update/:authorId",
  ValidateSchema(Schemas.author.update),
  controller.updateAuthor
);
router.delete("/delete/:authorId", controller.deleteAuthor);

export default router;
