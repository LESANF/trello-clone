import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './Draggable';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 20px 10px;
    padding-top: 30px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
`;

interface IBoard {
    testAry: string[];
    boardId: string;
}

function Board({ testAry, boardId }: IBoard) {
    return (
        <Droppable droppableId={boardId}>
            {(provided) => (
                <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
                    {testAry.map((items, idx) => (
                        <DraggableCard key={items} items={items} idx={idx} />
                    ))}
                    {provided.placeholder}
                </Wrapper>
            )}
        </Droppable>
    );
}

export default Board;
