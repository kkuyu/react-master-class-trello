import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { IToDoState, toDoState } from "../@core/atom";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 30px 20px;
  h1 {
    font-size: 25px;
    font-weight: 600;
  }
`;

const Form = styled.form`
  margin-left: 20px;
  flex-grow: 1;
  input {
    width: 100%;
    height: 40px;
    padding: 0;
    font-size: 22px;
    line-height: 40px;
    border: none;
    outline: 0;
    border-bottom: 3px solid ${(props) => props.theme.lineColor};
    background: none;
  }
`;

interface IFormCreator {
  newTitle: string;
}

function BoardCreator() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const { register, setValue, handleSubmit } = useForm<IFormCreator>();

  const onValid = ({ newTitle }: IFormCreator) => {
    const isDuplication = toDos.find((data) => data.info.title === newTitle);
    if (isDuplication) return;
    const newBoard = {
      info: { title: newTitle },
      items: [],
    };
    setToDos((allBoards: IToDoState) => {
      return [...allBoards, newBoard];
    });
    setValue("newTitle", "");
  };

  return (
    <Wrapper>
      <h1>Create a new board ☞</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register("newTitle", { required: true })} type="text" />
      </Form>
    </Wrapper>
  );
}

export default BoardCreator;
