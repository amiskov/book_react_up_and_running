# Chapter 2. The Life of a Component

В своем компоненте должен быть метод `render`. См. [`playground/my-component.html`](playground/component.html).

`React.createElement` работает под капотом `React.DOM.*`. Только при создании кастомных компонентов `createElement` принимает функцию (`React.createElement(Component)`, компонет — это функция), а при создании DOM-элементов — строку (`React.createElement("span", null, "Hello")`).

## Properties
При рендеринге компонента в него можно передавать свойства:

```js
var Component = React.createClass({
  render: function() {
    return React.DOM.span(null, "My name is " + this.props.name);
  }
});

ReactDOM.render(
  React.createElement(Component, {
    name: "Bob",
  }),
  document.getElementById("app")
);
```

`this.props` не изменяемый объект.

В Реакте есть встроенный механизм валидации свойств компонета ([PropTypes](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)):

```js
var Component = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
  },
  render: function() {
    return React.DOM.span(null, "My name is " + this.props.name);
  }
});
```

См. `Object.keys(React.PropTypes)`.

Чтобы задать предустановленные значения необязательным свойствам, используют `getDefaultProps`:

```js
var Component = React.createClass({
  propTypes: {
    firstName: React.PropTypes.string.isRequired,
    middleName: React.PropTypes.string,
    familyName: React.PropTypes.string.isRequired,
    address: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      middleName: '',
      address: 'n/a',
    };
  },

  render: function() {/* ... */}
});
```

## State
Состояние компонента (state) — набор данных, которые компонент использует при рендеринге себя.

См. [`playground/stateful_textarea.html`](playground/stateful_textarea.html).

Реакт берет на себя перерисовку компонента, нам остается только работать с данными. Обновить состояние можно через `this.setState()` (Реакт сам при этом вызовет `render()`). При этом свойство `this.state.*` трогать нельзя.

Если компонент не должен обновляться, то можно сделать так, чтобы `shouldComponentUpdate()` возвращал `false`.

## A Note on DOM Events
Реакт использует _свою систему событий (synthetic events)_ — обертку над браузерными событиями для обеспечения кроссбраузерности и удобства использования. Так же эта система позволяет не отделять обработчики компонентов от самих компонентов. Под капотом Реакт использует делегирование событий для скорости. «It looks like old-school inline event handlers, but behind the scenes it’s not.»

Родное браузерное событие лежит в `event.nativeEvent`, но едва ли это пригодится.

`onChange` в Реакте срабатывает по печатанию (не по уходу с поля) и набирается камелКейсом.

## Props Versus State
Свойства — для внешнего мира: пользователей, которые создают компонент. Типа как аргументы для конструктора в ООП.

Стейт — внутренняя система компонента. Типа как приватные свойства в ООП.

## Accessing the Component from the Outside
Чтобы иметь ссылку на компонент, достаточно сохранить ее при вызове `render()`:

```js
var myTextareaCounter = ReactDOM.render(
    React.createElement(TextAreaCounter, {
        text: "Bob",
    }),
    document.getElementById("app")
);
```

Теперь можно долезть до свойств и методов:

```js
myTextareaCounter.props
// => Object {text: "Bob"}

// так делать можно, но не рекомендуется:
myTextareaCounter.setState({text: 'hello ololo'});
// может сбить внутренний механизм компонента, особенно чужого
```

В Реакте заложен механизм _реконфликтации_ — если пытаемся пересоздать компонент, то ничего не происходит. Стейт не изменится. Свойства поменяется, но не внешний вид не изменится.

## Lifecycle Methods
Для контролируемого изменения свойств можно задать метод `componentWillReceiveProps()`:

```js
componentWillReceiveProps: function(newProps) {
  this.setState({
    text: newProps.text,
  });
},
```

`componentWillUpdate()` — сработает перед повторным вызовом `render()`. В том числе если юзер меняет компонент руками (вводит текст, двигает что-то).

`componentDidUpdate()` — сработает после повторного вызова `render()` и изменения DOM.

`componentWillMount()`, `componentDidMount()` — сработает до/после вставки компонента в DOM.

`componentWillUnmount()` — сработает перед удалением компонента из DOM.

`shouldComponentUpdate(newProps, newState)` — вызывается перед `componentWillUpdate`. Можно рубить обновления (вернуть `false`) на основании аргументов. Бывает полезно, когда нужно внимательно следить за рендерингом компонента, перформансом и стейтом.

`var el = ReactDOM.findDOMNode(this)` — получить элемент компонента из метода.

## Lifecycle Example: Use a Mixin
Миксин — отдельный объект с методами и свойствами. Его можно добавить к методам и свойствам компонента при создании (примиксовать). Для этого есть специальное свойство `mixins` — массив с объектами, содержащими свойства и методы:

```js
var MyComponent = React.createClass({
  mixins: [obj1, obj2, obj3],
  // the rest of the methods ...
});
```

## Lifecycle Example: Using a Child Component
См. [`playground/child_component.html`](playground/child_component.html).

Дочерний компонент при изменении стейта будет обновлен первым.

## Performance Win: Prevent Component Updates
_Чистые компоненты_ — это компоненты, которые внутри своей ф-и `render()` используют только `this.props` и/или `this.state`. Для них можно использовать ф-ю `shouldComponentUpdate(nextProps, nextState)`, которая может сравнить текущие и будущие состояния/свойства и предотвратить обновление компонента, если изменений не требуется. Например, при подсчете символов в поле ввода, если вставить такое же количество букв, то перерисовки не произойдет.

См. [`playground/child_component.html`](playground/child_component.html).

## PureRenderMixin
Это такой аддон Реакта (миксин из расширенной версии), который сравнивает изменение стейта и свойств и не отрисовывает компонент, если они не меняются.

Аддоны Реакта доступны в расширенной версии: `react/build/react-with-addons.js`.

Аналогичный код:

```js
var ReactComponentWithPureRenderMixin = {
  shouldComponentUpdate: function(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
  }
};
```
