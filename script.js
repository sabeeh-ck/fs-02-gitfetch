"use strict";

const theForm = document.querySelector("form");
const userId = document.querySelector("#userId");
let data;

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

function showResult(data) {
    console.log(data);
    const container = document.querySelector("#result");
    const name = document.createElement("p");
    const avatar = document.createElement("img");
    const followers = document.createElement("p");
    const followersLink = document.createElement("a");

    if (data === 0) name.textContent = "Invalid UserId";
    else {
        avatar.src = data.avatar_url;
        avatar.className = "avatar";
        avatar.width = 48;
        name.textContent = data.name;
        followers.textContent = `Followers: ${data.followers}`;
        followersLink.href = "#";
        followersLink.id = "followers_url";
        followersLink.text = "Show Followers";
        followersLink.addEventListener("click", mainFunction);
    }
    container.textContent = "";
    container.append(name, avatar, followers, followersLink);
}

async function mainFunction(event) {
    event.preventDefault();
    console.log(event.currentTarget.id);
    let query;

    if (event.currentTarget.id === "theForm") query = "Details";
    else if (event.currentTarget.id === "followers_url") query = "Followers";

    data = await getData(query);

    showResult(data);
}

theForm.addEventListener("submit", mainFunction);
