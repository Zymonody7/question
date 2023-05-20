import React from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Stat: React.FC = () => {
  const { loading } = useLoadQuestionData()

  return <div>Stat</div>
}

export default Stat
