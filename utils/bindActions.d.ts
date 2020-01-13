import Store from "../interfaces/Store";
import { Action } from "../types";
export default function bindActions<S, T extends {
    [key: string]: Action<S>;
}>(actions: ((store: Store<S>, ownProps: any) => T) | T, store: Store<S>, ownProps?: object): {
    [K in keyof T]: (...args: any[]) => Promise<void> | void;
};
