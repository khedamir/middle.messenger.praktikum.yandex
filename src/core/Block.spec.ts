import { expect } from 'chai';
import sinon from 'sinon';
import Block, { RefType } from './Block';

interface Props {
  text?: string;
  events?: Record<string, () => void>;
}

describe('Block', () => {
  let PageClass: typeof Block<Props, RefType>;

  before(() => {
    class Page extends Block<Props, RefType> {
      constructor(props: Props) {
        super({
          ...props,
        });
      }

      protected render(): string {
        return `<div>
                    <h1 id="test-text">{{text}}</h1>
                </div>`;
      }
    }

    PageClass = Page;
  });

  it('must create a component with constructor state', () => {
    const text = 'Page Title';
    const pageComponent = new PageClass({ text });

    const element = pageComponent.element as unknown as HTMLElement;
    const spanText = element.querySelector('#test-text')?.innerHTML;

    expect(spanText).to.be.eq(text);
  });
  it('the component must have reactive behavior', () => {
    const text = 'Login Page';
    const pageComponent = new PageClass({ text: 'Page Title' });

    pageComponent.setProps({ text });
    const element = pageComponent.element as unknown as HTMLElement;
    const spanText = element.querySelector('#test-text')?.innerHTML;

    expect(spanText).to.be.eq(text);
  });
  it('the component must set events on the element', () => {
    const handlerStub = sinon.stub();
    const pageComponent = new PageClass({
      events: {
        click: handlerStub,
      },
    });

    const event = new MouseEvent('click');
    const element = pageComponent.element as unknown as HTMLElement;
    element?.dispatchEvent(event);

    expect(handlerStub.calledOnce).to.be.true;
  });
  it('the component must call the dispatchComponentDidMount method', () => {
    const clock = sinon.useFakeTimers();
    const pageComponent = new PageClass();

    const spyCDM = sinon.spy(pageComponent, 'componentDidMount');

    const element = pageComponent.getContent();
    document.body.append(element!);
    clock.next();

    expect(spyCDM.calledOnce).to.be.true;
  });
});
