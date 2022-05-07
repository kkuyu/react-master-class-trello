import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: ITodo[];
}

const defaultValue = {
  health: [
    { id: 11, text: "비타민 챙겨먹기" },
    { id: 12, text: "주 2회 운동 나가기" },
  ],
  study: [
    { id: 21, text: "매일 한시간이상 공부하기" },
    { id: 22, text: "스터디 자료 준비하기" },
    { id: 23, text: "카카오톡 질문 답변하기" },
  ],
  housework: [
    { id: 31, text: "바닥 청소하기" },
    { id: 32, text: "재활용품 분리수거하기" },
    { id: 33, text: "빨래방 다녀오기" },
  ],
};

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    ...defaultValue,
  },
  effects: [
    ({ setSelf, onSet }) => {
      const key = "trelloToDos";
      const savedValue = localStorage.getItem(key);
      // init
      if (savedValue) {
        setSelf(JSON.parse(savedValue));
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
      }
      // update
      onSet((newValue, oldValue, isReset) => {
        localStorage.setItem(key, JSON.stringify(newValue));
      });
    },
  ],
});
