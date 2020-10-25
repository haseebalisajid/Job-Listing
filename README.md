# Job Listing - React.js App

- Test [Live][jobFinderHost] Demo!

## 📜 Overview

In this tutorial, we will be exploring a **Job Listing App**. Developed with React.js, alongside Firebase and Material UI touch. The key features that we will be exploring:

- Local State Management using [Hooks][hooks]
- Writing/Fetching of data from Firebase
- Saving Credentials using **.ENV**

*_ Hooks are involved in every opeartion that is taking place in the App _*

## 💻 Pre-requisites
- Basics Knowledge about HTML, CSS & JavaScript
- [Node.js][nodejs] must be installed
- Basic Knowledge about [Firebase][firebase]

<br>

<h2 style="text-align:center; font-size: 42px; font-weight: 500">👨‍💻 Job Finding</h2>

<p style="text-align:center">
<img src="https://user-images.githubusercontent.com/43790152/97087217-e411f700-1641-11eb-906d-64e86112e0e9.png"  height=550>
</p>

<p style="text-align:center; font-style: italic">Job Finder :)</p>

<br>

## But wait!
Let's take a peak at our project structure for better understanding
<p style="text-align:center;">
<img style="padding:8px" src="https://user-images.githubusercontent.com/43790152/97117211-0419e700-1724-11eb-8f50-047e3af08ce7.JPG" height=400>

<img style="padding:8px" src="https://user-images.githubusercontent.com/43790152/97117320-b9e53580-1724-11eb-915d-6c65a841a142.JPG" height=400>
</p>
<p style="text-align:center; font-style: italic">Overall Project Structure</p>

# Let's do it..! 👊
## 🎨 UI Intro

UI Components
- Header
  - Post a Job
- Filter Component
- Job Card
  - Job Details

### 👉 Header

Includes the 'Heading' and a Button `Post a Job`.

### 🔍 Filter Component

Filter can be applied based on 2 types:
- Job Type
  - Part-time, Full-time, Contract etc.
- Working Type
  - Remote or Office etc.

### 💳 Job Card

Sub-divided into **Three** parts:
1. Job Title & Company Tag
2. Required Skills
3. Job Details
   - Posted Time
   - Job Type
   -  Working Type
   -  `Check Details` Button

## Why Hooks are Used?

- Hooks are new to React.js `v16.8`
- Let's you use **State** & features like **Lifecycle Methods** without writing a `class`
- Reduce the number of concepts you need to juggle while writing React apps.
- Reduce the constant switching between functions, classes, higher-order components & allows the preference of `functions`.

## Why & How Hooks are used?

## Why!
We are using Hooks to managing the local state of our app, which includes very minimilist features like:
- Managing the state of loader
- State in filtration
- State in Job Details Component etc.

## How!
- `useState()` Hook for *initializing* the *Local State* in `main` component `App.js`

```
  //State to save data of jobs from firebase
  const [jobs,setJobs]=useState([]); 

  //state for the loader data.
  const [loading,setLoading]=useState(true); 

  //State for the custom Search or Filteration
  const [customSearch,setCustomSearch]=useState(false); 

  //State for the Apply for a  Job Modal
  const [openModal,setOpenModal]=useState(false); 
  
   //State for the View Job Modal
  const [viewJob,setViewJob]=useState({});
```
- `useEffect()` Hook
  
The idea to implement `useEffect` hook is to execute code that needs happens during lifecycle of the component instead of on specific user interactions or `DOM` events.

```
useEffect(() => {
    fetchJobs();        // We'll take a look into `fetchJobs()` in few moments
  },[]);
```

## Setup a Firebase config & .ENV file

-`Config.js`
- We are accessing the credentials via `.ENV` file.

```
import app from 'firebase/app';
import 'firebase/firestore';


var firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
  };

  // Initialize Firebase
  const firebase=app.initialize
```
- How we setup `.ENV` file
  - Create an **.env** in the root of your project
  - The structure will be something like this:

<p style="text-align:center">
<img src="https://user-images.githubusercontent.com/43790152/97117518-15fc8980-1726-11eb-89bb-ebda796fcabd.JPG">
</p>

