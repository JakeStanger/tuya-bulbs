import express from "express";
import * as WebSocket from "ws";
import Room from "../device/Room";
import * as http from "http";

enum WebsocketMessage {
  LightsOn = "lightsOn",
  LightsOff = "lightsOff",
  SetColor = "setColor",
  SetIntensity = "setIntensity",
}

interface IWebSocketData {
  msg: WebsocketMessage;
  data: any;
}

class WebSocketServer {
  private room: Room;

  private readonly server: http.Server;
  private wsServer: WebSocket.Server;

  constructor(room: Room) {
    this.room = room;

    const app = express();
    app.use(express.static("./public"));

    this.server = http.createServer(app);

    this.wsServer = new WebSocket.Server({ server: this.server });
  }

  public async init() {
    await new Promise((resolve) =>
      this.server.listen(process.env.PORT || 8999, () => {
        console.log(`Server started on port ${process.env.PORT || 8999}`);
        resolve();
      })
    );

    this.wsServer.on("connection", (ws: WebSocket) => {
      ws.on("message", (message: string) =>
        this._onMessage(ws, JSON.parse(message))
      );
    });
  }

  private async _onMessage(ws: WebSocket, message: IWebSocketData) {
    try {
      switch (message.msg) {
        case WebsocketMessage.LightsOff:
          await this.room.lightsOff();
          break;
        case WebsocketMessage.LightsOn:
          await this.room.lightsOn();
          break;
        case WebsocketMessage.SetColor:
          await this.room.setLightsColor(message.data);
          break;
        case WebsocketMessage.SetIntensity:
          await this.room.setLightsIntensity(message.data);
      }
    } catch (e) {
      ws.send(JSON.stringify({ error: true, msg: e.message }));
    }
  }
}

export default WebSocketServer;
