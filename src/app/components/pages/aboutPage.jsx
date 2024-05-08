const AboutPage = () => {
  return (
    <>
      <h1 className="page-title">О проекте</h1>
      <div className="page-wrapper">
        <div className="about-text">
          <p>
            <strong>STORE.COM</strong> - это учебный проект начинающего Frontend разработчика. Данный учебный проект интернет-магазина, созданный для освоения и
            демонстрации навыков в области Frontend разработки. Разработан следующий функционал:
          </p>
          <ul>
            <li>Поиск товара по его названию</li>
            <li>Категории товаров</li>
            <li>Сортировка товаров (по стоимости, по популярности, по наименованию)</li>
            <li>Отдельная страница товара</li>
            <li>Комментарии к товару</li>
            <li>Форма обратной связи</li>
            <li>Новости (в работе)</li>
            <li>Корзина (итоговая стоимость, очистка корзины, удаление товара из корзины, изменение количества товаров)</li>
            <li>Избранные товары</li>
            <li>Single Page Application (SPA)</li>
            <li>Авторизация/регистрация</li>
            <li>Личный кабинет (в работе)</li>
            <li>Админ панель</li>
            <li>Получение данных с сервера (REST API)</li>
            <li>Слайдер</li>
            <li>И многое другое</li>
          </ul>
          <p>В ходе разработки были использованы следующие технологии/инструменты в области Frontend разработки:</p>
          <ul>
            <li>HTML, CSS</li>
            <li>Git</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>Redux</li>
          </ul>
          <p>Кроме клиентской части была разработана серверная часть проекта с применением:</p>
          <ul>
            <li>NodeJS</li>
            <li>MongoDB</li>
            <li>Express</li>
          </ul>
          <p>
            Котакты со мной:{" "}
            <a href="https://t.me/rusinalexandr" target="_blank">
              @rusinalexandr
            </a>{" "}
            (кликабельно)
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
