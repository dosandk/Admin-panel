import fetchJson from '../../../utils/fetch-json.js';
import header from './products-headers.js';

// import ProductForm from '../../../components/product-form/index.js';
import DoubleSlider from '../../../components/double-slider/index.js';
import SortableTable from '../../../components/sortable-table/index.js';

export default class Page {
  element;
  subElements = {};
  components = {};

  async render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    this.subElements = this.getSubElements(this.element);

    this.initComponents();
    await this.renderComponents();

    return this.element;
  }

  get template() {
    return `
    <div class="products-list">
      <div class="content__top-panel">
        <h1 class="page-title">Товары</h1>
        <a href="/products/add" class="button-primary">Добавить товар</a>
      </div>
      <div class="content-box content-box_small">
      <form class="form-inline">
          <div class="form-group">
            <label class="form-label">Сортировать по:</label>
            <input type="text" data-element="filterName" class="form-control" placeholder="Название товара">
          </div>
          <div class="form-group" data-element="sliderContainer">
            <label class="form-label">Цена:</label>
              <!-- //! DoubleSlider -->
          </div>
          <div class="form-group">
            <label class="form-label">Статус:</label>
            <select class="form-control" data-element="filterStatus">
              <option value="" selected="">Любой</option>
              <option value="1">Активный</option>
              <option value="0">Неактивный</option>
            </select>
          </div>
        </form>
      </div>
      <div data-element="productsContainer" class="products-list__container">
        <!--//! SortableTable-->
      </div>
    </div>
    `;
  }

  initComponents() {
    // const productId = '101-planset-lenovo-yt3-x90l-64-gb-3g-lte-cernyj';
    // this.components.productFrom = new ProductForm(productId);

    this.components.doubleSlider = new DoubleSlider({ min: 0, max: 4000 });
    this.components.sortableTable = new SortableTable(header, {
      url: 'api/rest/products?_embed=subcategory.category'
    });

  }

  async renderComponents() {
    this.subElements.sliderContainer.append(this.components.doubleSlider.element);
    this.subElements.productsContainer.append(this.components.sortableTable.element);
    // const element = await this.components.productFrom.render();

    // this.element.append(element);
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');
    return [...elements].reduce((acc, next) => {
      acc[next.dataset.element] = next;
      return acc;
    }, {});
  }

  destroy() {
    for (const component of Object.values(this.components)) {
      component.destroy();
    }
  }
}