- Your `.gitignore` file must contain `.env`

<p style="text-align:center; font-style: italic">.env file structure</p>

## Posting a Job in Firebase

<h2 style="text-align:center; font-size: 36px; font-weight: 500">Post a Job</h2>

<p style="text-align:center">
<img src="https://user-images.githubusercontent.com/43790152/97087264-54b91380-1642-11eb-87c2-06e2708eaaba.png" height=500>
</p>

<br>

<p style="text-align:center; font-style: italic">Post a Job Form</p>

#### Pre-requisites
*Setup your App with Cloud Firestore by following the official [Documentation][firestore_docs]*

### Steps:    
*Steps are being done in `View Job Model` component*
- Declaring an `Object`
```
const initState = {
    title: "",
    type: "Full Time",
    companyName: "",
    companyUrl: "",
    location: "Remote",
    link: "",
    description: "",
    skills: [],
}
```
- Initalizing the State
```
// State for the Job Details
const [jobDetails,setJobDetails] = useState(initState);

// State for the loader of the data
const [loading,setLoading]=useState(false);
```
- Handling the change in **Forms**
```
    const handleChange = (e) => {
        e.persist();
        setJobDetails(oldState => ({
            ...oldState,
            [e.target.name]:e.target.value
        }));
    }
```
- Handling the change in **Skills** Selection
```
    const addRemoveSkill = (skill) => {
        jobDetails.skills.includes(skill)

        //Removing Skill
        ? setJobDetails(oldState => ({
            ...oldState,
            skills:oldState.skills.filter(s=> s!==skill)
        }))
        
        //Adding Skill
        :setJobDetails(oldState => ({
            ...oldState,
            skills:oldState.skills.concat(skill)
        }))
    }
```
- Handling the change on `Submit`
```
    const handleSubmit = async () => {
        for (const field in jobDetails) {
            if(typeof jobDetails[field] === "string" && !jobDetails[field] ) {
                alert("Fill all the Required Fileds"); 
                return;
            }
        }
        
        if (!jobDetails.skills.length) {
            alert("Fill all the Required Fileds");
            return;
        }
         
        setLoading(true);

        // function for sending all the details to Firebase
        await props.PostJob(jobDetails);
        closeModal();
    }
```
`closeModal()` is actually:
```
    const closeModal = () =>{
        setJobDetails(initState);
        setLoading(false);

        // Function from another component using props
        props.closeJobModal();
    }
```
Passing the function from `main` component as a `prop` in which we use the state `openModal` for opening or closing the modal.
```
    closeJobModal = {( ) => setOpenModal(false)}
```
- `Post a Job`: Loader Working

On submission of `Forms` this is how the **Loader** works in the `Post a Job` Button `onClick:`
```
    <Button 
        onClick = {handleSubmit} 
        variant = "contained" 
        disableElevation 
        color = "primary"
        disabled = {loading}>
        {loading ? (<CircularProgress color="secondary" size={22} />
        ) : (   
        "Post Job"
        )}
    </Button>
```
*Now, we have all the data which is perfectly ready to be uploaded on **Firebase***

- Function for sending the data to **Firebase** (in `main` component `App.js`)

```
const PostJob = async (jobDetails) => {
    await firestore.collection("jobs").add({
      ...jobDetails,
      postedOn:app.firestore.FieldValue.serverTimestamp()
    });
  }
```
## Retrieving Data from Firestore

<h2 style="text-align:center; font-size: 36px; font-weight: 500">Getting Jobs from Firestore</h2>

<p style="text-align:center">
<img src="https://user-images.githubusercontent.com/43790152/97116170-3ecc5100-171d-11eb-8a56-e8f026cac264.JPG" height=500>
</p>

<p style="text-align:center; font-style: italic">Getting data from Firestore and showing in the cards</p>

<br>

- Function that will do the actual job of fetching the data from `cloud_firestore`

