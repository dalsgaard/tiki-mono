import application from './plop/application.js';
import microFrontend from './plop/micro-frontend.js';
import addMicroFrontend from './plop/add-micro-frontend.js';
import init from './plop/init.js';

export default function (plop) {
  init(plop);
  application(plop);
  microFrontend(plop);
  addMicroFrontend(plop);
}
