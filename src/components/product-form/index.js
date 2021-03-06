const { v4: uuidv4 } = require('uuid');
import SortableList from '../sortable-list/index.js';
import NotificationMessage from '../notification/index.js';
import escapeHtml from '../../utils/escape-html.js';
import fetchJson from '../../utils/fetch-json.js';

export default class ProductForm {
  element;
  subElements = {};
  formData = {};
  categories = [];
  defaultFormData = {
    title: '',
    description: '',
    quantity: 1,
    subcategory: '',
    images: [],
    status: 1,
    price: 100,
    discount: 0
  };

  constructor(productId) {
    this.productId = productId;
  }

  initEventListeners() {
    const { uploadImage, productForm, imageListContainer } = this.subElements;

    productForm.addEventListener('submit', this.submitForm);
    uploadImage.addEventListener('pointerdown', this.uploadImage);
  }

  dispatchEvent(id) {
    const event = this.productId
      ? new CustomEvent('product-updated', { detail: id })
      : new CustomEvent('product-saved');
    this.element.dispatchEvent(event);
  }

  uploadImage = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.addEventListener('change', async () => {
      const [file] = fileInput.files;

      if (file) {
        const formData = new FormData();
        const { uploadImage, imageListContainer } = this.subElements;

        formData.append('image', file);
        uploadImage.classList.add('is-loading');
        uploadImage.disabled = true;

        const result = await fetchJson('https://api.imgur.com/3/image', {
          method: 'POST',
          headers: {
            Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`
          },
          body: formData
        });

        imageListContainer.append(this.getImageItem(result.data.link, file.name));
        uploadImage.classList.remove('is-loading');
        uploadImage.disabled = false;

        // Remove input from body
        fileInput.remove();
      }
    });

    fileInput.hidden = true;
    document.body.appendChild(fileInput);
    fileInput.click();
  };

  submitForm = event => {
    event.preventDefault();
    this.save();
  };

  async save() {
    const product = this.getFormData();

    try {
      const result = await fetchJson(`${process.env.BACKEND_URL}api/rest/products`, {
        method: this.productId ? 'PATCH' : 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      this.productId
        ? this.showNotificationMessage('Product Saved', 'success')
        : this.showNotificationMessage('Product created', 'success');
      this.dispatchEvent(result.id);
    } catch (error) {
      this.showNotificationMessage('OOPS! Something went wrong', 'error');
      console.error('something went wrong', error);
    }
  }

  getFormData() {
    const { productForm, imageListContainer } = this.subElements;
    const excludedFields = ['images'];
    const formatToNumber = ['price', 'quantity', 'discount', 'status'];
    const fields = Object.keys(this.defaultFormData).filter(item => !excludedFields.includes(item));
    const values = {};

    for (const field of fields) {
      values[field] = formatToNumber.includes(field)
        ? parseInt(productForm.querySelector(`#${field}`).value)
        : productForm.querySelector(`#${field}`).value;
    }

    const imagesHTMLCollection = imageListContainer.querySelectorAll('.sortable-table__cell-img');

    values.images = [];
    values.id = this.productId;
    // !Case if we create a new product Item and in have no ID yet
    if(!this.productId) {
      values.id = uuidv4();
    }

    for (const image of imagesHTMLCollection) {
      values.images.push({
        url: image.src,
        source: image.alt
      });
    }
    return values;
  }

  showNotificationMessage(messageText, messageType) {
    const notificationMessage = new NotificationMessage(messageText, { type: messageType });
    notificationMessage.element.style.position = 'fixed';
    notificationMessage.element.style.bottom = `10px`;
    notificationMessage.element.style.right = '10px';

    notificationMessage.show();
  }

  async render() {
    const categoriesPromise = this.loadCategoriesList();
    const productPromise = this.productId
      ? this.loadProductData(this.productId)
      : [this.defaultFormData];
    const [categoriesData, productResponse] = await Promise.all([
      categoriesPromise,
      productPromise
    ]);

    const [productData] = productResponse;

    this.formData = productData;
    this.categories = categoriesData;

    this.renderForm();
    this.setFormData();
    this.createImagesList();
    this.initEventListeners();

    return this.element;
  }

  renderForm() {
    const element = document.createElement('div');
    element.innerHTML = this.formData ? this.template : this.getEmptyTemplate();

    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(element);
  }

  get template() {
    return `
    <div class="product-form">
      <form data-element="productForm" class="form-grid">
        <div class="form-group form-group__half_left">
          <fieldset>
            <label class="form-label">Название товара</label>
            <input required
              id="title"
              value=""
              type="text"
              name="title"
              class="form-control"
              placeholder="Название товара">
          </fieldset>
        </div>
        <div class="form-group form-group__wide">
          <label class="form-label">Описание</label>
          <textarea required
            id="description"
            class="form-control"
            name="description"
            data-element="productDescription"
            placeholder="Описание товара"></textarea>
        </div>
        <div class="form-group form-group__wide" data-element="sortable-list-container">
          <label class="form-label">Фото</label>
          <div class="sortable-list" data-element="imageListContainer">
          </div>
          <button data-element="uploadImage" type="button" class="button-primary-outline">
            <span>Загрузить</span>
          </button>
        </div>
        <div class="form-group form-group__half_left">
          <label class="form-label">Категория</label>
          <select id="subcategory" class="form-control" name="subcategory">
            ${this.createCategoriesSelect()}
          </select>
        </div>
        <div class="form-group form-group__half_left form-group__two-col">
          <fieldset>
            <label class="form-label">Цена ($)</label>
            <input required
              id="price"
              value=""
              type="number"
              name="price"
              class="form-control"
              placeholder="${this.defaultFormData.price}">
          </fieldset>
          <fieldset>
            <label class="form-label">Скидка ($)</label>
            <input required
              id="discount"
              value=""
              type="number"
              name="discount"
              class="form-control"
              placeholder="${this.defaultFormData.discount}">
          </fieldset>
        </div>
        <div class="form-group form-group__part-half">
          <label class="form-label">Количество</label>
          <input required
            id="quantity"
            value=""
            type="number"
            class="form-control"
            name="quantity"
            placeholder="${this.defaultFormData.quantity}">
        </div>
        <div class="form-group form-group__part-half">
          <label class="form-label">Статус</label>
          <select id="status" class="form-control" name="status">
            <option value="1">Активен</option>
            <option value="0">Неактивен</option>
          </select>
        </div>
        <div class="form-buttons">
          <button type="submit" name="save" class="button-primary-outline">
            ${this.productId ? 'Сохранить' : 'Добавить'} товар
          </button>
        </div>
      </form>
    </div>
    `;
  }

  getEmptyTemplate() {
    return `
    <div>
      <h1 class="page-title">Страница не найдена</h1>
      <p>Извините, данный товар не существует</p>
    </div>`;
  }

  createCategoriesSelect() {
    return this.categories.map(category => {
      return category.subcategories
        .map(subcategory => {
          return `<option value="${subcategory.id}">${category.title} &gt; ${subcategory.title}</option>`;
        })
        .join('');
    });
  }

  createImagesList() {
    const { imageListContainer } = this.subElements;
    const { images } = this.formData;
    const items = images.map(image => this.getImageItem(image.url, image.source));
    const sortableList = new SortableList({ items });
    imageListContainer.append(sortableList.element);
  }

  getImageItem(url, name) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `          
        <li class="products-edit__imagelist-item sortable-list__item" style="">
          <span>
            <img src="../icons/icon-grab.svg" data-grab-handle="" alt="grab">
            <img class="sortable-table__cell-img" alt="${escapeHtml(name)}" src="${escapeHtml(
      url
    )}">
            <span>${escapeHtml(name)}</span>
          </span>
          <button type="button">
            <img src="../icons/icon-trash.svg" data-delete-handle="" alt="delete">
          </button>
        </li>`;

    return wrapper.firstElementChild;
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');
    return [...elements].reduce((acc, item) => {
      acc[item.dataset.element] = item;
      return acc;
    }, {});
  }

  async loadCategoriesList() {
    return await fetchJson(
      `${process.env.BACKEND_URL}api/rest/categories?_sort=weight&_refs=subcategory`
    );
  }

  async loadProductData(id) {
    return await fetchJson(`${process.env.BACKEND_URL}api/rest/products?id=${id}`);
  }

  setFormData() {
    const { productForm } = this.subElements;
    const excludedData = ['images'];
    const fields = Object.keys(this.defaultFormData).filter(item => !excludedData.includes(item));
    fields.forEach(field => {
      productForm.querySelector(`#${field}`).value =
        this.formData[field] || this.defaultFormData[field];
    });
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = null;
  }

  remove() {
    this.element.remove();
  }
}
