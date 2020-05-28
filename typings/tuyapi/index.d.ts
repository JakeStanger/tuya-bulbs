declare module "tuyapi" {
  interface IDeviceOptions {
    ip?: string;
    port?: number;
    id: string;
    gwID?: string;
    key: string;
    productKey?: string;
    version?: number;
  }

  interface IFindOptions {
    timeout?: number;
    all?: boolean;
  }

  export interface IDevice {
    devId: stirng;
    dps: { [key: LightbulbProperty]: any };
    t?: number;
    s?: number;
  }

  interface IGetOptions {
    schema?: boolean;
    dps?: LightbulbProperty;
  }

  interface ISetOptions {
    dps?: LightbulbProperty;
    set?: any;
    multiple?: boolean;
    data?: { [key: LightbulbProperty]: any };
  }

  type TuyaDeviceEvent =
    | "error"
    | "disconnected"
    | "connected"
    | "heartbeat"
    | "data";

  class TuyaDevice {
    constructor(options: IDeviceOptions) {}

    find: (options?: IFindOptions) => Promise<boolean | IDevice[]>;
    connect: () => Promise<boolean>;
    isConnected: () => boolean;

    get: (options?: IGetOptions) => Promise<boolean | IDevice>;
    set: (options?: ISetOptions) => Promise<IDevice>;
    toggle: (property: LightbulbProperty) => Promise<boolean>;

    on: (event: TuyaDeviceEvent, VoidFunction) => void;

    disconnect: () => void;
  }

  export = TuyaDevice;
}
