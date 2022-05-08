#!/usr/bin/env mode
import chalkAnimation from 'chalk-animation';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';

import {findSolutions} from "./scrape.js";


const aprovedWebsite = [
    "https://stackoverflow.com",
    "https://geeksforgeeks.com",
    "https://w3school.com",
    "https://tutorialspoint.com",
    "https://developer.mozilla.org",
    "https://github.com",
];

let errMsg;

const onlyAproved = async (links) => {
    
};

const displayLinks = async () => {

}

const askErrMsg = async () => {
    const answer = await inquirer.prompt({
        name: 'error_message',
        type: 'input',
        message: 'What is your Error Message?',
    })

    return answer.error_message;
}
const sleep = (ms=2000) => new Promise((r)=>{setTimeout(r,ms)});

const welcome = async () => {
    const rainbow = chalkAnimation.rainbow(
        'Welcome to Quick Error Search \n'
    );
    await sleep();
    rainbow.stop();
}

const start = async () => {
    console.clear();
    await welcome();
    errMsg = await askErrMsg();
    await onlyAproved( await findSolutions(errMsg));
}

start();



