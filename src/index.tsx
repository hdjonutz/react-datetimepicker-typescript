import './utils/polyfills.ts';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactDateTimePicker from './components/dateTimePicker';

function onClickChangeDate(e: any) {
    console.log('onClickChangeDate', e);
}
function onCloseCallback(e: any) {
    console.log('onCloseCallback', e);
}
ReactDOM.render(
    <div>
            1
        <ReactDateTimePicker language={'de'}
                             showTime={true}
                             defaultOnDisplay={1}
                             receiveSelectLevel={1}
                             format={'LL'}
                             minDate={1521828754705}
                             maxDate={1539969110225}
                             element={'input'}
                             onClickChangeDate={onClickChangeDate}
                             onClose={onCloseCallback} />
        <br/>
            2
        <ReactDateTimePicker language={'de'}
                             showTime={true}
                             defaultOnDisplay={2}
                             receiveSelectLevel={2}
                             date={1532170459658}
                             format={'LL'}
                             minDate={1521828754705}
                             maxDate={1539969110225}
                             element={'span'}
                             onClickChangeDate={onClickChangeDate}
                             onClose={onCloseCallback} />
        <br/>
            3
        <ReactDateTimePicker language={'de'}
                             showTime={true}
                             defaultOnDisplay={3}
                             receiveSelectLevel={3}
                             date={1469720797161}
                             minDate={1438109234438}
                             maxDate={1595961799111}
                             format={'YYYY'}
                             element={'div'}
                             onClickChangeDate={onClickChangeDate}
                             onClose={onCloseCallback} />
        <br/>
            4
        <ReactDateTimePicker language={'de'}
                             showTime={false}
                             defaultOnDisplay={3}
                             receiveSelectLevel={3}
                             format={'LL'}
                             element={'input'}
                             minDate={1438109234438}
                             maxDate={1595961799111}
                             date={1500634459658}
                             onClickChangeDate={onClickChangeDate}
                             onClose={onCloseCallback} />
        4
    </div>,
    document.getElementById('root_React_date_time_picker'));
