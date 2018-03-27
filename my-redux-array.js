



const arrayThunk = ({dispatch,getState})=>next=>action=>{
	if(Array.isArray(action)){
		action.forEach(v=>dispatch(v))
	}
	//	如果不符合要求，直接调用下一个中间件，使用next
	//	如果符合要求，需要重新dispatch，调用dispatch即可
 	// if (typeof action==='function') {
 	// 	return action(dispatch,getState)
 	// }
	//默认情况什么都不干
	return next(action)
}
export default arrayThunk