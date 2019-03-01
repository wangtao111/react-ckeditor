/**
 * @description Home
 * @date 2018.01.15
 * @author dhhuang1
 */



/**
 * 这个例子 里面包括 inject 的两种写法
 * 注释的是第一种写法
 * 未注释是第二种写法
 * 
 * 函数的写法有几种 如果 不使用箭头函数 就要在 constructor 
 * .bind(this)
 * 
 */

// @inject((defaultStore) => {
//   console.log(defaultStore)
//   let stroe = defaultStore.defaultStore
//   return {
//     abc: stroe.abc,
//     arr: stroe.toList.map(item => { return item }),
//     addList: stroe.addList,
//   }
// })



import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
// import Loading from '../../components/Loading'
// import { Button, Alert } from 'antd'
// import styled from 'styled-components'
import Layout from '../Layout';

@withRouter
@inject('defaultStore')
@observer
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <div>
            <Layout></Layout>
        </div>
    }
}
export default Home