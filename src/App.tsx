import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { toDoState } from "./atom";

import Board from "./Components/Board";
import BoardCreator from "./Components/BoardCreator";

const TrelloContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  padding: 0 12px;
  overflow-x: auto;
`;

const TrelloWrapper = styled.div`
  flex: 0 0 auto;
  padding: 0 8px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    // Trello
    const isMovedTrello = draggableId.indexOf("trello") === 0;
    if (isMovedTrello) {
      setToDos((allBoards) => {
        const temp = [...allBoards];
        const task = temp[source.index];
        temp.splice(source.index, 1);
        temp.splice(destination?.index, 0, task);
        return temp;
      });
      return;
    }
    // Board
    setToDos((allBoards) => {
      const task = allBoards.find((data) => data.info.title === source.droppableId)!.items[source.index];
      return allBoards.map((data) => {
        const temp = [...data.items];
        if (data.info.title === source.droppableId) {
          temp.splice(source.index, 1);
        }
        if (data.info.title === destination.droppableId) {
          temp.splice(destination?.index, 0, task);
        }
        return { ...data, items: temp };
      });
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="trello" type="trello" direction="horizontal">
        {(provided, snapshot) => (
          <>
            <BoardCreator />
            <TrelloContainer ref={provided.innerRef} {...provided.droppableProps}>
              {toDos.map((boardData, index) => (
                <Draggable draggableId={`trello${index}`} index={index} key={`trello${index}`}>
                  {(provided) => (
                    <TrelloWrapper ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Board boardInfo={boardData.info} boardItems={boardData.items} key={boardData.info.title} />
                    </TrelloWrapper>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </TrelloContainer>
          </>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
