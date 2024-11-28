import { getCookie, setCookie } from "../helpers/cookie";

export const filterReducer = (
  state = JSON.parse(getCookie("filter") || "{}"),
  action
) => {
  const newState = { ...state };
  delete state["sort"];
  delete state["newArrival"];

  switch (action.type) {
    case "ADD":
      Object.keys(action.params).forEach((key) => {
        switch (key) {
          case "sort":
          case "newArrival":
            newState[key] = action.params[key];
            break;
          default:
            newState[key] =
              key in state
                ? newState[key].concat(action.params[key])
                : (newState[key] = action.params[key]);
        }
      });
      setCookie("filter", JSON.stringify(newState));
      return newState;
    case "DELETE":
      Object.keys(action.params).forEach((key) => {
        if (key in state) {
          if (key === "price") {
            newState[key] = newState[key].filter(
              (value) => !value.equals(action.params[key][0])
            );
          }
          action.params[key].forEach((item) => {
            newState[key] = newState[key].filter((value) => value !== item);
          });
        }
      });
      setCookie("filter", JSON.stringify(newState));
      return newState;
    case "RESET":
      setCookie("filter", JSON.stringify({}));
      return {};
    default:
      return state;
  }
};