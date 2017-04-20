# Как преподносить материал
## Задача с сортировкой таблицы: разные подходы
Есть в JSR [на чистом JS](http://learn.javascript.ru/task/sort-table), сделать аналог на jQuery (плагин или jQuery UI), потом сделать на Реакте.

## Задача с поиском в таблице
Улучшить `ch3/playground/excel.html`:
«This was a simple working example for illustration. Can you improve the feature?
One simple thing to do is toggle the label of the search button. So, for example, when the search is on (this.state.search === true), it says “Done searching.”
Another thing to try is to implement an additive search in multiple boxes, meaning filter the already filtered data. If the user types “Eng” in the language row and then searches using a different search box, why not search in the search results of the previous search only? How would you implement this feature?»

## Задача — реалзиовать механизм Undo
Есть некая форма/список/что-то, нужно сделать интерфейс, как учит Бирман: можно все удалять, менять, но в любой момент мы может откатится как минимум на 1 шаг назад.

Say when the person uses the `ALT+Z` keyboard combination, you go back one step in the state log and on `ALT+SHIFT+Z` you go forward.

Is there another way to implement replay/undo type of functionality without changing all your setState() calls? Maybe use an appropriate lifecycle method (Chapter 2)?

## Решето Эратосфена
На Реакте, по типу, как [у Брендона](https://github.com/BrendanEich/sieve/blob/gh-pages/index.html).

## Экспорт данных через `new Blob()` и HTML5 ссылки

# Сервисы
https://restdb.io — позволяет создать БД и настроить CORS. Оттуда можно брать данные аяксом, делать GET, POST (регистрировать юзеров, например).