webpackHotUpdate("products-list-index-js",{

/***/ "./src/components/double-slider/index.js":
/*!***********************************************!*\
  !*** ./src/components/double-slider/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DoubleSlider; });\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nclass DoubleSlider {\n  constructor({\n    min = 100,\n    max = 200,\n    formatValue = value => \"$\" + value,\n    selected = {\n      from: min,\n      to: max\n    }\n  } = {}) {\n    _defineProperty(this, \"element\", void 0);\n\n    _defineProperty(this, \"subElements\", {});\n\n    _defineProperty(this, \"shiftX\", void 0);\n\n    _defineProperty(this, \"dragging\", void 0);\n\n    _defineProperty(this, \"clickDown\", e => {\n      e.preventDefault();\n      const thumbElement = e.target;\n      const {\n        left,\n        right\n      } = thumbElement.getBoundingClientRect();\n\n      if (thumbElement === this.subElements.thumbLeft) {\n        this.shiftX = right - e.clientX;\n      } else {\n        this.shiftX = left - e.clientX;\n      }\n\n      this.dragging = thumbElement;\n      this.element.classList.add(\"range-slider_dragging\");\n      document.addEventListener(\"pointermove\", this.pointerMove);\n      document.addEventListener(\"pointerup\", this.clickUp);\n    });\n\n    _defineProperty(this, \"pointerMove\", e => {\n      e.preventDefault();\n      const {\n        left: innerLeft,\n        right: innerRight,\n        width\n      } = this.subElements.inner.getBoundingClientRect();\n\n      if (this.dragging === this.subElements.thumbLeft) {\n        let newLeft = (e.clientX - innerLeft + this.shiftX) / width;\n\n        if (newLeft < 0) {\n          newLeft = 0;\n        }\n\n        newLeft *= 100;\n        let right = parseFloat(this.subElements.thumbRight.style.right);\n\n        if (newLeft + right > 100) {\n          newLeft = 100 - right;\n        }\n\n        this.dragging.style.left = this.subElements.progress.style.left = newLeft + \"%\";\n        this.subElements.from.innerHTML = this.formatValue(this.getValue().from);\n      }\n\n      if (this.dragging === this.subElements.thumbRight) {\n        let newRight = (innerRight - e.clientX - this.shiftX) / width;\n\n        if (newRight < 0) {\n          newRight = 0;\n        }\n\n        newRight *= 100;\n        let left = parseFloat(this.subElements.thumbLeft.style.left);\n\n        if (left + newRight > 100) {\n          newRight = 100 - left;\n        }\n\n        this.dragging.style.right = this.subElements.progress.style.right = newRight + \"%\";\n        this.subElements.to.innerHTML = this.formatValue(this.getValue().to);\n      }\n    });\n\n    _defineProperty(this, \"clickUp\", e => {\n      this.element.classList.remove('range-slider_dragging');\n      document.removeEventListener('pointermove', this.pointerMove);\n      document.removeEventListener('pointerup', this.clickUp);\n      this.element.dispatchEvent(new CustomEvent('range-select', {\n        detail: this.getValue(),\n        bubbles: true\n      }));\n    });\n\n    this.min = min;\n    this.max = max;\n    this.formatValue = formatValue;\n    this.selected = selected;\n    this.render();\n  }\n\n  get markup() {\n    const {\n      from,\n      to\n    } = this.selected;\n    return \"\\n          <div class=\\\"range-slider\\\">\\n              <span data-element=\\\"from\\\">\".concat(this.formatValue(from), \"</span>\\n              <div data-element=\\\"inner\\\" class=\\\"range-slider__inner\\\">\\n                  <span data-element=\\\"progress\\\" class=\\\"range-slider__progress\\\"></span>\\n                  <span data-element=\\\"thumbLeft\\\" class=\\\"range-slider__thumb-left\\\"></span>\\n                  <span data-element=\\\"thumbRight\\\" class=\\\"range-slider__thumb-right\\\"></span>\\n              </div>\\n              <span data-element=\\\"to\\\">\").concat(this.formatValue(to), \"</span>\\n          </div>\");\n  }\n\n  render() {\n    const element = document.createElement(\"div\");\n    element.innerHTML = this.markup;\n    this.element = element.firstElementChild;\n    this.subElements = this.getSubElements(this.element);\n    this.initEventListeners();\n    this.update();\n  }\n\n  getSubElements(element) {\n    const allElements = element.querySelectorAll(\"[data-element]\");\n    return [...allElements].reduce((acc, nextValue) => {\n      acc[nextValue.dataset.element] = nextValue;\n      return acc;\n    }, {});\n  }\n\n  initEventListeners() {\n    const {\n      thumbLeft,\n      thumbRight\n    } = this.subElements;\n    thumbLeft.addEventListener(\"pointerdown\", this.clickDown);\n    thumbRight.addEventListener(\"pointerdown\", this.clickDown);\n  }\n\n  getValue() {\n    const rangeTotal = this.max - this.min;\n    const {\n      left\n    } = this.subElements.thumbLeft.style;\n    const {\n      right\n    } = this.subElements.thumbRight.style;\n    const from = Math.round(this.min + parseFloat(left) * 0.01 * rangeTotal);\n    const to = Math.round(this.max - parseFloat(right) * 0.01 * rangeTotal);\n    return {\n      from,\n      to\n    };\n  }\n\n  remove() {\n    this.element.remove();\n  }\n\n  destroy() {\n    this.remove();\n    document.removeEventListener('pointermove', this.onThumbPointerMove);\n    document.removeEventListener('pointerup', this.onThumbPointerUp);\n  }\n\n  update() {\n    const rangeTotal = this.max - this.min;\n    const left = Math.floor((this.selected.from - this.min) / rangeTotal * 100) + '%';\n    const right = Math.floor((this.max - this.selected.to) / rangeTotal * 100) + '%';\n    this.subElements.progress.style.left = left;\n    this.subElements.progress.style.right = right;\n    this.subElements.thumbLeft.style.left = left;\n    this.subElements.thumbRight.style.right = right;\n  }\n\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9kb3VibGUtc2xpZGVyL2luZGV4LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZG91YmxlLXNsaWRlci9pbmRleC5qcz9kMzE0Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIERvdWJsZVNsaWRlciB7XHJcbiAgICBlbGVtZW50O1xyXG4gICAgc3ViRWxlbWVudHMgPSB7fTtcclxuICAgIHNoaWZ0WDtcclxuICAgIGRyYWdnaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHtcclxuICAgICAgbWluID0gMTAwLFxyXG4gICAgICBtYXggPSAyMDAsXHJcbiAgICAgIGZvcm1hdFZhbHVlID0gKHZhbHVlKSA9PiBcIiRcIiArIHZhbHVlLFxyXG4gICAgICBzZWxlY3RlZCA9IHtcclxuICAgICAgICAgIGZyb206IG1pbixcclxuICAgICAgICAgIHRvOiBtYXhcclxuICAgICAgfVxyXG4gICAgfSA9IHt9KSB7XHJcbiAgICAgIHRoaXMubWluID0gbWluO1xyXG4gICAgICB0aGlzLm1heCA9IG1heDtcclxuICAgICAgdGhpcy5mb3JtYXRWYWx1ZSA9IGZvcm1hdFZhbHVlO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XHJcbiAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBnZXQgbWFya3VwKCkge1xyXG4gICAgICBjb25zdCB7IGZyb20sIHRvIH0gPSB0aGlzLnNlbGVjdGVkO1xyXG4gICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJhbmdlLXNsaWRlclwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGRhdGEtZWxlbWVudD1cImZyb21cIj4ke3RoaXMuZm9ybWF0VmFsdWUoZnJvbSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1lbGVtZW50PVwiaW5uZXJcIiBjbGFzcz1cInJhbmdlLXNsaWRlcl9faW5uZXJcIj5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1lbGVtZW50PVwicHJvZ3Jlc3NcIiBjbGFzcz1cInJhbmdlLXNsaWRlcl9fcHJvZ3Jlc3NcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtZWxlbWVudD1cInRodW1iTGVmdFwiIGNsYXNzPVwicmFuZ2Utc2xpZGVyX190aHVtYi1sZWZ0XCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWVsZW1lbnQ9XCJ0aHVtYlJpZ2h0XCIgY2xhc3M9XCJyYW5nZS1zbGlkZXJfX3RodW1iLXJpZ2h0XCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxzcGFuIGRhdGEtZWxlbWVudD1cInRvXCI+JHt0aGlzLmZvcm1hdFZhbHVlKHRvKX08L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLm1hcmt1cDtcclxuICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZDtcclxuICBcclxuICAgICAgdGhpcy5zdWJFbGVtZW50cyA9IHRoaXMuZ2V0U3ViRWxlbWVudHModGhpcy5lbGVtZW50KTtcclxuICBcclxuICAgICAgdGhpcy5pbml0RXZlbnRMaXN0ZW5lcnMoKTtcclxuICBcclxuICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuICBcclxuICAgIGdldFN1YkVsZW1lbnRzKGVsZW1lbnQpIHtcclxuICAgICAgY29uc3QgYWxsRWxlbWVudHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1lbGVtZW50XVwiKTtcclxuICAgICAgcmV0dXJuIFsuLi5hbGxFbGVtZW50c10ucmVkdWNlKChhY2MsIG5leHRWYWx1ZSkgPT4ge1xyXG4gICAgICAgIGFjY1tuZXh0VmFsdWUuZGF0YXNldC5lbGVtZW50XSA9IG5leHRWYWx1ZTtcclxuICBcclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICB9LCB7fSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBpbml0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICAgIGNvbnN0IHsgdGh1bWJMZWZ0LCB0aHVtYlJpZ2h0IH0gPSB0aGlzLnN1YkVsZW1lbnRzO1xyXG4gIFxyXG4gICAgICB0aHVtYkxlZnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIHRoaXMuY2xpY2tEb3duKTtcclxuICAgICAgdGh1bWJSaWdodC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgdGhpcy5jbGlja0Rvd24pO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgY2xpY2tEb3duID0gKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zdCB0aHVtYkVsZW1lbnQgPSBlLnRhcmdldDtcclxuICBcclxuICAgICAgY29uc3QgeyBsZWZ0LCByaWdodCB9ID0gdGh1bWJFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICBpZiAodGh1bWJFbGVtZW50ID09PSB0aGlzLnN1YkVsZW1lbnRzLnRodW1iTGVmdCkge1xyXG4gICAgICAgIHRoaXMuc2hpZnRYID0gcmlnaHQgLSBlLmNsaWVudFg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zaGlmdFggPSBsZWZ0IC0gZS5jbGllbnRYO1xyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0aHVtYkVsZW1lbnQ7XHJcbiAgXHJcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicmFuZ2Utc2xpZGVyX2RyYWdnaW5nXCIpO1xyXG4gIFxyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgdGhpcy5wb2ludGVyTW92ZSk7XHJcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVydXBcIiwgdGhpcy5jbGlja1VwKTtcclxuICAgIH07XHJcbiAgXHJcbiAgICBwb2ludGVyTW92ZSA9IChlKSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3Qge1xyXG4gICAgICAgIGxlZnQ6IGlubmVyTGVmdCxcclxuICAgICAgICByaWdodDogaW5uZXJSaWdodCxcclxuICAgICAgICB3aWR0aCxcclxuICAgICAgfSA9IHRoaXMuc3ViRWxlbWVudHMuaW5uZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgXHJcbiAgICAgIGlmICh0aGlzLmRyYWdnaW5nID09PSB0aGlzLnN1YkVsZW1lbnRzLnRodW1iTGVmdCkge1xyXG4gICAgICAgIGxldCBuZXdMZWZ0ID0gKGUuY2xpZW50WCAtIGlubmVyTGVmdCArIHRoaXMuc2hpZnRYKSAvIHdpZHRoO1xyXG4gIFxyXG4gICAgICAgIGlmIChuZXdMZWZ0IDwgMCkge1xyXG4gICAgICAgICAgbmV3TGVmdCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5ld0xlZnQgKj0gMTAwOyBcclxuICAgICAgICBsZXQgcmlnaHQgPSBwYXJzZUZsb2F0KHRoaXMuc3ViRWxlbWVudHMudGh1bWJSaWdodC5zdHlsZS5yaWdodCk7XHJcbiAgXHJcbiAgICAgICAgaWYgKG5ld0xlZnQgKyByaWdodCA+IDEwMCkge1xyXG4gICAgICAgICAgbmV3TGVmdCA9IDEwMCAtIHJpZ2h0O1xyXG4gICAgICAgIH1cclxuICBcclxuICAgICAgICB0aGlzLmRyYWdnaW5nLnN0eWxlLmxlZnQgPSB0aGlzLnN1YkVsZW1lbnRzLnByb2dyZXNzLnN0eWxlLmxlZnQgPVxyXG4gICAgICAgICAgbmV3TGVmdCArIFwiJVwiO1xyXG4gICAgICAgIHRoaXMuc3ViRWxlbWVudHMuZnJvbS5pbm5lckhUTUwgPSB0aGlzLmZvcm1hdFZhbHVlKHRoaXMuZ2V0VmFsdWUoKS5mcm9tKTtcclxuICAgICAgfVxyXG4gIFxyXG4gICAgICBpZiAodGhpcy5kcmFnZ2luZyA9PT0gdGhpcy5zdWJFbGVtZW50cy50aHVtYlJpZ2h0KSB7XHJcbiAgICAgICAgbGV0IG5ld1JpZ2h0ID0gKGlubmVyUmlnaHQgLSBlLmNsaWVudFggLSB0aGlzLnNoaWZ0WCkgLyB3aWR0aDtcclxuICAgICAgICBpZiAobmV3UmlnaHQgPCAwKSB7XHJcbiAgICAgICAgICBuZXdSaWdodCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5ld1JpZ2h0ICo9IDEwMDtcclxuICBcclxuICAgICAgICBsZXQgbGVmdCA9IHBhcnNlRmxvYXQodGhpcy5zdWJFbGVtZW50cy50aHVtYkxlZnQuc3R5bGUubGVmdCk7XHJcbiAgXHJcbiAgICAgICAgaWYgKGxlZnQgKyBuZXdSaWdodCA+IDEwMCkge1xyXG4gICAgICAgICAgbmV3UmlnaHQgPSAxMDAgLSBsZWZ0O1xyXG4gICAgICAgIH1cclxuICBcclxuICAgICAgICB0aGlzLmRyYWdnaW5nLnN0eWxlLnJpZ2h0ID0gdGhpcy5zdWJFbGVtZW50cy5wcm9ncmVzcy5zdHlsZS5yaWdodCA9XHJcbiAgICAgICAgICBuZXdSaWdodCArIFwiJVwiO1xyXG4gICAgICAgICAgdGhpcy5zdWJFbGVtZW50cy50by5pbm5lckhUTUwgPSB0aGlzLmZvcm1hdFZhbHVlKHRoaXMuZ2V0VmFsdWUoKS50byk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgXHJcbiAgICBjbGlja1VwID0gKGUpID0+IHtcclxuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3JhbmdlLXNsaWRlcl9kcmFnZ2luZycpO1xyXG4gIFxyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIHRoaXMucG9pbnRlck1vdmUpO1xyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCB0aGlzLmNsaWNrVXApO1xyXG4gIFxyXG4gICAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3JhbmdlLXNlbGVjdCcsIHtcclxuICAgICAgICAgIGRldGFpbDogdGhpcy5nZXRWYWx1ZSgpLFxyXG4gICAgICAgICAgYnViYmxlczogdHJ1ZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuICBcclxuICAgIGdldFZhbHVlKCkge1xyXG4gICAgICAgIGNvbnN0IHJhbmdlVG90YWwgPSB0aGlzLm1heCAtIHRoaXMubWluO1xyXG4gICAgICAgIGNvbnN0IHsgbGVmdCB9ID0gdGhpcy5zdWJFbGVtZW50cy50aHVtYkxlZnQuc3R5bGU7XHJcbiAgICAgICAgY29uc3QgeyByaWdodCB9ID0gdGhpcy5zdWJFbGVtZW50cy50aHVtYlJpZ2h0LnN0eWxlO1xyXG4gIFxyXG4gICAgICAgIGNvbnN0IGZyb20gPSBNYXRoLnJvdW5kKHRoaXMubWluICsgcGFyc2VGbG9hdChsZWZ0KSAqIDAuMDEgKiByYW5nZVRvdGFsKTtcclxuICAgICAgICBjb25zdCB0byA9IE1hdGgucm91bmQodGhpcy5tYXggLSBwYXJzZUZsb2F0KHJpZ2h0KSAqIDAuMDEgKiByYW5nZVRvdGFsKTtcclxuICBcclxuICAgICAgICByZXR1cm4ge2Zyb20sIHRvfTtcclxuICAgIH1cclxuICBcclxuICAgIHJlbW92ZSgpIHtcclxuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCB0aGlzLm9uVGh1bWJQb2ludGVyTW92ZSk7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIHRoaXMub25UaHVtYlBvaW50ZXJVcCk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgIGNvbnN0IHJhbmdlVG90YWwgPSB0aGlzLm1heCAtIHRoaXMubWluO1xyXG4gICAgICBjb25zdCBsZWZ0ID0gTWF0aC5mbG9vcigodGhpcy5zZWxlY3RlZC5mcm9tIC0gdGhpcy5taW4pIC8gcmFuZ2VUb3RhbCAqIDEwMCkgKyAnJSc7XHJcbiAgICAgIGNvbnN0IHJpZ2h0ID0gTWF0aC5mbG9vcigodGhpcy5tYXggLSB0aGlzLnNlbGVjdGVkLnRvKSAvIHJhbmdlVG90YWwgKiAxMDApICsgJyUnO1xyXG4gIFxyXG4gICAgICB0aGlzLnN1YkVsZW1lbnRzLnByb2dyZXNzLnN0eWxlLmxlZnQgPSBsZWZ0O1xyXG4gICAgICB0aGlzLnN1YkVsZW1lbnRzLnByb2dyZXNzLnN0eWxlLnJpZ2h0ID0gcmlnaHQ7XHJcbiAgXHJcbiAgICAgIHRoaXMuc3ViRWxlbWVudHMudGh1bWJMZWZ0LnN0eWxlLmxlZnQgPSBsZWZ0O1xyXG4gICAgICB0aGlzLnN1YkVsZW1lbnRzLnRodW1iUmlnaHQuc3R5bGUucmlnaHQgPSByaWdodDtcclxuICAgIH1cclxuICB9Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSkE7QUFRQTtBQUNBO0FBREE7QUFDQTtBQURBO0FBQ0E7QUFEQTtBQUNBO0FBREE7QUFtREE7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFwRUE7QUFzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQWpIQTtBQW1IQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUE1SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQTZFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUE1S0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/double-slider/index.js\n");

/***/ }),

