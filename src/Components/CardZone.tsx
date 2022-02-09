import { Droppable } from 'react-beautiful-dnd';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { toDoState } from '../atoms';
import { IBoard } from './Board';
import DraggableCard from './Draggable';

const Wrapper = styled.div`
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
    padding: 20px;
    background-color: pink;
`;

function CardZone({ boardId, idx }: IBoard) {
    const toDoData = useRecoilValue(toDoState);
    const toDosAry = toDoData[idx][boardId];

    return (
        <Droppable droppableId={boardId} type="todosList">
            {(provided) => (
                <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
                    {toDosAry.map((items, idx) => (
                        <DraggableCard
                            key={items.id}
                            text={items.text}
                            id={items.id}
                            boardId={boardId}
                            idx={idx}
                        />
                    ))}

                    {provided.placeholder}
                </Wrapper>
            )}
        </Droppable>
    );
}

export default CardZone;
