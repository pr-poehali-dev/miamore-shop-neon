import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  badge?: string;
  icon: string;
}

interface Donation {
  id: number;
  amount: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Пак Нуба для ПВП',
    price: 5,
    description: 'Кожаная броня + деревянный меч. Идеально для старта!',
    icon: 'Sword'
  },
  {
    id: 2,
    name: 'Обычная алмазная броня',
    price: 10,
    description: 'Полный сет алмазной брони без зачарований',
    icon: 'Shield'
  },
  {
    id: 3,
    name: 'Алмазная зачарованная броня',
    price: 15,
    description: 'Полный сет алмазной брони с мощными зачарованиями',
    icon: 'ShieldCheck'
  },
  {
    id: 4,
    name: 'Пак ПРО',
    price: 100,
    description: 'Алмазная броня, стак алмазов, 16 эндер перлов, алмазная кирка и топор',
    icon: 'Package'
  },
  {
    id: 5,
    name: 'Привилегия ВИП',
    price: 10,
    description: 'Базовые возможности: цветной ник, приват территории',
    icon: 'Star'
  },
  {
    id: 6,
    name: 'Привилегия ПРЕМИУМ',
    price: 19,
    description: 'Расширенные возможности + все бонусы VIP',
    icon: 'Award'
  },
  {
    id: 7,
    name: 'Привилегия КРЕАТИВ',
    price: 29,
    description: 'Креативный режим для строительства',
    icon: 'Palette'
  },
  {
    id: 8,
    name: 'Привилегия ГЕРОЙ',
    price: 15,
    description: 'Уникальные способности героя на сервере',
    icon: 'Sword'
  },
  {
    id: 9,
    name: 'Привилегия СТРАЖ',
    price: 49,
    description: 'Модерация чата + особые команды',
    icon: 'ShieldCheck'
  },
  {
    id: 10,
    name: 'Привилегия АДМИН',
    price: 49,
    description: 'Административные права на сервере',
    icon: 'Crown'
  },
  {
    id: 11,
    name: 'Ключи с привилегией',
    price: 39,
    description: 'Наборы ключей от донат-кейсов',
    icon: 'Key'
  },
  {
    id: 12,
    name: 'Разбан',
    price: 259,
    description: 'Снятие бана с аккаунта',
    icon: 'Unlock'
  },
  {
    id: 13,
    name: 'Размут',
    price: 69,
    description: 'Снятие мута в чате',
    icon: 'Volume2'
  },
  {
    id: 14,
    name: 'Привилегия ТАНОС',
    price: 200,
    description: 'Управляй временем суток + помощь админа в любых вопросах',
    icon: 'Sparkles'
  },
  {
    id: 15,
    name: 'Админка на день',
    price: 150,
    description: 'Админ права на 24 часа',
    badge: 'ОГРАНИЧЕНО',
    icon: 'Timer'
  },
  {
    id: 16,
    name: 'Админка навсегда',
    price: 600,
    description: 'Вечные админ права на сервере',
    icon: 'Infinity'
  },
  {
    id: 17,
    name: 'Стак камня',
    price: 10,
    description: '64 блока камня для строительства',
    icon: 'Box'
  },
  {
    id: 18,
    name: 'Стак земли',
    price: 10,
    description: '64 блока земли',
    icon: 'Mountain'
  },
  {
    id: 19,
    name: 'Стак досок',
    price: 10,
    description: '64 деревянные доски',
    icon: 'TableProperties'
  },
  {
    id: 20,
    name: 'Стак стекла',
    price: 10,
    description: '64 блока стекла',
    icon: 'Square'
  },
  {
    id: 21,
    name: 'Стак песка',
    price: 10,
    description: '64 блока песка',
    icon: 'Waves'
  },
  {
    id: 22,
    name: 'Стак булыжника',
    price: 10,
    description: '64 блока булыжника',
    icon: 'Shapes'
  },
  {
    id: 23,
    name: 'Стак кирпича',
    price: 10,
    description: '64 кирпича для красивых построек',
    icon: 'Grid3x3'
  },
  {
    id: 24,
    name: 'Стак обсидиана',
    price: 10,
    description: '64 блока обсидиана',
    icon: 'Hexagon'
  },
  {
    id: 25,
    name: 'Стак шерсти',
    price: 10,
    description: '64 блока шерсти (любой цвет)',
    icon: 'Shirt'
  },
  {
    id: 26,
    name: 'Стак угля',
    price: 10,
    description: '64 угля для плавки',
    icon: 'Fuel'
  },
  {
    id: 27,
    name: 'Стак железных слитков',
    price: 10,
    description: '64 железных слитка',
    icon: 'Hammer'
  },
  {
    id: 28,
    name: 'Стак золотых слитков',
    price: 10,
    description: '64 золотых слитка',
    icon: 'Coins'
  },
  {
    id: 29,
    name: 'Стак алмазов',
    price: 10,
    description: '64 алмаза',
    icon: 'Diamond'
  },
  {
    id: 30,
    name: 'Стак изумрудов',
    price: 10,
    description: '64 изумруда для торговли',
    icon: 'Gem'
  },
  {
    id: 31,
    name: 'Стак красной пыли',
    price: 10,
    description: '64 красной пыли для механизмов',
    icon: 'Sparkles'
  },
  {
    id: 32,
    name: 'Стак TNT',
    price: 10,
    description: '64 блока TNT',
    icon: 'Bomb'
  },
  {
    id: 33,
    name: 'Стак светящегося камня',
    price: 10,
    description: '64 блока светящегося камня',
    icon: 'Lightbulb'
  },
  {
    id: 34,
    name: 'Стак эндер-камня',
    price: 10,
    description: '64 блока эндер-камня',
    icon: 'Cuboid'
  },
  {
    id: 35,
    name: 'Стак кварца',
    price: 10,
    description: '64 кварца из Нижнего мира',
    icon: 'Milestone'
  },
  {
    id: 36,
    name: 'Стак призмарина',
    price: 10,
    description: '64 блока призмарина',
    icon: 'Waves'
  },
  {
    id: 37,
    name: 'Стак незеритовых слитков',
    price: 10,
    description: '64 незеритовых слитка',
    icon: 'Anvil'
  }
];

