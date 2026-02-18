import { Block } from '../../core/Block';
import template from './button.hbs';

type ButtonProps = {
  text: string;
};

export class Button extends Block {
  constructor(props: ButtonProps) {
    super("button", props);
  }

  render(): string {
    return this.compile(template, this.props);
  }
}
