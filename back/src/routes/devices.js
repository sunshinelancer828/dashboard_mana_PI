import { Router } from "express";
import DevicesController from "../controllers/DevicesController";
import Authorize from "../middleware/Authorize";

const router = Router();

router.get("/devices", Authorize.check, DevicesController.index);
router.post("/device/add", Authorize.check, DevicesController.addDevice);
router.post("/device/del", Authorize.check, DevicesController.remove);
router.post("/device/update", Authorize.check, DevicesController.update);

export default router;
