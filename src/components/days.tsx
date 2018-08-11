import * as React from 'react';
import style from './days.less';
import * as utils from '../utils/momentDate';
import DisableElement from './disableElement';

const moment = require('moment');

interface DaysProps {
    defaultOnDisplay: number;
    currentDisplayLayer: number;
    language: string;
    date?: number;
    receiveSelectLevel?: number;
    closeAutomatic?: boolean;
    minDate: number;
    maxDate: number;
    goUpOnClick(value: number,  dateSelected: number): any;
    goDownOnClick(value: number, dateSelected: number): any;
}

interface DaysState {
    isOnShow: boolean;
    yearMount: string;
    daysName: Array<string>;
    days: Array<TypeDays>;
    date: number;
    daySelected: number;
}

interface TypeDays {
    day: number;
    status: boolean;    // past now, future
    isToday: boolean;
    isSelected: boolean;
}

export default class Days extends React.Component<DaysProps, DaysState> {

    constructor(props: DaysProps) {
        super(props);
        moment.locale( this.props.language || 'en');
        this.onClickDaySelected = this.onClickDaySelected.bind(this);
    }

    componentWillMount() {
        this.refresh();
    }
    componentWillReceiveProps(nexProps: DaysProps) {
        if (this.state.daySelected !== nexProps.date ) {
            this.setState({daySelected: nexProps.date, date: nexProps.date},
                () => this.refresh(nexProps.date));
        }
    }
    refresh(selected: number = null) {
        const now = moment(this.state && this.state.date || this.props.date || new Date().getTime());
        const daysName = utils.getNamesDaysOfWeek(now.valueOf());
        selected = selected || this.state && this.state.daySelected || 0;
        const days = utils.getAllDaysFomLayoutMonthDisplay(now.valueOf(), selected);


        this.setState({
            isOnShow: false,
            yearMount: now.format('MMMM YYYY'),
            daysName,
            days,
            date: this.state && this.state.date || this.props.date,
            daySelected: selected
        });
    }

    onClickDaySelected(element: any) {
        const selected = +element.target.getAttribute('data-set');
        if (this.props.minDate > selected && selected < this.props.maxDate) {
            return;
        }
        this.refresh(selected);
        this.props.goDownOnClick(1, selected);
    }
    onClickBackMonth() {
        const displayNow = moment(this.state.date);
        displayNow.add(-42, 'd');
        this.setState({date: displayNow.valueOf()}, () => {
            this.refresh();
        });
    }
    onClickNextMonth() {
        const displayNow = moment(this.state.date);
        displayNow.add(42, 'd');
        this.setState({date: displayNow.valueOf()}, () => {
            this.refresh();
        });
    }
    onClickGoUP() {
        console.log(new Date(this.state.daySelected));
        this.props.goUpOnClick(1, this.state.daySelected);
    }
    render() {
        const styleComplex = `${style['days-container']} ${style['line-bottom']}`;
        const toShowThis = this.props.defaultOnDisplay === 1 || this.props.currentDisplayLayer === 1;
        const localStyle = {display: toShowThis ? 'block' : 'none' };
        return(<div>
                <div className={styleComplex} style={localStyle}>
                    <div className={style['month-year']} >
                        <div onClick={this.onClickGoUP.bind(this)}>{this.state.yearMount}</div>
                        <div><img src='images/angle-down.svg' onClick={this.onClickBackMonth.bind(this)}/></div>
                        <div><img src='images/angle-up.svg' onClick={this.onClickNextMonth.bind(this)}/></div>
                    </div>
                    <div className={style['days-title']} >
                        {this.state.daysName.map( (el) =>
                            <div key={el} >{el}</div>
                        )}
                    </div>
                    <div className={style['days-number']} >
                        {this.state.days.map( (el: any, idx) =>
                            <div className={ (el.isSelected ? style['day-selected']
                                : !el.status ? style['past-present-disabled']
                                    : (el.isToday ? style['now-year-month-today']
                                        : ''))}

                                 key={el.day + '-' + idx}
                                 data-set ={el.dataStamp}
                                 onClick={this.onClickDaySelected.bind(this)}
                            >{el.day}
                            {this.props.minDate && el.dataStamp < this.props.minDate && <DisableElement />}
                            {this.props.maxDate && el.dataStamp > this.props.maxDate && <DisableElement />}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
