import SortableTable from '../../components/sortable-table/index.js';
import RangePicker from '../../components/range-picker/index.js';
import header from './sales-headers.js';

import fetchJson from '../../utils/fetch-json.js'

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
    this.initEventListeners();

    return this.element;
  }

  get template() {
    return `
            <div class="sales full-height flex-column">
            <div class="content__top-panel">
            <h1 class="page-title">Sales</h1>
            <div data-element="rangePicker" class="rangepicker">
                <!-- Rangepicker component -->
            </div>
            </div>
            <div data-elem="ordersContainer" class="full-height flex-column">
            <div data-element="sortableTable" class="sortable-table">
                <!-- Sortable table component -->
            </div>
            </div>
            </div>
        `;
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  initComponents() {
    const to = new Date();
    const from = new Date(to.getTime() - 30 * 24 * 60 * 60 * 1000);

    const rangePicker = new RangePicker({ from, to });
    const sortableTable = new SortableTable(header, {
      url: `api/rest/orders?createdAt_gte=${from.toISOString()}&createdAt_lte=${to.toISOString()}&_sort=createdAt&_order=desc&_start=0&_end=20`,
      // isSortLocally: true
    });

    this.saveComponents({rangePicker, sortableTable});
  }

  saveComponents(items = {}) {
    Object.keys(items).forEach(item => {
        this.components[item] = items[item];
    })
}

  renderComponents() {
    Object.keys(this.components).forEach(component => {
      const root = this.subElements[component];
      const { element } = this.components[component];

      root.append(element);
    });
  }

  initEventListeners() {
    this.components.rangePicker.element.addEventListener('date-select', event => {
      const { from, to } = event.detail;
      this.updateTableComponent(from, to);
    });
  }

  async updateTableComponent(from, to) {
    const data = await fetchJson(`${process.env.BACKEND_URL}api/rest/orders?createdAt_gte=${from.toISOString()}&createdAt_lte=${to.toISOString()}&_sort=totalCost&_order=asc&_start=1&_end=20`);
    
    this.components.sortableTable.addRows(data);

  }

  destroy() {
      for(const component of Object.values(this.components)) {
        component.destroy();
      }
  }
}
