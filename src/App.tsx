import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
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
        if (!destination) return;
        if (destination.droppableId === source.droppableId) {
            setTestAry((prevAry) => {
                const cpAry = [...prevAry[source.droppableId]];
                const spliceTarget = cpAry.splice(source.index, 1);
                cpAry.splice(destination.index, 0, ...spliceTarget);
                return { ...prevAry, [destination.droppableId]: cpAry };
            });
        }

        if (destination.droppableId !== source.droppableId) {
            setTestAry((prevAry) => {
                const sourceAry = [...prevAry[source.droppableId]];
                const destinationAry = [...prevAry[destination.droppableId]];
                const spliceTarget = sourceAry.splice(source.index, 1);
                destinationAry.splice(destination.index, 0, ...spliceTarget);

                return {
                    ...prevAry,
                    [destination.droppableId]: destinationAry,
                    [source.droppableId]: sourceAry,
                };
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
