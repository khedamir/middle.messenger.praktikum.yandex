import Block, { RefType } from './Block';

function render(query: string, block: Block<object, RefType>): HTMLElement {
  console.log(query, block);
  const root = document.querySelector(query) as HTMLElement;
  root.replaceChildren(block.getContent()!);
  return root;
}

class Route {
  private _pathname: string;
  private _blockClass: new () => Block<object, RefType>;
  private _block: Block<object, RefType> | null;
  private _props: { rootQuery: string };

  constructor(
    pathname: string,
    view: new () => Block<object, RefType>,
    props: { rootQuery: string },
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  render() {
    this._block = new this._blockClass();
    render(this._props.rootQuery, this._block);
    return;
  }
}

export default Route;
