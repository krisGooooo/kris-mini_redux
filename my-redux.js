
//	imitate redux.createStore API , to transmit a reducer as parameter
export function createStore(reducer, enhancer) {
	
	if (enhancer) {
		return enhancer(createStore)(reducer)
	}
	let currentState = {}		// init state

	let currentListeners = []	//	init Listeners 

	//	get now state
	function getState() {
		return currentState
	}

	//	add listener to currentListeners arr
	function subscribe(listener) {
		currentListeners.push(listener)
	}

	//	commit action to reducer ,	and renew currentState , and run listener arr
	function dispatch(action) {
		currentState = reducer(currentState,action)
		currentListeners.forEach(v=>v())
		return action
	}

	//	init dispatch to init state (match reducer default)
	dispatch({type:'@@krisGooooo/kris-redux'})

	return { getState, subscribe, dispatch}
}
export function applyMiddleware(...middlewares){
	return createStore=>(...args)=>{
		const store = createStore(...args)
		let dispatch = store.dispatch

		const midApi = {
			getState:store.getState,
			dispatch:(...args)=>dispatch(...args)
		}
		// dispatch = middleware(midApi)(store.dispatch)
		const middlewareChain = middlewares.map(middleware=>middleware(midApi))
		dispatch = compose(...middlewareChain)(store.dispatch)

		return {
			...store,
			dispatch 
		}
	}
}

export function compose(...funcs){
	if (funcs.length===0) {
		return arg=>arg
	}
	if(funcs.length===1){ƒ
		return funcs[0]
	}

	return funcs.reduce((ret,item)=>(...args)=>ret(item(...args)))
}
function bindActionCreator(creator,dispatch){
	return (...args)=>dispatch(creator(...args))
}

export function bindActionCreators(creators,dispatch){
	let bound = {}
	Object.keys(creators).forEach(v=>{
		let creator = creators[v]
		bound[v] = bindActionCreator(creator,dispatch)
	})
	return bound
}