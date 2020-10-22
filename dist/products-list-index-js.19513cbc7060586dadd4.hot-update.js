webpackHotUpdate("products-list-index-js",{

/***/ "./src/pages/products/list/index.js":
/*!******************************************!*\
  !*** ./src/pages/products/list/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Page; });\n/* harmony import */ var _utils_fetch_json_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/fetch-json.js */ \"./src/utils/fetch-json.js\");\n!(function webpackMissingModule() { var e = new Error(\"Cannot find module '../../../components/product-form.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n/* harmony import */ var _components_double_slider_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/double-slider/index.js */ \"./src/components/double-slider/index.js\");\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nclass Page {\n  constructor() {\n    _defineProperty(this, \"element\", void 0);\n\n    _defineProperty(this, \"subElements\", {});\n\n    _defineProperty(this, \"components\", {});\n  }\n\n  async render() {\n    const element = document.createElement('div');\n    element.innerHTML = this.template;\n    this.element = element.firstElementChild;\n    this.subElements = this.getSubElements(this.element);\n    console.log(new Prod()); // this.initComponents();\n    // await this.renderComponents();\n\n    return this.element;\n  }\n\n  get template() {\n    return \"\\n    <div class=\\\"products-list\\\">\\n      <div class=\\\"content__top-panel\\\">\\n        <h1 class=\\\"page-title\\\">\\u0422\\u043E\\u0432\\u0430\\u0440\\u044B</h1>\\n        <a href=\\\"/products/add\\\" class=\\\"button-primary\\\">\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C \\u0442\\u043E\\u0432\\u0430\\u0440</a>\\n      </div>\\n      <div class=\\\"content-box content-box_small\\\">\\n      <form class=\\\"form-inline\\\">\\n          <div class=\\\"form-group\\\">\\n            <label class=\\\"form-label\\\">\\u0421\\u043E\\u0440\\u0442\\u0438\\u0440\\u043E\\u0432\\u0430\\u0442\\u044C \\u043F\\u043E:</label>\\n            <input type=\\\"text\\\" data-element=\\\"filterName\\\" class=\\\"form-control\\\" placeholder=\\\"\\u041D\\u0430\\u0437\\u0432\\u0430\\u043D\\u0438\\u0435 \\u0442\\u043E\\u0432\\u0430\\u0440\\u0430\\\">\\n          </div>\\n          <div class=\\\"form-group\\\" data-element=\\\"sliderContainer\\\">\\n            <label class=\\\"form-label\\\">\\u0426\\u0435\\u043D\\u0430:</label>\\n              <!-- //! DoubleSlider -->\\n          </div>\\n          <div class=\\\"form-group\\\">\\n            <label class=\\\"form-label\\\">\\u0421\\u0442\\u0430\\u0442\\u0443\\u0441:</label>\\n            <select class=\\\"form-control\\\" data-element=\\\"filterStatus\\\">\\n              <option value=\\\"\\\" selected=\\\"\\\">\\u041B\\u044E\\u0431\\u043E\\u0439</option>\\n              <option value=\\\"1\\\">\\u0410\\u043A\\u0442\\u0438\\u0432\\u043D\\u044B\\u0439</option>\\n              <option value=\\\"0\\\">\\u041D\\u0435\\u0430\\u043A\\u0442\\u0438\\u0432\\u043D\\u044B\\u0439</option>\\n            </select>\\n          </div>\\n        </form>\\n      </div>\\n      <div data-element=\\\"productsContainer\\\" class=\\\"products-list__container\\\">\\n        <!--//! SortableTable-->\\n      </div>\\n    </div>\\n    \";\n  }\n\n  initComponents() {\n    const productId = '101-planset-lenovo-yt3-x90l-64-gb-3g-lte-cernyj';\n    this.components.productFrom = new !(function webpackMissingModule() { var e = new Error(\"Cannot find module '../../../components/product-form.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(productId);\n  }\n\n  async renderComponents() {\n    const element = await this.components.productFrom.render();\n    this.element.append(element);\n  }\n\n  getSubElements(element) {\n    const elements = element.querySelectorAll('[data-element]');\n    return [...elements].reduce((acc, next) => {\n      acc[next.dataset.element] = next;\n      return acc;\n    }, {});\n  }\n\n  destroy() {\n    for (const component of Object.values(this.components)) {\n      component.destroy();\n    }\n  }\n\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvcHJvZHVjdHMvbGlzdC9pbmRleC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9wYWdlcy9wcm9kdWN0cy9saXN0L2luZGV4LmpzPzQ5YjQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZldGNoSnNvbiBmcm9tICcuLi8uLi8uLi91dGlscy9mZXRjaC1qc29uLmpzJztcclxuXHJcbmltcG9ydCBQcm9kdWN0Rm9ybSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3Byb2R1Y3QtZm9ybS5qcyc7XHJcbmltcG9ydCBEb3VibGVTbGlkZXIgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9kb3VibGUtc2xpZGVyL2luZGV4LmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2Uge1xyXG4gIGVsZW1lbnQ7XHJcbiAgc3ViRWxlbWVudHMgPSB7fTtcclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIGFzeW5jIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IHRoaXMudGVtcGxhdGU7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50LmZpcnN0RWxlbWVudENoaWxkO1xyXG5cclxuICAgIHRoaXMuc3ViRWxlbWVudHMgPSB0aGlzLmdldFN1YkVsZW1lbnRzKHRoaXMuZWxlbWVudCk7XHJcblxyXG4gICAgY29uc29sZS5sb2cobmV3IFByb2QpO1xyXG4gICAgLy8gdGhpcy5pbml0Q29tcG9uZW50cygpO1xyXG4gICAgLy8gYXdhaXQgdGhpcy5yZW5kZXJDb21wb25lbnRzKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcclxuICB9XHJcblxyXG4gIGdldCB0ZW1wbGF0ZSgpIHtcclxuICAgIHJldHVybiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdHMtbGlzdFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGVudF9fdG9wLXBhbmVsXCI+XHJcbiAgICAgICAgPGgxIGNsYXNzPVwicGFnZS10aXRsZVwiPtCi0L7QstCw0YDRizwvaDE+XHJcbiAgICAgICAgPGEgaHJlZj1cIi9wcm9kdWN0cy9hZGRcIiBjbGFzcz1cImJ1dHRvbi1wcmltYXJ5XCI+0JTQvtCx0LDQstC40YLRjCDRgtC+0LLQsNGAPC9hPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtYm94IGNvbnRlbnQtYm94X3NtYWxsXCI+XHJcbiAgICAgIDxmb3JtIGNsYXNzPVwiZm9ybS1pbmxpbmVcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tbGFiZWxcIj7QodC+0YDRgtC40YDQvtCy0LDRgtGMINC/0L46PC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgZGF0YS1lbGVtZW50PVwiZmlsdGVyTmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCLQndCw0LfQstCw0L3QuNC1INGC0L7QstCw0YDQsFwiPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIGRhdGEtZWxlbWVudD1cInNsaWRlckNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWxhYmVsXCI+0KbQtdC90LA6PC9sYWJlbD5cclxuICAgICAgICAgICAgICA8IS0tIC8vISBEb3VibGVTbGlkZXIgLS0+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tbGFiZWxcIj7QodGC0LDRgtGD0YE6PC9sYWJlbD5cclxuICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIGRhdGEtZWxlbWVudD1cImZpbHRlclN0YXR1c1wiPlxyXG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIiBzZWxlY3RlZD1cIlwiPtCb0Y7QsdC+0Lk8L29wdGlvbj5cclxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMVwiPtCQ0LrRgtC40LLQvdGL0Lk8L29wdGlvbj5cclxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMFwiPtCd0LXQsNC60YLQuNCy0L3Ri9C5PC9vcHRpb24+XHJcbiAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9mb3JtPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBkYXRhLWVsZW1lbnQ9XCJwcm9kdWN0c0NvbnRhaW5lclwiIGNsYXNzPVwicHJvZHVjdHMtbGlzdF9fY29udGFpbmVyXCI+XHJcbiAgICAgICAgPCEtLS8vISBTb3J0YWJsZVRhYmxlLS0+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICBgO1xyXG4gIH1cclxuXHJcbiAgaW5pdENvbXBvbmVudHMoKSB7XHJcbiAgICBjb25zdCBwcm9kdWN0SWQgPSAnMTAxLXBsYW5zZXQtbGVub3ZvLXl0My14OTBsLTY0LWdiLTNnLWx0ZS1jZXJueWonO1xyXG5cclxuICAgIHRoaXMuY29tcG9uZW50cy5wcm9kdWN0RnJvbSA9IG5ldyBQcm9kdWN0Rm9ybShwcm9kdWN0SWQpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcmVuZGVyQ29tcG9uZW50cygpIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBhd2FpdCB0aGlzLmNvbXBvbmVudHMucHJvZHVjdEZyb20ucmVuZGVyKCk7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZChlbGVtZW50KTtcclxuICB9XHJcblxyXG4gIGdldFN1YkVsZW1lbnRzKGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGVsZW1lbnRzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1lbGVtZW50XScpO1xyXG4gICAgcmV0dXJuIFsuLi5lbGVtZW50c10ucmVkdWNlKChhY2MsIG5leHQpID0+IHtcclxuICAgICAgYWNjW25leHQuZGF0YXNldC5lbGVtZW50XSA9IG5leHQ7XHJcbiAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LCB7fSk7XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KCkge1xyXG4gICAgZm9yIChjb25zdCBjb21wb25lbnQgb2YgT2JqZWN0LnZhbHVlcyh0aGlzLmNvbXBvbmVudHMpKSB7XHJcbiAgICAgIGNvbXBvbmVudC5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBRUE7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUlBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBK0JBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEvRUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/products/list/index.js\n");

/***/ })

})