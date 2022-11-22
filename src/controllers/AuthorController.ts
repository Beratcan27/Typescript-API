import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Author from "../models/Author";


const createAuthor = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  const author = new Author({
    _id: new mongoose.Types.ObjectId(),
    name,
  });

  author
    .save()
    .then((author) => {
      res.status(201).json({ author });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const readAuthor = (req: Request, res: Response, next: NextFunction) => {
  Author.findById(req.params.authorId)
    .then((author) =>
      author
        ? res.status(201).json({ author })
        : res.status(404).json({ message: "Author is not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  Author.find()
    .then((authors) =>
      authors
        ? res.status(201).json({ authors })
        : res.status(404).json({ message: "Author is not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
  Author.findById(req.params.authorId).then((author) => {
    if (author) {
      author.set(req.body);
      return author
        .save()
        .then((author) => res.status(201).json({ author }))
        .catch((error) => res.status(500).json({ error }));
    } else {
      return res.status(404).json({ message: "Author is not found" });
    }
  });
};

const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
  Author.findByIdAndDelete(req.params.authorId)
    .then((author) =>
      author
        ? res.status(201).json({ message: "Author deleted" })
        : res.status(404).json({ message: "Author is not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createAuthor,
  updateAuthor,
  readAll,
  readAuthor,
  deleteAuthor,
};
