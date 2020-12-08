export interface IHandler<T> {
  processMessage(buffer: Buffer): T | null;
  handleMessage(event: T): Promise<void> | void;
}
