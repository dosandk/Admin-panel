webpackHotUpdate("products-list-index-js",{

/***/ "./src/components/double-slider/index.js":
/*!***********************************************!*\
  !*** ./src/components/double-slider/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DoubleSlider; });\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nclass DoubleSlider {\n  constructor({\n    min = 100,\n    max = 200,\n    formatValue = value => '$' + value,\n    selected = {\n      from: min,\n      to: max\n    }\n  } = {}) {\n    _defineProperty(this, \"element\", void 0);\n\n    _defineProperty(this, \"subElements\", {});\n\n    _defineProperty(this, \"shiftX\", void 0);\n\n    _defineProperty(this, \"dragging\", void 0);\n\n    _defineProperty(this, \"clickDown\", e => {\n      e.preventDefault();\n      const thumbElement = e.target;\n      const {\n        left,\n        right\n      } = thumbElement.getBoundingClientRect();\n\n      if (thumbElement === this.subElements.thumbLeft) {\n        this.shiftX = right - e.clientX;\n      } else {\n        this.shiftX = left - e.clientX;\n      }\n\n      this.dragging = thumbElement;\n      this.element.classList.add('range-slider_dragging');\n      document.addEventListener('pointermove', this.pointerMove);\n      document.addEventListener('pointerup', this.clickUp);\n    });\n\n    _defineProperty(this, \"pointerMove\", e => {\n      e.preventDefault();\n      const {\n        left: innerLeft,\n        right: innerRight,\n        width\n      } = this.subElements.inner.getBoundingClientRect();\n\n      if (this.dragging === this.subElements.thumbLeft) {\n        let newLeft = (e.clientX - innerLeft + this.shiftX) / width;\n\n        if (newLeft < 0) {\n          newLeft = 0;\n        }\n\n        newLeft *= 100;\n        let right = parseFloat(this.subElements.thumbRight.style.right);\n\n        if (newLeft + right > 100) {\n          newLeft = 100 - right;\n        }\n\n        this.dragging.style.left = this.subElements.progress.style.left = newLeft + '%';\n        this.subElements.from.innerHTML = this.formatValue(this.getValue().from);\n      }\n\n      if (this.dragging === this.subElements.thumbRight) {\n        let newRight = (innerRight - e.clientX - this.shiftX) / width;\n\n        if (newRight < 0) {\n          newRight = 0;\n        }\n\n        newRight *= 100;\n        let left = parseFloat(this.subElements.thumbLeft.style.left);\n\n        if (left + newRight > 100) {\n          newRight = 100 - left;\n        }\n\n        this.dragging.style.right = this.subElements.progress.style.right = newRight + '%';\n        this.subElements.to.innerHTML = this.formatValue(this.getValue().to);\n      }\n    });\n\n    _defineProperty(this, \"clickUp\", e => {\n      this.element.classList.remove('range-slider_dragging');\n      document.removeEventListener('pointermove', this.pointerMove);\n      document.removeEventListener('pointerup', this.clickUp);\n      this.element.dispatchEvent(new CustomEvent('range-select', {\n        detail: this.getValue(),\n        bubbles: true\n      }));\n    });\n\n    this.min = min;\n    this.max = max;\n    this.formatValue = formatValue;\n    this.selected = selected;\n    this.render();\n  }\n\n  get markup() {\n    const {\n      from,\n      to\n    } = this.selected;\n    return \"\\n          <div class=\\\"range-slider\\\">\\n              <span data-element=\\\"from\\\">\".concat(this.formatValue(from), \"</span>\\n              <div data-element=\\\"inner\\\" class=\\\"range-slider__inner\\\">\\n                  <span data-element=\\\"progress\\\" class=\\\"range-slider__progress\\\"></span>\\n                  <span data-element=\\\"thumbLeft\\\" class=\\\"range-slider__thumb-left\\\"></span>\\n                  <span data-element=\\\"thumbRight\\\" class=\\\"range-slider__thumb-right\\\"></span>\\n              </div>\\n              <span data-element=\\\"to\\\">\").concat(this.formatValue(to), \"</span>\\n          </div>\");\n  }\n\n  render() {\n    const element = document.createElement('div');\n    element.innerHTML = this.markup;\n    this.element = element.firstElementChild;\n    this.subElements = this.getSubElements(this.element);\n    this.initEventListeners();\n    this.update();\n  }\n\n  getSubElements(element) {\n    const allElements = element.querySelectorAll('[data-element]');\n    return [...allElements].reduce((acc, nextValue) => {\n      acc[nextValue.dataset.element] = nextValue;\n      return acc;\n    }, {});\n  }\n\n  initEventListeners() {\n    const {\n      thumbLeft,\n      thumbRight\n    } = this.subElements;\n    thumbLeft.addEventListener('pointerdown', this.clickDown);\n    thumbRight.addEventListener('pointerdown', this.clickDown);\n  }\n\n  getValue() {\n    const rangeTotal = this.max - this.min;\n    const {\n      left\n    } = this.subElements.thumbLeft.style;\n    const {\n      right\n    } = this.subElements.thumbRight.style;\n    const from = Math.round(this.min + parseFloat(left) * 0.01 * rangeTotal);\n    const to = Math.round(this.max - parseFloat(right) * 0.01 * rangeTotal);\n    return {\n      from,\n      to\n    };\n  }\n\n  remove() {\n    this.element.remove();\n  }\n\n  destroy() {\n    this.remove();\n    document.removeEventListener('pointermove', this.onThumbPointerMove);\n    document.removeEventListener('pointerup', this.onThumbPointerUp);\n  }\n\n  update() {\n    const rangeTotal = this.max - this.min;\n    const left = Math.floor((this.selected.from - this.min) / rangeTotal * 100) + '%';\n    const right = Math.floor((this.max - this.selected.to) / rangeTotal * 100) + '%';\n    this.subElements.progress.style.left = left;\n    this.subElements.progress.style.right = right;\n    this.subElements.thumbLeft.style.left = left;\n    this.subElements.thumbRight.style.right = right;\n  }\n\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9kb3VibGUtc2xpZGVyL2luZGV4LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZG91YmxlLXNsaWRlci9pbmRleC5qcz9kMzE0Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIERvdWJsZVNsaWRlciB7XHJcbiAgZWxlbWVudDtcclxuICBzdWJFbGVtZW50cyA9IHt9O1xyXG4gIHNoaWZ0WDtcclxuICBkcmFnZ2luZztcclxuXHJcbiAgY29uc3RydWN0b3Ioe1xyXG4gICAgbWluID0gMTAwLFxyXG4gICAgbWF4ID0gMjAwLFxyXG4gICAgZm9ybWF0VmFsdWUgPSB2YWx1ZSA9PiAnJCcgKyB2YWx1ZSxcclxuICAgIHNlbGVjdGVkID0ge1xyXG4gICAgICBmcm9tOiBtaW4sXHJcbiAgICAgIHRvOiBtYXhcclxuICAgIH1cclxuICB9ID0ge30pIHtcclxuICAgIHRoaXMubWluID0gbWluO1xyXG4gICAgdGhpcy5tYXggPSBtYXg7XHJcbiAgICB0aGlzLmZvcm1hdFZhbHVlID0gZm9ybWF0VmFsdWU7XHJcbiAgICB0aGlzLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1hcmt1cCgpIHtcclxuICAgIGNvbnN0IHsgZnJvbSwgdG8gfSA9IHRoaXMuc2VsZWN0ZWQ7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJhbmdlLXNsaWRlclwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGRhdGEtZWxlbWVudD1cImZyb21cIj4ke3RoaXMuZm9ybWF0VmFsdWUoZnJvbSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1lbGVtZW50PVwiaW5uZXJcIiBjbGFzcz1cInJhbmdlLXNsaWRlcl9faW5uZXJcIj5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1lbGVtZW50PVwicHJvZ3Jlc3NcIiBjbGFzcz1cInJhbmdlLXNsaWRlcl9fcHJvZ3Jlc3NcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtZWxlbWVudD1cInRodW1iTGVmdFwiIGNsYXNzPVwicmFuZ2Utc2xpZGVyX190aHVtYi1sZWZ0XCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWVsZW1lbnQ9XCJ0aHVtYlJpZ2h0XCIgY2xhc3M9XCJyYW5nZS1zbGlkZXJfX3RodW1iLXJpZ2h0XCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxzcGFuIGRhdGEtZWxlbWVudD1cInRvXCI+JHt0aGlzLmZvcm1hdFZhbHVlKHRvKX08L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5gO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLm1hcmt1cDtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcblxyXG4gICAgdGhpcy5zdWJFbGVtZW50cyA9IHRoaXMuZ2V0U3ViRWxlbWVudHModGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICB0aGlzLmluaXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICBnZXRTdWJFbGVtZW50cyhlbGVtZW50KSB7XHJcbiAgICBjb25zdCBhbGxFbGVtZW50cyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZWxlbWVudF0nKTtcclxuICAgIHJldHVybiBbLi4uYWxsRWxlbWVudHNdLnJlZHVjZSgoYWNjLCBuZXh0VmFsdWUpID0+IHtcclxuICAgICAgYWNjW25leHRWYWx1ZS5kYXRhc2V0LmVsZW1lbnRdID0gbmV4dFZhbHVlO1xyXG5cclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIHt9KTtcclxuICB9XHJcblxyXG4gIGluaXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IHsgdGh1bWJMZWZ0LCB0aHVtYlJpZ2h0IH0gPSB0aGlzLnN1YkVsZW1lbnRzO1xyXG5cclxuICAgIHRodW1iTGVmdC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHRoaXMuY2xpY2tEb3duKTtcclxuICAgIHRodW1iUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCB0aGlzLmNsaWNrRG93bik7XHJcbiAgfVxyXG5cclxuICBjbGlja0Rvd24gPSBlID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IHRodW1iRWxlbWVudCA9IGUudGFyZ2V0O1xyXG5cclxuICAgIGNvbnN0IHsgbGVmdCwgcmlnaHQgfSA9IHRodW1iRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGlmICh0aHVtYkVsZW1lbnQgPT09IHRoaXMuc3ViRWxlbWVudHMudGh1bWJMZWZ0KSB7XHJcbiAgICAgIHRoaXMuc2hpZnRYID0gcmlnaHQgLSBlLmNsaWVudFg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNoaWZ0WCA9IGxlZnQgLSBlLmNsaWVudFg7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kcmFnZ2luZyA9IHRodW1iRWxlbWVudDtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncmFuZ2Utc2xpZGVyX2RyYWdnaW5nJyk7XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCB0aGlzLnBvaW50ZXJNb3ZlKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIHRoaXMuY2xpY2tVcCk7XHJcbiAgfTtcclxuXHJcbiAgcG9pbnRlck1vdmUgPSBlID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IHtcclxuICAgICAgbGVmdDogaW5uZXJMZWZ0LFxyXG4gICAgICByaWdodDogaW5uZXJSaWdodCxcclxuICAgICAgd2lkdGhcclxuICAgIH0gPSB0aGlzLnN1YkVsZW1lbnRzLmlubmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgIGlmICh0aGlzLmRyYWdnaW5nID09PSB0aGlzLnN1YkVsZW1lbnRzLnRodW1iTGVmdCkge1xyXG4gICAgICBsZXQgbmV3TGVmdCA9IChlLmNsaWVudFggLSBpbm5lckxlZnQgKyB0aGlzLnNoaWZ0WCkgLyB3aWR0aDtcclxuXHJcbiAgICAgIGlmIChuZXdMZWZ0IDwgMCkge1xyXG4gICAgICAgIG5ld0xlZnQgPSAwO1xyXG4gICAgICB9XHJcbiAgICAgIG5ld0xlZnQgKj0gMTAwO1xyXG4gICAgICBsZXQgcmlnaHQgPSBwYXJzZUZsb2F0KHRoaXMuc3ViRWxlbWVudHMudGh1bWJSaWdodC5zdHlsZS5yaWdodCk7XHJcblxyXG4gICAgICBpZiAobmV3TGVmdCArIHJpZ2h0ID4gMTAwKSB7XHJcbiAgICAgICAgbmV3TGVmdCA9IDEwMCAtIHJpZ2h0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmRyYWdnaW5nLnN0eWxlLmxlZnQgPSB0aGlzLnN1YkVsZW1lbnRzLnByb2dyZXNzLnN0eWxlLmxlZnQgPSBuZXdMZWZ0ICsgJyUnO1xyXG4gICAgICB0aGlzLnN1YkVsZW1lbnRzLmZyb20uaW5uZXJIVE1MID0gdGhpcy5mb3JtYXRWYWx1ZSh0aGlzLmdldFZhbHVlKCkuZnJvbSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZHJhZ2dpbmcgPT09IHRoaXMuc3ViRWxlbWVudHMudGh1bWJSaWdodCkge1xyXG4gICAgICBsZXQgbmV3UmlnaHQgPSAoaW5uZXJSaWdodCAtIGUuY2xpZW50WCAtIHRoaXMuc2hpZnRYKSAvIHdpZHRoO1xyXG4gICAgICBpZiAobmV3UmlnaHQgPCAwKSB7XHJcbiAgICAgICAgbmV3UmlnaHQgPSAwO1xyXG4gICAgICB9XHJcbiAgICAgIG5ld1JpZ2h0ICo9IDEwMDtcclxuXHJcbiAgICAgIGxldCBsZWZ0ID0gcGFyc2VGbG9hdCh0aGlzLnN1YkVsZW1lbnRzLnRodW1iTGVmdC5zdHlsZS5sZWZ0KTtcclxuXHJcbiAgICAgIGlmIChsZWZ0ICsgbmV3UmlnaHQgPiAxMDApIHtcclxuICAgICAgICBuZXdSaWdodCA9IDEwMCAtIGxlZnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZHJhZ2dpbmcuc3R5bGUucmlnaHQgPSB0aGlzLnN1YkVsZW1lbnRzLnByb2dyZXNzLnN0eWxlLnJpZ2h0ID0gbmV3UmlnaHQgKyAnJSc7XHJcbiAgICAgIHRoaXMuc3ViRWxlbWVudHMudG8uaW5uZXJIVE1MID0gdGhpcy5mb3JtYXRWYWx1ZSh0aGlzLmdldFZhbHVlKCkudG8pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNsaWNrVXAgPSBlID0+IHtcclxuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdyYW5nZS1zbGlkZXJfZHJhZ2dpbmcnKTtcclxuXHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIHRoaXMucG9pbnRlck1vdmUpO1xyXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgdGhpcy5jbGlja1VwKTtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChcclxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdyYW5nZS1zZWxlY3QnLCB7XHJcbiAgICAgICAgZGV0YWlsOiB0aGlzLmdldFZhbHVlKCksXHJcbiAgICAgICAgYnViYmxlczogdHJ1ZVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICBnZXRWYWx1ZSgpIHtcclxuICAgIGNvbnN0IHJhbmdlVG90YWwgPSB0aGlzLm1heCAtIHRoaXMubWluO1xyXG4gICAgY29uc3QgeyBsZWZ0IH0gPSB0aGlzLnN1YkVsZW1lbnRzLnRodW1iTGVmdC5zdHlsZTtcclxuICAgIGNvbnN0IHsgcmlnaHQgfSA9IHRoaXMuc3ViRWxlbWVudHMudGh1bWJSaWdodC5zdHlsZTtcclxuXHJcbiAgICBjb25zdCBmcm9tID0gTWF0aC5yb3VuZCh0aGlzLm1pbiArIHBhcnNlRmxvYXQobGVmdCkgKiAwLjAxICogcmFuZ2VUb3RhbCk7XHJcbiAgICBjb25zdCB0byA9IE1hdGgucm91bmQodGhpcy5tYXggLSBwYXJzZUZsb2F0KHJpZ2h0KSAqIDAuMDEgKiByYW5nZVRvdGFsKTtcclxuXHJcbiAgICByZXR1cm4geyBmcm9tLCB0byB9O1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIHRoaXMub25UaHVtYlBvaW50ZXJNb3ZlKTtcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIHRoaXMub25UaHVtYlBvaW50ZXJVcCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICBjb25zdCByYW5nZVRvdGFsID0gdGhpcy5tYXggLSB0aGlzLm1pbjtcclxuICAgIGNvbnN0IGxlZnQgPSBNYXRoLmZsb29yKCgodGhpcy5zZWxlY3RlZC5mcm9tIC0gdGhpcy5taW4pIC8gcmFuZ2VUb3RhbCkgKiAxMDApICsgJyUnO1xyXG4gICAgY29uc3QgcmlnaHQgPSBNYXRoLmZsb29yKCgodGhpcy5tYXggLSB0aGlzLnNlbGVjdGVkLnRvKSAvIHJhbmdlVG90YWwpICogMTAwKSArICclJztcclxuXHJcbiAgICB0aGlzLnN1YkVsZW1lbnRzLnByb2dyZXNzLnN0eWxlLmxlZnQgPSBsZWZ0O1xyXG4gICAgdGhpcy5zdWJFbGVtZW50cy5wcm9ncmVzcy5zdHlsZS5yaWdodCA9IHJpZ2h0O1xyXG5cclxuICAgIHRoaXMuc3ViRWxlbWVudHMudGh1bWJMZWZ0LnN0eWxlLmxlZnQgPSBsZWZ0O1xyXG4gICAgdGhpcy5zdWJFbGVtZW50cy50aHVtYlJpZ2h0LnN0eWxlLnJpZ2h0ID0gcmlnaHQ7XHJcbiAgfVxyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUpBO0FBUUE7QUFDQTtBQURBO0FBQ0E7QUFEQTtBQUNBO0FBREE7QUFDQTtBQURBO0FBbURBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBcEVBO0FBc0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEvR0E7QUFpSEE7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBNUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUE2RUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBNUtBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/double-slider/index.js\n");

/***/ })

})