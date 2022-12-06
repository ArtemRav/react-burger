import style from './ready-orders-info.module.css'

export const ReadyOrdersInfo = () => {
  const readyOrders: Array<string> = [
    '034531',
    '034532',
    '034533',
    '034534',
    '034535'
  ]

  const processOrders: Array<string> = ['034537', '034538', '034539']

  return (
    <div className={`${style.main} ml-15`}>
      <div className={`${style.table} mb-15`}>
        <div className={`${style.ready}`}>
          <div className={`${style.title} text text_type_main-medium mb-6`}>
            Готовы:
          </div>
          <ul className={`${style.main}`}>
            {readyOrders.map(order => (
              <li
                className="text text_type_digits-default font-ready mb-2"
                key={order}
              >
                {order}
              </li>
            ))}
          </ul>
        </div>

        <div className={`${style.process}`}>
          <div className={`${style.title} text text_type_main-medium mb-6`}>
            В работе:
          </div>
          <ul className={`${style.main}`}>
            {processOrders.map(order => (
              <li className="text text_type_digits-default mb-2" key={order}>
                {order}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`${style.total} mb-15`}>
        <div className={`${style.label} text text_type_main-medium`}>
          Выполнено за все время:
        </div>
        <div
          className={`${style.qnt} text text_type_digits-large text-highlight`}
        >
          28752
        </div>
      </div>

      <div className={`${style.today}`}>
        <div className={`${style.label} text text_type_main-medium`}>
          Выполнено за сегодня:
        </div>
        <div
          className={`${style.qnt} text text_type_digits-large text-highlight`}
        >
          138
        </div>
      </div>
    </div>
  )
}
