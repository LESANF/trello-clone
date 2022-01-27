import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'toDoState',
    storage: localStorage,
});

export interface IToDo {
    id: string;
    text: string;
}

interface IToDoState {
    [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
    key: 'toDoState',
    default: {
        TO_DO: [],
        DOING: [],
        DONE: [],
    },
    effects_UNSTABLE: [persistAtom],
});
