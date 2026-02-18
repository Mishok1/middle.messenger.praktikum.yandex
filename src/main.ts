// import './style.css'
import './styles/main.scss'
// import { router } from './router';
// import { Block } from './core/Block';
import { App } from './components/App/App';
// window.addEventListener('load', router);
// window.addEventListener('hashchange', router);




document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("app");

  const app = new App();

  root?.appendChild(app.getContent()!);
});
