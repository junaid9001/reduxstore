function counter(state = 0, action) {
  if (action.type === "increment") return state + 1
  if (action.type === "decrement") return state - 1
  return state
}

function createStore(reducer) {
  let state
  let listeners = []

  function getState() {
    return state
  }

  function dispatch(action) {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  function subscribe(listener) {
    listeners.push(listener)
  }

  dispatch({})

  return { getState, dispatch, subscribe }
}

const store = createStore(counter)

store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch({ type: "increment" })
store.dispatch({ type: "increment" })
store.dispatch({ type: "decrement" })
