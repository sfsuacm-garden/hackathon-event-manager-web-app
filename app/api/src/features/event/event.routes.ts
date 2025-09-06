import { Router } from "express";
import { createEvent, getEvent } from "./event.controller";

export const router = Router();

router.get("/:id", getEvent);
router.post("/", createEvent);
