import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => props.theme.cardColor};
`;

interface ICard {
    items: string;
    idx: number;
}

function DraggableCard({ items, idx }: ICard) {
    return (
        <Draggable draggableId={items} index={idx}>
            {(provided) => (
                <Card ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    {items}
                </Card>
            )}
        </Draggable>
    );
}

export default React.memo(DraggableCard);
