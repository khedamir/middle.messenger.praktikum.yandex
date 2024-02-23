import { expect } from 'chai';
import Block, { RefType } from './Block';
import Router from './Router';
import Sinon from 'sinon';

describe('Router', () => {
  let LoginPage: typeof Block<object, RefType>;
  let ChatPage: typeof Block<object, RefType>;
  let router: Router;

  before(() => {
    class Login extends Block<object, RefType> {
      protected render(): string {
        return `<div>
                    <h1 id="test-text">Login Page</h1>
                </div>`;
      }
    }

    class Chat extends Block<object, RefType> {
      protected render(): string {
        return `<div>
                    <h1 id="test-text">Chat Page</h1>
                </div>`;
      }
    }

    LoginPage = Login;
    ChatPage = Chat;

    router = new Router('#app');
  });
  it('must save routes in the router', () => {
    const useSpy = Sinon.spy(router, 'use');
    router.use('/', LoginPage).use('/chat', ChatPage).start();
    expect(useSpy.called).to.be.true;
  });
  it('must add an entry to history', () => {
    router.go('/');
    router.go('/chat');
    expect(window.history.length).to.eq(3);
  });
  it('must go to url', () => {
    router.go('/chat');
    expect(window.location.pathname).to.eq('/chat');
  });
  it('must return to the previous url', () => {
    const backSpy = Sinon.spy(window.history, 'back');
    router.go('/');
    router.go('/chat');
    router.back();
    expect(backSpy.called).to.be.true;
  });
  it('must return to the forward url', () => {
    const backSpy = Sinon.spy(window.history, 'forward');
    router.go('/');
    router.go('/chat');
    router.forward();
    expect(backSpy.called).to.be.true;
  });
});
