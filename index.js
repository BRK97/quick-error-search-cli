#!/usr/bin/env mode
import chalkAnimation from 'chalk-animation';
import inquirer from 'inquirer';
import {createSpinner} from 'nanospinner';
import chalk from 'chalk';

import {findSolutions} from "./scrape.js";

let errMsg;
let aprovedLinks = [];
const aprovedWebsites = [
    "https://stackoverflow.com",
    "https://geeksforgeeks.com",
    "https://w3school.com",
    "https://tutorialspoint.com",
    "https://developer.mozilla.org",
    "https://github.com",
];
const sleep = (ms=2000) => new Promise((r)=>{setTimeout(r,ms)});


const onlyAproved = async (links) => {
    let temp = [];
    for(let i=0; i< links.length; i++) {
        for(let j=0; j< aprovedWebsites.length; j++){
            if(links[i].indexOf(aprovedWebsites[j]) == 0){ temp.push(links[i])}
        }
    }
    temp = [...new Set(temp)]; //removes duplicates
    return temp;

};

const displayLinks = async (aprovedLinks) => {
    if(aprovedLinks.length == 0){
        const spinner = createSpinner('Please wait...').start();
        await sleep();
        spinner.error({text: 'Could not find any solution for your error: ' + '"' + `${errMsg}` +'"'});
    }else{
        const spinner = createSpinner('Please wait...').start();
        await sleep();
        spinner.success({ text: `Found ${aprovedLinks.length} possible solution` });
        for(let i=0; i< aprovedLinks.length; i++){
            console.log("\n" + `${i+1}` + ") " + chalk.blue(aprovedLinks[i]));
        }
    }
}

const askErrMsg = async () => {
    const answer = await inquirer.prompt({
        name: 'error_message',
        type: 'input',
        message: 'What is your Error Message?',
    })

    return answer.error_message;
}

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
    aprovedLinks = await onlyAproved( await findSolutions(errMsg));
    await displayLinks(aprovedLinks);
}

start();



