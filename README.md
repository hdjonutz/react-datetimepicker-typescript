# react-date-Time-Picker

![alt text](https://github.com/hdjonutz/react-datetimepicker/blob/master/dateTimePicker.png)




### Installation

```sh
$ npm install
```
```sh
http://localhost:3000/
```

```sh
-language:'isNotREQUIED' type:[string] default is 'en':
language={'de'}
```
```sh
-showTime:'isNotREQUIED' type:[boolean] default is 'false':
-display the Time, hours, seconds, mounths years on header. 
showTime={true}
```
```sh
-defaultOnDisplay:'isNotREQUIED' type:[number] default is 1:
-display the default presentation days, months or years:
defaultOnDisplay: 1-days, 2-months, 3-yers  defaultOnDisplay={1} 
```
```sh
-format:'isREQUIED' type:[string]
-datetime format displayed, it`s using the 'moment' format
format={'LL'}
```
```sh
-minDate and maxDate 'isNotREQUIED' type:[timestamp]: the data represented by these limits in the plugin can not be selected.
minDate={1521828754705}
maxDate={1539969110225}
```
```sh
element:'isNotREQUIED' type:['string'] default is 'input':
element={'input'} || element={'div'} || element={'span'} 
```
```sh
onClickChangeDate:'isREQUIED' only for 'input':
onClickChangeDate={'callbackFunction'}
```
```sh
onClose:'isNotREQUIED' will fire 'onClose':
onClose={'callbackFunction'}
```

License
----
MIT
   
```sh 
function onClickChangeDate(e: number) {
    console.log('onClickChangeDate', e);
}
function onCloseCallback(e: number) {
    console.log('onCloseCallback', e);
}
ReactDOM.render(
    <div>
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
    </div>,
    document.getElementById('root_React_date_time_picker'));
```
![alt text](https://github.com/hdjonutz/react-datetimepicker/blob/master/dateTimePickerNoheader.png)
