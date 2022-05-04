import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="one">
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            <Draggable draggableId="first" index={0}>
              {(provided) => (
                <li ref={provided.innerRef} {...provided.draggableProps}>
                  <span {...provided.dragHandleProps}>🍪</span>
                  <span>One</span>
                </li>
              )}
            </Draggable>
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
