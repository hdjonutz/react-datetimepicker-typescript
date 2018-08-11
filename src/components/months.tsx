import * as React from 'react';
import * as utils from '../utils/momentDate';
import DisableElement from './disableElement';
import style from './months.less';

const moment = require('moment');

interface MonthsProps {
    defaultOnDisplay: number;
    currentDisplayLayer: number;
    language: string;
    date?: number;
    minDate: number;
    maxDate: number;
    goUpOnClick(value: number, dateSelected: number): any;
    goDownOnClick(value: number, dateSelected: number): any;
}

interface MonthsState {
    isOnShow: boolean;
    monthsName: Array<string>;
    year: string,
    months: Array<TypeMonths>;
    date: number;
    monthSelected: number;
}
interface TypeMonths {
    month: number;
    status: boolean;    // past now, future
    isToday: boolean;
    isSelected: boolean;
}

export default class Months extends React.Component<MonthsProps, MonthsState> {
    private _moment = moment;
    constructor(props: MonthsProps) {
        super(props);
    }

    componentWillMount() {
        this.refresh();
    }

    componentDidMount() {
        this._moment.locale(this.props.language || 'en');
    }

    componentWillReceiveProps(nexProps: MonthsProps) {
        if (this.state.monthSelected !== nexProps.date ) {
            this.setState({monthSelected: nexProps.date, date: nexProps.date},
            () => this.refresh(nexProps.date));
        }
    }

    onClickMonthSelected(element: any) {
        const selected = +element.target.getAttribute('data-set');
        if (this.props.minDate > selected && selected < this.props.maxDate) {
            return;
        }
        this.refresh(selected);
        this.props.goDownOnClick(2, selected);
    }

    onClickBackYear() {
        const displayNow = moment(this.state.date);
        displayNow.add(-(displayNow.month() + 4), 'M');
        this.setState({date: displayNow.valueOf()},
            () => {
                this.refresh();
            });
    }

    onClickNextYear() {
        const displayNow = moment(this.state.date);
        displayNow.add(12 - displayNow.month(), 'M');
        this.setState({date: displayNow.valueOf()},
            () => {
            this.refresh();
        });
    }

    refresh(selected: number = null) {
        const now = moment(this.state && this.state.date || this.props.date || new Date().getTime());
        selected = selected || this.state && this.state.monthSelected || 0;
        const monthsName = utils.getAllMonthsFomLayoutYearDisplay(now.valueOf(), selected);

        this.setState({
            isOnShow: false,
            year: now.format('YYYY'),
            monthsName,
            date: this.state && this.state.date || this.props.date,
            monthSelected: selected,
        });
    }
    onClickGoUP() {
        this.props.goUpOnClick(2, this.state.monthSelected);
    }

    render() {
        const styleComplex = `${style['months-container']} ${style['line-bottom']}`;
        const toShowThis = this.props.defaultOnDisplay === 2 || this.props.currentDisplayLayer === 2;
        const localStyle = {display: toShowThis ? 'block' : 'none' };
        return (
            <div>
                <div className={styleComplex} style={localStyle}>
                    <div className={style['month-year']} >
                        <div onClick={this.onClickGoUP.bind(this)}>{this.state.year}</div>
                        <div><img src='images/angle-down.svg' onClick={this.onClickBackYear.bind(this)} /></div>
                        <div><img src='images/angle-up.svg' onClick={this.onClickNextYear.bind(this)} /></div>
                    </div>
                    <div className={style['month-name']} >
                        {this.state.monthsName.map( (el: any, idx) =>
                            <div className={ (el.isSelected ? style['month-selected']
                                : !el.status ? style['past-present-disabled']
                                    : (el.isNowMonth ? style['now-year-month-today']
                                        : ''))}

                                 key={'month-' + idx}
                                 data-set ={el.dataStamp}
                                 onClick={this.onClickMonthSelected.bind(this)}
                            >{el.month}
                                {this.props.minDate && el.dataStamp < this.props.minDate && <DisableElement />}
                                {this.props.maxDate && el.dataStamp > this.props.maxDate && <DisableElement />}
                            </div>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}
