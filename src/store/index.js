import React from "react";
import UserStore from "./user_store";

class RootStore {
    constructor() {
        this.UserStore = new UserStore(this);
    }
}

const StoresContext = React.createContext(new RootStore());
export const useStores = () => React.useContext(StoresContext);

