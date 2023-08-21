# GooseTrack project backend repository

Цей проєкт містить backend для додатку
[планувальника завдань GooseTrack](https://svrphoenix.github.io/project-group3fe).
Він забезпечує реєстрацію, авторизацію, управління відгуками та завданнями
користувачів.

### Посилання додатку

- [Frontend частина](https://github.com/svrphoenix/project-group3fe)
  планувальника завдань GooseTrack.
- Backend частина розгорнута на сервері Render.com та доступна за посиланням:
  [https://goose-backend.onrender.com/](https://goose-backend.onrender.com/).

  ### Розгортання та налаштування

  Переконайтеся, що у вас встановлені LTS версія
  [Node.js](npm.https://nodejs.org/uk) та [npm](https://www.npmjs.com/). Для
  того, щоб отримати та запустити цей проєкт локально, дотримуйтесь наступних
  кроків:

1. **Клонуйте репозиторій** Відкрийте термінал та виконайте команду:

   ```sh
   git clone https://github.com/svrphoenix/project-group3be.git
   ```

2. **Перейдіть до папки проєкту** Перейдіть до створеної папки репозиторію:

   ```sh
   cd project-group3be
   ```

3. **Встановіть залежності** Використовуйте npm для встановлення необхідних
   залежностей:

   ```sh
   npm install
   ```

4. **Запустіть сервер** Запустіть сервер у режимі розробки за допомогою команди:

   ```sh
   npm run dev
   ```

### Команди

- `npm start` &mdash; старт сервера в режимі production
- `npm run dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запуск виконання перевірки коду з eslint, необхідно
  виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; запуск тої ж перевірки лінтера, але з автоматичними
  виправленнями простих помилок

### Документація

Для роботи з проєктом створено документацію ендпоінтів з використанням Swagger
UI. Ви можете знайти її за цим
[посиланням](https://goose-backend.onrender.com/docs/).
