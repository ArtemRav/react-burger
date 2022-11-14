import { Link } from 'react-router-dom'

import style from './not-found-404.module.css'

export const NotFound404 = () => {
  return (
    <section className={style.wrapper}>
      <p className="text text_type_digits-large">Ошибка 404.</p>
      <p className="text text_type_main-large">Страница не найдена</p>
      <Link className="text  mt-4" to="/">
        Вернуться на главную
      </Link>
    </section>
  )
}
