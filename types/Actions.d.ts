import Store from "../interfaces/Store";
export declare type Action<S> = (state: S, ...args: any[]) => Partial<S>;
export declare type FuncTypeWithoutFirstArg<T extends (...args: any[]) => any> = T extends (arg1: infer U, ...args: infer V) => infer Q ? (...args: V) => void : any;
export declare type ActionsObject<S> = {
    [action: string]: Action<S>;
};
export declare type Actions<T> = (store: Store<T>) => ActionsObject<T>;
export declare type BoundActions<State, T extends Actions<State>> = {
    [P in keyof ReturnType<T>]: FuncTypeWithoutFirstArg<ReturnType<T>[P]>;
};
