'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Олдскул:
// function Button(props) {
//     const cssclasses = classNames('Button', props.className);
//     return props.href
//         ? <a {...props} className={cssclasses}/>
//         : <button {...props} className={cssclasses}/>;
// }

// Новая, модная запись:
var Button = function Button(props) {
    return props.href ? _react2.default.createElement('a', _extends({}, props, { className: (0, _classnames2.default)('Button', props.className) })) : _react2.default.createElement('button', _extends({}, props, { className: (0, _classnames2.default)('Button', props.className) }));
};

// Не нужно, т. к. объявлен кастомный тип Props:
// Button.propTypes = {
//     href: PropTypes.string,
// };

exports.default = Button;