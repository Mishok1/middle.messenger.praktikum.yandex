import Handlebars from "handlebars";
import index from './templates/index.hbs?raw';
import profile from './templates/profile.hbs?raw';
import auth from './templates/auth.hbs?raw';
import registration from './templates/registration.hbs?raw';
import notFound from './templates/404.hbs?raw';
import serverError from './templates/500.hbs?raw';
import passwordChange from './templates/password-change.hbs?raw';

const routes = {
    '/': {
        template: index,
        data: {
            chats: [
                {
                    src: '',
                    title: 'Андрей',
                    message: 'Изображение',
                    time: '10:49',
                    amount: '2',
                },
                {
                    src: '',
                    title: 'Киноклуб',
                    message: '<span>Вы:</span> стикер',
                    time: '12:00',
                    amount: '3',
                },
                {
                    // src: '#',
                    title: 'Илья',
                    message: 'Message',
                    time: '11:00',
                    amount: '3',
                },
                {
                    // src: '#',
                    title: 'Вадим',
                    message: 'Message2222',
                    time: '14:00',
                    amount: '1',
                },
                {
                    // src: '#',
                    title: 'Vadim',
                    message: 'Pupupu',
                    time: '21:20',
                    // amount: '',
                }
            ]
        }
    },
    '/profile': {
        template: profile,
        data: { test: 'Профиль' }
    },
    '/authorization': {
        template: auth,
        data: { test: 'Авторизация' }
    },
    '/registration': {
        template: registration,
        data: { test: 'Регистрация' }
    },
    '/password-change': {
        template: passwordChange,
        data: { test: 'Редактирование' }
    },
    // '/404': {
    //     template: notFound,
    //     data: { name: 'Михаил' }
    // },
    '/500': {
        template: serverError,
        data: { test: '500' }
    },
}

function render(templateStr, data = {}) {
    const app = document.querySelector('#app');
    const template = Handlebars.compile(templateStr);
    app.innerHTML = template(data);
}

export function router() {
    const path = window.location.pathname;

    const route = routes[path];

    if (!route) {
        render(notFound, { name: 'Михаил' });
        return;
    }

    render(route.template, route.data);
}
