export interface Traveler {
  id: number;
  name: string;
  age: number;
  avatar: string;
  location: string;
  compatibility: number;
  interests: string[];
  travelStyle: string[];
  bio: string;
  nextDestination: string;
  rating: number;
  tripsCompleted: number;
  reviews: number;
  verified: boolean;
}

export interface Route {
  id: number;
  title: string;
  image: string;
  destination: string;
  duration: string;
  budget: string;
  travelers: number;
  tags: string[];
}

export const TRAVELERS_DATA: Traveler[] = [
  {
    id: 1,
    name: 'Анна',
    age: 27,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    location: 'Москва',
    compatibility: 92,
    interests: ['Фотография', 'Треккинг', 'Местная кухня'],
    travelStyle: ['Культура', 'Природа', 'История'],
    bio: 'Мечтаю покорить Эльбрус и увидеть все золотые кольца России',
    nextDestination: 'Алтай',
    rating: 4.8,
    tripsCompleted: 12,
    reviews: 23,
    verified: true,
  },
  {
    id: 2,
    name: 'Максим',
    age: 31,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    location: 'Санкт-Петербург',
    compatibility: 85,
    interests: ['Рыбалка', 'Кемпинг', 'Джипинг'],
    travelStyle: ['Приключения', 'Активный отдых', 'Природа'],
    bio: 'Путешествую по России на УАЗе. Ищу попутчиков в дикие края',
    nextDestination: 'Камчатка',
    rating: 4.6,
    tripsCompleted: 8,
    reviews: 15,
    verified: true,
  },
  {
    id: 3,
    name: 'Елена',
    age: 24,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    location: 'Казань',
    compatibility: 88,
    interests: ['Архитектура', 'Музеи', 'Гастротуры'],
    travelStyle: ['Культура', 'История', 'Гастрономия'],
    bio: 'Изучаю культурное наследие России. Собираю истории малых городов',
    nextDestination: 'Карелия',
    rating: 4.9,
    tripsCompleted: 16,
    reviews: 31,
    verified: true,
  },
  {
    id: 4,
    name: 'Дмитрий',
    age: 29,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    location: 'Екатеринбург',
    compatibility: 90,
    interests: ['Горные лыжи', 'Сноуборд', 'Хайкинг'],
    travelStyle: ['Экстрим', 'Спорт', 'Горы'],
    bio: 'Покоритель уральских вершин. Планирую Кавказ следующим летом',
    nextDestination: 'Сочи',
    rating: 4.7,
    tripsCompleted: 14,
    reviews: 28,
    verified: true,
  },
  {
    id: 5,
    name: 'София',
    age: 26,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    location: 'Новосибирск',
    compatibility: 87,
    interests: ['Фото', 'Закаты', 'Этно-туры'],
    travelStyle: ['Природа', 'Культура', 'Фотография'],
    bio: 'Снимаю красоты Сибири. Хочу посетить все нацпарки страны',
    nextDestination: 'Байкал',
    rating: 4.8,
    tripsCompleted: 11,
    reviews: 19,
    verified: false,
  },
];

export const ROUTES_DATA: Route[] = [
  {
    id: 1,
    title: 'Золотое кольцо России',
    image: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=800&h=600&fit=crop',
    destination: 'Владимир, Суздаль, Ярославль',
    duration: '5 дней',
    budget: '₽25,000',
    travelers: 15,
    tags: ['История', 'Архитектура', 'Культура'],
  },
  {
    id: 2,
    title: 'Горы Кавказа',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    destination: 'Домбай, Архыз, Эльбрус',
    duration: '7 дней',
    budget: '₽35,000',
    travelers: 8,
    tags: ['Хайкинг', 'Горы', 'Природа'],
  },
  {
    id: 3,
    title: 'Байкал: жемчужина Сибири',
    image: 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?w=800&h=600&fit=crop',
    destination: 'Иркутск, Листвянка, Ольхон',
    duration: '10 дней',
    budget: '₽45,000',
    travelers: 12,
    tags: ['Природа', 'Озеро', 'Треккинг'],
  },
  {
    id: 4,
    title: 'Алтай: край гор и рек',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    destination: 'Белокуриха, Чемал, Телецкое озеро',
    duration: '8 дней',
    budget: '₽38,000',
    travelers: 10,
    tags: ['Горы', 'Рафтинг', 'Экотуризм'],
  },
  {
    id: 5,
    title: 'Карелия: край озёр',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
    destination: 'Кижи, Рускеала, Валаам',
    duration: '6 дней',
    budget: '₽32,000',
    travelers: 14,
    tags: ['Культура', 'Природа', 'Водный туризм'],
  },
  {
    id: 6,
    title: 'Камчатка: вулканы и океан',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
    destination: 'Петропавловск-Камчатский, Долина гейзеров',
    duration: '12 дней',
    budget: '₽85,000',
    travelers: 6,
    tags: ['Вулканы', 'Экстрим', 'Дикая природа'],
  },
];
