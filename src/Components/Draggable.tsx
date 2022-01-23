import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{ isDragging: boolean }>`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => (props.isDragging ? 'tomato' : props.theme.cardColor)};
    box-shadow: ${(props) =>
        props.isDragging ? 'rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px' : 'none'};
`;

interface ICard {
    items: string;
    idx: number;
}

function DraggableCard({ items, idx }: ICard) {
    return (
        <Draggable draggableId={items} index={idx}>
            {(provided, snapshot) => (
                <Card
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                >
                    {items}
                </Card>
            )}
        </Draggable>
    );
}

export default React.memo(DraggableCard);
