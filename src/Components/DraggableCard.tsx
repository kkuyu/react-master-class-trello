import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  padding: 14px;
  font-size: 14px;
  color: #ffffff;
  background-color: ${(props) => (props.isDragging ? "#e4f2ff" : props.theme.cardColor)};
  border-radius: 4px;
  & + & {
    margin-top: 8px;
  }
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggableCardProps) {
  return (
    <Draggable key={toDoId} draggableId={toDoId.toString()} index={index}>
      {(provided, snapshot) => (
        <Card ref={provided.innerRef} isDragging={snapshot.isDragging} {...provided.dragHandleProps} {...provided.draggableProps}>
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
