const isLocalhost = window.location.host.includes('localhost')
const basePath = isLocalhost ? "/" : "/spa-test"

document.addEventListener('DOMContentLoaded', () => {
  console.log("v1.0.1")
  const contentFrame = document.getElementById('content-iframe');
  const dropdownLinks = document.querySelectorAll('nav a');

  dropdownLinks.forEach(item => {
    item.addEventListener('click', handleNavigation);
  });

  const routes = {};
  routes[`${basePath}/home`] = 'static/home.html';
  routes[`${basePath}/releases`] = 'reports/releases';
  routes[`${basePath}/weekly`] = 'reports/weekly';
  routes[`${basePath}/cloud-agent`] = 'reports/cloud-agent';
  routes[`${basePath}/mediator`] = 'reports/mediator';
  routes[`${basePath}/prism-node`] = 'reports/prism-node';
  routes[`${basePath}/typescript`] = 'reports/sdk-ts';
  routes[`${basePath}/swift`] = 'reports/sdk-swift';
  routes[`${basePath}/kotlin`] = 'reports/sdk-kmp';

  const defaultPage = '/home';

  function loadContent(path) {
    console.log('main - loading content:', path, routes[path])
    contentFrame.contentWindow.location.replace(routes[path]);
  }

  function handleNavigation(event) {
    let target = event.target
    if (!target.href) {
      target = target.closest('a')
    }
    event.preventDefault();
    const host = window.location.origin
    const targetPage = target.href.replace(host, '')
    if (targetPage) {
      history.pushState({ page: targetPage }, '', targetPage);
      document.activeElement.blur()
      loadContent(targetPage);
    }
  }

  function handlePopState(event) {
    if (event.state && event.state.page) {
      loadContent(event.state.page);
    } else {
      const storedPath = localStorage.getItem('resource');
      localStorage.clear()
      if (storedPath) {
        window.history.replaceState(null, '', storedPath);
        loadContent(storedPath);
      } else {
        loadContent(defaultPage);
        history.replaceState({ page: defaultPage }, '', `.${defaultPage}`);
      }
    }
  }

  // Listen for browser history navigation (back/forward buttons)
  window.addEventListener('popstate', handlePopState);

  // Handle initial load
  handlePopState({ state: history.state });

  // bulma burger menu
  const navbarBurger = document.querySelector('.navbar-burger');
  const navbarMenu = document.getElementById('navbar');

  if (navbarBurger && navbarMenu) {
    navbarBurger.addEventListener('click', () => {
      navbarBurger.classList.toggle('is-active');
      navbarMenu.classList.toggle('is-active');
    });
  }
  document.body.style = "";
});
