import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import { ReactComponent as IconDelete } from "../assets/images/icon_delete.svg";

const Wrapper = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
`;

const TrashBinButton = styled.span<ITrashBin & { isDraggingOver: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  opacity: ${(props) => (props.isShow ? "1" : "0")};
  border: 3px solid ${(props) => (props.isDraggingOver ? props.theme.errorColor : props.theme.lineColor)};
  border-radius: 50%;
  svg {
    fill: ${(props) => (props.isDraggingOver ? props.theme.errorColor : props.theme.lineColor)};
  }
`;

interface ITrashBin {
  isShow: boolean;
}

function TrashBin({ isShow }: ITrashBin) {
  return (
    <Wrapper>
      <Droppable droppableId="trashBin" type="card">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <TrashBinButton isShow={isShow} isDraggingOver={snapshot.isDraggingOver}>
              <IconDelete width="30" height="30" role="img" aria-labelledby="delete" />
            </TrashBinButton>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default TrashBin;
