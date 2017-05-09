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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CONFIG; });
var CONFIG = {
    'secret': 'vengardiunLaviosa'
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_body_parser__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__routes_wizard_route__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mongoose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jsonwebtoken__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__routes_user_route__ = __webpack_require__(7);





 // used to create, sign, and verify tokens



// application initialization
var app = __WEBPACK_IMPORTED_MODULE_0_express___default()();

// enables POST, PUT Body data to be retrieved as JSON
app.use(__WEBPACK_IMPORTED_MODULE_1_body_parser___default.a.urlencoded({ extended: true }));
app.use(__WEBPACK_IMPORTED_MODULE_1_body_parser___default.a.json());

// application port
app.set('port', 3000);

// connect to mongoDB instance created on mongoLAbs

__WEBPACK_IMPORTED_MODULE_3_mongoose___default.a.connect('mongodb://root:root@ds133311.mlab.com:33311/hogwarts');

// setup viewengine
app.set('views', 'src/views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
    res.render('hello', { title: 'Home' });
});

// route middleware to verify a token
app.use('/wizard', function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        __WEBPACK_IMPORTED_MODULE_4_jsonwebtoken___default.a.verify(token, __WEBPACK_IMPORTED_MODULE_5__config__["a" /* CONFIG */].secret, function (err, decoded) {
            if (err) {
                return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

app.use(__WEBPACK_IMPORTED_MODULE_6__routes_user_route__["a" /* USER_ROUTES */]);
app.use('/wizard', __WEBPACK_IMPORTED_MODULE_2__routes_wizard_route__["a" /* WizardRoutes */]);

app.listen(app.get('port'), function () {
    console.log('Node is running on port  ' + app.get('port'));
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
// get an instance of mongoose and mongoose.Schema
var mongoose = __webpack_require__(1);
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var User = mongoose.model('User', new Schema({
    name: String,
    password: String,
    admin: Boolean
}));

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Wizard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);


var Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;

var wizard = new Schema({
    name: String,
    house: String,
    pet: String
});

var Wizard = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('Wizard', wizard);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return USER_ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_user_model__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jsonwebtoken__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jsonwebtoken__);



 // used to create, sign, and verify tokens
var router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

router.post('/register', function (req, res) {
    var user = new __WEBPACK_IMPORTED_MODULE_1__models_user_model__["a" /* User */]({
        name: req.body.name,
        password: req.body.password,
        admin: req.body.admin
    });
    user.save(function (err, data) {
        if (err) res.status(400).send(err);
        res.json({
            status: "success",
            data: data
        });
    });
});

router.get('/authenticate', function (req, res) {

    __WEBPACK_IMPORTED_MODULE_1__models_user_model__["a" /* User */].findOne({
        name: req.query.name
    }, function (err, user) {
        if (err) res.status(400).json({ success: false, message: 'Authentication failed. Server Error.' });

        if (!user) {

            res.status(400).json({ success: false, message: 'Authentication failed. Username wrong123.' });
        } else {
            if (user.password !== req.query.password) {
                res.status(400).json({ success: false, message: 'Authentication failed. Password wrong.' });
            } else {
                // if user is found and password is right
                // create a token
                var token = __WEBPACK_IMPORTED_MODULE_3_jsonwebtoken___default.a.sign(user, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* CONFIG */].secret, {
                    expiresIn: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });
});

var USER_ROUTES = router;

/***/ }),
/* 8 */
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

        res.json({ data: wizards, decoded: req.decoded });
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
/* 9 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map