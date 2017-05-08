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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_body_parser__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__routes_wizard__ = __webpack_require__(5);

// let us pull POST content from our HTTP request 



var Bear = __webpack_require__(3);
var app = __WEBPACK_IMPORTED_MODULE_0_express___default()();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(__WEBPACK_IMPORTED_MODULE_1_body_parser___default.a.urlencoded({ extended: true }));
app.use(__WEBPACK_IMPORTED_MODULE_1_body_parser___default.a.json());

// get port from command line or default
app.set('port', process.env.PORT || 3000);

// db setup
__WEBPACK_IMPORTED_MODULE_2_mongoose___default.a.connect('mongodb://root:root@ds133331.mlab.com:33331/hogwarts');

app.get('/', function (req, res) {
    res.json({ msg: 'Hello World' });
});

// app.get('/bear', (req, res) => {

//     var bear = new Bear();      // create a new instance of the Bear model
//     bear.name = req.params.name;  // set the bears name (comes from the request)

//     // save the bear and check for errors
//     bear.save(function (err) {
//         if (err)
//             res.send(err);

//         res.json({ message: 'Bear created!' });
//     });


// });

// app.get('/bears', function (req, res) {
//     Bear.find(function (err, bears) {
//         if (err)
//             res.send(err);

//         res.json(bears);
//     });
// });


// middleware to use for all requests
app.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

app.use('/wizards', __WEBPACK_IMPORTED_MODULE_3__routes_wizard__["a" /* wizardRoutes */]);

var server = app.listen(app.get('port'), function () {
    console.log('Node express server is running on port ' + app.get('port'));
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(0);
var Schema = mongoose.Schema;

var BearSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Bear', BearSchema);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Wizard; });
var mongoose = __webpack_require__(0);
var Schema = mongoose.Schema;

var wizardSchema = new Schema({
    name: String,
    house: String,
    pet: String
});

var Wizard = mongoose.model('Wizard', wizardSchema);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return wizardRoutes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_wizard__ = __webpack_require__(4);



var router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

router.get('/', function (req, res) {
    __WEBPACK_IMPORTED_MODULE_1__models_wizard__["a" /* Wizard */].find(function (err, wizards) {
        if (err) {
            res.send(err);
        }

        res.json(wizards);
    });
}).get('/view/:id', function (req, res) {
    __WEBPACK_IMPORTED_MODULE_1__models_wizard__["a" /* Wizard */].findById(req.params.id, function (err, wizard) {
        if (err) {
            res.send(err);
        }

        res.json(wizard);
    });
}).get('/search', function (req, res) {

    __WEBPACK_IMPORTED_MODULE_1__models_wizard__["a" /* Wizard */].find({ name: req.query.name }, function (err, wizards) {
        if (err) res.send(err);

        res.json(wizards);
    });
}).put('/:id', function (req, res) {
    __WEBPACK_IMPORTED_MODULE_1__models_wizard__["a" /* Wizard */].findById(req.params.id, function (err, wizard) {
        if (err) res.send(err);

        wizard.name = req.body.name;
        wizard.house = req.body.house;
        wizard.pet = req.body.pet;

        wizard.save(function (err, data) {
            if (err) res.send(err);

            res.json({ message: 'success', data: data });
        });
    });
}).delete('/:id', function (req, res) {
    __WEBPACK_IMPORTED_MODULE_1__models_wizard__["a" /* Wizard */].remove({
        _id: req.params.id
    }, function (err, wizard) {
        if (err) res.send(err);

        res.json({ message: 'Successfully deleted', data: wizard });
    });
}).post('/', function (req, res) {
    var wizard = new __WEBPACK_IMPORTED_MODULE_1__models_wizard__["a" /* Wizard */]();
    wizard.name = req.body.name;
    wizard.house = req.body.house;
    wizard.pet = req.body.pet;

    wizard.save(function (err, data) {
        if (err) res.send(err);
        res.json({ message: 'Wizard created!', data: data });
    });
});

var wizardRoutes = router;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map