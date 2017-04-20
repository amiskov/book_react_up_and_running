# Chapter 3. Excel: A Fancy Table Component

В Реакте можно пользоваться чистым JS-синтаксисом для обработки данных компонента. Не нужен шаблонизатор:

```js
React.DOM.tr(null,
    this.props.headers.map(function(title) {
        return React.DOM.th(null, title);
    })
)
```

Для удобства отладки (когда не используется JSX) в компоненте можно использовать свойство `displayName`, которое Реакт будет показывать в варнингах и еррорах консоли:

```js
var Excel = React.createClass({
    displayName: 'Excel',
    render: function() {
        // ...
    }
});
```

Было до добавления `displayName`: ``Check the render method of `Constructor``.

Стало после добавления: ``Check the render method of `Excel``.

При использовании JSX `displayName` добавится автоматически.