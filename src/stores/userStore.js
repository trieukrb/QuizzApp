import {create} from "zustand/react";
const useUserStore = create((set) => ({
    userName: 'Guest',
    setUserName: (newName) => set({userName: newName})
}) )
export default useUserStore