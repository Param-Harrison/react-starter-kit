'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _reactRouterConfig = require('react-router-config');

var _createMemoryHistory = require('history/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _configureStore = require('../src/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _fetchComponentData = require('./helpers/fetchComponentData');

var _fetchComponentData2 = _interopRequireDefault(_fetchComponentData);

var _extractSplitPoints = require('./helpers/extractSplitPoints');

var _extractSplitPoints2 = _interopRequireDefault(_extractSplitPoints);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use(function (req, res, next) {
  var history = (0, _createMemoryHistory2.default)();
  var store = (0, _configureStore2.default)(history);
  var currentRoute = (0, _reactRouterConfig.matchRoutes)(_routes2.default, req.originalUrl);
  var splitPoints = (0, _extractSplitPoints2.default)(currentRoute);

  store.dispatch((0, _reactRouterRedux.push)(req.originalUrl));

  (0, _fetchComponentData2.default)(store.dispatch, currentRoute, {}).then(function (data) {
    var html = (0, _server.renderToString)(_react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(
        _reactRouterRedux.ConnectedRouter,
        { history: history },
        (0, _reactRouterConfig.renderRoutes)(_routes2.default)
      )
    ));

    var initialState = store.getState();

    res.render('index', {
      title: 'React Starter Kit',
      initialState: JSON.stringify(initialState),
      splitPoints: JSON.stringify(splitPoints),
      html: html
    });
  }).catch(function (err) {
    return next(err);
  });
});

exports.default = router;