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

export interface IToDoMain {
    [key: string]: IToDo[];
}

export interface IToDoState {
    [key: number]: IToDoMain;
}

export const toDoState = atom<IToDoState>({
    key: 'toDoState',
    default: {
        0: { TO_DO: [] },
        1: { DOING: [] },
        2: { DONE: [] },
    },
    effects_UNSTABLE: [persistAtom],
});
