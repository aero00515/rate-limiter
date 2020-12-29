export interface Adapter {
  setExpireSec?: (expireSec: number) => void;
  addCount: (ip: string) => number | Promise<number>;
  getCount: (ip: string) => number | Promise<number>;
}
