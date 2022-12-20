import style from './order-ingredient.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, useCallback, useRef } from 'react'
import { delIngredient } from '../../services/actions'
import dragIcon from './../../images/constructor/Vector.png'
import { useDrag, useDrop } from 'react-dnd'
import { BUN, TIngredientItem } from '../../services/types/data'
import { useAppDispatch } from '../../hooks'

type TOrderIngredient = {
  item: TIngredientItem
  index: number
  moveCard: any
}

export const OrderIngredient: FC<TOrderIngredient> = ({
  item,
  index,
  moveCard
}) => {
  const { name, price, image } = item

  const dispatch = useAppDispatch()

  const deleteIngredient = useCallback(
    (item: any) => {
      dispatch(delIngredient(item))
    },
    [dispatch]
  )

  const ref = useRef<HTMLLIElement>(null)

  const [{ handlerId }, drop] = useDrop({
    accept: 'component',

    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },

    hover(item: any, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset: any = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: () => ({ id: item.id, index }),
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const opacity = isDragging ? 0 : 1

  if (item.type !== BUN) drag(drop(ref))

  const preventDefault = (e: any) => e.preventDefault()

  return (
    <li
      ref={ref}
      className={style.li}
      style={{ opacity }}
      onDrop={preventDefault}
      data-handler-id={handlerId}
    >
      <img className="mr-3 crsr-pointer" src={dragIcon} alt="drag&drop" />
      <ConstructorElement
        isLocked={false}
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => deleteIngredient(item)}
      />
    </li>
  )
}
