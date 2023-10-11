import express from "express";

import { deleteUserById, getUsers, getUserById } from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.status(200).json(deletedUser).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { userName } = req.body;

    if (!userName) {
      return res.status(400).json({ error: "userName is required" });
    }

    const user = await getUserById(id);

    user.userName = userName;
    await user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};
