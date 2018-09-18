import React from 'react'
import {Redirect} from 'react-router-dom'

const WrongPage = () => (<div>
    <Redirect to="/products"/> 
   </div>)


export default WrongPage