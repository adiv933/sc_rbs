import { create } from "zustand";

interface LoadingStore {
	isLoading: boolean;
	progress: number;
	startLoading: () => void;
	stopLoading: () => void;
	setProgress: (value: number) => void;
}

const useLoader = create<LoadingStore>((set) => ({
	isLoading: false,
	progress: 0,
	startLoading: () => {
		set((state: LoadingStore) => ({ ...state, isLoading: true, progress: 50 }));
		setTimeout(() => {
			set((state: LoadingStore) => ({
				...state,
				progress: 70,
			}));
		}, 3000);
	},
	stopLoading: () => {
		set((state: LoadingStore) => ({ ...state, progress: 100 }));
		set((state: LoadingStore) => ({ ...state, progress: 100 }));
		setTimeout(() => {
			set((state: LoadingStore) => ({
				...state,
				isLoading: false,
				progress: 0,
			}));
		}, 3000);
	},
	setProgress: (value: number) => {
		set((state: LoadingStore) => ({ ...state, progress: value }));
	},
}));

export default useLoader;
