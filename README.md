*eng:*
# **Frontend project**
That project was build by a team of frontend beginers and one fullstack dev, like learning practice.<br>
Project haven't @media part ( responsive design for mobile and other )<br>
Every member wrote his own parts of project:<br>
---
## Frontend part
Was wrote by [RomaS0307](https://github.com/RomaS0307):
- pages 404, contacts, feedback popup's and styles for them

Was wrote by [IlyaH148](https://github.com/IlyaH148):
- pages of cart, company, info and couple of other. And also styles for them

Was wrote by [Atama00](https://github.com/Atama00):
- services pages, one cart page, that not wasn't in final project and styles for them
- also responsive design for her own pages

Was wrote by [href](https://github.com/egorb2302):
- main page, pages of catalog ( brands, products ), item shell page, noItem page and styles for them
- all JavaScript scripts for project on frontend part, api interactions with backend
- Work with gulp ( build in dist folder ), insert libs, project management
## Backend part
Was wrote by [Oleg](https://github.com/wr479):
- create backend part of project ( server ) with postgreSQL, Docker 
- gave git practics for all members on project
---
# **Docs**
To use the project u must perform a couple of steps:
- 1) run backend
- 2) run frontend 

*For run frontend:*
- Switch derectory on frontend folder and run with npm
```
cd "frontend"
npm run dev
```
- Open localhost on port 8080 with name of html (http://localhost:8080/egorchik/main.html or else)

*For run backend:*
- U need to have Docker Desktop on your own PC for server
- Switch derectory on backend folder and up docker container with server
```
cd "backend"
docker-compose up --build -d 
```
- Open admin, catalog and swagger on port 3000:<br>
    http://localhost:3000/admin ( admin panel )<br>
    http://localhost:3000/catalog ( catalog of products )<br>
    http://localhost:3000/api/docs ( swagger with all api for project )

Good luck !


*рус:*
# **Frontend проект**
Этот проект был создан командой начинающих разработчиков frontend и одним разработчиком fullstack, как учебная практика.<br>
В проекте нет @media части (адаптивный дизайн для мобильных устройств и другое)<br>
Каждый участник написал свои собственные части проекта:<br>
---
## Часть интерфейса (Фронтенд)
Было написано [RomaS0307](https://github.com/RomaS0307):
- страница 404, контакты, модальные окна для обратной связи и стили для них

Было написано [IlyaH148](https://github.com/IlyaH148):
- страницы корзины, компании, информации и несколько других. А также стили для них

Было написано [Atama00](https://github.com/Atama00):
- страницы услуг, одна страница корзины, которой не было в финальном проекте, и стили для них
- также адаптивный дизайн для своих страниц

Было написано [href](https://github.com/egorb2302):
- главная страница, страницы каталога (бренды, товары), страница шаблона товара, страница отсутствия товара и стили для них
- все скрипты JavaScript для проекта по части Фронтенда, взаимодействие api с бэкендом
- Работа с gulp (сборка в папке dist), вставка библиотек, менеджемент проекта
## Серверная часть
Было написано [Oleg](https://github.com/wr479):
- создал бэкенд-часть проекта (серверную часть ) с PostgreSQL, Docker 
- дал практические рекомендации по git для всех участников проекта
---
# **Документация**
Чтобы использовать проект, вам необходимо выполнить несколько шагов:
- 1 запустить серверную часть
- 2 запустить интерфейс 

*Для запуска интерфейса:*
- Переключить директорию на папку frontend и запустить с помощью npm
```
cd "frontend"
npm run dev
```
- Откройте localhost на порту 8080 с именем html (http://localhost:8080/egorchik/main.html или иначе)

*Для запуска серверной части:*
- У вас должен быть Docker Desktop на вашем компьютере для запуска сервера
- Переключите директорию на папку backend и поднимите контейнер docker с сервером
```
cd "backend"
docker-compose --build -d 
```
- Откройте admin панель, каталог и swagger на порту 3000:<br>
 http://localhost:3000/admin ( панель администратора )<br>
 http://localhost:3000/catalog ( каталог товаров )<br>
 http://localhost:3000/api/docs ( сваггер со всеми api для проекта )

Удачи!

Programming Languages and Tools on project : 
- JavaScript
- Node.js
- Docker
- PostgreSQL