import { Input } from '../input';
import Block, { IProps } from '../../core/Block';
import NodeElement from './search.hbs?raw';

interface Props extends IProps {
  value: string;
  name: string;
  placeholder: string;
  onChange: (e: Event) => void;
  search: (v: string) => void;
}

type Refs = {
  search: Input;
};

export class Search extends Block<Props, Refs> {
  constructor(props: Props) {
    super({
      ...props,
      onChange: (e: Event) => {
        e.preventDefault();
        console.log('onChange');
        this.Search(this.getValue());
      },
      value: '',
    });
  }

  protected init(): void {
    this.props.events = {
      onsubmit: this.props.onChange,
    };
  }

  public Search(v: string) {
    this.props.search(v);
  }

  public getValue() {
    return this.refs.search.element.value;
  }

  public clearValue() {
    this.props.value = '';
  }
  protected render(): string {
    return NodeElement;
  }
}
