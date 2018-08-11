import * as React from 'react';
// import PropTypes from 'prop-types';

import Hours from './hours';
import Days from './days';
import Months from './months';
import Years from './years';


import style from './dateTimePicker.less';

const moment = require('moment');

/*
* showTime: true|false
* defaultOnDisplay: number; 1-days, 2-months, 3-years
* date: timestamp
*
* */


interface ReactDateTimePickerProps {
    showTime?: boolean;
    defaultOnDisplay?: number;
    date?: number;
    language?: string;
    receiveSelectLevel?: number;
    element?: any;
    format?: string;
    closeAutomatic?: boolean;
    minDate?: number;
    maxDate?: number;
    onClickChangeDate?: any;
    onClose?: any;
}

interface ReactDateTimePickerStates {
    isOpen?: boolean;
    currentDisplayLayer: number;
    defaultOnDisplay: number;
    selected: number;
}

export default class ReactDateTimePicker extends React.Component<ReactDateTimePickerProps, ReactDateTimePickerStates> {
    private wrapperRef: any;
    constructor(props: ReactDateTimePickerProps) {
        super(props);

        moment.locale(this.props.language || 'en');
        this.state = {
            isOpen: false,
            currentDisplayLayer: 1,
            defaultOnDisplay: 1,
            selected: this.props.date
        };

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        this.setState({
            currentDisplayLayer: this.props.defaultOnDisplay || 1,
            selected: this.props.date
        });
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    setWrapperRef(node: any) {
        this.wrapperRef = node;
    }

    handleClickOutside(event: any) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({isOpen: false});
            document.removeEventListener('click', this.handleClickOutside);
            this.props.onClose(this.state.selected);
        }
    }

    onClickShow() {
        this.setState({isOpen: true});
        document.addEventListener('click', this.handleClickOutside);
    }
    updateInputOnChange(e: any) {
        // console.log('updateInputOnChange', e);
    }
    checkAndClose (level: number): void {
        if ( this.props.closeAutomatic && this.props.receiveSelectLevel === level) {
            this.props.onClickChangeDate(this.state.selected);
        }
    }
    onGoUpOnClick(nr: number, newDateSelected: number): void {
        if (nr + 1 <= 3) {
            nr = nr + 1;
            this.setState({
                currentDisplayLayer: nr,
                selected: newDateSelected
            }, () => { this.checkAndClose(nr) });
        }
    }
    onGoDownOnClick(nr: number, newDateSelected: number): void {
        if (nr - 1 >= 1) {
            nr = nr - 1;
            this.setState({
                currentDisplayLayer: nr,
                selected: newDateSelected
            }, () => { this.checkAndClose(nr) });
        } else {
            this.setState({
                selected: newDateSelected
            }, () => { this.checkAndClose(nr) });
        }
    }

    render() {
        const value = this.state.selected || new Date().getTime();
        const complexClass = this.state.isOpen
            ? `${style['dateTimePicker-container']} ${style['show']}`
            : style['dateTimePicker-container'];

        return (
            <div>
                {this.props.element && this.props.element === 'div' &&
                    <div onClick={this.onClickShow.bind(this)}>
                        {moment(value).format(this.props.format)}
                        </div>}
                {this.props.element && this.props.element === 'span' &&
                    <span onClick={this.onClickShow.bind(this)}>
                        {moment(value).format(this.props.format)}
                        </span>}
                {this.props.element && this.props.element === 'input' &&
                    <input onClick={this.onClickShow.bind(this)}
                           type='text'
                           onChange={this.updateInputOnChange.bind(this)}
                           value={moment(value).format(this.props.format)} />}

                <div className={complexClass} ref={this.setWrapperRef}>
                    <div className={style['dateTimePicker-modal-back']}>
                    {this.props.showTime &&
                        <Hours language={this.props.language} isToShow={this.state.isOpen} />}
                    {this.state.isOpen &&
                        <div>
                            <Days defaultOnDisplay={this.state.currentDisplayLayer}
                                  currentDisplayLayer={this.state.currentDisplayLayer}
                                  language={this.props.language}
                                  date={this.state.selected || this.props.date}
                                  minDate={this.props.minDate}
                                  maxDate={this.props.maxDate}
                                  goUpOnClick={this.onGoUpOnClick.bind(this)}
                                  goDownOnClick={this.onGoDownOnClick.bind(this)} />

                            <Months defaultOnDisplay={this.state.currentDisplayLayer}
                                    currentDisplayLayer={this.state.currentDisplayLayer}
                                    language={this.props.language}
                                    minDate={this.props.minDate}
                                    maxDate={this.props.maxDate}
                                    date={this.state.selected || this.props.date}
                                    goUpOnClick={this.onGoUpOnClick.bind(this)}
                                    goDownOnClick={this.onGoDownOnClick.bind(this)} />

                            <Years defaultOnDisplay={this.state.currentDisplayLayer}
                                   currentDisplayLayer={this.state.currentDisplayLayer}
                                   language={this.props.language}
                                   date={this.state.selected || this.props.date}
                                   minDate={this.props.minDate}
                                   maxDate={this.props.maxDate}
                                   goUpOnClick={this.onGoUpOnClick.bind(this)}
                                   goDownOnClick={this.onGoDownOnClick.bind(this)} />
                        </div>
                    }
                </div>
                </div>
            </div>)
    }
}
