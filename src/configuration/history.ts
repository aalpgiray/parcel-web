import { createReduxHistory } from "../store/model/router";
import { store } from "../store";

const history = createReduxHistory(store);

export default history;
