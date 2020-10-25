import fetchJson from '../../../utils/fetch-json.js';
import ProductForm from '../../../components/product-form/index.js';

export default class Page {
  element;
  subElements = {};
  components = {};

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);

    this.initComponents();
    this.renderComponents();

    return this.element;
  }

  async renderComponents() {
    const { productForm } = this.components;
    const { productFormWrapper } = this.subElements;

    productForm.renderForm();
    await productForm.render();
    productFormWrapper.append(productForm.element);
  }

  get template() {
    return `
      <div class="products-edit">
      <div class="content__top-panel">
        <h1 class="page-title">
          <a href="/products" class="link">Товары</a> / Редактировать
        </h1>
      </div>
        <div data-element="productFormWrapper" class="content-box">
        <!-- //!ProductFormComponent -->
        </div>
      </div>
    </div>`;
  }

  initComponents() {
    const productId = this.getProductId();
    this.components.productForm = new ProductForm('koaksialnaa-as-jvc-cs-zx630');
  }

  getProductId() {
    console.log(window.location);
  }

  getSubElements($element) {
    const elements = $element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }
}
