import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { ITodo, toDoState, IToDoState } from "../atom";

const Wrapper = styled.div`
  flex: 0 0 auto;
  width: 300px;
  background-color: ${(props) => props.theme.boardColor};
  border: 3px solid ${(props) => props.theme.lineColor};
  border-radius: 8px;
  overflow: hidden;
  & + & {
    margin-left: 16px;
  }
`;

const Title = styled.h2`
  padding: 16px 20px;
  font-size: 18px;
  font-weight: 600;
  background-color: ${(props) => props.theme.titleColor};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Form = styled.form`
  width: 100%;
  padding: 16px 20px 10px 20px;
  input {
    width: 100%;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    border: none;
    border-bottom: 3px solid ${(props) => props.theme.lineColor};
    background-color: transparent;
    &:focus {
      outline: 0;
    }
  }
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) => (props.isDraggingOver ? props.theme.boardOverColor : props.isDraggingFromThis ? props.theme.boardDraggingColor : "transparent")};
  flex-grow: 1;
  padding: 10px 20px 20px;
  transition: background-color 0.3s ease-in-out;
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards: IToDoState) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo", { required: true })} type="text" placeholder={`Add task on ${boardId}`} />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver} isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} {...provided.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
