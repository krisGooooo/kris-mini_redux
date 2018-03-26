 
 import React from 'react'
 import PropTypes from 'prop-types'

 import {bindActionCreators} from './my-redux'

 //connect 负责链接组建，将redux数据放到组件的属性里
 //1.负责接收一个组件，把state里的一些数据放进去，返回一个组件（高阶组件）
 //2.数据变化的时候，能够通知组件
 
 export const connect = (mapStateToProps=state=>state,mapDispatchToProps={})=>(WrapComponent)=>{
 	return class ConnectComponent extends React.Component{
 		static contextTypes = {
 			store:PropTypes.object 
 		}
 		constructor(props,context){
 			super(props,context)
 			this.state = {
 				props:{}
 			}
 		}

 		conponentDidMount(){
 			const {store} = this.context.store
 			store.subscribe(()=>this.update())
 			this.update()
 		}
 		update(){
 			//	获取 mapStateToProps 和 mapDispatchToProps 放入this.props里
 			const {store} = this.store
 			const stateProps = mapStateToProps(store.getState())
 			const dispatchProps = bindActionCreators(mapDispatchToProps,store.dispatch)
 			this.setState({
 				props:{
	 				...this.state.props,
					...stateProps,
					...dispatchProps
 				}

 			})
 		}
 		render(){
 			return (<WrapComponent {...this.state.props}></WrapComponent>)
 		}
 	}
 }

//Provider,把store放到context里，所有的子元素可以直接取到store
 export class Provider extends React.Component{
 	static childContextTypes = {
 		store: PropTypes.object
 	}
 	getChildContext(){
 		return {store:this.store}
 	}
 	constructor(props, context){
 		super(props, context)
 		this.store = props.store
 	}
 	render(){
 		return this.props.children
 	}
 }