import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { toDoState } from './atoms';
import Board from './Components/Board';

const Wrapper = styled.div`
    display: flex;
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Boards = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
`;

function App() {
    const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
        if (destination?.droppableId === source.droppableId) {
            setTestAry((prevAry) => {
                const oldIdx = source.index;
                const newIdx = destination.index;
                const cpAry = [...prevAry[source.droppableId]];
                cpAry.splice(oldIdx, 1);
                cpAry.splice(newIdx, 0, draggableId);

                return { ...prevAry, [destination.droppableId]: cpAry };
            });
        }
    };

    const [testAry, setTestAry] = useRecoilState(toDoState);

    return (
        <Wrapper>
            <Boards>
                <DragDropContext onDragEnd={onDragEnd}>
                    {Object.keys(testAry).map((board) => {
                        return <Board key={board} testAry={testAry[board]} boardId={board} />;
                    })}
                </DragDropContext>
            </Boards>
        </Wrapper>
    );
}

export default App;
