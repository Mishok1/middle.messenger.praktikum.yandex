// import './style.css'
import './styles/main.scss'
import index from './templates/index.hbs'

document.querySelector('#app').innerHTML = index(
  {
    chats: [
      {
        src: '#',
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
);