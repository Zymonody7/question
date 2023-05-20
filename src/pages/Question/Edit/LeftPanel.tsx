import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import React from 'react'
import ComponentLib from './ComponentLib'
import Layers from './Layers'

const LeftPanel = () => {
  const tabItems = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreOutlined />
          组件库
        </span>
      ),
      children: <ComponentLib></ComponentLib>
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: <Layers></Layers>
    }
  ]
  return (
    <Tabs
      defaultActiveKey='componentLib'
      items={tabItems}
    ></Tabs>
  )
}

export default LeftPanel
