import React, { FunctionComponent } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

interface InfluencingFactorIconProps {
    condition: boolean
}

export const InfluencingFactorIcon: FunctionComponent<InfluencingFactorIconProps> = ({ condition }: InfluencingFactorIconProps) => {

    const useStyles = makeStyles(() => ({
        positiveFactor: {
            color: '#0cc378'
        },
        negativeFactor: {
            color: '#e40e33'
        }
    }));

    const classes = useStyles();
    return (
        <React.Fragment>
        {
            condition
                ? <RemoveIcon className={ classes.negativeFactor } />
                : <AddIcon className={ classes.positiveFactor } />
        }
        </React.Fragment>
    );
}
