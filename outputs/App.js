"use strict";
// @flow
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("redux-persist/integration/react");
var react_redux_1 = require("react-redux");
var react_native_1 = require("react-native");
var react_2 = __importStar(require("react"));
// import SplashScreen from 'react-native-splash-screen';
var themes_1 = require("themes");
var containers_1 = require("containers");
var store_1 = require("my-redux/store");
var actions_1 = require("my-redux/actions");
var DevMenuTrigger_1 = __importDefault(require("lib/DevMenuTrigger"));
var NavigationRouter_1 = __importDefault(require("navigation/NavigationRouter"));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.loadAppAsync = function () {
        // SplashScreen.hide();
        store_1.store.dispatch(actions_1.runStartupActions());
    };
    App.prototype.shouldComponentUpdate = function () {
        //never update this component
        return false;
    };
    App.prototype.render = function () {
        return (react_2.default.createElement(react_redux_1.Provider, { store: store_1.store },
            react_2.default.createElement(DevMenuTrigger_1.default, { style: { flex: 1 }, persistor: store_1.persistor },
                react_2.default.createElement(containers_1.OverallModal, null),
                react_2.default.createElement(react_1.PersistGate, { onBeforeLift: this.loadAppAsync, loading: null, persistor: store_1.persistor },
                    react_2.default.createElement(NavigationRouter_1.default, null)),
                react_2.default.createElement(react_native_1.StatusBar, { backgroundColor: themes_1.Colors.statusBar }))));
    };
    return App;
}(react_2.Component));
exports.default = App;
