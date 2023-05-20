import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo'
enum TAB_KEYS {
  PROP_KEY = 'props',
  SETTING_KEY = 'setting'
}
const RightPanel: React.FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY)
  const tabItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />
    }
  ]
  const { selectedId } = useGetComponentsInfo()
  useEffect(() => {
    if (selectedId) setActiveKey(TAB_KEYS.PROP_KEY)
    else setActiveKey(TAB_KEYS.SETTING_KEY)
  }, [selectedId])
  return (
    <Tabs
      activeKey={activeKey}
      items={tabItems}
    ></Tabs>
  )
}

export default RightPanel
