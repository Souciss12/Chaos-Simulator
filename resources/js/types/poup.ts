import { PopupType } from "./popupType";

export interface Popup {
    id: number;
    type: PopupType;
    time: number;
    x: number;
    y: number;
}