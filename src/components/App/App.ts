import { Block } from "../../core/Block";
import template from "./app.hbs";
import { Button } from "../Button/Button";

export class App extends Block {
  private button!: Button;

  constructor() {
    super("div", {});
  }

  init() {
    this.button = new Button({
      text: "Click me"
    });

    super.init(); // запускает render
  }

  render(): string {
    return this.compile(template, {
      title: "My SPA",
      button: this.button.getContent()!.outerHTML
    });
  }
}
