import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { toDoState } from './atoms';
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
    height: 100vh;
    flex-wrap: wrap;
`;

const Boards = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    /* width: calc(320px * 3 + 30px); */
    width: 1500px;
    /* grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px; */
`;

function App() {
    const onDragEnd = (info: DropResult) => {
        /*Board Draggable */
        let test: any = {};
        setTestAry((prevAry) => {
            let temp = { value: {}, index: 0 };

            // console.log(info);
            const cpObj = { ...prevAry };
            // const cpToDos = [...prevAry[info.draggableId]];
            // delete cpObj[info.draggableId];
            // console.log('cptodos: ', cpToDos);
            const cpObjToAry = Object.entries(cpObj).map(([key, value]) => ({ [key]: value }));

            cpObjToAry.filter((v, index) => {
                const a = Object.keys(v).toString() !== info.draggableId;
                if (a === false) {
                    temp.value = v;
                    temp.index = index;
                }
                return a;
            });

            cpObjToAry.splice(info.source.index, 1);
            if (info.destination) {
                cpObjToAry.splice(info.destination.index, 0, temp.value);
            }

            cpObjToAry.map((v) =>
                Object.entries(v).map(([key, value]) => {
                    console.log(`key: ${key}, value: ${value}`);
                    test[key] = value;
                })
            );

            console.log(test);

            return test;
        });

        // if (!destination) return;
        // if (destination.droppableId === source.droppableId) {
        //     setTestAry((prevAry) => {
        //         const cpAry = [...prevAry[source.droppableId]];
        //         const spliceTarget = cpAry.splice(source.index, 1);
        //         cpAry.splice(destination.index, 0, ...spliceTarget);
        //         return { ...prevAry, [destination.droppableId]: cpAry };
        //     });
        // }

        // if (destination.droppableId !== source.droppableId) {
        //     setTestAry((prevAry) => {
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

    const [testAry, setTestAry] = useRecoilState(toDoState);

    return (
        <>
            <Header />
            <Wrapper>
                <BoardForm />
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="all-boards" direction="horizontal">
                        {(provided) => (
                            <BoardWrapper ref={provided.innerRef} {...provided.droppableProps}>
                                <Boards>
                                    {Object.keys(testAry).map((board, idx) => {
                                        return (
                                            <Board
                                                key={board}
                                                testAry={testAry[board]}
                                                boardId={board}
                                                idx={idx}
                                            />
                                        );
                                    })}
                                </Boards>
                                {provided.placeholder}
                            </BoardWrapper>
                        )}
                    </Droppable>
                </DragDropContext>
            </Wrapper>
        </>
    );
}

export default App;
