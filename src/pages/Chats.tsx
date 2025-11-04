import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
}

interface Message {
  id: number;
  text: string;
  isMine: boolean;
  timestamp: string;
}

const Chats = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');

  const chats: Chat[] = [
    {
      id: 1,
      name: 'Анна',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
      lastMessage: 'Когда планируешь вылет в Грузию?',
      timestamp: '10:30',
      unread: 2,
      isOnline: true,
    },
    {
      id: 2,
      name: 'Максим',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
      lastMessage: 'Смотрел отель на Бали, что думаешь?',
      timestamp: 'Вчера',
      unread: 0,
      isOnline: false,
    },
    {
      id: 3,
      name: 'Елена',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
      lastMessage: 'Нашла классное место для йоги!',
      timestamp: '2 дня',
      unread: 1,
      isOnline: true,
    },
  ];

  const messages: Message[] = [
    { id: 1, text: 'Привет! Видела твой профиль', isMine: false, timestamp: '10:15' },
    { id: 2, text: 'Привет! Да, тоже заинтересовалась 🙂', isMine: true, timestamp: '10:18' },
    { id: 3, text: 'Когда планируешь вылет в Грузию?', isMine: false, timestamp: '10:30' },
    { id: 4, text: 'Думаю в конце месяца, а ты?', isMine: true, timestamp: '10:32' },
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending:', messageText);
      setMessageText('');
    }
  };

  const selectedChatData = chats.find((c) => c.id === selectedChat);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pb-24">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {selectedChat ? (
              <>
                <Button variant="ghost" size="icon" onClick={() => setSelectedChat(null)}>
                  <Icon name="ArrowLeft" className="h-5 w-5" />
                </Button>
                {selectedChatData && (
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedChatData.avatar} />
                        <AvatarFallback>{selectedChatData.name[0]}</AvatarFallback>
                      </Avatar>
                      {selectedChatData.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div>
                      <h2 className="font-semibold">{selectedChatData.name}</h2>
                      <p className="text-xs text-muted-foreground">
                        {selectedChatData.isOnline ? 'Онлайн' : 'Был(а) недавно'}
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                  <Icon name="ArrowLeft" className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Сообщения
                </h1>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 animate-fade-in">
        {!selectedChat ? (
          <div className="space-y-4">
            {chats.map((chat) => (
              <Card
                key={chat.id}
                className="p-4 cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02] bg-white/90 backdrop-blur-sm border-0"
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback>{chat.name[0]}</AvatarFallback>
                    </Avatar>
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold">{chat.name}</h3>
                      <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>

                  {chat.unread > 0 && (
                    <Badge className="bg-primary text-white border-0 h-6 w-6 rounded-full flex items-center justify-center p-0">
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100vh-220px)]">
            <ScrollArea className="flex-1 mb-4">
              <div className="space-y-4 p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMine ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        message.isMine
                          ? 'bg-gradient-to-r from-primary to-secondary text-white'
                          : 'bg-white shadow-md'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span
                        className={`text-xs ${
                          message.isMine ? 'text-white/70' : 'text-muted-foreground'
                        } mt-1 block`}
                      >
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Card className="p-4 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <div className="flex gap-3">
                <Input
                  placeholder="Напишите сообщение..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  size="icon"
                  className="bg-gradient-to-r from-primary to-secondary"
                  onClick={handleSendMessage}
                >
                  <Icon name="Send" className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-white/20 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-4">
            <Button
              variant="ghost"
              size="icon"
              className="flex-col h-auto py-2 hover:bg-primary/10"
              onClick={() => navigate('/')}
            >
              <Icon name="Compass" className="h-6 w-6" />
              <span className="text-xs mt-1">Открыть</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="flex-col h-auto py-2 hover:bg-primary/10"
              onClick={() => navigate('/search')}
            >
              <Icon name="Search" className="h-6 w-6" />
              <span className="text-xs mt-1">Поиск</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="flex-col h-auto py-2 hover:bg-primary/10"
              onClick={() => navigate('/map')}
            >
              <Icon name="Map" className="h-6 w-6" />
              <span className="text-xs mt-1">Карта</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="flex-col h-auto py-2 hover:bg-primary/10"
              onClick={() => navigate('/profile')}
            >
              <Icon name="User" className="h-6 w-6" />
              <span className="text-xs mt-1">Профиль</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Chats;
