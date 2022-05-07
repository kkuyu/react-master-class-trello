import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    boardColor: string;
    boardOverColor: string;
    boardDraggingColor: string;
    cardColor: string;
    lineColor: string;
    titleColor: string;
  }
}
