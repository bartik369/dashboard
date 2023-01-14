export const deviceTypes = [
    { name: 'Компьютеры', value: 'pc' },
    { name: 'Сетевое оборудование', value: 'network' },
    { name: 'Принтеры', value: 'printers' },
    { name: 'Телефоны', value: 'phones' },
    { name: 'Аксессуары', value: 'accessories' },
]

export const breakpoints = {
    2560: 8,
    1920: 6,
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
    { name: 'Устройства', to: '/devices', iconClassName: 'bi bi-binoculars' },
    { name: 'Статистика', to: '/statistic', iconClassName: 'bi bi-bar-chart' },
    { name: 'Пользователи', to: '/users', iconClassName: 'bi bi-people' },
    { name: 'Задачи', to: '/todos', iconClassName: 'bi bi-check2-square' },
    { name: 'Календарь', to: '/calendar', iconClassName: 'bi bi-calendar-date' },
    { name: 'Настройки', to: '/settings', iconClassName: 'bi bi-gear' },
]

export const categoryDevice = [
    { name: 'Весь список', value: '', iconClassName: 'bi bi-speedometer' },
    { name: 'Компьютеры', value: 'Компьютеры', iconClassName: 'bi bi-speedometer' },
    { name: 'Сетевое оборудование', value: 'Сетевое оборудование', iconClassName: 'bi bi-speedometer' },
    { name: 'Принтеры', value: 'Принтеры', iconClassName: 'bi bi-speedometer' },
    { name: 'Телефоны', value: 'Телефоны', iconClassName: 'bi bi-speedometer' },
    { name: 'Аксессуары', value: 'Аксессуары', iconClassName: 'bi bi-speedometer' },
]