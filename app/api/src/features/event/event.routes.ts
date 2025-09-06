import { Router } from "express";
import {  getEventById, getEventsByQuery } from "./event.controller";

export const router = Router();

router.get("/:id", getEventById);

router.get("/", getEventsByQuery);
