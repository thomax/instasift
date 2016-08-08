'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDomcontentloaded = require('react-domcontentloaded');

var _reactDomcontentloaded2 = _interopRequireDefault(_reactDomcontentloaded);

var _allProfiles = require('../../data/allProfiles');

var _allProfiles2 = _interopRequireDefault(_allProfiles);

var _InstagramProfile = require('./InstagramProfile');

var _InstagramProfile2 = _interopRequireDefault(_InstagramProfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'Dashboard',

  render: function render() {
    return _react2.default.createElement(
      'html',
      null,
      _react2.default.createElement(
        'head',
        null,
        _react2.default.createElement(_reactDomcontentloaded2.default, null),
        _react2.default.createElement('meta', { httpEquiv: 'Content-Type', content: 'text/html; charset=utf-8' }),
        _react2.default.createElement(
          'title',
          null,
          'Peersway Dashboard'
        ),
        _react2.default.createElement('link', { rel: 'stylesheet', href: '/main.css' }),
        _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1' })
      ),
      _react2.default.createElement(
        'body',
        null,
        _react2.default.createElement(
          'div',
          { className: 'header' },
          _react2.default.createElement('img', { src: 'http://peersway.com/wp-content/uploads/2016/02/peerswaylogo-retina-big.png' }),
          _react2.default.createElement(
            'span',
            null,
            '[dashboard]'
          )
        ),
        _react2.default.createElement(
          'ul',
          { className: 'profile-list' },
          _allProfiles2.default.map(function (profile) {
            return _react2.default.createElement(_InstagramProfile2.default, { profile: profile, key: profile.username });
          })
        )
      )
    );
  }
});