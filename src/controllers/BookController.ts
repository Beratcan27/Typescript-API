import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Book from "../models/Book";

const createBook = (req: Request, res: Response, next: NextFunction) => {
  const { title, author } = req.body;

  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    title,
    author,
  });

  book
    .save()
    .then((book) => {
      res.status(201).json({ book });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const readBook = (req: Request, res: Response, next: NextFunction) => {
  Book.findById(req.params.bookId)
    .populate("author")
    .select("-__v")
    .then((book) =>
      book
        ? res.status(201).json({ book })
        : res.status(404).json({ message: "Book is not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  Book.find()
    .populate("author")
    .select("-__v")
    .then((books) =>
      books
        ? res.status(201).json({ books })
        : res.status(404).json({ message: "Book is not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const updateBook = (req: Request, res: Response, next: NextFunction) => {
  Book.findById(req.params.bookId).then((book) => {
    if (book) {
      book.set(req.body);
      return book
        .save()
        .then((book) => res.status(201).json({ book }))
        .catch((error) => res.status(500).json({ error }));
    } else {
      return res.status(404).json({ message: "Book is not found" });
    }
  });
};

const deleteBook = (req: Request, res: Response, next: NextFunction) => {
  Book.findByIdAndDelete(req.params.bookId)
    .then((book) =>
      book
        ? res.status(201).json({ message: "Book deleted" })
        : res.status(404).json({ message: "Book is not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createBook,
  updateBook,
  readAll,
  readBook,
  deleteBook,
};
