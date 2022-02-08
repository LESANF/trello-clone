import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { IoTrash } from 'react-icons/io5';
import { useSetRecoilState } from 'recoil';
import { toDoState } from '../atoms';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 5px;
    background-color: pink;
`;

const Card = styled.div<{ isDragging: boolean }>`
    width: 90%;
    border-radius: 5px;
    padding: 10px 10px;
    background-color: ${(props) => (props.isDragging ? 'tomato' : props.theme.cardColor)};
    box-shadow: ${(props) =>
        props.isDragging ? 'rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px' : 'none'};
`;

const DelBtn = styled.div`
    margin-left: 10px;
    width: 45px;
    height: 45px;
    .trashBtn {
        color: red;
        width: 100%;
        height: 100%;
    }
    cursor: pointer;
`;

export interface ICard {
    text: string;
    id: string;
    idx: number;
    boardId: string;
}

function DraggableCard(info: ICard) {
    const setDel = useSetRecoilState(toDoState);

    // const deleteToDo = () => {
    //     // setDel((prevToDo) => {
    //     //     const cpAry = [...prevToDo[info.boardId]];
    //     //     cpAry.splice(info.idx, 1);
    //     //     return { ...prevToDo, [info.boardId]: cpAry };
    //     // });
    // };

    return (
        <Draggable draggableId={info.id + ''} index={info.idx}>
            {(provided, snapshot) => (
                <Wrapper ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    <Card isDragging={snapshot.isDragging}>{info.text}</Card>
                    <DelBtn>
                        <IoTrash className="trashBtn" />
                    </DelBtn>
                </Wrapper>
            )}
        </Draggable>
    );
}

export default React.memo(DraggableCard);
