import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { IToDoState, toDoState } from './atoms';
import Board from './Components/Board';
import Header from './Components/Header';
import BoardForm from './Components/BoardCreater';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const BoardWrapper = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 50vh;
    flex-wrap: wrap;
    background-color: peru;
`;

const Boards = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    /* flex-wrap: wrap; */
    /* width: calc(350px * 3 + 30px); */
    width: 1200px;
    /* grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px; */
    background-color: aqua;
`;

function App() {
    const onDragEnd = (info: DropResult) => {
        const { destination, source, type, draggableId } = info;
        if (!destination) return;
        if (type === 'board') {
            /*Board Draggable */
            if (destination.index === source.index) return;

            setToDoAry((prevAry) => {
                const cpAry = { ...prevAry };
                const cpAryKeys = Object.keys(cpAry);
                cpAryKeys.splice(source.index, 1);
                cpAryKeys.splice(destination.index, 0, draggableId);

                const returnObj: IToDoState = {};
                cpAryKeys.forEach((key) => {
                    returnObj[key] = prevAry[key];
                });

                return returnObj;
                // if (info.destination) {
                //     const startIdx = info.source.index;
                //     const endIdx = info.destination?.index;

                //     const spliceTarget = cpAryValue.splice(startIdx, 1);
                //     // cpAryValue.splice(endIdx, 0, spliceTarget);
                //     console.log(spliceTarget);
                //     return prevAry;
                // }
            });
        }

        // if (destination.droppableId === source.droppableId) {
        //     setToDoAry((prevAry) => {
        //         const cpAry = [...prevAry[source.droppableId]];
        //         const spliceTarget = cpAry.splice(source.index, 1);
        //         cpAry.splice(destination.index, 0, ...spliceTarget);
        //         return { ...prevAry, [destination.droppableId]: cpAry };
        //     });
        // }

        // if (destination.droppableId !== source.droppableId) {
        //     setToDoAry((prevAry) => {
        //         const sourceAry = [...prevAry[source.droppableId]];
        //         const destinationAry = [...prevAry[destination.droppableId]];
        //         const spliceTarget = sourceAry.splice(source.index, 1);
        //         destinationAry.splice(destination.index, 0, ...spliceTarget);

        //         return {
        //             ...prevAry,
        //             [destination.droppableId]: destinationAry,
        //             [source.droppableId]: sourceAry,
        //         };
        //     });
        // }
    };

    const [toDoAry, setToDoAry] = useRecoilState(toDoState);

    return (
        <>
            <Header />
            <Wrapper>
                <BoardForm />
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="all-boards" direction="horizontal" type="board">
                        {(provided) => (
                            <BoardWrapper>
                                <Boards ref={provided.innerRef} {...provided.droppableProps}>
                                    {Object.keys(toDoAry).map((board, idx) => {
                                        return (
                                            <Board
                                                key={board}
                                                testAry={toDoAry[board]}
                                                boardId={board}
                                                idx={idx}
                                            />
                                        );
                                    })}
                                    {provided.placeholder}
                                </Boards>
                            </BoardWrapper>
                        )}
                    </Droppable>
                </DragDropContext>
            </Wrapper>
        </>
    );
}

export default App;
