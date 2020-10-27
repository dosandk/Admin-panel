export default async function (path, match) {
  // ! Logic for add active class to current menu list after restart page
  const pageName = match[0] === '' ? 'dashboard' : match[0];
  if(!pageName.indexOf('/')) {
    const activeMenuList = document.querySelector(`[data-list=${pageName}]`);
    activeMenuList.classList.add('active');
  }

  const main = document.querySelector('main');
  main.classList.add('is-loading');

  const { default: Page } = await import(
    /* webpackChunkName: "[request]" */ `../pages/${path}/index.js`
  );
  const page = new Page(match);
  const element = await page.render();

  main.classList.remove('is-loading');

  const contentNode = document.querySelector('#content');

  contentNode.innerHTML = '';
  contentNode.append(element);

  return page;
}
