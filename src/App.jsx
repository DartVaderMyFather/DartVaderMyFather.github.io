import { useState } from 'react'
import './App.css'
import './styles/fonts.css'

//страницы
import Main from './components/Pages/Main';
import Shaders from './components/Pages/Shaders';
import Other from './components/Pages/Other';
import Text from './components/Pages/Text';




function App() {  
  
  // Переменные для слайдеров карточка 2
  const [colorValue, setColorValue] = useState(0);
  const [scaleValue, setScaleValue] = useState(1);

  const [activeTab, setActiveTab] = useState('main');
  

  // Задайте любые два цвета здесь!
  const color1 = { r: 145, g: 0, b: 200 };
  const color2 = { r: 127, g: 255, b: 212 };

  // Интерполяция
  const r = Math.round(color1.r + (color2.r - color1.r) * colorValue);
  const g = Math.round(color1.g + (color2.g - color1.g) * colorValue);
  const b = Math.round(color1.b + (color2.b - color1.b) * colorValue);


  // Функция для смены вкладки
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Контент для каждой вкладки (можно вынести в отдельные компоненты)
  const renderContent = () => {
    switch (activeTab) {
      case 'main': return <Main />;
      case 'shaders': return <Shaders />;
      case 'other': return <Other />;
      case 'text': return <Text />;
      default:
        return null;
    }
  };

  

  return (

    <div className="App">
      {/* Шапка с меню */}
      <header className="header">
        
        <div className='logo'>WEB</div>

        <nav className="nav">
          
          <button
            className={activeTab === 'main' ? 'active' : ''}
            onClick={() => handleTabClick('main')}
          >
            Главная
          </button>

          <button
            className={activeTab === 'text' ? 'active' : ''}
            onClick={() => handleTabClick('text')}
          >
            Text
          </button>

          <button
            className={activeTab === 'shaders' ? 'active' : ''}
            onClick={() => handleTabClick('shaders')}
          >
            Шейдера
          </button>

          <button
            className={activeTab === 'other' ? 'active' : ''}
            onClick={() => handleTabClick('other')}
          >
            Разное
          </button>         

        </nav>
         <button
            className='hamburger'>
              <svg width="24" height="24" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 7H19" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                <path d="M5 12H19" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                <path d="M5 17H19" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
              </svg>
          </button>     

      </header>

      {/* Основной контент */}
      <main className="content">
        {renderContent()}
      </main>
    </div>

  );
}

export default App;