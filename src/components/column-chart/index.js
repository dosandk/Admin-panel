export default class ColumnChart {
  element;
  subElements = {};
  chartHeight = 50;

  constructor({ data = [], label = '', link = '', value = 0 } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;
    this.render();
  }

  getColumnBody(data) {
    const maxValue = Math.max(...data);
    return data.map(item => {
        const scale = this.chartHeight / maxValue;
        const eachDayValue = this.label === "sales" ? '$' + this.formatBigInt(item) : this.formatBigInt(item);

        return `<div style="--value: ${Math.floor(item * scale)}" data-tooltip="${eachDayValue}"></div>`;
      }).join('');
  }

  getLink() {
    return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
  }

  get template() {
    return `
      <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.getLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${this.value}
          </div>
          <div data-element="body" class="column-chart__chart">
            ${this.getColumnBody(this.data)}
          </div>
        </div>
      </div>
    `;
  }

  async render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    if (this.data.length) {
      this.element.classList.remove(`column-chart_loading`);
    }

    this.subElements = this.getSubElements(this.element);

    return this.element;
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  formatBigInt(price) {
    const newArr = [];
    const priceString = String(price);
    const lastElementIndex = priceString.length - 1;
    let count = 0;
    for (let i = lastElementIndex; i >= 0; i--) {
      count++;
      newArr.push(priceString[i]);
      if (count % 3 === 0) {
        newArr.push(',');
      }
    }

    if (newArr[newArr.length - 1] === ',') {
      newArr.splice(newArr.length - 1, 1);
    }
    return newArr.reverse().join('');
  }

  update({ headerData, bodyData }) {
    this.subElements.header.textContent = headerData;
    this.subElements.body.innerHTML = this.getColumnBody(bodyData);
  }

  destroy() {
    this.element.remove();
  }
}
