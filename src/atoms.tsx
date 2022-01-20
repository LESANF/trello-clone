import { atom, selector } from 'recoil';

interface IToDoState {
    [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
    key: 'toDoState',
    default: {
        TO_DO: ['a', 'b', 'c'],
        DOING: ['d', 'e', 'f'],
        DONE: ['g', 'h', 'i'],
    },
});
