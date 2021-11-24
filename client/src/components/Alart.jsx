import React, { useEffect } from 'react'
import { useGlobalContext } from '../context'

const Alart = () => {
  const { Spin, alert_props } = useGlobalContext()

  return (
    <div className='alert'>
      <div className='alert-content'>
        {!alert_props.status && <Spin />}
        <p className={alert_props.status || 'process'}>{alert_props.mssg}</p>
      </div>
    </div>
  )
}

export default Alart
