import application from './tiki/plop/application.js';
import microFrontend from './tiki/plop/micro-frontend.js';
import addMicroFrontend from './tiki/plop/add-micro-frontend.js';
import init from './tiki/plop/init.js';

export default function (plop) {
  init(plop);
  application(plop);
  microFrontend(plop);
  addMicroFrontend(plop);
}
