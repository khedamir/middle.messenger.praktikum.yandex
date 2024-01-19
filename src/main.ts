import Handlebars from 'handlebars';
import * as Components from './components';
import { navigate } from './core/navigate';
import { registerComponent } from './core/resgiterComponent';
import Block from './core/Block';

Handlebars.registerPartial('AuthForm', Components.AuthForm);
Handlebars.registerPartial('DataLayout', Components.DataLayout);

Object.entries(Components).forEach((component) => {
  registerComponent(component[0], component[1] as typeof Block);
});

document.addEventListener('DOMContentLoaded', () => navigate('login'));
