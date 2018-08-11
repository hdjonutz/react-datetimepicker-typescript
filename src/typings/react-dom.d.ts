import * as ReactDOM from 'react-dom';

declare module 'react-dom' {
    function unstable_deferredUpdates(callback: Function): void;
}
