import { Router } from "express";
import { createEvent, getEvent } from "./event.controller";

const router = Router();

router.get("/:id", getEvent);
router.post("/", createEvent);

export default router;
