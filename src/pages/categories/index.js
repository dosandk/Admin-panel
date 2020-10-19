import fetchJson from "../../utils/fetch-json.js";

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
        console.log(data);
        const {categoriesContainer} = this.subElements;

        categoriesContainer.innerHTML = `<div class="category" data-id="bytovaya-texnika">
        <header class="category__header">
            Бытовая техника
        </header>
        </div>`;
    }

    getSubElements(element) {
        const elements = element.querySelectorAll("[data-element]");
        return [...elements].reduce((acc, item) => {
          acc[item.dataset.element] = item;
          return acc;
        }, {});
      }

}
