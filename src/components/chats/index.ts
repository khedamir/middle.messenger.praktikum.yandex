export { default as Chats } from './chats.hbs?raw';
import Handlebars from 'handlebars';

Handlebars.registerHelper('chats', () => {
  return [
    { name: 'Седа', message: 'Изображение', author: false, time: '11:59' },
    {
      name: 'Мата',
      message: 'Друзья',
      author: false,
      active: true,
      time: '11:59',
    },
    { name: 'Фариза', message: 'Круто!', author: true, time: 'Пн' },
    { name: 'Мохьмад', message: 'Изображение', author: false, time: 'Пн' },
    { name: 'Амина', message: 'Друзья', author: false, time: 'Ср' },
    { name: 'Билал', message: 'Круто!', author: true, time: 'Ср' },
    { name: 'Анзор', message: 'Изображение', author: false, time: 'Ср' },
    { name: 'Айшат', message: 'Друзья', author: false, time: 'Ср' },
    { name: 'Халид', message: 'Круто!', author: true, time: 'Ср' },
    { name: 'Адам', message: 'Изображение', author: false, time: '01.01.2024' },
    { name: 'Имран', message: 'Друзья', author: false, time: '01.01.2024' },
    { name: 'Мадина', message: 'Круто!', author: true, time: '01.01.2024' },
    { name: 'Хава', message: 'Изображение', author: false, time: '01.01.2024' },
    { name: 'Билал', message: 'Друзья', author: false, time: '01.01.2024' },
    { name: 'Зелимхан', message: 'Круто!', author: true, time: '01.01.2024' },
  ];
});
