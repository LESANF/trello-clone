import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './Draggable';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 300px;
    padding: 20px 10px;
    padding-top: 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
    min-height: 300px;
`;

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`;
interface IBoard {
    testAry: string[];
    boardId: string;
}

function Board({ testAry, boardId }: IBoard) {
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {testAry.map((items, idx) => (
                            <DraggableCard key={items} items={items} idx={idx} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Wrapper>
    );
}

export default Board;
