import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
	isLoggedIn: boolean;
	token: string | null;
	userData: any | null;
}

interface AuthAction {
	login: () => void;
	logOut: () => void;
	setToken: (value: string) => void;
	updateUser: (value: any) => void;
}

const initialAuthState: AuthState = {
	isLoggedIn: false,
	token: null,
	userData: null,
};


const setFunction = (set: any): AuthState & AuthAction => ({
	...initialAuthState,
	login: () => {
		set((state: AuthState) => ({
			...state,
			isLoggedIn: true,
		}));
	},

	logOut: () => {
		set((state: AuthState) => ({ ...state, ...initialAuthState }));
	},

	setToken: (value: string) => {
		set((state: AuthState) => ({
			...state,
			token: `Bearer ${value}`,
		}));
	},

	updateUser: (value: any) => {
		set((state: AuthState) => ({
			...state,
			userData: value,
		}));
	},

});

const useAuth = create(
	persist<AuthState & AuthAction>(setFunction, {
		name: "sc-auth-storage",
        storage: createJSONStorage(() => localStorage),
	})
);

export default useAuth;