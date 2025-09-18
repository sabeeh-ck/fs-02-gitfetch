"use strict";
const theForm = document.querySelector("form");
const userId = document.querySelector("#userId");

const getData = async (userId) => {
    const res = await fetch(`https://api.github.com/users/${userId}`);
    const obj = await res.json();
    return obj;
};

theForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = await getData(userId.value);
    console.log(data);
});
/* 
getData("sabeeh-ck"); */
