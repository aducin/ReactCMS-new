import React from 'react';
import config from '../config';

export const ConfigContext = React.createContext(config);

export const ConfigContextProvider = (props: any) => {
    return (
        <ConfigContext.Provider value={config}>
            {props.children}
        </ConfigContext.Provider>
    );
};
