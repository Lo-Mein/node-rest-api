import express from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../db/users";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["RYAN_AUTH"];

    if (!sessionToken) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) {
      return res.status(403).json({ error: "User ID does not exist!" });
    }

    if (currentUserId.toString() !== id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to perform this action!" });
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};
