const ROUTES = {
  home: { path: '/', title: 'Конструктор бургера' },
  login: { path: '/login', title: 'Вход' },
  register: { path: '/register', title: 'Регистрация' },
  forgotPassword: { path: '/forgot-password', title: 'Восстановление пароля' },
  resetPassword: { path: '/reset-password', title: 'Сброс пароля' },
  ingredient: { path: '/ingredients/:id', title: 'Детали ингредиента' },
  profile: { path: '/profile', title: 'Профиль' },
  profileOrders: { path: '/profile/orders', title: 'История заказов' },
  profileOrder: { path: '/profile/orders/:id', title: 'Информация о заказе' },
  notFound: { path: '*', title: 'Страница не найдена' },
  feed: { path: '/feed', title: 'Лента заказов' },
  feedOrder: { path: '/feed/:id', title: 'Описание заказа' }
}

const route = endpoint => `http://localhost:3000${endpoint}`
const inputEmailSelector = 'input[name="email"]'
const inputPasswordSelector = 'input[name="password"]'
const ingredientSelector = '[data-test-id="ingredient"]'

describe('Приложение должно быть доступно на 3000 порту', () => {
  it('Приложение должно открыться по адресу localhost:3000', () => {
    cy.visit(route(ROUTES.home.path))
  })
})

describe('Проверка навигации по приложению неавторизованного пользователя', () => {
  beforeEach(() => {
    cy.visit(route(ROUTES.home.path))
  })

  it('По умолчанию открывается главная страница с конструктором бургеров', () => {
    cy.contains('Соберите бургер')
  })

  it('После клика на ссылку "Лента заказов" открывается страница ленты заказов', () => {
    cy.get('a').contains('Лента заказов').click()
    cy.contains('Выполнено за все время')
  })

  it('После клика на ссылку "Личный кабинет" открывается страница логина', () => {
    cy.get('a').contains('Личный кабинет').click()
    cy.contains('Вход')
  })

  it('После клика на ссылку "Зарегистрироваться" на странице входа открывается страница регистрации', () => {
    cy.visit(route(ROUTES.login.path))
    cy.get('a').contains('Зарегистрироваться').click()
    cy.contains('Регистрация')
  })

  it('После клика на ссылку "Войти" на странице регистрации открывается страница входа', () => {
    cy.visit(route(ROUTES.register.path))
    cy.get('a').contains('Войти').click()
    cy.contains('Вход')
  })

  it('После клика на ссылку "Восстановить пароль" на странице входа открывается страница восстановления пароля', () => {
    cy.visit(route(ROUTES.login.path))
    cy.get('a').contains('Восстановить пароль').click()
    cy.contains('Восстановление пароля')
  })

  it('После клика на ссылку "Войти" на странице восстановления пароля открывается страница входа', () => {
    cy.visit(route(ROUTES.forgotPassword.path))
    cy.get('a').contains('Войти').click()
    cy.contains('Вход')
  })

  // it('После отправки формы на странице восстановления пароля открывается страница сброса пароля', () => {
  //   cy.visit(route(ROUTES.forgotPassword.path))
  //   cy.get('input').type('test-data@yandex.ru')
  //   cy.get('button').contains('Восстановить').click()
  //   cy.contains('Сброс пароля')
  // })

  it('После клика на ссылку "Конструктор" открывается главная страница', () => {
    cy.visit(route(ROUTES.login.path))
    cy.get('a').contains('Конструктор').click()
    cy.contains('Соберите бургер')
  })

  it('После клика на логотип открывается главная страница', () => {
    cy.visit(route(ROUTES.login.path))
    cy.get('a').contains('Конструктор').click()
    cy.contains('Соберите бургер')
  })
})

