import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { toDoState } from "../atom";
import { ReactComponent as IconEdit } from "../assets/images/icon_edit.svg";
import { ReactComponent as IconXmark } from "../assets/images/icon_xmark.svg";
import { ReactComponent as IconDelete } from "../assets/images/icon_delete.svg";

const Card = styled.div<{ isDragging: boolean; isEdit: boolean }>`
  position: relative;
  display: flex;
  padding: 12px ${(props) => (props.isEdit ? "40px" : "70px")} 10px 12px;
  background-color: ${(props) => (props.isDragging ? "#e4f2ff" : props.isEdit ? props.theme.boardColor : props.theme.cardColor)};
  border: 2px solid ${(props) => (props.isEdit ? props.theme.cardColor : props.theme.boardColor)};
  border-radius: 6px;
  span,
  input {
    font-size: 14px;
    line-height: 18px;
    color: ${(props) => (props.isEdit ? props.theme.cardColor : props.theme.boardColor)};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

interface IFormEdit {
  newText: string;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggableCardProps) {
  const [toDos, setToDos] = useRecoilState(toDoState);
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
        <>
          {isEdit && (
            <>
              <Card ref={provided.innerRef} isDragging={snapshot.isDragging} isEdit={isEdit} {...provided.dragHandleProps} {...provided.draggableProps}>
                <Form onSubmit={handleSubmit(onValid)}>
                  <input {...register("newText", { required: true })} type="text" />
                </Form>
                <Util>
                  <button type="reset" onClick={onCancel}>
                    <IconXmark width="15" height="18" fill="#1E272E" role="img" aria-labelledby="edit" />
                  </button>
                </Util>
              </Card>
            </>
          )}
          {!isEdit && (
            <>
              <Card ref={provided.innerRef} isDragging={snapshot.isDragging} isEdit={isEdit} {...provided.dragHandleProps} {...provided.draggableProps}>
                <span>{toDoText}</span>
                <Util>
                  <button type="button" onClick={onEdit}>
                    <IconEdit width="15" height="18" fill="#FFFFFF" role="img" aria-labelledby="edit" />
                  </button>
                  <button type="button" onClick={onDelete}>
                    <IconDelete width="15" height="18" fill="#FFFFFF" role="img" aria-labelledby="delete" />
                  </button>
                </Util>
              </Card>
            </>
          )}
        </>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
