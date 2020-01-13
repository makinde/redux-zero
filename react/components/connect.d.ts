import * as React from "react";
import propValidation from "../../utils/propsValidation";
declare type mapToProps<S> = (state: S, ownProps?: object) => object;
export declare class Connect extends React.Component<any> {
    static contextTypes: {
        store: typeof propValidation;
    };
    unsubscribe: any;
    actions: any;
    constructor(props: any, context: any);
    componentWillMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: any, nextContext: any): void;
    getProps(props: any, context: any): any;
    getActions(): {
        [x: string]: (...args: any[]) => void | Promise<void>;
    };
    update: () => void;
    render(): any;
}
export default function connect<S = any>(mapToProps?: mapToProps<S>, actions?: {}): (Child: any) => {
    new (props: Readonly<any>): {
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<any>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
        forceUpdate(callBack?: () => void): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<any>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: any, context?: any): {
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<any>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
        forceUpdate(callBack?: () => void): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<any>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<{}>, nextContext: any): void;
    };
    contextType?: React.Context<any>;
};
export {};
