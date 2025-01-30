import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AccessState {
	accessData: any | null;
}

interface AccessAction {
	setAccess: (value: any) => void;
	resetAccess: () => void;
}

const initialAccessState: AccessState = {
	accessData: [],
};

const setFunction = (set: any): AccessState & AccessAction => ({
	...initialAccessState,
	setAccess: (value: any) => {
		set((state: AccessState) => ({
			...state,
			accessData: value,
		}));
	},
	resetAccess: () => {
		set(initialAccessState);
	},
});

const useAccess = create(
	persist<AccessState & AccessAction>(setFunction, {
		name: "sc-access-storage",
		storage: createJSONStorage(() => localStorage),
	})
);

export default useAccess;
