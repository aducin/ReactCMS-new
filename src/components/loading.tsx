import * as React from 'react';
import config from '../config';

const Loading = () => {
    return (
        <div className="col-xs-12 col-md-8 text-center">
            <p className="text-center"><i>{ config.loading }...</i></p>
        </div>
    );
}

export default Loading;
