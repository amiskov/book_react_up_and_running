# Chapter 5. Setting Up for App Development
Имя компонента, его файлов, класса CSS/JS — с большой буквы: `Logo`.

В ES6 не нужны запятые после `export default Logo`.

Не нужны запятые при объявлении методов класса (это как function literal, не методы объекта):

```js
class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  get area() {
    return this.calcArea();
  }

  calcArea() {
    return this.height * this.width;
  }
}
```

```sh
# Transpile JS (ES6=>CommonJS=>Browser JS):
babel --presets react,es2015 js/source -d js/build

# Package JS:
browserify js/build/app.js -o bundle.js

# Package CSS:
cat css/*/* css/*.css | sed 's/..\/..\/images/images/g' > bundle.css
```

В NPM есть утилита `watch`, которую можно натравить на директорию и она будет запускать команду, если там что-то поменяется: `watch "sh scripts/build.sh" js/source css`.

