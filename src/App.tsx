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
    width: 1200px;
    height: 360px;
    top: 0;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
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
                const cpAry = [...prevAry];
                const spliceTarget = cpAry.splice(source.index, 1);
                cpAry.splice(destination.index, 0, ...spliceTarget);

                return cpAry;
            });
        }

        if (type === 'todosList') {
            /*ToDoList Draggable */
            // if (destination.index === source.index) return;

            // 같은 보드내에서의 이동
            if (source.droppableId === destination.droppableId) {
                //움직임이 없을 경우
                if (source.index === destination.index) return;

                console.log(`출발: ${source.droppableId}, 순서: ${source.index}`);
                console.log(`도착: ${destination.droppableId}, 순서: ${destination.index}`);

                setToDoAry((prevAry) => {
                    const cpAry = [...prevAry];
                    const currentAry = cpAry.filter(
                        (items) => Object.keys(items).toString() === source.droppableId
                    );

                    const resultAry = [...currentAry[0][source.droppableId]];
                    const spliceTarget = resultAry.splice(source.index, 1);
                    resultAry.splice(destination.index, 0, ...spliceTarget);

                    cpAry.forEach((items, idx) => {
                        if (Object.keys(items).toString() === source.droppableId) {
                            cpAry[idx] = { [source.droppableId]: resultAry };
                        }
                    });

                    return cpAry;
                });
            }

            // setToDoAry((prevAry) => {
            //     const cpAry = [...prevAry];
            //     console.log('prevAry: ', prevAry);
            //     return prevAry;
            // });
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
                                    {toDoAry.map((board, idx) => {
                                        const boardName = Object.keys(board).toString();
                                        return <Board key={boardName} boardId={boardName} idx={idx} />;
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
