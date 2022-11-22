import { Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, password, passwordAgain } = req.body;
  const user = new User();
  const result = user.CheckPassword(password, passwordAgain);

  if (result) {
    const hashedPwd = await bcrypt.hash(password, 10);

    user.username = name;
    user.password = hashedPwd;
    user.passwordCheck = true;

    user
      .save()
      .then((user) => res.status(201).json({ user }))
      .catch((error) => res.status(500).json({ error }));
  } else {
    res.status(500).json({ message: "User can't create " });
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const name = req.body.name;
  const hashedPwd = await bcrypt.hash(req.body.password, 10);
  console.log(hashedPwd);

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    password: hashedPwd,
  });
  user
    .save()
    .then((user) => {
      res.status(201).json({ user });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  User.find()
    .then((users) =>
      users
        ? res.status(201).json({ users })
        : res.status(404).json({ message: "User is not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  User.findById(userId)
    .then((user) =>
      user
        ? res.status(201).json({ user })
        : res.status(404).json({ message: "User is not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const name = req.body.name;
  const password = req.body.password;
  const hashedPwd = await bcrypt.hash(password, 10);
  User.findById(userId).then((user) => {
    if (user) {
      user.set({
        name: name,
        password: hashedPwd,
      });
      return user
        .save()
        .then((user) => res.status(201).json({ user }))
        .catch((error) => res.status(500).json({ error }));
    } else {
      return res.status(404).json({ message: "User is not found" });
    }
  });
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  User.findByIdAndDelete(req.params.userId)
    .then((user) => {
      user
        ? res.status(201).json({ message: "User deleted" })
        : res.status(500).json({ message: "User is not Found" });
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteAll = (req: Request, res: Response, next: NextFunction) => {
  User.remove().then(() => res.json({ message: "Delete All" }));
};

export default {
  createUser,
  deleteAll,
  updateUser,
  readAll,
  readUser,
  deleteUser,
  register,
};
