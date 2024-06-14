# MyLibrary

MyLibrary - это библиотека, разработанная с использованием Vite, TypeScript и SCSS. Этот проект включает в себя сборку библиотеки и демонстрацию возможностей библиотеки.

## Структура проекта

```
project-root/
│
├── src/
│   ├── components/
│   │   └── .gitkeep
│   ├── style.module.scss
│   ├── main.ts
│   └── vite-env.d.ts
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── readme.md
```

- **src/**: Директория исходного кода
    - **components/**: Компоненты библиотеки
    - **style.module.scss**: Основные стили библиотеки
    - **main.ts**: Главный файл библиотеки, экспортирующий класс `Gnezdo`
    - **vite-env.d.ts**: Типовые определения для Vite

- **index.html**: Файл HTML для демонстрации
- **package.json**: Файл конфигурации npm
- **package-lock.json**: Файл блокировки версий npm
- **tsconfig.json**: Файл конфигурации TypeScript
- **vite.config.ts**: Файл конфигурации Vite
- **readme.md**: Этот файл с описанием проекта

## Установка

Для установки всех зависимостей используйте npm:

```bash
npm install
```

## Команды

### Режим разработки

Для запуска сервера в режиме разработки используйте команду

```bash
npm run dev

```

### Запуск примера с конкретной конфигурацией

Для запуска сервера в режиме хоста на порту 3000. Нужно чтобы можно посмотреть страницы index.html, example.html

```bash
npm run example

```

### Сборка библиотеки

Для сборки библиотеки используйте команду:

```bash
npm run build:lib

```

### Сборка демонстрации

Для сборки демонстрационного проекта используйте команду:

```bash
npm run build:preview

```

### Просмотр демонстрации

Для запуска локального сервера, который позволит просмотреть собранную демонстрацию используйте команду:

```bash
npm run preview

```

### Регистрация и удаление локальной библиотеки

Для регистрации собранной библиотеки в системе для последующего использования в других проектах без публикации в npm:

```bash
npm run link

```

Для удаления регистрации библиотеки и очистки сгенерированных файлов:

```bash
npm run unlink

```

Эти команды облегчают управление зависимостями и разработку в условиях, когда необходимо тестировать пакеты локально.

## Использование библиотеки

### В Html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vite App</title>
</head>
<body>
<div id="containerId350903"></div>

<script type="module">
  import {Gnezdo} from "advertising-blocks";
  (() => {
    const gnezdo = new Gnezdo();
    gnezdo.create({
      tizerId: 350903,
      containerId: 'containerId350903'
    });
  })();
</script>
</body>
</html>

```

### В JavaScript

```javascript
// Подключите библиотеку
import { Gnezdo } from 'advertising-blocks';

const gnezdo = new Gnezdo();
gnezdo.create({
  tizerId: 350903,
  containerId: 'containerId350903'
});

```

### В TypeScript

```typescript
// Подключите библиотеку
import { Gnezdo } from 'advertising-blocks';


const gnezdo = new Gnezdo();
gnezdo.create({
  tizerId: 350903,
  containerId: 'containerId350903'
});
```

## Инструкция для локальной установки и удаления библиотеки

### Шаг 1: Создайте ссылку на вашу локальную библиотеку

Перейдите в корневую директорию вашей библиотеки и выполните команду:

```bash
npm run link
```

### Шаг 2: Установите локальную библиотеку в новый проект

Перейдите в корневую директорию нового проекта, где вы хотите использовать вашу библиотеку, и выполните команду:

```bash
npm link advertising-blocks
```

### Шаг 3: Локальное удаление библиотеки

1. **Удалите локальную ссылку из проекта:**

   Перейдите в корневую директорию нового проекта и выполните команду:

   ```bash
   npm unlink advertising-blocks
   ```

2. **Удалите глобальную ссылку:**

   Перейдите в корневую директорию вашей библиотеки и выполните команду:

   ```bash
   npm run unlink
   ```