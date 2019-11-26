# Задание

Создать приложение на Vuejs, которое включает в себя компонент формы `<app-form>` и дочерний компонент `<app-form-item>`.

`<app-form-item>` должен поддерживать типы _text, dropdown, textarea_ и в зависимости от типа отрисовывать необходимый элемент. `<app-form>` должен принимать **модель** и **правила** валидации полей.

Дизайн элементов формы произвольный. Текст ошибки выводить под элементом.

## Пример использования

```html
<app-form v-model="form" :rules="rules">
  <app-form-item label="Name" type="text" prop="name" />
  <app-form-item label="Count" type="dropdown" prop="count" :data="countList" />
  <app-form-item label="Comment" type="textarea" prop="comment" />
</app-form>
```

```js
{
    form: {
        name: "",
        count: null,
        comment: ""
    },

    rules: {
        name: [
                {
                    required: true,
                    validator: someValidatorFunction,
                    message: "Some error",
                    trigger: "blur"
                }
        ],

        age: [
                {
                    required: true,
                    validator: someValidatorFunction2,
                    message: "Some error 2",
                    trigger: "change"
                }
        ],
        }
    }
}
```

Решение разместить на github/bitbucket и дать ссылку. 
