import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    interests: [] as string[],
    travelStyle: [] as string[],
  });

  const availableInterests = [
    'Фотография',
    'Хайкинг',
    'Кафе',
    'Дайвинг',
    'Серфинг',
    'Йога',
    'Медитация',
    'Местная кухня',
    'Музеи',
    'Ночная жизнь',
    'Шопинг',
    'Экстрим',
  ];

  const availableStyles = [
    'Приключения',
    'Культура',
    'Природа',
    'Активный отдых',
    'Вечеринки',
    'Духовные практики',
    'Эко-туризм',
    'Релакс',
    'Luxury',
    'Бэкпэкинг',
  ];

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const toggleStyle = (style: string) => {
    setFormData((prev) => ({
      ...prev,
      travelStyle: prev.travelStyle.includes(style)
        ? prev.travelStyle.filter((s) => s !== style)
        : [...prev.travelStyle, style],
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      localStorage.setItem('travelMatchUser', JSON.stringify(formData));
      navigate('/');
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.name && formData.age;
    if (step === 2) return formData.interests.length >= 3;
    if (step === 3) return formData.travelStyle.length >= 2;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 bg-white/90 backdrop-blur-sm border-0 shadow-2xl animate-scale-in">
        <div className="mb-8">
          <div className="flex gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-all ${
                  s <= step ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Добро пожаловать! 🚀
                </h1>
                <p className="text-muted-foreground">Давайте познакомимся</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-lg font-semibold">
                    Ваше имя
                  </Label>
                  <Input
                    id="name"
                    placeholder="Введите ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 h-12 text-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="age" className="text-lg font-semibold">
                    Возраст
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Ваш возраст"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="mt-2 h-12 text-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Ваши интересы 🎯</h2>
                <p className="text-muted-foreground">Выберите минимум 3 интереса</p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                {availableInterests.map((interest) => (
                  <Badge
                    key={interest}
                    variant={formData.interests.includes(interest) ? 'default' : 'outline'}
                    className={`cursor-pointer px-4 py-2 text-base transition-all hover:scale-105 ${
                      formData.interests.includes(interest)
                        ? 'bg-gradient-to-r from-primary to-secondary text-white'
                        : ''
                    }`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Выбрано: {formData.interests.length} / 3
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Стиль путешествий ✈️</h2>
                <p className="text-muted-foreground">Выберите минимум 2 стиля</p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                {availableStyles.map((style) => (
                  <Badge
                    key={style}
                    variant={formData.travelStyle.includes(style) ? 'default' : 'outline'}
                    className={`cursor-pointer px-4 py-2 text-base transition-all hover:scale-105 ${
                      formData.travelStyle.includes(style)
                        ? 'bg-gradient-to-r from-secondary to-accent text-white'
                        : ''
                    }`}
                    onClick={() => toggleStyle(style)}
                  >
                    {style}
                  </Badge>
                ))}
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Выбрано: {formData.travelStyle.length} / 2
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          {step > 1 && (
            <Button variant="outline" size="lg" onClick={() => setStep(step - 1)} className="flex-1">
              <Icon name="ChevronLeft" className="mr-2 h-5 w-5" />
              Назад
            </Button>
          )}
          <Button
            size="lg"
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 bg-gradient-to-r from-primary via-secondary to-accent disabled:opacity-50"
          >
            {step === 3 ? 'Начать!' : 'Далее'}
            {step !== 3 && <Icon name="ChevronRight" className="ml-2 h-5 w-5" />}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Onboarding;
