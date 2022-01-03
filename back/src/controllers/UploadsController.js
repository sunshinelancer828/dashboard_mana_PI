import UploadModel from "../models/Upload";
import TryCatchErrorDecorator from "../decorators/TryCatchErrorDecorator";

class UploadsController {
  @TryCatchErrorDecorator
  static async index(req, res) {
    const uploads = await UploadModel.find();
    res.json(uploads);
  }
  @TryCatchErrorDecorator
  static async addDevice(req, res) {
    const device = new UploadModel({
      title: req.body.data.title,
      ip: req.body.data.ip,
      wid: req.body.data.wifi_id,
      wpass: req.body.data.wifi_pass,
      link: req.body.data.link
    });
    const newDevice = await device.save();
    res.json({ status: "success", newDevice: newDevice });
  }
  @TryCatchErrorDecorator
  static async remove(req, res) {
    await UploadModel.findByIdAndDelete(req.body.id);
    res.json(req.body);
  }

  @TryCatchErrorDecorator
  static async update(req, res) {
    let device = await UploadModel.findById(req.body.device.id);
    device.title = req.body.device.title;
    device.ip = req.body.device.ip;
    device.wid = req.body.device.wifi_id;
    device.wpass = req.body.device.wifi_pass;
    device.link = req.body.device.link;
    await UploadModel.findByIdAndUpdate(req.body.device.id, device, { new: true });
    res.json(device);
  }
}

export default UploadsController;
