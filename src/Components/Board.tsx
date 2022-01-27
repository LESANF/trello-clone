import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './Draggable';
import styled from 'styled-components';
import { IToDo, toDoState } from '../atoms';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

const Wrapper = styled.div`
    width: 300px;
    padding-top: 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
    min-height: 300px;
    display: flex;
    overflow: hidden;
    flex-direction: column;
`;

interface IArea {
    isDraggingOver: boolean;
    draggingFromThisWith: boolean;
}

const Area = styled.div<IArea>`
    background-color: ${(props) =>
        props.isDraggingOver ? '#dfe6e9' : props.draggingFromThisWith ? '#b2bec3' : 'transparent'};
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
    padding: 20px;
`;

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
}

interface IForm {
    toDo: string;
}

function Board({ testAry, boardId }: IBoard) {
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const setToDo = useSetRecoilState(toDoState);

    const onValid = ({ toDo }: IForm) => {
        setToDo((prevToDos) => {
            const newToDo = { id: Date.now(), text: toDo };
            return { ...prevToDos, [boardId]: [newToDo, ...prevToDos[boardId]] };
        });
        setValue('toDo', '');
    };
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input {...register('toDo', { required: true })} />
            </Form>
            <Droppable droppableId={boardId}>
                {(provided, snapshot) => (
                    <Area
                        isDraggingOver={snapshot.isDraggingOver}
                        draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {testAry.map((items, idx) => (
                            <DraggableCard key={items.id} text={items.text} id={items.id} idx={idx} />
                        ))}
                        {provided.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    );
}

export default Board;
