import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { toDoState } from "../@core/atom";

import { ReactComponent as IconEdit } from "../assets/images/icon_edit.svg";
import { ReactComponent as IconXmark } from "../assets/images/icon_xmark.svg";
import { ReactComponent as IconDelete } from "../assets/images/icon_delete.svg";

const Card = styled.div<{ isDragging: boolean; isEdit: boolean }>`
  position: relative;
  display: flex;
  padding: 12px ${(props) => (props.isEdit ? "40px" : "70px")} 10px 12px;
  background-color: ${(props) => (props.isEdit ? props.theme.boardColor : props.theme.cardColor)};
  border: 2px solid ${(props) => (props.isEdit ? props.theme.cardColor : props.theme.boardColor)};
  border-radius: 6px;
  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
  span,
  input {
    font-size: 14px;
    line-height: 18px;
    color: ${(props) => (props.isEdit ? props.theme.cardColor : props.theme.boardColor)};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  svg {
    fill: ${(props) => (props.isEdit ? props.theme.cardColor : props.theme.boardColor)};
  }
  & + & {
    margin-top: 8px;
  }
`;

const Util = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  button {
    padding: 5px;
    background: none;
    border: none;
    cursor: pointer;
  }
  svg {
    display: block;
  }
`;

const Form = styled.form`
  flex-grow: 1;
  input {
    width: 100%;
    padding: 0;
    border: none;
    outline: 0;
    background: none;
  }
`;

interface IBoardCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

interface IFormEdit {
  newText: string;
}

function BoardCard({ toDoId, toDoText, index }: IBoardCardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const [isEdit, setIsEdit] = useState(false);

  const { register, setValue, setFocus, handleSubmit } = useForm<IFormEdit>();

  const onEdit = () => {
    setIsEdit(true);
  };

  const onCancel = () => {
    setIsEdit(false);
  };

  const onDelete = () => {
    console.log("onDelete");
    setToDos((allBoards) => {
      return allBoards.map((data) => {
        if (data.items.length - 1 >= index && data.items[index].id === toDoId) {
          const temp = [...data.items];
          temp.splice(index, 1);
          return { ...data, items: temp };
        }
        return data;
      });
    });
  };

  const onValid = ({ newText }: IFormEdit) => {
    setToDos((allBoards) => {
      return allBoards.map((data) => {
        if (data.items.length - 1 >= index && data.items[index].id === toDoId) {
          const temp = [...data.items];
          const task = { ...temp[index], text: newText };
          temp.splice(index, 1);
          temp.splice(index, 0, task);
          return { ...data, items: temp };
        }
        return data;
      });
    });
    setIsEdit(false);
  };

  useEffect(() => {
    if (isEdit) {
      setValue("newText", toDoText);
      setFocus("newText");
    } else {
      setValue("newText", "");
    }
  }, [isEdit]);

  return (
    <Draggable key={toDoId} draggableId={toDoId.toString()} index={index}>
      {(provided, snapshot) => (
        <Card ref={provided.innerRef} isEdit={isEdit} isDragging={snapshot.isDragging} {...provided.dragHandleProps} {...provided.draggableProps}>
          {/* {isEdit} */}
          {isEdit && (
            <>
              <Form onSubmit={handleSubmit(onValid)}>
                <input {...register("newText", { required: true })} type="text" />
              </Form>
              <Util>
                <button type="reset" onClick={onCancel}>
                  <IconXmark width="15" height="18" role="img" aria-labelledby="edit" />
                </button>
              </Util>
            </>
          )}
          {/* {!isEdit} */}
          {!isEdit && (
            <>
              <span>{toDoText}</span>
              <Util>
                <button type="button" onClick={onEdit}>
                  <IconEdit width="15" height="18" role="img" aria-labelledby="edit" />
                </button>
                <button type="button" onClick={onDelete}>
                  <IconDelete width="15" height="18" role="img" aria-labelledby="delete" />
                </button>
              </Util>
            </>
          )}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(BoardCard);
