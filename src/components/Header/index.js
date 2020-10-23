import React from 'react';
import {Box,Grid,Typography,Button} from '@material-ui/core';

export default props =>
<Box p={10} bgcolor="secondary.main" color="white">
    <Grid container justify="center">
        <Grid item xs={10}>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h4">Open Jobs Listing</Typography>
                <Button onClick={props.openJobModal} variant="contained" disabledElevation color="primary" >Post a Job</Button>
            </Box>
        </Grid>
    </Grid>
</Box>