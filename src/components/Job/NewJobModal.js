import React, { useState } from 'react';

import {Box,Grid,FilledInput,IconButton,Typography,Select,MenuItem,Dialog,DialogTitle,DialogContent,Button,DialogActions,makeStyles, CircularProgress} from '@material-ui/core';
import { Close as CloseIcon} from '@material-ui/icons';


const useStyles=makeStyles(theme=>({
    skillChip:{
        margin:theme.spacing(0.5),
        padding:theme.spacing(0.75),
        fontSize:"14.5px",
        borderRadius:"5px",
        cursor:"pointer",
        fontWeight:600,
        border:`1px solid ${theme.palette.secondary.main}`,
        "&:hover":{
            backgroundColor:theme.palette.secondary.main,
            color:"#fff",
        },
    },
    included:{
        backgroundColor:theme.palette.secondary.main,
        color:"#fff",        
    },
}));

const initState={
    title: "",
    type: "Full Time",
    companyName: "",
    companyUrl: "",
    location: "Remote",
    link: "",
    description: "",
    skills: [],
}

export default (props) =>{

    const [loading,setLoading]=useState(false);

    const [jobDetails,setJobDetails]=useState(initState);

    const handleChange = (e) =>{
        e.persist();
        setJobDetails(oldState =>({
            ...oldState,
            [e.target.name]:e.target.value
        }));
    }

    const addRemoveSkill =(skill)=>{
        jobDetails.skills.includes(skill)
        //Removing Skill
        ? setJobDetails(oldState => ({
            ...oldState,
            skills:oldState.skills.filter(s=> s!==skill)
        }))
        //Adding Skill
        :setJobDetails(oldState=>({
            ...oldState,
            skills:oldState.skills.concat(skill)
        }))
    }

    const handleSubmit= async ()=>{
        for(const field in jobDetails){
            if(typeof jobDetails[field] === "string" && !jobDetails[field] ) {
                alert("Fill all the Required Fileds"); 
                return;
            }
        }
        if(!jobDetails.skills.length){
            alert("Fill all the Required Fileds");
            return;
        }
         
        setLoading(true);
        await props.PostJob(jobDetails);
        closeModal();
    }

    const closeModal = () =>{
        setJobDetails(initState);
        setLoading(false);
        props.closeJobModal();
    }

    const classes=useStyles();
    const skills=["React","Node","Firebase","Express","MongoDB","Flutter","Go","Vue"]
    return(
        <Dialog open={props.openModal} fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    Post a Job
                    <IconButton onClick={closeModal}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} autoComplete="off" name="title" value={jobDetails.title} placeholder="Job Title*" disableUnderline fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <Select onChange={handleChange} fullWidth disableUnderline variant="filled" name="type" value={jobDetails.type}>
                            <MenuItem value="Full Time">Full Time</MenuItem>
                            <MenuItem value="Part Time">Part Time</MenuItem>
                            <MenuItem value="Contract">Contract</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} autoComplete="off" placeholder="Comapny Name*" name="companyName" value={jobDetails.companyName} disableUnderline fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} autoComplete="off" placeholder="Company URL*" disableUnderline fullWidth name="companyUrl" value={jobDetails.companyUrl}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Select onChange={handleChange} fullWidth disableUnderline variant="filled"  name="location" value={jobDetails.location}>
                            <MenuItem value="Remote">Remote</MenuItem>
                            <MenuItem value="In-office">In-office</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} autoComplete="off" placeholder="Job Link with https*" disableUnderline fullWidth name="link" value={jobDetails.link}/>
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput onChange={handleChange} autoComplete="off" placeholder="Job Description*" disableUnderline fullWidth multiline rows={4} name="description" value={jobDetails.description}/>
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Typography>Skills*</Typography>
                    <Box display="flex">
                        {skills.map(skill => 
                        <Box 
                            onClick={()=>addRemoveSkill(skill)} 
                            className={`${classes.skillChip} ${jobDetails.skills.includes(skill) && classes.included}`} 
                            key={skill}
                        >
                        {skill}
                        </Box>)}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box color="red" width="100%" display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption">*Required Fields</Typography>
                    <Button 
                        onClick={handleSubmit} 
                        variant="contained" 
                        disableElevation 
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? (<CircularProgress color="secondary" size={22} />
                        ) : (   
                        "Post Job"
                        )}
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}