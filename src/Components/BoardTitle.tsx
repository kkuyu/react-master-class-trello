import styled from "styled-components";

import { ReactComponent as IconDelete } from "../assets/images/icon_delete.svg";
import { useRecoilState } from "recoil";
import { toDoState } from "../atom";

const Title = styled.h2`
  position: relative;
  display: flex;
  padding: 16px 50px 14px 20px;
  color: ${(props) => props.theme.lineColor};
  background-color: ${(props) => props.theme.titleColor};
  span {
    font-size: 18px;
    line-height: 20px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Util = styled.div`
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  button {
    padding: 6px;
    background: none;
    border: none;
    cursor: pointer;
  }
  svg {
    display: block;
  }
`;

interface IBoardTitle {
  title: string;
}

function BoardTitle({ title }: IBoardTitle) {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDelete = () => {
    setToDos((allBoards) => {
      return allBoards.filter((data) => data.info.title !== title);
    });
  };

  return (
    <Title>
      <span>{title}</span>
      <Util>
        <button type="button" onClick={onDelete}>
          <IconDelete width="15" height="18" fill="#1E272E" role="img" aria-labelledby="delete" />
        </button>
      </Util>
    </Title>
  );
}

export default BoardTitle;