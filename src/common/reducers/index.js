const initialState = {
  posts: null,
  post: null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_POST":
      const post = state.posts.find((post, index) => {
        if(index == action.id)
          return post;
      })

      return {
        ...state,
        post
      }
    default:
      return state;
  }
}

module.exports = reducer;
