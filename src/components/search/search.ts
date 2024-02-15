import { Input } from '../input';
import Block, { IProps } from '../../core/Block';
import NodeElement from './search.hbs?raw';

interface Props extends IProps {
  value: string;
  name: string;
  placeholder: string;
  onBlur: () => void;
  onChange: (e: Event) => void;
  search: (v: string) => void;
}

type Refs = {
  input: Input;
};

export class Search extends Block<Props, Refs> {
  constructor(props: Props) {
    super({
      ...props,
      onBlur: () => {
        console.log('blur');
        this.Search(this.getValue());
      },
      onChange: (e) => {
        console.log('onChange');
        this.setValue(e);
      },
      value: '',
    });
  }

  public Search(v: string) {
    console.log(v, this.props);
    this.props.search(v);
  }

  public getValue() {
    return this.props.value;
  }

  public setValue(e: Event) {
    const target = e.target as HTMLInputElement;
    this.props.value = target.value;
  }

  public clearValue() {
    this.props.value = '';
  }
  protected render(): string {
    return NodeElement;
  }
}