/***/ "./src/pages/products/list/index.js":
/*!******************************************!*\
  !*** ./src/pages/products/list/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Page; });\n/* harmony import */ var _utils_fetch_json_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/fetch-json.js */ \"./src/utils/fetch-json.js\");\n!(function webpackMissingModule() { var e = new Error(\"Cannot find module '../../../components/product-form.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n/* harmony import */ var _components_double_slider___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/double-slider/ */ \"./src/components/double-slider/index.js\");\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nclass Page {\n  constructor() {\n    _defineProperty(this, \"element\", void 0);\n\n    _defineProperty(this, \"subElements\", {});\n\n    _defineProperty(this, \"components\", {});\n  }\n\n  async render() {\n    const element = document.createElement('div');\n    element.innerHTML = this.template;\n    this.element = element.firstElementChild;\n    this.subElements = this.getSubElements(this.element);\n    console.log(this.subElements); // this.initComponents();\n    // await this.renderComponents();\n\n    return this.element;\n  }\n\n  get template() {\n    return \"\\n    <div class=\\\"products-list\\\">\\n      <div class=\\\"content__top-panel\\\">\\n        <h1 class=\\\"page-title\\\">\\u0422\\u043E\\u0432\\u0430\\u0440\\u044B</h1>\\n        <a href=\\\"/products/add\\\" class=\\\"button-primary\\\">\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C \\u0442\\u043E\\u0432\\u0430\\u0440</a>\\n      </div>\\n      <div class=\\\"content-box content-box_small\\\">\\n      <form class=\\\"form-inline\\\">\\n          <div class=\\\"form-group\\\">\\n            <label class=\\\"form-label\\\">\\u0421\\u043E\\u0440\\u0442\\u0438\\u0440\\u043E\\u0432\\u0430\\u0442\\u044C \\u043F\\u043E:</label>\\n            <input type=\\\"text\\\" data-element=\\\"filterName\\\" class=\\\"form-control\\\" placeholder=\\\"\\u041D\\u0430\\u0437\\u0432\\u0430\\u043D\\u0438\\u0435 \\u0442\\u043E\\u0432\\u0430\\u0440\\u0430\\\">\\n          </div>\\n          <div class=\\\"form-group\\\" data-element=\\\"sliderContainer\\\">\\n            <label class=\\\"form-label\\\">\\u0426\\u0435\\u043D\\u0430:</label>\\n              <!-- //! DoubleSlider -->\\n          </div>\\n          <div class=\\\"form-group\\\">\\n            <label class=\\\"form-label\\\">\\u0421\\u0442\\u0430\\u0442\\u0443\\u0441:</label>\\n            <select class=\\\"form-control\\\" data-element=\\\"filterStatus\\\">\\n              <option value=\\\"\\\" selected=\\\"\\\">\\u041B\\u044E\\u0431\\u043E\\u0439</option>\\n              <option value=\\\"1\\\">\\u0410\\u043A\\u0442\\u0438\\u0432\\u043D\\u044B\\u0439</option>\\n              <option value=\\\"0\\\">\\u041D\\u0435\\u0430\\u043A\\u0442\\u0438\\u0432\\u043D\\u044B\\u0439</option>\\n            </select>\\n          </div>\\n        </form>\\n      </div>\\n      <div data-element=\\\"productsContainer\\\" class=\\\"products-list__container\\\">\\n        <!--//! SortableTable-->\\n      </div>\\n    </div>\\n    \";\n  }\n\n  initComponents() {\n    const productId = '101-planset-lenovo-yt3-x90l-64-gb-3g-lte-cernyj';\n    this.components.productFrom = new !(function webpackMissingModule() { var e = new Error(\"Cannot find module '../../../components/product-form.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(productId);\n  }\n\n  async renderComponents() {\n    const element = await this.components.productFrom.render();\n    this.element.append(element);\n  }\n\n  getSubElements(element) {\n    const elements = element.querySelectorAll('[data-element]');\n    return [...elements].reduce((acc, next) => {\n      acc[next.dataset.element] = next;\n      return acc;\n    }, {});\n  }\n\n  destroy() {\n    for (const component of Object.values(this.components)) {\n      component.destroy();\n    }\n  }\n\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvcHJvZHVjdHMvbGlzdC9pbmRleC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9wYWdlcy9wcm9kdWN0cy9saXN0L2luZGV4LmpzPzQ5YjQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZldGNoSnNvbiBmcm9tICcuLi8uLi8uLi91dGlscy9mZXRjaC1qc29uLmpzJztcclxuXHJcbmltcG9ydCBQcm9kdWN0Rm9ybSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3Byb2R1Y3QtZm9ybS5qcyc7XHJcbmltcG9ydCBEb3VibGVTbGlkZXIgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9kb3VibGUtc2xpZGVyLyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlIHtcclxuICBlbGVtZW50O1xyXG4gIHN1YkVsZW1lbnRzID0ge307XHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICBhc3luYyByZW5kZXIoKSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLnRlbXBsYXRlO1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZDtcclxuXHJcbiAgICB0aGlzLnN1YkVsZW1lbnRzID0gdGhpcy5nZXRTdWJFbGVtZW50cyh0aGlzLmVsZW1lbnQpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuc3ViRWxlbWVudHMpO1xyXG4gICAgLy8gdGhpcy5pbml0Q29tcG9uZW50cygpO1xyXG4gICAgLy8gYXdhaXQgdGhpcy5yZW5kZXJDb21wb25lbnRzKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcclxuICB9XHJcblxyXG4gIGdldCB0ZW1wbGF0ZSgpIHtcclxuICAgIHJldHVybiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdHMtbGlzdFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGVudF9fdG9wLXBhbmVsXCI+XHJcbiAgICAgICAgPGgxIGNsYXNzPVwicGFnZS10aXRsZVwiPtCi0L7QstCw0YDRizwvaDE+XHJcbiAgICAgICAgPGEgaHJlZj1cIi9wcm9kdWN0cy9hZGRcIiBjbGFzcz1cImJ1dHRvbi1wcmltYXJ5XCI+0JTQvtCx0LDQstC40YLRjCDRgtC+0LLQsNGAPC9hPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtYm94IGNvbnRlbnQtYm94X3NtYWxsXCI+XHJcbiAgICAgIDxmb3JtIGNsYXNzPVwiZm9ybS1pbmxpbmVcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tbGFiZWxcIj7QodC+0YDRgtC40YDQvtCy0LDRgtGMINC/0L46PC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgZGF0YS1lbGVtZW50PVwiZmlsdGVyTmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCLQndCw0LfQstCw0L3QuNC1INGC0L7QstCw0YDQsFwiPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIGRhdGEtZWxlbWVudD1cInNsaWRlckNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWxhYmVsXCI+0KbQtdC90LA6PC9sYWJlbD5cclxuICAgICAgICAgICAgICA8IS0tIC8vISBEb3VibGVTbGlkZXIgLS0+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tbGFiZWxcIj7QodGC0LDRgtGD0YE6PC9sYWJlbD5cclxuICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIGRhdGEtZWxlbWVudD1cImZpbHRlclN0YXR1c1wiPlxyXG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIiBzZWxlY3RlZD1cIlwiPtCb0Y7QsdC+0Lk8L29wdGlvbj5cclxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMVwiPtCQ0LrRgtC40LLQvdGL0Lk8L29wdGlvbj5cclxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMFwiPtCd0LXQsNC60YLQuNCy0L3Ri9C5PC9vcHRpb24+XHJcbiAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9mb3JtPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBkYXRhLWVsZW1lbnQ9XCJwcm9kdWN0c0NvbnRhaW5lclwiIGNsYXNzPVwicHJvZHVjdHMtbGlzdF9fY29udGFpbmVyXCI+XHJcbiAgICAgICAgPCEtLS8vISBTb3J0YWJsZVRhYmxlLS0+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICBgO1xyXG4gIH1cclxuXHJcbiAgaW5pdENvbXBvbmVudHMoKSB7XHJcbiAgICBjb25zdCBwcm9kdWN0SWQgPSAnMTAxLXBsYW5zZXQtbGVub3ZvLXl0My14OTBsLTY0LWdiLTNnLWx0ZS1jZXJueWonO1xyXG5cclxuICAgIHRoaXMuY29tcG9uZW50cy5wcm9kdWN0RnJvbSA9IG5ldyBQcm9kdWN0Rm9ybShwcm9kdWN0SWQpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcmVuZGVyQ29tcG9uZW50cygpIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBhd2FpdCB0aGlzLmNvbXBvbmVudHMucHJvZHVjdEZyb20ucmVuZGVyKCk7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZChlbGVtZW50KTtcclxuICB9XHJcblxyXG4gIGdldFN1YkVsZW1lbnRzKGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGVsZW1lbnRzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1lbGVtZW50XScpO1xyXG4gICAgcmV0dXJuIFsuLi5lbGVtZW50c10ucmVkdWNlKChhY2MsIG5leHQpID0+IHtcclxuICAgICAgYWNjW25leHQuZGF0YXNldC5lbGVtZW50XSA9IG5leHQ7XHJcbiAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LCB7fSk7XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KCkge1xyXG4gICAgZm9yIChjb25zdCBjb21wb25lbnQgb2YgT2JqZWN0LnZhbHVlcyh0aGlzLmNvbXBvbmVudHMpKSB7XHJcbiAgICAgIGNvbXBvbmVudC5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBRUE7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUlBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBK0JBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEvRUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/products/list/index.js\n");

/***/ })

})