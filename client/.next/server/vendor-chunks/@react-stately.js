"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@react-stately";
exports.ids = ["vendor-chunks/@react-stately"];
exports.modules = {

/***/ "(ssr)/./node_modules/@react-stately/utils/dist/import.mjs":
/*!***********************************************************!*\
  !*** ./node_modules/@react-stately/utils/dist/import.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clamp: () => (/* binding */ $9446cca9a3875146$export$7d15b64cf5a3a4c4),\n/* harmony export */   snapValueToStep: () => (/* binding */ $9446cca9a3875146$export$cb6e0bb50bc19463),\n/* harmony export */   toFixedNumber: () => (/* binding */ $9446cca9a3875146$export$b6268554fba451f),\n/* harmony export */   useControlledState: () => (/* binding */ $458b0a5536c1a7cf$export$40bfa8c7b0832715)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n\n\n/*\n * Copyright 2020 Adobe. All rights reserved.\n * This file is licensed to you under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License. You may obtain a copy\n * of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software distributed under\n * the License is distributed on an \"AS IS\" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS\n * OF ANY KIND, either express or implied. See the License for the specific language\n * governing permissions and limitations under the License.\n */ /*\n * Copyright 2020 Adobe. All rights reserved.\n * This file is licensed to you under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License. You may obtain a copy\n * of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software distributed under\n * the License is distributed on an \"AS IS\" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS\n * OF ANY KIND, either express or implied. See the License for the specific language\n * governing permissions and limitations under the License.\n */ \nfunction $458b0a5536c1a7cf$export$40bfa8c7b0832715(value, defaultValue, onChange) {\n    let [stateValue, setStateValue] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(value || defaultValue);\n    let isControlledRef = (0, react__WEBPACK_IMPORTED_MODULE_0__.useRef)(value !== undefined);\n    let isControlled = value !== undefined;\n    (0, react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        let wasControlled = isControlledRef.current;\n        if (wasControlled !== isControlled) console.warn(`WARN: A component changed from ${wasControlled ? \"controlled\" : \"uncontrolled\"} to ${isControlled ? \"controlled\" : \"uncontrolled\"}.`);\n        isControlledRef.current = isControlled;\n    }, [\n        isControlled\n    ]);\n    let currentValue = isControlled ? value : stateValue;\n    let setValue = (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((value, ...args)=>{\n        let onChangeCaller = (value, ...onChangeArgs)=>{\n            if (onChange) {\n                if (!Object.is(currentValue, value)) onChange(value, ...onChangeArgs);\n            }\n            if (!isControlled) // If uncontrolled, mutate the currentValue local variable so that\n            // calling setState multiple times with the same value only emits onChange once.\n            // We do not use a ref for this because we specifically _do_ want the value to\n            // reset every render, and assigning to a ref in render breaks aborted suspended renders.\n            // eslint-disable-next-line react-hooks/exhaustive-deps\n            currentValue = value;\n        };\n        if (typeof value === \"function\") {\n            console.warn(\"We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320\");\n            // this supports functional updates https://reactjs.org/docs/hooks-reference.html#functional-updates\n            // when someone using useControlledState calls setControlledState(myFunc)\n            // this will call our useState setState with a function as well which invokes myFunc and calls onChange with the value from myFunc\n            // if we're in an uncontrolled state, then we also return the value of myFunc which to setState looks as though it was just called with myFunc from the beginning\n            // otherwise we just return the controlled value, which won't cause a rerender because React knows to bail out when the value is the same\n            let updateFunction = (oldValue, ...functionArgs)=>{\n                let interceptedValue = value(isControlled ? currentValue : oldValue, ...functionArgs);\n                onChangeCaller(interceptedValue, ...args);\n                if (!isControlled) return interceptedValue;\n                return oldValue;\n            };\n            setStateValue(updateFunction);\n        } else {\n            if (!isControlled) setStateValue(value);\n            onChangeCaller(value, ...args);\n        }\n    }, [\n        isControlled,\n        currentValue,\n        onChange\n    ]);\n    return [\n        currentValue,\n        setValue\n    ];\n}\n\n\n/*\n * Copyright 2020 Adobe. All rights reserved.\n * This file is licensed to you under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License. You may obtain a copy\n * of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software distributed under\n * the License is distributed on an \"AS IS\" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS\n * OF ANY KIND, either express or implied. See the License for the specific language\n * governing permissions and limitations under the License.\n */ /**\n * Takes a value and forces it to the closest min/max if it's outside. Also forces it to the closest valid step.\n */ function $9446cca9a3875146$export$7d15b64cf5a3a4c4(value, min = -Infinity, max = Infinity) {\n    let newValue = Math.min(Math.max(value, min), max);\n    return newValue;\n}\nfunction $9446cca9a3875146$export$cb6e0bb50bc19463(value, min, max, step) {\n    let remainder = (value - (isNaN(min) ? 0 : min)) % step;\n    let snappedValue = Math.abs(remainder) * 2 >= step ? value + Math.sign(remainder) * (step - Math.abs(remainder)) : value - remainder;\n    if (!isNaN(min)) {\n        if (snappedValue < min) snappedValue = min;\n        else if (!isNaN(max) && snappedValue > max) snappedValue = min + Math.floor((max - min) / step) * step;\n    } else if (!isNaN(max) && snappedValue > max) snappedValue = Math.floor(max / step) * step;\n    // correct floating point behavior by rounding to step precision\n    let string = step.toString();\n    let index = string.indexOf(\".\");\n    let precision = index >= 0 ? string.length - index : 0;\n    if (precision > 0) {\n        let pow = Math.pow(10, precision);\n        snappedValue = Math.round(snappedValue * pow) / pow;\n    }\n    return snappedValue;\n}\nfunction $9446cca9a3875146$export$b6268554fba451f(value, digits, base = 10) {\n    const pow = Math.pow(base, digits);\n    return Math.round(value * pow) / pow;\n}\n\n\n\n\n\n//# sourceMappingURL=module.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvQHJlYWN0LXN0YXRlbHkvdXRpbHMvZGlzdC9pbXBvcnQubWpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQTZJOztBQUU3STtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQywyQ0FBZTtBQUN6RCw4QkFBOEIseUNBQWE7QUFDM0M7QUFDQSxRQUFRLDRDQUFnQjtBQUN4QjtBQUNBLDJGQUEyRiwrQ0FBK0MsS0FBSyw2Q0FBNkM7QUFDNUw7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDhDQUFrQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtzUDtBQUN0UCIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaWVudC8uL25vZGVfbW9kdWxlcy9AcmVhY3Qtc3RhdGVseS91dGlscy9kaXN0L2ltcG9ydC5tanM/ODk5NiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3VzZVN0YXRlIGFzICQ2aW11aCR1c2VTdGF0ZSwgdXNlUmVmIGFzICQ2aW11aCR1c2VSZWYsIHVzZUVmZmVjdCBhcyAkNmltdWgkdXNlRWZmZWN0LCB1c2VDYWxsYmFjayBhcyAkNmltdWgkdXNlQ2FsbGJhY2t9IGZyb20gXCJyZWFjdFwiO1xuXG4vKlxuICogQ29weXJpZ2h0IDIwMjAgQWRvYmUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGZpbGUgaXMgbGljZW5zZWQgdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlclxuICogdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgUkVQUkVTRU5UQVRJT05TXG4gKiBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2VcbiAqIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi8gLypcbiAqIENvcHlyaWdodCAyMDIwIEFkb2JlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBmaWxlIGlzIGxpY2Vuc2VkIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBMaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXJcbiAqIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIFJFUFJFU0VOVEFUSU9OU1xuICogT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlXG4gKiBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovIFxuZnVuY3Rpb24gJDQ1OGIwYTU1MzZjMWE3Y2YkZXhwb3J0JDQwYmZhOGM3YjA4MzI3MTUodmFsdWUsIGRlZmF1bHRWYWx1ZSwgb25DaGFuZ2UpIHtcbiAgICBsZXQgW3N0YXRlVmFsdWUsIHNldFN0YXRlVmFsdWVdID0gKDAsICQ2aW11aCR1c2VTdGF0ZSkodmFsdWUgfHwgZGVmYXVsdFZhbHVlKTtcbiAgICBsZXQgaXNDb250cm9sbGVkUmVmID0gKDAsICQ2aW11aCR1c2VSZWYpKHZhbHVlICE9PSB1bmRlZmluZWQpO1xuICAgIGxldCBpc0NvbnRyb2xsZWQgPSB2YWx1ZSAhPT0gdW5kZWZpbmVkO1xuICAgICgwLCAkNmltdWgkdXNlRWZmZWN0KSgoKT0+e1xuICAgICAgICBsZXQgd2FzQ29udHJvbGxlZCA9IGlzQ29udHJvbGxlZFJlZi5jdXJyZW50O1xuICAgICAgICBpZiAod2FzQ29udHJvbGxlZCAhPT0gaXNDb250cm9sbGVkKSBjb25zb2xlLndhcm4oYFdBUk46IEEgY29tcG9uZW50IGNoYW5nZWQgZnJvbSAke3dhc0NvbnRyb2xsZWQgPyBcImNvbnRyb2xsZWRcIiA6IFwidW5jb250cm9sbGVkXCJ9IHRvICR7aXNDb250cm9sbGVkID8gXCJjb250cm9sbGVkXCIgOiBcInVuY29udHJvbGxlZFwifS5gKTtcbiAgICAgICAgaXNDb250cm9sbGVkUmVmLmN1cnJlbnQgPSBpc0NvbnRyb2xsZWQ7XG4gICAgfSwgW1xuICAgICAgICBpc0NvbnRyb2xsZWRcbiAgICBdKTtcbiAgICBsZXQgY3VycmVudFZhbHVlID0gaXNDb250cm9sbGVkID8gdmFsdWUgOiBzdGF0ZVZhbHVlO1xuICAgIGxldCBzZXRWYWx1ZSA9ICgwLCAkNmltdWgkdXNlQ2FsbGJhY2spKCh2YWx1ZSwgLi4uYXJncyk9PntcbiAgICAgICAgbGV0IG9uQ2hhbmdlQ2FsbGVyID0gKHZhbHVlLCAuLi5vbkNoYW5nZUFyZ3MpPT57XG4gICAgICAgICAgICBpZiAob25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoIU9iamVjdC5pcyhjdXJyZW50VmFsdWUsIHZhbHVlKSkgb25DaGFuZ2UodmFsdWUsIC4uLm9uQ2hhbmdlQXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzQ29udHJvbGxlZCkgLy8gSWYgdW5jb250cm9sbGVkLCBtdXRhdGUgdGhlIGN1cnJlbnRWYWx1ZSBsb2NhbCB2YXJpYWJsZSBzbyB0aGF0XG4gICAgICAgICAgICAvLyBjYWxsaW5nIHNldFN0YXRlIG11bHRpcGxlIHRpbWVzIHdpdGggdGhlIHNhbWUgdmFsdWUgb25seSBlbWl0cyBvbkNoYW5nZSBvbmNlLlxuICAgICAgICAgICAgLy8gV2UgZG8gbm90IHVzZSBhIHJlZiBmb3IgdGhpcyBiZWNhdXNlIHdlIHNwZWNpZmljYWxseSBfZG9fIHdhbnQgdGhlIHZhbHVlIHRvXG4gICAgICAgICAgICAvLyByZXNldCBldmVyeSByZW5kZXIsIGFuZCBhc3NpZ25pbmcgdG8gYSByZWYgaW4gcmVuZGVyIGJyZWFrcyBhYm9ydGVkIHN1c3BlbmRlZCByZW5kZXJzLlxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL2V4aGF1c3RpdmUtZGVwc1xuICAgICAgICAgICAgY3VycmVudFZhbHVlID0gdmFsdWU7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiV2UgY2FuIG5vdCBzdXBwb3J0IGEgZnVuY3Rpb24gY2FsbGJhY2suIFNlZSBHaXRodWIgSXNzdWVzIGZvciBkZXRhaWxzIGh0dHBzOi8vZ2l0aHViLmNvbS9hZG9iZS9yZWFjdC1zcGVjdHJ1bS9pc3N1ZXMvMjMyMFwiKTtcbiAgICAgICAgICAgIC8vIHRoaXMgc3VwcG9ydHMgZnVuY3Rpb25hbCB1cGRhdGVzIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9ob29rcy1yZWZlcmVuY2UuaHRtbCNmdW5jdGlvbmFsLXVwZGF0ZXNcbiAgICAgICAgICAgIC8vIHdoZW4gc29tZW9uZSB1c2luZyB1c2VDb250cm9sbGVkU3RhdGUgY2FsbHMgc2V0Q29udHJvbGxlZFN0YXRlKG15RnVuYylcbiAgICAgICAgICAgIC8vIHRoaXMgd2lsbCBjYWxsIG91ciB1c2VTdGF0ZSBzZXRTdGF0ZSB3aXRoIGEgZnVuY3Rpb24gYXMgd2VsbCB3aGljaCBpbnZva2VzIG15RnVuYyBhbmQgY2FsbHMgb25DaGFuZ2Ugd2l0aCB0aGUgdmFsdWUgZnJvbSBteUZ1bmNcbiAgICAgICAgICAgIC8vIGlmIHdlJ3JlIGluIGFuIHVuY29udHJvbGxlZCBzdGF0ZSwgdGhlbiB3ZSBhbHNvIHJldHVybiB0aGUgdmFsdWUgb2YgbXlGdW5jIHdoaWNoIHRvIHNldFN0YXRlIGxvb2tzIGFzIHRob3VnaCBpdCB3YXMganVzdCBjYWxsZWQgd2l0aCBteUZ1bmMgZnJvbSB0aGUgYmVnaW5uaW5nXG4gICAgICAgICAgICAvLyBvdGhlcndpc2Ugd2UganVzdCByZXR1cm4gdGhlIGNvbnRyb2xsZWQgdmFsdWUsIHdoaWNoIHdvbid0IGNhdXNlIGEgcmVyZW5kZXIgYmVjYXVzZSBSZWFjdCBrbm93cyB0byBiYWlsIG91dCB3aGVuIHRoZSB2YWx1ZSBpcyB0aGUgc2FtZVxuICAgICAgICAgICAgbGV0IHVwZGF0ZUZ1bmN0aW9uID0gKG9sZFZhbHVlLCAuLi5mdW5jdGlvbkFyZ3MpPT57XG4gICAgICAgICAgICAgICAgbGV0IGludGVyY2VwdGVkVmFsdWUgPSB2YWx1ZShpc0NvbnRyb2xsZWQgPyBjdXJyZW50VmFsdWUgOiBvbGRWYWx1ZSwgLi4uZnVuY3Rpb25BcmdzKTtcbiAgICAgICAgICAgICAgICBvbkNoYW5nZUNhbGxlcihpbnRlcmNlcHRlZFZhbHVlLCAuLi5hcmdzKTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzQ29udHJvbGxlZCkgcmV0dXJuIGludGVyY2VwdGVkVmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9sZFZhbHVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNldFN0YXRlVmFsdWUodXBkYXRlRnVuY3Rpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFpc0NvbnRyb2xsZWQpIHNldFN0YXRlVmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgb25DaGFuZ2VDYWxsZXIodmFsdWUsIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgfSwgW1xuICAgICAgICBpc0NvbnRyb2xsZWQsXG4gICAgICAgIGN1cnJlbnRWYWx1ZSxcbiAgICAgICAgb25DaGFuZ2VcbiAgICBdKTtcbiAgICByZXR1cm4gW1xuICAgICAgICBjdXJyZW50VmFsdWUsXG4gICAgICAgIHNldFZhbHVlXG4gICAgXTtcbn1cblxuXG4vKlxuICogQ29weXJpZ2h0IDIwMjAgQWRvYmUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGZpbGUgaXMgbGljZW5zZWQgdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlclxuICogdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgUkVQUkVTRU5UQVRJT05TXG4gKiBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2VcbiAqIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi8gLyoqXG4gKiBUYWtlcyBhIHZhbHVlIGFuZCBmb3JjZXMgaXQgdG8gdGhlIGNsb3Nlc3QgbWluL21heCBpZiBpdCdzIG91dHNpZGUuIEFsc28gZm9yY2VzIGl0IHRvIHRoZSBjbG9zZXN0IHZhbGlkIHN0ZXAuXG4gKi8gZnVuY3Rpb24gJDk0NDZjY2E5YTM4NzUxNDYkZXhwb3J0JDdkMTViNjRjZjVhM2E0YzQodmFsdWUsIG1pbiA9IC1JbmZpbml0eSwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICBsZXQgbmV3VmFsdWUgPSBNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgbWluKSwgbWF4KTtcbiAgICByZXR1cm4gbmV3VmFsdWU7XG59XG5mdW5jdGlvbiAkOTQ0NmNjYTlhMzg3NTE0NiRleHBvcnQkY2I2ZTBiYjUwYmMxOTQ2Myh2YWx1ZSwgbWluLCBtYXgsIHN0ZXApIHtcbiAgICBsZXQgcmVtYWluZGVyID0gKHZhbHVlIC0gKGlzTmFOKG1pbikgPyAwIDogbWluKSkgJSBzdGVwO1xuICAgIGxldCBzbmFwcGVkVmFsdWUgPSBNYXRoLmFicyhyZW1haW5kZXIpICogMiA+PSBzdGVwID8gdmFsdWUgKyBNYXRoLnNpZ24ocmVtYWluZGVyKSAqIChzdGVwIC0gTWF0aC5hYnMocmVtYWluZGVyKSkgOiB2YWx1ZSAtIHJlbWFpbmRlcjtcbiAgICBpZiAoIWlzTmFOKG1pbikpIHtcbiAgICAgICAgaWYgKHNuYXBwZWRWYWx1ZSA8IG1pbikgc25hcHBlZFZhbHVlID0gbWluO1xuICAgICAgICBlbHNlIGlmICghaXNOYU4obWF4KSAmJiBzbmFwcGVkVmFsdWUgPiBtYXgpIHNuYXBwZWRWYWx1ZSA9IG1pbiArIE1hdGguZmxvb3IoKG1heCAtIG1pbikgLyBzdGVwKSAqIHN0ZXA7XG4gICAgfSBlbHNlIGlmICghaXNOYU4obWF4KSAmJiBzbmFwcGVkVmFsdWUgPiBtYXgpIHNuYXBwZWRWYWx1ZSA9IE1hdGguZmxvb3IobWF4IC8gc3RlcCkgKiBzdGVwO1xuICAgIC8vIGNvcnJlY3QgZmxvYXRpbmcgcG9pbnQgYmVoYXZpb3IgYnkgcm91bmRpbmcgdG8gc3RlcCBwcmVjaXNpb25cbiAgICBsZXQgc3RyaW5nID0gc3RlcC50b1N0cmluZygpO1xuICAgIGxldCBpbmRleCA9IHN0cmluZy5pbmRleE9mKFwiLlwiKTtcbiAgICBsZXQgcHJlY2lzaW9uID0gaW5kZXggPj0gMCA/IHN0cmluZy5sZW5ndGggLSBpbmRleCA6IDA7XG4gICAgaWYgKHByZWNpc2lvbiA+IDApIHtcbiAgICAgICAgbGV0IHBvdyA9IE1hdGgucG93KDEwLCBwcmVjaXNpb24pO1xuICAgICAgICBzbmFwcGVkVmFsdWUgPSBNYXRoLnJvdW5kKHNuYXBwZWRWYWx1ZSAqIHBvdykgLyBwb3c7XG4gICAgfVxuICAgIHJldHVybiBzbmFwcGVkVmFsdWU7XG59XG5mdW5jdGlvbiAkOTQ0NmNjYTlhMzg3NTE0NiRleHBvcnQkYjYyNjg1NTRmYmE0NTFmKHZhbHVlLCBkaWdpdHMsIGJhc2UgPSAxMCkge1xuICAgIGNvbnN0IHBvdyA9IE1hdGgucG93KGJhc2UsIGRpZ2l0cyk7XG4gICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiBwb3cpIC8gcG93O1xufVxuXG5cblxuXG5leHBvcnQgeyQ0NThiMGE1NTM2YzFhN2NmJGV4cG9ydCQ0MGJmYThjN2IwODMyNzE1IGFzIHVzZUNvbnRyb2xsZWRTdGF0ZSwgJDk0NDZjY2E5YTM4NzUxNDYkZXhwb3J0JDdkMTViNjRjZjVhM2E0YzQgYXMgY2xhbXAsICQ5NDQ2Y2NhOWEzODc1MTQ2JGV4cG9ydCRjYjZlMGJiNTBiYzE5NDYzIGFzIHNuYXBWYWx1ZVRvU3RlcCwgJDk0NDZjY2E5YTM4NzUxNDYkZXhwb3J0JGI2MjY4NTU0ZmJhNDUxZiBhcyB0b0ZpeGVkTnVtYmVyfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1vZHVsZS5qcy5tYXBcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/@react-stately/utils/dist/import.mjs\n");

/***/ })

};
;