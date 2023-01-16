export const deviceTypes = [
    { name: 'Компьютеры', value: 'pc' },
    { name: 'Сетевое оборудование', value: 'network' },
    { name: 'Принтеры', value: 'printers' },
    { name: 'Телефоны', value: 'phones' },
    { name: 'Аксессуары', value: 'accessories' },
]

export const breakpoints = {
    3500: 8,
    3200: 8,
    2560: 7,
    2300: 7,
    1920: 5,
    1800: 5,
    1600: 5,
    1400: 4,
    1201: 4,
    1100: 3,
    900: 2,
    700: 2,
    500: 1,
};

export const menuItem = [
    { name: 'Главная', to: '/dashboard', iconClassName: 'bi bi-speedometer' },
    { name: 'Устройства', to: '/devices', iconClassName: 'bi bi-hdd' },
    { name: 'Статистика', to: '/statistic', iconClassName: 'bi bi-bar-chart' },
    { name: 'Пользователи', to: '/users', iconClassName: 'bi bi-people' },
    { name: 'Задачи', to: '/todos', iconClassName: 'bi bi-check2-square' },
    { name: 'Календарь', to: '/calendar', iconClassName: 'bi bi-calendar-date' },
    { name: 'Настройки', to: '/settings', iconClassName: 'bi bi-gear' },
]

export const categoryDevice = [
    { name: 'Весь список', value: '', iconClassName: 'bi bi-list-check' },
    { name: 'Компьютеры', value: 'Компьютеры', iconClassName: 'bi bi-laptop' },
    { name: 'Сеть', iconClassName: 'bi bi-hdd-network' },
    { name: 'Принтеры', value: 'Принтеры', iconClassName: 'bi bi-printer' },
    { name: 'Телефоны', value: 'Телефоны', iconClassName: 'bi bi-phone' },
    { name: 'Аксессуары', value: 'Аксессуары', iconClassName: 'bi bi-usb-drive' },
]