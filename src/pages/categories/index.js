import fetchJson from '../../utils/fetch-json.js';

export default class Page {
  element;
  components = {};
  subElements = {};

  async render() {
    // ? Вопрос насчет записи
    const [response] = await Promise.all([this.getCategoriesData()]);

    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    this.subElements = this.getSubElements(this.element);
    this.createCategorieWrap(response);
    this.initEventListeners();

    return this.element;
  }

  get template() {
    return `  
        <div class="categories">
        <div class="content__top-panel">
          <h1 class="page-title">Categories</h1>
        </div>
        <div data-element="categoriesContainer">
            <!-- Render categories menue here -->
        </div>
        </div>
      `;
  }

  async getCategoriesData() {
    const url = this.getRequestLink('/api/rest/categories');
    const request = await fetchJson(url);
    return request;
  }

  getRequestLink(requestString) {
    const newUrl = new URL(requestString, `${process.env.BACKEND_URL}`);
    newUrl.searchParams.set('_sort', 'weight');
    newUrl.searchParams.set('_refs', 'subcategory');

    return newUrl.href;
  }

  createCategorieWrap(data = []) {
    const { categoriesContainer } = this.subElements;

    const categoriesMarkup = data
      .map(dataItem => {
        return `
            <div class="category" data-id="${dataItem.id}">
            <header class="category__header">
                ${dataItem.title}
            </header>
            <div class="category__body">
                <div class="subcategory-list">
                    <ul class="sortable-list">
                        ${this.getCategoriesListItem(dataItem)}
                    </ul>
                </div>
            </div>
            </div>`;
      })
      .join('');

    categoriesContainer.innerHTML = categoriesMarkup;
  }

  getCategoriesListItem(data) {
    const { subcategories } = data;

    return subcategories
      .map(subcategory => {
        return `
            <li class="categories__sortable-list-item sortable-list__item" data-grab-handle="" data-id="${subcategory.id}">
                <strong>${subcategory.title}</strong>
                <span><b>${subcategory.count}</b> products</span>
            </li>`;
      })
      .join('');
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');
    return [...elements].reduce((acc, item) => {
      acc[item.dataset.element] = item;
      return acc;
    }, {});
  }

  initEventListeners() {

  }
}
