import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "./prisma-client";
import { send200, send401 } from "./response-helpers";

const secretKey = process.env.JWT_SECRET || "";

if (!secretKey) {
  throw new Error("JWT_SECRET not defined");
}

interface User {
  id: string;
  username: string;
  passwordHash: string;
}

const errorObj = { message: "Invalid credentials" };

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      name: username,
    },
  });
  if (!user) {
    return send401(res, errorObj);
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return send401(res, errorObj);
  }
  const token = jwt.sign({ sub: user.id }, secretKey, { expiresIn: "24h" });
  send200(res, { token });
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return send401(res, errorObj);
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, secretKey);
    //@ts-ignore
    req.user = { id: decoded.sub };
    next();
  } catch (err) {
    return send401(res, errorObj);
  }
}
