import application from './plop/application.js';
import microFrontend from './plop/micro-frontend.js';
import addMicroFrontend from './plop/add-micro-frontend.js';

export default function (plop) {
  application(plop);
  microFrontend(plop);
  addMicroFrontend(plop);
}
