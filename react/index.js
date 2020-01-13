'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function shallowEqual(a, b) {
    for (var i in a)
        if (a[i] !== b[i])
            return false;
    for (var i in b)
        if (!(i in a))
            return false;
    return true;
}

function propsValidation(props, propName, componentName) {
    if (typeof props === "object") {
        return null;
    }
    return new Error("Invalid prop " + propName + " supplied to " + componentName);
}

function set(store, ret) {
    if (ret != null) {
        if (ret.then)
            return ret.then(store.setState);
        store.setState(ret);
    }
}

function bindAction(action, store) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (typeof store.middleware === "function") {
            return store.middleware(store, action, args);
        }
        return set(store, action.apply(void 0, [store.getState()].concat(args)));
    };
}

function bindActions(actions, store, ownProps) {
    actions = typeof actions === "function" ? actions(store, ownProps) : actions;
    var bound = {};
    for (var name_1 in actions) {
        var action = actions[name_1];
        bound[name_1] = bindAction(action, store);
    }
    return bound;
}

var Connect = /** @class */ (function (_super) {
    __extends(Connect, _super);
    function Connect(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.update = function () {
            var mapped = _this.getProps(_this.props, _this.context);
            if (!shallowEqual(mapped, _this.state)) {
                _this.setState(mapped);
            }
        };
        _this.state = _this.getProps(props, context);
        _this.actions = _this.getActions();
        return _this;
    }
    Connect.prototype.componentWillMount = function () {
        this.unsubscribe = this.context.store.subscribe(this.update);
    };
    Connect.prototype.componentWillUnmount = function () {
        this.unsubscribe(this.update);
    };
    Connect.prototype.componentWillReceiveProps = function (nextProps, nextContext) {
        var mapped = this.getProps(nextProps, nextContext);
        if (!shallowEqual(mapped, this.state)) {
            this.setState(mapped);
        }
    };
    Connect.prototype.getProps = function (props, context) {
        var mapToProps = props.mapToProps;
        var state = (context.store && context.store.getState()) || {};
        return mapToProps ? mapToProps(state, props) : state;
    };
    Connect.prototype.getActions = function () {
        var actions = this.props.actions;
        return bindActions(actions, this.context.store, this.props);
    };
    Connect.prototype.render = function () {
        // @ts-ignore
        return this.props.children(__assign({ store: this.context.store }, this.state, this.actions));
    };
    Connect.contextTypes = {
        store: propsValidation
    };
    return Connect;
}(React.Component));
function connect(mapToProps, actions) {
    if (actions === void 0) { actions = {}; }
    return function (Child) {
        return /** @class */ (function (_super) {
            __extends(ConnectWrapper, _super);
            function ConnectWrapper() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ConnectWrapper.prototype.render = function () {
                var props = this.props;
                return (React.createElement(Connect, __assign({}, props, { mapToProps: mapToProps, actions: actions }), function (mappedProps) { return React.createElement(Child, __assign({}, mappedProps, props)); }));
            };
            return ConnectWrapper;
        }(React.Component));
    };
}

var Context;
if ("createContext" in React) {
    Context = React.createContext(undefined);
}
else {
    Context = {
        Provider: function (_a) {
            var children = _a.children;
            return React.Children.only(children);
        }
    };
}
var Context$1 = Context;

var Provider = /** @class */ (function (_super) {
    __extends(Provider, _super);
    function Provider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Provider.prototype.getChildContext = function () {
        var store = this.props.store;
        return { store: store };
    };
    Provider.prototype.render = function () {
        var _a = this.props, store = _a.store, children = _a.children;
        return React.createElement(Context$1.Provider, { value: store }, children);
    };
    Provider.childContextTypes = {
        store: propsValidation
    };
    return Provider;
}(React.Component));

function useStore() {
    return React.useContext(Context$1);
}

// Heavily inspired by the react-redux implementation
// https://github.com/reduxjs/react-redux/blob/master/src/hooks/useSelector.js
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
function useSelector(selector) {
    var store = useStore();
    var _a = React.useReducer(function (s) { return s + 1; }, 0), forceRerender = _a[1];
    var selectorRef = React.useRef(undefined);
    var selectedStateRef = React.useRef(undefined);
    var onChangeErrorRef = React.useRef(undefined);
    var selectedState;
    try {
        if (selectorRef.current !== selector || onChangeErrorRef.current) {
            selectedState = selector(store.getState());
        }
        else {
            selectedState = selectedStateRef.current;
        }
    }
    catch (err) {
        var errorMessage = "An error occurred while selecting the store state: " + err.message + ".";
        if (onChangeErrorRef.current) {
            errorMessage +=
                "\nThe error may be related with this previous error:\n" + onChangeErrorRef.current.stack + "\n\nOriginal stack trace:";
        }
        throw new Error(errorMessage);
    }
    useIsomorphicLayoutEffect(function () {
        selectorRef.current = selector;
        selectedStateRef.current = selectedState;
        onChangeErrorRef.current = undefined;
    });
    useIsomorphicLayoutEffect(function () {
        var checkForUpdates = function () {
            try {
                var newSelectedState = selectorRef.current(store.getState());
                if (newSelectedState === selectedStateRef.current) {
                    return;
                }
                selectedStateRef.current = newSelectedState;
            }
            catch (err) {
                onChangeErrorRef.current = err;
            }
            forceRerender({});
        };
        var unsubscribe = store.subscribe(checkForUpdates);
        checkForUpdates();
        return function () { return unsubscribe(); };
    }, [store]);
    return selectedState;
}

function useAction(action) {
    var store = useStore();
    return React.useMemo(function () {
        return bindAction(action, store);
    }, [store, action]);
}

exports.connect = connect;
exports.Provider = Provider;
exports.Connect = Connect;
exports.useStore = useStore;
exports.useSelector = useSelector;
exports.useAction = useAction;
