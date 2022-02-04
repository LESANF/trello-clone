import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { IToDoState } from '../atoms';
import DraggableCard from './Draggable';

const Wrapper = styled.div`
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
    padding: 20px;
    background-color: pink;
`;

function CardZone({ testAry }: IToDoState) {
    return (
        <Droppable droppableId={'todos'} type="todosList">
            {(provided) => (
                <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
                    {testAry.map((items, idx) => (
                        <DraggableCard
                            key={items.id}
                            text={items.text}
                            id={items.id}
                            idx={idx}
                            boardId={'1'}
                        />
                    ))}
                    {provided.placeholder}
                </Wrapper>
            )}
        </Droppable>
    );
}

export default CardZone;
