import { Response } from "express";

export const sendResponse =
  (status: number) => (res: Response, data?: any) => 
    res.status(status).json(data);

export const send200 = sendResponse(200);
export const send400 = sendResponse(400);
export const send401 = sendResponse(401);
export const send403 = sendResponse(403);
export const send404 = sendResponse(404);
export const send500 = sendResponse(500);
