import { EventBus } from './EventBus';
import Handlebars from 'handlebars';

type Props = Record<string, unknown>;

type Meta<P extends Props = Props> = {
  tagName: string;
  props: P;
};

type EventCallback<T> = (...args: T[]) => void;

export class Block<P extends Props = Props> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  } as const;

  private _element: HTMLElement | null = null;
  private _meta: Meta<P>;
  protected props: P;
  private eventBus: () => EventBus;

  constructor(tagName: string = "div", props = {} as P) {
    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props
    };

    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);

    this.init();
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources(): void {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  protected init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  // переопределяется в наследниках
  protected componentDidMount(oldProps?: P): void { }

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: P, newProps: P): void {
    const shouldUpdate = this.componentDidUpdate(oldProps, newProps);
    if (!shouldUpdate) return;

    this._render();
  }

  // переопределяется
  protected componentDidUpdate(oldProps: P, newProps: P): boolean {
    return true;
  }

  public setProps(nextProps: Partial<P>): void {
    if (!nextProps) return;
    Object.assign(this.props, nextProps);
  }

  get element(): HTMLElement | null {
    return this._element;
  }

  compile(template: ((context: P) => string) | string, props: P): string {
    if (typeof template === "function") {
      return template(props);
    }

    const templateFn = Handlebars.compile(template);
    return templateFn(props);
  }


  private _render(): void {
    const template = this.render();
    const html = this.compile(template, this.props);

    if (!this._element) {
      throw new Error("Element is not initialized");
    }

    this._element.innerHTML = html;
  }

  // обязан вернуть строку шаблона
  
  protected render(): string {
    return "";
  }

  public getContent(): HTMLElement | null {
    return this.element;
  }

  private _makePropsProxy(props: P): P {
    const self = this;

    return new Proxy(props, {
      get(target: P, prop: string) {
        const value = target[prop as keyof P];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: P, prop: string, value: unknown) {
        target[prop as keyof P] = value as P[keyof P];

        self.eventBus().emit(
          Block.EVENTS.FLOW_CDU,
          { ...target },
          target
        );

        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  public show(): void {
    const el = this.getContent();
    if (el) el.style.display = "block";
  }

  public hide(): void {
    const el = this.getContent();
    if (el) el.style.display = "none";
  }
}
