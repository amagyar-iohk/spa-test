document.addEventListener('DOMContentLoaded', () => {
  const contentFrame = document.getElementById('content-iframe');
  const dropdownLinks = document.querySelectorAll('nav a');

  dropdownLinks.forEach(item => {
    console.log(item)
    item.addEventListener('click', handleNavigation);
  });

  const routes = {
    '/home': 'static/home.html',
    '/home/': 'static/home.html',
    '/releases': 'reports/releases',
    '/weekly': 'reports/weekly',
    '/cloud-agent': 'reports/cloud-agent',
    '/mediator': 'reports/mediator',
    '/prism-node': 'reports/prism-node',
    '/typescript': 'reports/sdk-ts',
    '/swift': 'reports/sdk-swift',
    '/kotlin': 'reports/sdk-kmp'
  };
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
    const targetPage = `/${target.getAttribute('href')}`
    if (targetPage) {
      history.pushState({ page: targetPage }, '', `.${targetPage}`);
      document.activeElement.blur()
      loadContent(targetPage);
    }
  }

  function handlePopState(event) {
    if (event.state && event.state.page) {
      loadContent(event.state.page);
    } else {
      const storedPath = localStorage.getItem('resource');
      localStorage.removeItem('resource')
      if (storedPath) {
        console.error("stored path", storedPath)
        window.history.replaceState(null, '', `.${storedPath}`);
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
