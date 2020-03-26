import express from "express";
import OngController from "./controllers/OngController";
import IncidentController from "./controllers/IncidentController";

const router = express.Router();

router.post("/ongs", OngController.create);
router.get("/ongs", OngController.findAll);

router.post("/incidents", IncidentController.create);
router.get("/incidents", IncidentController.findAll);
router.get("/incidents/:email", IncidentController.findAllByOngEmail);
router.delete("/incidents/:id", IncidentController.deleteById);

export default router;
