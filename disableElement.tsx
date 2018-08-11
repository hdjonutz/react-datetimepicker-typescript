import * as React from 'react';
import style from './disableElement.less';

export default class DisableElement extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        const count = [4, 20, 37, 55, 73, 90];
        return(
            <div className={style.disableElement} >
                <svg height={100} width={100}>
                    {
                        count.map((i) =>
                            <line key={i} x1={0} y1={i} x2={100} y2={i} className={style.line}></line>
                        )
                    }
                </svg>
            </div>
        )
    }
}
