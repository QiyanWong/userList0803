const searchInput = (state = '', action) => {
  switch(action.type) {
    case 'CHANGE_SEARCH_INPUT':
      return action.input;
    default:
      return state;
  }
};

export default searchInput;