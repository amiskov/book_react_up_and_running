/* @flow */

import classNames from 'classnames';
import React from 'react';

// Олдскул:
// function Button(props) {
//     const cssclasses = classNames('Button', props.className);
//     return props.href
//         ? <a {...props} className={cssclasses}/>
//         : <button {...props} className={cssclasses}/>;
// }

// Новая, модная запись:
type Props = {
    href: ?string,
    className: ?string,
};

const Button = (props: Props) =>
    props.href
        ? <a {...props} className={classNames('Button', props.className)}/>
        : <button {...props} className={classNames('Button', props.className)}/>;

// Не нужно, т. к. объявлен кастомный тип Props:
// Button.propTypes = {
//     href: PropTypes.string,
// };

export default Button

