import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { IToDoInfo, IToDoItems, IToDoState, toDoState } from "../@core/atom";

import BoardCard from "./BoardCard";
import BoardTitle from "./BoardTitle";

const Wrapper = styled.div`
  width: 300px;
  background-color: ${(props) => props.theme.boardColor};
  border: 3px solid ${(props) => props.theme.lineColor};
  border-radius: 8px;
  overflow: hidden;
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
    outline: 0;
    border-bottom: 3px solid ${(props) => props.theme.lineColor};
    background-color: transparent;
  }
  input::placeholder {
    color: ${(props) => props.theme.inputColor};
  }
`;

const Area = styled.div<IAreaProps>`
  flex-grow: 1;
  padding: 10px 20px 20px;
  background-color: ${(props) => (props.isDraggingOver ? props.theme.boardOverColor : props.isDraggingFromThis ? props.theme.boardDraggingColor : "transparent")};
  transition: background-color 0.3s ease-in-out;
`;

const EmptyText = styled.span`
  display: block;
  padding: 14px;
  font-size: 14px;
  text-align: center;
  color: ${(props) => props.theme.inputColor};
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IBoardProps {
  boardInfo: IToDoInfo;
  boardItems: IToDoItems[];
}

interface IFormTask {
  toDo: string;
}

function Board({ boardInfo, boardItems }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);

  const { register, setValue, handleSubmit } = useForm<IFormTask>();

  const onValid = ({ toDo }: IFormTask) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };

    setToDos((allBoards: IToDoState) => {
      return allBoards.map((data) => {
        if (data.info.title === boardInfo.title) {
          const temp = [...data.items];
          temp.push(newToDo);
          return { ...data, items: temp };
        }
        return data;
      });
    });

    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <BoardTitle title={boardInfo.title} />
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo", { required: true })} type="text" placeholder={`Add task on ${boardInfo.title}`} />
      </Form>
      <Droppable droppableId={boardInfo.title} type="card">
        {(provided, snapshot) => (
          <Area ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver} isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} {...provided.droppableProps}>
            {/* {Empty} */}
            {!boardItems.length && <EmptyText>Complete:&#41;</EmptyText>}
            {/* {List} */}
            {boardItems.map((toDo, index) => (
              <BoardCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
