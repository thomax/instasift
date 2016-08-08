'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSparklines = require('react-sparklines');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _react2.default.createClass({
  displayName: 'InstagramProfile',

  propTypes: {
    profile: _react2.default.PropTypes.object
  },

  render: function render() {
    var profile = this.props.profile;

    return _react2.default.createElement(
      'li',
      { className: 'profile' },
      _react2.default.createElement(
        'h2',
        null,
        _react2.default.createElement(
          'a',
          { href: 'https://instagram.com/' + profile.username, target: '_blank' },
          '@',
          profile.username
        )
      ),
      _react2.default.createElement(
        'table',
        null,
        _react2.default.createElement(
          'tbody',
          null,
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              null,
              'Website'
            ),
            _react2.default.createElement(
              'th',
              null,
              _react2.default.createElement(
                'a',
                { href: '' + profile.website, target: '_blank' },
                ' ',
                profile.website
              )
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              null,
              'Followers'
            ),
            _react2.default.createElement(
              'th',
              null,
              profile.followers
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              null,
              'Posts'
            ),
            _react2.default.createElement(
              'th',
              null,
              profile.posts
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              null,
              'Posts last 3 months'
            ),
            _react2.default.createElement(
              'th',
              null,
              profile.freshPosts
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              null,
              'Avgerage likes'
            ),
            _react2.default.createElement(
              'th',
              null,
              profile.averageLikes
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              null,
              'Average likes last 3 months'
            ),
            _react2.default.createElement(
              'th',
              null,
              profile.averageFreshLikes
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              null,
              'Avgerage comments'
            ),
            _react2.default.createElement(
              'th',
              null,
              profile.averageComments
            )
          )
        )
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactSparklines.Sparklines,
          { data: profile.likeHistory },
          _react2.default.createElement(_reactSparklines.SparklinesBars, null),
          _react2.default.createElement(_reactSparklines.SparklinesReferenceLine, { type: 'mean' })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'image-box' },
        _react2.default.createElement(
          'a',
          { className: 'image-link', href: 'https://instagram.com/p/' + profile.mostLikedImage.id, target: '_blank' },
          _react2.default.createElement('img', { className: 'best', src: profile.mostLikedImage.media })
        ),
        _react2.default.createElement(
          'ul',
          { className: 'image-text-list' },
          _react2.default.createElement(
            'li',
            { className: 'image-text' },
            profile.mostLikedImage.likes,
            ' likes'
          ),
          _react2.default.createElement(
            'li',
            { className: 'image-text' },
            'Posted ',
            (0, _moment2.default)(profile.mostLikedImage.time * 1000).fromNow()
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'image-box' },
        _react2.default.createElement(
          'a',
          { className: 'image-link', href: 'https://instagram.com/p/' + profile.leastLikedImage.id, target: '_blank' },
          _react2.default.createElement('img', { className: 'worst', src: profile.leastLikedImage.media })
        ),
        _react2.default.createElement(
          'ul',
          { className: 'image-text-list' },
          _react2.default.createElement(
            'li',
            { className: 'image-text' },
            profile.leastLikedImage.likes,
            ' likes'
          ),
          _react2.default.createElement(
            'li',
            { className: 'image-text' },
            'Posted ',
            (0, _moment2.default)(profile.leastLikedImage.time * 1000).fromNow()
          )
        )
      ),
      _react2.default.createElement('hr', null)
    );
  }
});