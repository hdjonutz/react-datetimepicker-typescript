import * as React from 'react';
import style from './hours.less';
const moment = require('moment');

interface HoursProps {
    language?: string;
    isToShow?: boolean;
}
interface HoursStates {
    hour: string;
    day_mounth_year: string;
    countPermision: boolean;
}

export default class Hours extends React.Component<HoursProps, HoursStates> {

    constructor(props: HoursProps) {
        super(props);
        moment.locale(this.props.language || 'en');
        this.state = {
            hour: '',
            day_mounth_year: '',
            countPermision: false
        };
    }

    componentWillReceiveProps(props: HoursProps) {
        if (props.isToShow !== this.state.countPermision) {
            this.setState({countPermision: props.isToShow}, () => {
                this.refresh();
            });
        }
    }

    refresh() {
        if (this.props.isToShow || this.state.countPermision) {
            const now = moment(new Date().getTime());
            const hour = now.format('HH:mm:ss');
            const day_mounth_year = now.format('dddd, LL');
            this.setState({
                hour,
                day_mounth_year,
                countPermision: true
            }, () => {
                window.setTimeout(() => {
                    this.refresh();
                }, 1000);
            });
        }
    }

    render() {
        const styleComplex = `${style['hours-container']} ${style['line-bottom']}`;
        return(
            <div>
            {this.state.countPermision &&
                <div className={styleComplex}>
                    <div className={style['current-hour']} >{this.state.hour}</div>
                    <div className={style['current-day-mounth-year']} >{this.state.day_mounth_year}</div>
                </div>
            }
            </div>
        )
    }
}

