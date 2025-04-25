const isLocalhost = window.location.host.includes('localhost')
const basePath = isLocalhost ? "" : "/spa-test"

console.log("v2.0.1")
const contentFrame = document.getElementById('content-iframe');
const dropdownLinks = document.querySelectorAll('nav a');

dropdownLinks.forEach(item => {
  if (item.href) {
    item.setAttribute('href', `${basePath}${item.getAttribute('href')}`)
    item.addEventListener('click', handleNavigation);
  }
});

const routes = {};
routes[`${basePath}/`] = `${basePath}/static/home.html`;
routes[`${basePath}/releases`] = `${basePath}/reports/releases/index.html`;
routes[`${basePath}/weekly`] = `${basePath}/reports/weekly/index.html`;
routes[`${basePath}/cloud-agent`] = `${basePath}/reports/cloud-agent/index.html`;
routes[`${basePath}/mediator`] = `${basePath}/reports/mediator/index.html`;
routes[`${basePath}/prism-node`] = `${basePath}/reports/prism-node/index.html`;
routes[`${basePath}/typescript`] = `${basePath}/reports/sdk-ts/index.html`;
routes[`${basePath}/swift`] = `${basePath}/reports/sdk-swift/index.html`;
routes[`${basePath}/kotlin`] = `${basePath}/reports/sdk-kmp/index.html`;

const defaultPage = `${basePath}/`;

function loadContent(path) {
  if (path.endsWith('/') && path.length > 1) {
    path = path.slice(0, -1)
  }
  if (!routes[path]) {
    contentFrame.contentWindow.location.replace('');
  } else {
    contentFrame.contentWindow.location.replace(routes[path]);
  }
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
      history.replaceState({ page: defaultPage }, '', defaultPage);
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
