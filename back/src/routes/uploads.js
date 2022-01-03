import { Router } from "express";
import UploadsController from "../controllers/UploadsController";
import Authorize from "../middleware/Authorize";

const router = Router();

router.get("/uploads", Authorize.check, UploadsController.index);
// router.post("/upload/add", Authorize.check, UploadsController.addUpload);
// router.post("/upload/del", Authorize.check, UploadsController.remove);
// router.post("/upload/update", Authorize.check, UploadsController.update);

export default router;
