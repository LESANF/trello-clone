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
    display: flex;
    flex-direction: column;
`;

interface IArea {
    isDraggingOver: boolean;
    draggingFromThisWith: boolean;
}

const Area = styled.div<IArea>`
    background-color: ${(props) =>
        props.isDraggingOver ? 'pink' : props.draggingFromThisWith ? 'red' : 'blue'};
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
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
                {(provided, snapshot) => (
                    <Area
                        isDraggingOver={snapshot.isDraggingOver}
                        draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {testAry.map((items, idx) => (
                            <DraggableCard key={items} items={items} idx={idx} />
                        ))}
                        {provided.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    );
}

export default Board;
