import React from 'react'
import {
  ComponentConfGroup,
  ComponentConfType
} from '../../../components/QuestionComponents'
import { Typography } from 'antd'
import styles from './ComponentLib.module.scss'
import { addComponent } from '../../../store/componentReducer'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
const { Title } = Typography
const ComponentLib = () => {
  const dispatch = useDispatch()

  const genComponent = (c: ComponentConfType) => {
    const { title, type, Component } = c
    function handleClick() {
      dispatch(
        addComponent({
          fe_id: nanoid(),
          title,
          type,
          props: c.defaultProps
        })
      )
    }
    return (
      <div
        key={type}
        className={styles.wrapper}
        onClick={handleClick}
      >
        <div className={styles.component}>
          <Component />
        </div>
      </div>
    )
  }
  return (
    <>
      {ComponentConfGroup.map((group, index) => {
        return (
          <div key={index}>
            <Title
              level={3}
              style={{
                fontSize: '16px',
                marginTop: index > 0 ? '20px' : '0'
              }}
            >
              {group.groupName}
              <div>{group.components.map((c) => genComponent(c))}</div>
            </Title>
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
