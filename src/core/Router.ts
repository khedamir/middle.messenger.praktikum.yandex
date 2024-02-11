import Block, { RefType } from './Block';
import Route from './Route';

class Router {
  private static __instance: Router | null = null;

  private routes: Route[] = [];
  private history: History = window.history;
  private _currentRoute: Route | null = null;
  private _rootQuery: string = '';

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;

    this._onPopState = this._onPopState.bind(this);
    window.addEventListener('popstate', () =>
      this._onPopState(window.location.pathname),
    );

    return this;
  }

  use(pathname: string, block: new () => Block<object, RefType>) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    const pathname = window.location.pathname;
    this._onPopState(pathname);
  }

  go(pathname: string) {
    console.log(pathname);
    this.history.pushState({}, '', pathname);
    this._onPopState(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  private _onPopState(pathname: string) {
    const route = this.getRoute(pathname);
    console.log(pathname, route);

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route!;
    route!.render();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router;
