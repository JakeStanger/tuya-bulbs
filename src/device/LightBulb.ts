import Device from "tuyapi";
import IDevice from "tuyapi";

class LightBulb {
  private device: Device;

  constructor(id: string, key: string) {
    this.log = this.log.bind(this);

    this.device = new Device({
      id,
      key,
    });

    this.device.on("data", this.log);
  }

  public async connect() {
    await this.device.find();
    await this.device.connect();
  }

  public async set(property: number, value: any) {
    await this.device.set({
      dps: property,
      set: value,
    });
  }

  public async toggle() {
    await this.device.toggle(1);
  }

  public disconnect() {
    this.device.disconnect();
  }

  public log(data: IDevice) {
    console.log(data);
  }
}

export default LightBulb;
