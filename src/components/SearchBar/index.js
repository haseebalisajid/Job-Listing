import React, { useState } from 'react';
import {Box,Button,Select,MenuItem,makeStyles,CircularProgress} from "@material-ui/core";

const useStyles=makeStyles({
    wrapper:{
        backgroundColor:"#fff",
        display:"flex",
        boxShadow:"0px 1px 5px rgba(0,0,0,0.1)",
        borderRadius:"5px",
        "& > * ":{
            flex:1,
            height:"45px",
            margin:"8px",
        },
    }
});

export default (props) =>{
    const[loading,setLoading]=useState(false);

    const [jobSearch,setJobSearch]=useState({
        type:"Full Time",
        location:"Remote",
    });

    const handleChange = (e) =>{
        e.persist();
        setJobSearch(oldState =>({
            ...oldState,
            [e.target.name]:e.target.value
        }));
    }

    const search = async ()=>{
        setLoading(true);
        await props.fetchCustomJobs(jobSearch);
        setLoading(false);
    }

    const classes=useStyles();
    return (
        <Box p={2} mt={-5} mb={2} className={classes.wrapper}>
            <Select onChange={handleChange} value={jobSearch.type} name="type" disableUnderline variant="filled" >
                <MenuItem value="Full Time">Full Time</MenuItem>
                <MenuItem value="Part Time">Part Time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
            </Select>
            <Select onChange={handleChange} value={jobSearch.location} name="location" disableUnderline variant="filled" >
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="In-office">In-office</MenuItem>
            </Select>
            <Button 
                variant="contained" 
                color="primary" 
                disabledElevation
                onClick={search}    
            >
                {loading ? (<CircularProgress color="secondary" size={22} />
                    ) : (   
                        "Search"
                    )}
            </Button>
        </Box>
    )
}