```

const fetchJobs = async () => {
    setCustomSearch(false);

    //Setting the state of loader
    setLoading(true);

    const req = await firestore

    //selection the collection from firestore
    .collection('jobs') 

    //Sorting the jobs by posting time
    .orderBy('postedOn','desc')

    //getting the data
    .get();

    //mapping on the retrieved data
    const tempData = req.docs.map((job) => ({ 
      ...job.data(),

      //Adding the id to the data
      id : job.id,

      //setting the posted date
      postedOn:job.data().postedOn.toDate(),
    }));

    //Push all the data to the Jobs Local State
    setJobs(tempData);

    //Setting the loader state to stop it
    setLoading(false);
  }
```

- Designing the Job Cards

```
<Box p={2}  >
    <Grid container mb={2} alignItems="center">

        {/* Grid Item for the Title of job and the Company Name */}
        <Grid item xs>
            <Typography variant="subtitle1">{props.title}</Typography>
            <Typography className={classes.companyName} variant="subtitle1">{props.companyName}</Typography>
        </Grid>

        {/* Grid Item for displaying the Required Skill set for the job */}
        <Grid item container xs>

            {/* Mapping over the skills and show each skill in the skillChip form */}
            {props.skills.map(skill => <Grid className={classes.skillChip}  key={skill}>
                {skill}
            </Grid>)}
        </Grid>
        <Grid item container direction="column" alignItems="flex-end" xs>
            <Grid item>

                {/* Foramt the Posted Date time in (count) Days Ago etc */}
            <typography variant="caption">{formatDistance(Date.now(),props.postedOn)} ago | {props.type} | {props.location}</typography>
            </Grid>
            <Grid item>
                <Box mt={2}>
                    <Button onClick={props.open} variant="outlined">Check</Button> 
                </Box>
            </Grid>
        </Grid>
    </Grid>
</Box>
```
- Rendering Job Card component in `main` component `App.js`

```
<Box>
    <Grid container justify="center">
    <Grid item xs={10}>

        {
        {/* Setting the loader */}
        loading ? (
            <Box display="flex" justifyContent="center">
            <CircularProgress />
            </Box>
        ) : (

            {/* Displaying all the jobs in jobCard */}
            {jobs.map((job)=> (
                <JobCard open={()=>setViewJob(job)} key={job.id} {...job} />  
            ))}     
        )}
    </Grid>
    </Grid>
</Box>
```

## Filteration Feature
<h2 style="text-align:center; font-size: 36px; font-weight: 500">Filteration</h2>

<p style="text-align:center">
<img src="https://user-images.githubusercontent.com/43790152/97087324-aeb9d900-1642-11eb-8516-e459eeaaf2b2.png" height=500>
</p>

<p style="text-align:center; font-style: italic">Applying Filter to various Jobs</p>

<br>

- Function for Filtering the data (jobs) from Firestore

```
const fetchCustomJobs = async (jobSearch) => {

    //Setting the Loader
    setLoading(true);

    //Setting the Custom Search
    setCustomSearch(true);

    //Fetching data from Firestore
    const req = await firestore

    //Selecting the Collection from Firestore
    .collection('jobs')

    //Sorting the Data on posted Time
    .orderBy('postedOn','desc')

    //Filtering the Data

    //comparing the Working Type
    .where("location", "==" ,jobSearch.location)

    //Comparing the Job Type
    .where("type", "==" ,jobSearch.type)

    //Getting the data
    .get();

    //<apping the retrieved data
    const tempData=req.docs.map((job) => ({ 
      ...job.data(),
      id : job.id,
      postedOn:job.data().postedOn.toDate(),
    }));
    
    //Set the Data in local State
    setJobs(tempData);

    //Stop the Loader
    setLoading(false);
  }
```
- Rendering the Filtered Job Cards
```
<Box>
    <Grid container justify="center">
    <Grid item xs={10}>

        {/* passing the Fetching Function  */}
        <SearchBar fetchCustomJobs={fetchCustomJobs} />

        {
        loading ? (

            //Displaying the Loader
            <Box display="flex" justifyContent="center">
            <CircularProgress />
            </Box>
        ) : (
            <>

                {/* adding the Custom Search button after filteration*/}
            {customSearch && (   
                <Box my={2} display="flex" justifyContent="flex-end">
                <Button onClick={fetchJobs}>
                    <CloseIcon size={20} />
                    Custom Search                      
                </Button>
                </Box>
            )}

                {/* Mapping the Jobs */}
            {jobs.map((job)=> (
                <JobCard open={()=>setViewJob(job)} key={job.id} {...job} />  
            ))}     
            </>
        )}
    </Grid>
    </Grid>
</Box>
```

