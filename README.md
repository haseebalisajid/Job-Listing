This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Job Listing - React.js App

- Test [Live][jobFinderHost] Demo!
<br>

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

<img style="padding:8px" src="https://user-images.githubusercontent.com/43790152/97117320-b9e53580-1724-11eb-915d-6c65a841a142.JPG" width=400 height=400>
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

<script src="https://gist.github.com/haseebalisajid/6527b33e191b2e7f9cc21b5e075ad386.js"></script>

- `useEffect()` Hook
  
The idea to implement `useEffect` hook is to execute code that needs happens during lifecycle of the component instead of on specific user interactions or `DOM` events.

<script src="https://gist.github.com/haseebalisajid/48d0147ffa32ec3bb84250888bc199b1.js"></script>

## Setup a Firebase config & .ENV file

-`Config.js`
- We are accessing the credentials via `.ENV` file.

<script src="https://gist.github.com/haseebalisajid/becb074033a89ca9bc7a19c2a7b48b04.js"></script>

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
<img alt="GIF" src="https://user-images.githubusercontent.com/32738765/97119526-a50f9e80-1732-11eb-82e0-6bde96832231.gif">
</p>

<br>

<p style="text-align:center; font-style: italic">Post a Job Form</p>

#### Pre-requisites
*Setup your App with Cloud Firestore by following the official [Documentation][firestore_docs]*

### Steps:    
*Steps are being done in `View Job Model` component*
- Declaring an `Object`

<script src="https://gist.github.com/haseebalisajid/0d33ec737139f484f0946313732f460d.js"></script>

- Initalizing the State

<script src="https://gist.github.com/haseebalisajid/4736fc506648a21d679cbea272bd81d5.js"></script>

- Handling the change in **Forms**

<script src="https://gist.github.com/haseebalisajid/37ad7baa6d0c0988caa9a9fda84faadf.js"></script>

- Adding or Removing **Skills**

<script src="https://gist.github.com/haseebalisajid/ff31ebac70094667a7c2996724a0183b.js"></script>

- Handling the change on `Submit`

<script src="https://gist.github.com/haseebalisajid/7cba9a1f74ae9185bc2505117012ef4a.js"></script>

`closeModal()` is actually:

<script src="https://gist.github.com/haseebalisajid/b6db60909a4f00cb71ccb80bfce71660.js"></script>

Passing the function from `main` component as a `prop` in which we use the state `openModal` for opening or closing the modal.
```
    closeJobModal = {( ) => setOpenModal(false)}
```
- `Post a Job`: Loader Working

On submission of `Forms` this is how the **Loader** works in the `Post a Job` Button `onClick:`

<script src="https://gist.github.com/haseebalisajid/858946e7ee0d10a6a7364aea42f5fabd.js"></script>

*Now, we have all the data which is perfectly ready to be uploaded on **Firebase***

- Function for sending the data to **Firebase** (in `main` component `App.js`)

<script src="https://gist.github.com/haseebalisajid/8af80fd5991345a520efdc820b83422d.js"></script>

## Retrieving Data from Firestore

<h2 style="text-align:center; font-size: 36px; font-weight: 500">Getting Jobs from Firestore</h2>

<p style="text-align:center">
<img src="https://user-images.githubusercontent.com/43790152/97116170-3ecc5100-171d-11eb-8a56-e8f026cac264.JPG" heigth=600 width=800>
</p>

<p style="text-align:center; font-style: italic">Getting data from Firestore and showing in the cards</p>

<br>

- Function that will do the actual job of fetching the data from `cloud_firestore`

<script src="https://gist.github.com/haseebalisajid/fd38ffa0c22f2f5cb8829c79968fd266.js"></script>

- Designing the Job Cards

<script src="https://gist.github.com/haseebalisajid/3f47fa22f0fbfc8bb9c3afc65db71190.js"></script>

- Rendering Job Card component in `main` component `App.js`

<script src="https://gist.github.com/haseebalisajid/2325a981336b923969a7115d335634f5.js"></script>

## Filteration Feature
<h2 style="text-align:center; font-size: 36px; font-weight: 500">Filteration</h2>

<p style="text-align:center">
<img alt="GIF" src="https://user-images.githubusercontent.com/32738765/97119755-1439c280-1734-11eb-9f8b-3c895fc21aeb.gif">
</p>

<p style="text-align:center; font-style: italic">Applying Filter to various Jobs</p>

<br>

- Function for Filtering the data (jobs) from Firestore

<script src="https://gist.github.com/haseebalisajid/64d8e3d07de3bb3681ed78ac59814fd5.js"></script>

- Rendering the Filtered Job Cards

<script src="https://gist.github.com/haseebalisajid/88cc62488dd0e4e1402684bb31c945ab.js"></script>

## Check Job Details
<h2 style="text-align:center; font-size: 36px; font-weight: 500">Job Details</h2>

<p style="text-align:center">
<img alt="GIF" src="https://user-images.githubusercontent.com/32738765/97119772-3d5a5300-1734-11eb-85cd-2d4b43d8f719.gif">
</p>

<p style="text-align:center; font-style: italic">Details of a Job</p>

<br>

- Designing the Job Details Modal

<script src="https://gist.github.com/haseebalisajid/6683ae9b32c9f4eb3fc94ee86c862c30.js"></script>

## Hosting a React.js App via [Netlify][netlify]
Start getting reviews on your projects from experts and your friends and what's the best way other than hosting it live! ⚡

👉 Read the [documentation][netlifyHosting] & Good Luck!

## Setting up your Environmental Variables in Netlify
👉 Read the [documentation][envDoc] here.

## Author

#### Haseeb Ali Sajid
[![LinkedIn Link](https://img.shields.io/badge/Connect-Haseeb_Ali-blue.svg?logo=linkedin&longCache=true&style=social&label=Connect
)](https://www.linkedin.com/in/haseeb-ali-720531149/)

You can also follow my GitHub Profile to stay updated about my latest projects:

[![GitHub Follow](https://img.shields.io/badge/Connect-C_B-blue.svg?logo=Github&longCache=true&style=social&label=Follow)](https://github.com/haseebalisajid)

If you liked the repo then kindly support it by giving it a star ⭐!

Copyright (c) 2020 CB

[hooks]: https://reactjs.org/docs/hooks-intro.html
[nodejs]: https://nodejs.org/en/
[firebase]: https://firebase.google.com/
[firestore_docs]: https://firebase.google.com/docs/firestore/quickstart
[netlify]: https://app.netlify.com/
[netlifyHosting]: https://react.school/deploy-react-app
[envDoc]: https://www.freecodecamp.org/news/what-are-environment-variables-and-how-can-i-use-them-with-gatsby-and-netlify/
[jobFinderHost]: https://findajob.netlify.app/
