import * as React from 'react';
import * as utils from '../utils/momentDate';
import DisableElement from './disableElement';
import style from './years.less';

const moment = require('moment');

interface YearsProps {
    defaultOnDisplay: number;
    currentDisplayLayer: number;
    language: string;
    date?: number;
    minDate: number;
    maxDate: number;
    goUpOnClick(value: number,  dateSelected: number): any;
    goDownOnClick(value: number, dateSelected: number): any;
}

interface YearsState {
    isOnShow: boolean;
    yearsbetwin: string,
    yearsName: Array<TypeYears>;
    date: number;
    yearSelected: number;
}
interface TypeYears {
    isNowYear: number,
    year: string|number;
    status: boolean;    // past now, future
    isToday: boolean;
    isSelected: boolean;
}
export default class Years extends React.Component<YearsProps, YearsState> {
    private _moment = moment;
    constructor(props: YearsProps) {
        super(props);
    }

    componentWillMount() {
        this.refresh();
    }

    componentDidMount() {
        this._moment.locale(this.props.language || 'en');
    }

    componentWillReceiveProps(nexProps: YearsProps) {
        if (this.state.yearSelected !== nexProps.date ) {
            this.setState({yearSelected: nexProps.date, date: nexProps.date},
                () => this.refresh(nexProps.date));
        }
    }

    onClickYearSelected(element: any) {
        const selected = +element.target.getAttribute('data-set');
        if (this.props.minDate > selected && selected < this.props.maxDate) {
           return;
        }
        this.refresh(selected);
        this.props.goDownOnClick(3, selected);
    }

    onClickBackYear() {
        const displayNow = moment(this.state.date);
        displayNow.add(-16, 'Y');
        this.setState({date: displayNow.valueOf()},
            () => {
                this.refresh();
            });
    }

    onClickNextYear() {
        const displayNow = moment(this.state.date);
        displayNow.add(16, 'Y');
        this.setState({date: displayNow.valueOf()},
            () => {
                this.refresh();
            });
    }
    onClickGoUP() {
        this.props.goUpOnClick(3, this.state.yearSelected);
    }

    refresh(selected: number = null) {
        const now = moment(this.state && this.state.date || this.props.date || new Date().getTime());
        selected = selected || this.props.date || (this.state && this.state.yearSelected) || 0;
        const yearsName = utils.getAllYearsFomLayoutAllYearDisplay(now.valueOf(), selected);

        this.setState({
            isOnShow: false,
            yearsbetwin: `${yearsName[0].year}-${yearsName[15].year}`,
            yearsName,
            date: this.state && this.state.date || this.props.date,
            yearSelected: selected,
        });
    }

    render() {
        const styleComplex = `${style['years-container']} ${style['line-bottom']}`;
        const toShowThis = this.props.defaultOnDisplay === 3 || this.props.currentDisplayLayer === 3;
        const localStyle = {display: toShowThis ? 'block' : 'none' };
// {toShowThis &&
        return (<div>
                <div className={styleComplex} style={localStyle}>
                    <div className={style.years} >
                        <div onClick={this.onClickGoUP.bind(this)}>{this.state.yearsbetwin}</div>
                        <div><img src='images/angle-down.svg' onClick={this.onClickBackYear.bind(this)} /></div>
                        <div><img src='images/angle-up.svg' onClick={this.onClickNextYear.bind(this)} /></div>
                    </div>
                    <div className={style['year-name']} >
                        {this.state.yearsName.map( (el: any, idx: any) =>
                            <div className={ (el.isSelected ? style['month-selected']
                                : !el.status ? style['past-present-disabled']
                                    : (el.isNowYear ? style['now-year-month-today']
                                        : ''))}

                                 key={'year-' + idx}
                                 data-set ={el.dataStamp}
                                 onClick={this.onClickYearSelected.bind(this)}
                            >{el.year}
                            {this.props.minDate && el.dataStamp < this.props.minDate && <DisableElement />}
                            {this.props.maxDate && el.dataStamp > this.props.maxDate && <DisableElement />}
                            </div>)}
                    </div>
                </div>
            </div>
        )
    }
}
