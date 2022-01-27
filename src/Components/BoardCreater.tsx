import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { toDoState } from '../atoms';

const Wrapper = styled.form`
    display: flex;
    flex-direction: column;
    height: 100px;
    background-color: blue;
    margin-top: 200px;
    margin-bottom: 50px;
`;

const Title = styled.div``;

const Input = styled.input.attrs({ placeholder: 'Write Board Name' })``;

interface IBoard {
    addBoard: string;
}

function BoardForm() {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<IBoard>();

    const setBoard = useSetRecoilState(toDoState);

    const onValid = ({ addBoard }: IBoard) => {
        setBoard((prevBoard) => {
            return { [addBoard]: [], ...prevBoard };
        });
        setValue('addBoard', '');
    };
    if (errors.addBoard?.message) alert(errors.addBoard?.message);
    return (
        <Wrapper onSubmit={handleSubmit(onValid)}>
            <Title>Add Board</Title>
            <Input
                {...register('addBoard', {
                    required: 'Board Name plz',
                })}
            />
        </Wrapper>
    );
}

export default BoardForm;
