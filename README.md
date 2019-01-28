# Тестовое задание для кандидата на позицию фронт-енд разработчика

## Список с фильтрами

Написать одностраничное приложение с одним роутом.
Список пользователей с фильтрами.
- Базовая верстка находится в файле ./index.html.
- Необходимые стили ./src/theme/colors.less
- Задание оформить в отдельной ветке. Назвать ее на ваше усмотрение, например: имя_фамилиякандидата) и приложить пулл-реквест.



### Список пользователей
- Тестовый данные находятся в файле ./data/users.json
- Заголовки списка кликабельны, действие при нажатии – сортировка.
- На странице выводится по 20 записей.
- В колонке «Баллы» выводится значение из поля `points_earned`.

### Фильтры
- Разделены на группы: строка поиска, дата регистрации, баллы. Группы состоящие из нескольких инпутов могут быть свернуты.
- Ограничены максимальным и минимальным значениями. Лимиты в файле ./data/search_limits.json. Кнопка сбросить очищает фильтры до мин. и макс. значений.
- Принимают значения из адресной строки (формат не важен, в качестве примера параметры указаны в виде JSON строки).
- Между фильтрами "И", то есть условия должны совпадать для всех фильтров сразу
- Поиск регистро-независмый. 
- В левом нижнем углу блока фильтров отображается количество отфильтрованных пользователей.

![Список с фильтрами](./data/test_design_expanded.png)
