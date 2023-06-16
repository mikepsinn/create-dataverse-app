import React, {
  Dispatch,
  ReactNode,
  createContext,
  useReducer,
} from "react";

const initialState = {
  address: "",
  pkh: "",
};

interface State {
  address: string;
  pkh: string;
}

interface ContextType {
  state: State;
  dispatch: Dispatch<any>;
}

const updateUser = (state: any, userInfo: any) => ({
  ...state,
  ...{ user: userInfo },
});

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "updateUser":
      return updateUser(state, action.payload);
    default:
      throw new Error();
  }
};

const UserContext = createContext<ContextType>({
  state: initialState,
  dispatch: (dispatch: any) => {},
} as ContextType);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
