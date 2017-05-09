/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_body_parser__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__routes_wizard_route__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mongoose__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_mongoose__);





// application initialization
var app = __WEBPACK_IMPORTED_MODULE_0_express___default()();

// enables POST, PUT Body data to be retrieved as JSON
app.use(__WEBPACK_IMPORTED_MODULE_1_body_parser___default.a.urlencoded({ extended: true }));
app.use(__WEBPACK_IMPORTED_MODULE_1_body_parser___default.a.json());

// application port
app.set('port', 3000);

// connect to mongoDB instance created on mongoLAbs

__WEBPACK_IMPORTED_MODULE_3_mongoose___default.a.connect('mongodb://root:root@ds133311.mlab.com:33311/hogwarts');

app.get('/', function (req, res) {
    res.json({ 'message': 'Hello World' });
});

// app.post('/example-post', (req, res) => {

//     res.json({
//         message: 'Post successful',
//         payload: req.body,
//         headers: req.headers
//     });
// });

app.use('/wizard', __WEBPACK_IMPORTED_MODULE_2__routes_wizard_route__["a" /* WizardRoutes */]);

app.listen(app.get('port'), function () {
    console.log('Node is running on port  ' + app.get('port'));
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WizardRoutes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_wizard_model__ = __webpack_require__(6);



var router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

// get all wizards
router.get('/', function (req, res) {
    __WEBPACK_IMPORTED_MODULE_1__models_wizard_model__["a" /* Wizard */].find(function (err, wizards) {
        if (err) res.send(err);

        res.json(wizards);
    });
});

// add wizard
router.post('/', function (req, res) {

    var wizard = new __WEBPACK_IMPORTED_MODULE_1__models_wizard_model__["a" /* Wizard */]();
    wizard.name = req.body.name;
    wizard.house = req.body.house;
    wizard.pet = req.body.pet;

    wizard.save(function (err, data) {
        if (err) res.send(err);

        res.json({
            message: "Wizard added successfully!",
            data: data
        });
    });
});

// view wizard from ID
router.get('/:id', function (req, res) {
    __WEBPACK_IMPORTED_MODULE_1__models_wizard_model__["a" /* Wizard */].findById(req.params.id, function (err, wizard) {
        if (err) res.send(err);
        res.json(wizard);
    });
});

// Edit wizard from ID
router.put('/:id', function (req, res) {
    __WEBPACK_IMPORTED_MODULE_1__models_wizard_model__["a" /* Wizard */].findById(req.params.id, function (err, wizard) {
        if (err) res.send(err);

        wizard.name = req.body.name;
        wizard.house = req.body.house;
        wizard.pet = req.body.pet;

        wizard.save(function (err, data) {
            if (err) res.send(err);

            res.json({
                message: "updated successfully",
                data: data
            });
        });
    });
});

// Delete wizard from ID
router.delete('/:id', function (req, res) {
    __WEBPACK_IMPORTED_MODULE_1__models_wizard_model__["a" /* Wizard */].remove({
        _id: req.params.id
    }, function (err, data) {
        if (err) res.send(err);

        res.json({
            "message": "Deleted Successfully",
            data: data
        });
    });
});

var WizardRoutes = router;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Wizard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);


var Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;

var wizard = new Schema({
    name: String,
    house: String,
    pet: String
});

var Wizard = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('Wizard', wizard);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map