import * as dotenv from "dotenv";
import Room from "./device/Room";
import Server from "./api/Server";

dotenv.config();

/*
1 -> on/off
2 -> white/colour
3 -> brightness (ignored)
4 -> brightness (0-255)
5 -> Color (RRGGBBHHSSVV HEX)
 */

async function init() {
  const room = new Room();
  await room.connect();

  await new Server(room).init();
}

init().catch(console.error);
