
//	imitate redux.createStore API , to transmit a reducer as parameter
export function createStore(reducer) {
	
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