## Check Job Details
<h2 style="text-align:center; font-size: 36px; font-weight: 500">Job Details</h2>

<p style="text-align:center">
<img src="https://user-images.githubusercontent.com/43790152/97087324-aeb9d900-1642-11eb-8516-e459eeaaf2b2.png" height=500>
</p>

<p style="text-align:center; font-style: italic">Details of a Job</p>

<br>

- Designing the Job Details Modal
```
<Dialog 
    {/* passing the jobs data as prop */}

    open={!!Object.keys(props.job).length} 
    fullWidth>
    <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            
            {/* Displaynig the Main heading */}
            {props.job.title} @ {props.job.companyName}

            {/* Setting the Closing button for Modal */}
            <IconButton onClick={props.closeModal}>
                <CloseIcon />
            </IconButton>
        </Box>
    </DialogTitle>
    <DialogContent>
        <Box>
            {/* Displaying all the Details about the job */}

            <Box className={classes.info} display="flex">
                <Typography variant="caption" size={20}>Posted on: </Typography>
                <Typography variant="body2" size={20}>{props.job.postedOn && format(props.job.postedOn,"dd/MM/yyyy HH:MM")}</Typography>
            </Box>
            <Box className={classes.info} display="flex">
                <Typography variant="caption">Job Type: </Typography>
                <Typography variant="body2" size={20}>{props.job.type}</Typography>
            </Box>
            <Box className={classes.info} display="flex">
                <Typography variant="caption">Work Type: </Typography>
                <Typography variant="body2" size={20}>{props.job.location}</Typography>
            </Box>
            <Box className={classes.info} display="flex">
                <Typography variant="caption">Description: </Typography>
                <Typography variant="body2" size={20}>{props.job.description}</Typography>
            </Box>
            <Box className={classes.info} display="flex">
                <Typography variant="caption">Comapny Name: </Typography>
                <Typography variant="body2" size={20}>{props.job.companyName}</Typography>
            </Box>
            <Box className={classes.info} display="flex">
                <Typography variant="caption">Comapny Website : </Typography>
                <Typography variant="body2" size={20}>{props.job.companyUrl}</Typography>
            </Box>
            <Box className={classes.info} >
                <Grid container alignItems="center">

                    {/* Mapping from the Skills */}
                    {props.job.skills && 
                    props.job.skills.map((skill)=>(
                        <Grid item key={skill} className={classes.skillChip}>
                            {skill}
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    </DialogContent>
    <DialogActions>
        <Button 
            className={classes.included}
            variant="outlined" 
            component="a" 
            rel={'external'}
            href={props.job.link} 
            target="_blank">
            Apply
        </Button>
    </DialogActions>
</Dialog>
```
## Hosting a React.js App via [Netlify][netlify]
Start getting reviews on your projects from experts and your friends and what's the best way other than hosting it live! ⚡

👉 Read the [documentation][netlifyHosting] & Good Luck!

## Setting up your Environmental Variables in Netlify
👉 Read the [documentation][envDoc] here.



[hooks]: https://reactjs.org/docs/hooks-intro.html
[nodejs]: https://nodejs.org/en/
[firebase]: https://firebase.google.com/
[firestore_docs]: https://firebase.google.com/docs/firestore/quickstart
[netlify]: https://app.netlify.com/
[netlifyHosting]: https://react.school/deploy-react-app
[envDoc]: https://www.freecodecamp.org/news/what-are-environment-variables-and-how-can-i-use-them-with-gatsby-and-netlify/
[jobFinderHost]: https://findajob.netlify.app/