"use strict";

const theForm = document.querySelector("form");
const userId = document.querySelector("#userId");
let data;

const container = document.querySelector("#result");
const invalid = document.querySelector(".invalid");

const avatar = document.querySelector("#avatar");
const userName = document.querySelector("#name");
const loginId = document.querySelector("#profileId");
const bio = document.querySelector("#bio");
const idLocation = document.querySelector("#location");
//  Company
//  Blog/website link
const followers = document.querySelector("#followersNo");
const following = document.querySelector("#followingNo");
const repos = document.querySelector("#reposNo");
const joinedDate = document.querySelector("#joinedDate");
//  Join date
const profileLink = document.querySelector("#profileLink");
//  Optional extras: Most starred repos, top languages used, contribution

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
    if (data === 0) {
        container.style.display = "none";
        invalid.style.display = "block";
    } else {
        invalid.style.display = "none";
        container.style.display = "none";
        avatar.src = data.avatar_url;
        userName.textContent = data.name;
        loginId.textContent = userId.value;
        if (data.bio) bio.textContent = data.bio;
        else bio.textContent = "-- Nil --";
        if (data.location) idLocation.textContent = data.location;
        else idLocation.textContent = "--";
        followers.textContent = data.followers;
        following.textContent = data.following;
        repos.textContent = data.public_repos;
        profileLink.href = data.html_url;
        joinedDate.textContent = data.created_at;

        container.style.display = "grid";
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
