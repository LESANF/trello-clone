import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import DraggableCard from './Draggable';
import styled from 'styled-components';
import { IToDo, toDoState } from '../atoms';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { v4 as uuid } from 'uuid';
import CardZone from './CardZone';

const Wrapper = styled.div`
    display: flex;
    width: 300px;
    box-sizing: border-box;
    margin: 20px;
    padding-top: 10px;
    /* background-color: ${(props) => props.theme.boardColor}; */
    background-color: blue;
    border-radius: 5px;
    min-height: 300px;
    overflow: hidden;
    flex-direction: column;
`;

interface IArea {
    // isDraggingOver: boolean;
    // draggingFromThisWith: boolean;
}

/* background-color: ${(props) =>
        props.isDraggingOver ? '#dfe6e9' : props.draggingFromThisWith ? '#b2bec3' : 'transparent'}; */

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`;

const Form = styled.form`
    input {
        width: 100%;
    }
`;

interface IBoard {
    testAry: IToDo[];
    boardId: string;
    idx: number;
}

interface IForm {
    toDo: string;
}

function Board({ testAry, boardId, idx }: IBoard) {
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const setToDo = useSetRecoilState(toDoState);
    const onValid = ({ toDo }: IForm) => {
        setToDo((prevToDos) => {
            const newToDo = { id: uuid(), text: toDo };
            return { ...prevToDos, [boardId]: [newToDo, ...prevToDos[boardId]] };
        });
        setValue('toDo', '');
    };
    return (
        <Draggable draggableId={boardId} index={idx}>
            {(provided) => (
                <Wrapper ref={provided.innerRef} {...provided.draggableProps}>
                    <Title {...provided.dragHandleProps}>{boardId}</Title>

                    <Form onSubmit={handleSubmit(onValid)}>
                        <input {...register('toDo', { required: true })} />
                    </Form>
                    <CardZone testAry={testAry} />
                </Wrapper>
            )}
        </Draggable>
    );
}

export default React.memo(Board);