describe('Проверка работы конструктора бургеров', () => {
  beforeEach(() => {
    cy.visit(route(ROUTES.home.path))

    cy.get(ingredientSelector)
      .contains('Флюоресцентная булка R2-D3')
      .as('draggedBun')
    cy.get(ingredientSelector)
      .contains('Говяжий метеорит (отбивная)')
      .as('draggedMain')
    cy.get('[data-test-id="drop-ingredient"]').as('dropMainZone')
  })

  it('В конструктор должна добавляться булка', () => {
    cy.get('@draggedBun')
      .trigger('mouseenter')
      .trigger('dragstart')
      .trigger('drag')
  })

  it('В конструктор должен добавляться ингредиент', () => {
    cy.get('@draggedMain')
      .trigger('mouseenter')
      .trigger('dragstart')
      .trigger('drag')
    cy.get('@dropMainZone').trigger('dragenter').trigger('drop')
    cy.get('@dropMainZone').contains('Говяжий метеорит (отбивная)')
  })

  it('При оформлении заказа неавторизованного пользователя дожно перенаправить на страницу входа', () => {
    cy.get('@draggedBun')
      .trigger('mouseenter')
      .trigger('dragstart')
      .trigger('drag')

    cy.get('@draggedMain')
      .trigger('mouseenter')
      .trigger('dragstart')
      .trigger('drag')

    cy.get('@dropMainZone').trigger('dragenter').trigger('drop')
    cy.get('@dropMainZone').contains('Говяжий метеорит (отбивная)')
    cy.get('button').contains('Оформить заказ').click()
    cy.contains('Вход')
  })

  it('При оформлении заказа должно открыться модальное окно с информацией о заказе', () => {
    cy.visit(route(ROUTES.login.path))
    cy.get(inputEmailSelector).type('cap-Bernardito@yandex.ru')
    cy.get(inputPasswordSelector).type('password')
    cy.get('button').contains('Войти').click()
    cy.contains('Соберите бургер')

    cy.get('@draggedBun')
      .trigger('mouseenter')
      .trigger('dragstart')
      .trigger('drag')

    cy.get('@draggedMain')
      .trigger('mouseenter')
      .trigger('dragstart')
      .trigger('drag')

    cy.get('@dropMainZone').trigger('dragenter').trigger('drop')
    cy.get('@dropMainZone').contains('Говяжий метеорит (отбивная)')
    cy.get('button').contains('Оформить заказ').click()

    cy.contains('Ваш заказ начали готовить', { timeout: 25000 })
  })
})

describe('Проверка работы модального окна с информацией по ингредиенту', () => {
  beforeEach(() => {
    cy.visit(route(ROUTES.home.path))
  })

  it('При клике на ингредиент должно отобразиться модальное окно с его описанием', () => {
    cy.get(ingredientSelector).first().as('targetIngredient')

    cy.get('@targetIngredient').click()
    cy.contains('Детали ингредиента')
  })

  it('Модальное окно должно закрыться после клика на крестик', () => {
    cy.get(ingredientSelector).contains('Флюоресцентная булка R2-D3').click()
    cy.contains('Детали ингредиента')
    cy.get('[data-test-id="modal-close-button"]').click()
    cy.contains('Детали ингредиента').should('not.exist')
  })

  it('Должна быть доступна страница с информацией об ингредиенте', () => {
    cy.get(ingredientSelector).first().as('targetIngredient')

    cy.get('@targetIngredient')
      .invoke('attr', 'href')
      .then(path => {
        if (typeof path === 'undefined') {
          return
        }

        cy.visit(route(path))
        cy.contains('Краторная булка N-200i')
      })
  })
})

describe('Проверка модального окна с информацией по заказу', () => {
  beforeEach(() => {
    cy.visit(route(ROUTES.feed.path))
  })

  const feedItemSelector = '[data-test-id="feed-item"]'

  it('При клике на заказ должно отобразиться модальное окно с его описанием', () => {
    cy.get(feedItemSelector).first().as('targetOrder')

    cy.get('@targetOrder').click()
    cy.contains('Состав')

    cy.get('@targetOrder')
      .find('a')
      .invoke('attr', 'href')
      .then(path => {
        cy.url().should('include', path)
      })
  })

  it('Должна быть доступна страница с информацией о заказе', () => {
    cy.get(feedItemSelector).first().as('targetOrder')

    cy.get('@targetOrder')
      .invoke('attr', 'href')
      .then(path => {
        if (typeof path === 'undefined') {
          return
        }

        cy.visit(path)
        cy.contains('Состав')
      })
  })
})
