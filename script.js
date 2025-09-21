"use strict";

const theForm = document.querySelector("form");
const userId = document.querySelector("#userId");
let data;

const avatar = document.querySelector("#avatar");
const userName = document.querySelector("#name");
const loginId = document.querySelector("#profileId");

const getData = async (query) => {
    let link;

    if (query === "Details") {
        link = `https://api.github.com/users/${userId.value}`;
    } else if (query === "Followers") link = data.followers_url;
    else if (query === "Following") link = data.following_url;

    const res = await fetch(link);
    if (res.ok) {
        const obj = await res.json();
        return obj;
    } else {
        console.error("Invalid UserId");
        return 0;
    }
};

const showResult = (data) => {
    if (data === 0) userName.textContent = "Invalid UserId";
    else {
        avatar.src = data.avatar_url;
        userName.textContent = data.name;
        loginId.textContent = userId.value;
    }
};

async function mainFunction(event) {
    event.preventDefault();
    //    console.log(event.currentTarget.id);
    let query;

    if (event.currentTarget.id === "theForm") query = "Details";
    else if (event.currentTarget.id === "followers") query = "Followers";
    else if (event.currentTarget.id === "following") query = "Following";

    data = await getData(query);

    console.log(data);

    showResult(data);
}

theForm.addEventListener("submit", mainFunction);
