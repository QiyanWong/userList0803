const searchInput = (state = '', action) => {
  switch(action.type) {
    case 'CHANGE_SEARCH_INPUT':
      return action.input;
    // case 'EMPTY_SEARCH_INPUT':
    //   return state;
    default:
      return state;
  }
};

export default searchInput;