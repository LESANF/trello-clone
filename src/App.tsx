import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { toDoState } from './atoms';
import DraggableCard from './Components/Draggable';

const Wrapper = styled.div`
    display: flex;
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Boards = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
    padding: 20px 10px;
    padding-top: 30px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
`;

function App() {
    const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
        if (!destination) return;
        const oldIdx = source.index;
        const newIdx = destination.index;
        setTestAry((prevAry) => {
            const cpAry = [...prevAry];
            cpAry.splice(oldIdx, 1);
            cpAry.splice(newIdx, 0, draggableId);
            return cpAry;
        });
    };

    const [testAry, setTestAry] = useRecoilState(toDoState);

    return (
        <Wrapper>
            <Boards>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="one">
                        {(provided) => (
                            <Board ref={provided.innerRef} {...provided.droppableProps}>
                                {testAry.map((items, idx) => (
                                    <DraggableCard key={items} items={items} idx={idx} />
                                ))}
                                {provided.placeholder}
                            </Board>
                        )}
                    </Droppable>
                </DragDropContext>
            </Boards>
        </Wrapper>
    );
}

export default App;