const donations: Donation[] = [
  { id: 1, amount: 10 },
  { id: 2, amount: 15 },
  { id: 3, amount: 20 },
  { id: 4, amount: 25 },
  { id: 5, amount: 50 },
  { id: 6, amount: 75 },
  { id: 7, amount: 100 },
  { id: 8, amount: 150 },
  { id: 9, amount: 200 },
  { id: 10, amount: 250 },
  { id: 11, amount: 300 },
  { id: 12, amount: 500 },
  { id: 13, amount: 750 },
  { id: 14, amount: 1000 }
];

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedDonation, setSelectedDonation] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showRoulette, setShowRoulette] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [discount, setDiscount] = useState(0);
  const { toast } = useToast();
  const phoneNumber = '+79505244676';

  useEffect(() => {
    const registered = localStorage.getItem('miamore_registered');
    if (registered) {
      setIsRegistered(true);
    } else {
      setShowRegister(true);
    }
  }, []);

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleDonationClick = (amount: number) => {
    setSelectedDonation(amount);
    setIsDonationDialogOpen(true);
  };

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(phoneNumber);
    toast({
      title: 'Скопировано!',
      description: 'Номер телефона скопирован в буфер обмена',
    });
  };

  const handleRegister = () => {
    if (!username || !email) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive'
      });
      return;
    }
    setShowRegister(false);
    setShowRoulette(true);
  };

  const spinRoulette = () => {
    setIsSpinning(true);
    const discounts = [10, 15, 20, 25, 30, 35, 40, 45, 50];
    const randomDiscount = discounts[Math.floor(Math.random() * discounts.length)];
    
    setTimeout(() => {
      setDiscount(randomDiscount);
      setIsSpinning(false);
      setShowRoulette(false);
      setShowDiscount(true);
      localStorage.setItem('miamore_registered', 'true');
      localStorage.setItem('miamore_discount', randomDiscount.toString());
      setIsRegistered(true);
    }, 3000);
  };

  const closeDiscount = () => {
    setShowDiscount(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] cyber-grid">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/80 border-b border-pink-500/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-black neon-text glitch">
              MIAMORE SHOP
            </h1>
            <nav className="flex gap-6">
              <button 
                onClick={() => scrollToSection('products')}
                className="text-white hover:text-pink-500 transition-colors font-semibold"
              >
                Товары
              </button>
              <button 
                onClick={() => scrollToSection('donations')}
                className="text-white hover:text-pink-500 transition-colors font-semibold"
              >
                Пожертвования
              </button>
              <button 
                onClick={() => scrollToSection('how-to-buy')}
                className="text-white hover:text-pink-500 transition-colors font-semibold"
              >
                Как купить
              </button>
            </nav>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-6">
          <div className="inline-block">
            <Badge className="bg-purple-600 text-white px-4 py-2 text-lg mb-4 pulse-neon">
              <Icon name="Zap" className="inline mr-2" size={20} />
              Minecraft Shop
            </Badge>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white neon-text">
            ДОБРО ПОЖАЛОВАТЬ В<br />БУДУЩЕЕ ИГРЫ
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            Легендарные предметы, привилегии и пакеты для настоящих игроков
          </p>
          <Button 
            onClick={() => scrollToSection('products')}
            size="lg" 
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold text-lg px-8 py-6 neon-glow"
          >
            <Icon name="ShoppingCart" className="mr-2" size={24} />
            СМОТРЕТЬ ТОВАРЫ
          </Button>
        </div>
      </section>

      <section id="products" className="container mx-auto px-4 py-16">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-12 neon-text">
          НАШИ ТОВАРЫ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="bg-black/60 border-2 border-purple-600/50 backdrop-blur-sm hover:border-pink-500 transition-all duration-300 hover:scale-105"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="bg-gradient-to-br from-pink-600 to-purple-600 p-3 rounded-lg neon-glow">
                    <Icon name={product.icon} size={32} className="text-white" />
                  </div>
                  {product.badge && (
                    <Badge className="bg-red-600 text-white pulse-neon">
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-2xl font-bold text-white mt-4">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-gray-400 text-base">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-pink-500 neon-text">
                  {product.price}₽
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleBuyClick(product)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-6"
                  size="lg"
                >
                  <Icon name="ShoppingBag" className="mr-2" size={20} />
                  КУПИТЬ
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section id="donations" className="container mx-auto px-4 py-16">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-6 neon-text">
          ПОДДЕРЖАТЬ СЕРВЕР
        </h2>
        <p className="text-center text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
          Ваши пожертвования помогают развивать сервер и добавлять новые функции
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-6xl mx-auto">
          {donations.map((donation) => (
            <Card 
              key={donation.id}
              onClick={() => handleDonationClick(donation.amount)}
              className="bg-black/60 border-2 border-cyan-500/50 backdrop-blur-sm hover:border-cyan-400 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-black text-cyan-400" style={{ textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff' }}>
                  {donation.amount}₽
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="how-to-buy" className="container mx-auto px-4 py-16">
        <Card className="bg-black/60 border-2 border-purple-600 backdrop-blur-sm max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-black text-white neon-text">
              <Icon name="HelpCircle" className="inline mr-3" size={32} />
              КАК КУПИТЬ?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300 text-lg">
            <div className="flex items-start gap-4">
              <div className="bg-pink-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                1
              </div>
              <p>Выберите нужный товар из каталога</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-pink-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                2
              </div>
              <p>Нажмите зеленую кнопку "КУПИТЬ"</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-pink-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                3
              </div>
              <p>Позвоните по указанному номеру телефона</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-pink-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                4
              </div>
              <p>Сообщите название товара и получите его на сервере!</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-black border-2 border-pink-500 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black neon-text">
              ПОКУПКА ТОВАРА
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Позвоните по номеру ниже для оформления заказа
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-6">
              <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-600">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name={selectedProduct.icon} size={24} className="text-pink-500" />
                  <h3 className="font-bold text-lg">{selectedProduct.name}</h3>
                </div>
                <p className="text-3xl font-black text-pink-500 neon-text">
                  {selectedProduct.price}₽
                </p>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm text-gray-400 font-semibold">ПОЗВОНИТЕ ПО НОМЕРУ:</p>
                <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-4 rounded-lg neon-glow">
                  <p className="text-2xl font-black text-center">{phoneNumber}</p>
                </div>
                <Button 
                  onClick={copyPhoneNumber}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
                  size="lg"
                >
                  <Icon name="Copy" className="mr-2" size={20} />
                  СКОПИРОВАТЬ НОМЕР
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDonationDialogOpen} onOpenChange={setIsDonationDialogOpen}>
        <DialogContent className="bg-black border-2 border-cyan-500 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black" style={{ textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff' }}>
              ПОЖЕРТВОВАНИЕ
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Спасибо за поддержку сервера!
            </DialogDescription>
          </DialogHeader>
          {selectedDonation && (
            <div className="space-y-6">
              <div className="bg-cyan-900/30 p-6 rounded-lg border border-cyan-500">
                <Icon name="Heart" size={32} className="text-cyan-400 mx-auto mb-3" />
                <p className="text-5xl font-black text-cyan-400 text-center" style={{ textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff' }}>
                  {selectedDonation}₽
                </p>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm text-gray-400 font-semibold">ПОЗВОНИТЕ ПО НОМЕРУ:</p>
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 rounded-lg" style={{ boxShadow: '0 0 20px #00ffff' }}>
                  <p className="text-2xl font-black text-center">{phoneNumber}</p>
                </div>
                <Button 
                  onClick={copyPhoneNumber}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold"
                  size="lg"
                >
                  <Icon name="Copy" className="mr-2" size={20} />
                  СКОПИРОВАТЬ НОМЕР
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showRegister} onOpenChange={setShowRegister}>
        <DialogContent className="bg-black border-2 border-pink-500 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black neon-text text-center">
              ДОБРО ПОЖАЛОВАТЬ!
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-center">
              Зарегистрируйся и получи шанс на скидку!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-400 mb-2 block">ИМЯ ИГРОКА</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Твой ник в Minecraft"
                className="bg-black/60 border-purple-600 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-400 mb-2 block">EMAIL</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="bg-black/60 border-purple-600 text-white"
              />
            </div>
            <Button
              onClick={handleRegister}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold text-lg py-6 neon-glow"
              size="lg"
            >
              <Icon name="Gift" className="mr-2" size={24} />
              ЗАРЕГИСТРИРОВАТЬСЯ
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showRoulette} onOpenChange={setShowRoulette}>
        <DialogContent className="bg-black border-2 border-pink-500 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black neon-text text-center">
              РУЛЕТКА СКИДОК
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-center">
              Крути рулетку и получи свою скидку!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="relative">
              <div 
                className={`w-64 h-64 mx-auto rounded-full border-4 border-pink-500 neon-glow flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 ${isSpinning ? 'animate-spin' : ''}`}
                style={{ animationDuration: '0.3s' }}
              >
                <div className="text-center">
                  <Icon name="Sparkles" size={64} className="text-pink-500 mx-auto mb-2" />
                  <p className="text-4xl font-black neon-text">
                    {isSpinning ? '?' : 'КРУТИ!'}
                  </p>
                </div>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-pink-500"></div>
              </div>
            </div>
            <Button
              onClick={spinRoulette}
              disabled={isSpinning}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold text-lg py-6 neon-glow disabled:opacity-50"
              size="lg"
            >
              <Icon name="Zap" className="mr-2" size={24} />
              {isSpinning ? 'КРУТИТСЯ...' : 'КРУТИТЬ РУЛЕТКУ'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDiscount} onOpenChange={closeDiscount}>
        <DialogContent className="bg-black border-2 border-green-500 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-center" style={{ textShadow: '0 0 20px #00ff00' }}>
              ПОЗДРАВЛЯЕМ!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 text-center">
            <Icon name="PartyPopper" size={80} className="text-yellow-400 mx-auto" />
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 rounded-lg neon-glow">
              <p className="text-2xl font-bold mb-2">ТВОЯ СКИДКА</p>
              <p className="text-7xl font-black" style={{ textShadow: '0 0 30px #00ff00' }}>
                {discount}%
              </p>
            </div>
            <div className="bg-yellow-900/30 border-2 border-yellow-500 p-4 rounded-lg">
              <Icon name="Info" size={24} className="text-yellow-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-yellow-400">ВАЖНО!</p>
              <p className="text-gray-300 mt-2">
                При покупке товара сообщите администратору про свою скидку <span className="font-black text-green-400">{discount}%</span>
              </p>
            </div>
            <Button
              onClick={closeDiscount}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-6"
              size="lg"
            >
              <Icon name="Check" className="mr-2" size={24} />
              ПОНЯТНО!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="border-t border-purple-600/30 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-2xl font-black neon-text mb-2">ТЫ КРУТОЙ БРО</p>
          <p className="text-gray-500 font-semibold">© 2025 MIAMORE SHOP - Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;