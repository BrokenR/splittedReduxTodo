const initialSate = {
  items: [],
};
const tasks = (state = initialSate, action) => {
  switch (action.type) {
    case "ADD_TASK":
      const newTask = state.items.map((obj) => {
        if (obj.id === action.listId) {
          obj.tasks = [...obj.tasks, action.payload];
        }
        return obj;
      });
      return {
        ...state,
        items: newTask,
      };
    case "SET_TASKS":
      return {
        ...state,
        items: action.payload,
      };
    case "EDIT_TASK":

    default:
      return state;
  }
};
export default tasks;
