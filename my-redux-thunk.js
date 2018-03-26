

const thunk = ({dispatch,getState})=>next=>action=>{
 	if (typeof action==='function') {
 		return action(dispatch,getState)
 	}

	//默认情况什么都不干
	return next(action)
}
export default thunk