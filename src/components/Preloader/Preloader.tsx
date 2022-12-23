import style from './preloader.module.css'

export const Preloader = () => {
  return (
    <p className={`${style.wrapper} text-center text text_type_main-large`}>
      Идет загрузка ...
    </p>
  )
}
