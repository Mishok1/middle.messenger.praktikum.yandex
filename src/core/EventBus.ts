type EventArgs = unknown[];

type EventCallback = (...args: EventArgs) => void;

type Listeners = Record<string, EventCallback[]>;



export class EventBus {
  private listeners: Listeners;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: EventCallback): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: EventCallback): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

  emit(event: string, ...args: EventArgs): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener: EventCallback) => {
      listener(...args);
    });
  }
}
