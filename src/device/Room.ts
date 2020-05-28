import LightBulb from "./LightBulb";
import { LightbulbProperty, toTuyaColor } from "../utils";

class Room {
  private bulbs: Record<string, LightBulb> = {};

  constructor() {
    this.bulbs.bulbDesk = new LightBulb(
      process.env.DESK_ID!,
      process.env.DESK_KEY!
    );
    this.bulbs.bulbBed = new LightBulb(
      process.env.BED_ID!,
      process.env.BED_KEY!
    );
  }

  public async connect() {
    await Promise.all(Object.values(this.bulbs).map((bulb) => bulb.connect()));
  }

  public async lightsOn() {
    await Promise.all(
      Object.values(this.bulbs).map((bulb) =>
        bulb.set(LightbulbProperty.Power, true)
      )
    );
  }

  public async lightsOff() {
    await Promise.all(
      Object.values(this.bulbs).map((bulb) =>
        bulb.set(LightbulbProperty.Power, false)
      )
    );
  }

  public async setLightsColor(color: string) {
    if (color.startsWith("#")) color = color.substr(1);

    if (color === "ffffff") {
      await this._setLightsMode("white");
    } else {
      await this._setLightsMode("colour");
      await Promise.all(
        Object.values(this.bulbs).map((bulb) =>
          bulb.set(LightbulbProperty.Color, toTuyaColor(color))
        )
      );
    }
  }

  public async setLightsIntensity(intensity: number) {
    if (intensity < 0 || intensity > 255) {
      throw new Error("intensity out of range");
    }

    await Promise.all(
      Object.values(this.bulbs).map((bulb) =>
        bulb.set(LightbulbProperty.Intensity, intensity)
      )
    );
  }

  private async _setLightsMode(mode: "white" | "colour") {
    await Promise.all(
      Object.values(this.bulbs).map((bulb) =>
        bulb.set(LightbulbProperty.ColorMode, mode)
      )
    );
  }
}

export default Room;
