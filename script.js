"use strict";

const theForm = document.querySelector("form");
const userId = document.querySelector("#userId");
let data, data1;

const container = document.querySelector("#result");
const invalid = document.querySelector(".invalid");
const avatar = document.querySelector("#avatar");
const userName = document.querySelector("#name");
const loginId = document.querySelector("#profileId");
const bio = document.querySelector("#bio");
const idLocation = document.querySelector("#location");
const followers = document.querySelector("#followersNo");
const following = document.querySelector("#followingNo");
const repos = document.querySelector("#reposNo");
const joinedDate = document.querySelector("#joinedDate");
const viewProfile = document.querySelector("#viewProfile");

const followersToggle = document.querySelector("#toggle-followers");
const followingToggle = document.querySelector("#toggle-following");
const reposToggle = document.querySelector("#toggle-repos");
const slider = document.querySelector(".slider");

const followersSection = document.querySelector("#section-followers");
const followingSection = document.querySelector("#section-following");
const reposSection = document.querySelector("#section-repos");

const followingTable = document.querySelector("#table-following");
const followersTable = document.querySelector("#table-followers");
const reposTable = document.querySelector("#table-repos");

const getData = async (query) => {
    let link;

    if (!query) link = `https://api.github.com/users/${userId.value}`;
    else if (query === "Following") link = `https://api.github.com/users/${userId.value}/following`;
    else if (query === "Followers") link = `https://api.github.com/users/${userId.value}/followers`;
    else link = `https://api.github.com/users/${userId.value}/repos`;

    try {
        const res = await fetch(link);
        /* if (res.ok) {
            return await res.json();
        } else {
            console.error("Invalid UserId");
            return 0;
        } */
    } catch (err) {
        console.log(err);
    }
};

const showMain = (data) => {
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
        else idLocation.textContent = "Unknown";
        followers.textContent = data.followers;
        following.textContent = data.following;
        repos.textContent = data.public_repos;
        viewProfile.href = data.html_url;

        const date = new Date(data.created_at);

        joinedDate.textContent = date.toLocaleDateString("en-GB", { year: "numeric", month: "short" });

        container.style.display = "grid";
    }
};

const showContent = (data, table) => {
    table.textContent = "";
    const fragment = document.createDocumentFragment();

    if (table === reposTable) {
        for (let i = 0; i < data.length; i++) {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.colSpan = 3;

            const div = document.createElement("div");
            div.classList.add("div-td");

            const name = document.createElement("p");
            name.textContent = data[i].name;
            name.classList.add("repo-name");

            const starCount = document.createElement("p");
            starCount.textContent = `${data[i].stargazers_count} ⭐`;

            const a = document.createElement("a");
            a.href = data[i].html_url;
            a.classList.add("link");
            a.textContent = "View in GItHub";
            a.target = "_blank";

            div.append(name, starCount, a);
            td.append(div);
            tr.append(td);
            fragment.appendChild(tr);
        }
    } else {
        for (let i = 0; i < data.length; i += 3) {
            const tr = document.createElement("tr");
            const item1 = data[i];
            if (item1) {
                const td = document.createElement("td");
                const div = document.createElement("div");
                div.classList.add("div-td");

                const avatar = document.createElement("img");
                avatar.src = item1.avatar_url;
                avatar.width = 56;

                const login = document.createElement("p");
                login.textContent = item1.login;

                const a = document.createElement("a");
                a.href = item1.html_url;
                a.classList.add("link");
                a.textContent = "View Profile";
                a.target = "_blank";

                div.append(avatar, login, a);
                td.append(div);
                tr.append(td);
            }

            const item2 = data[i + 1];
            if (item2) {
                const td = document.createElement("td");
                const div = document.createElement("div");
                div.classList.add("div-td");

                const avatar = document.createElement("img");
                avatar.src = item2.avatar_url;
                avatar.width = 56;

                const login = document.createElement("p");
                login.textContent = item2.login;

                const a = document.createElement("a");
                a.href = item2.html_url;
                a.classList.add("link");
                a.textContent = "View Profile";
                a.target = "_blank";

                div.append(avatar, login, a);
                td.append(div);
                tr.append(td);
            }
            const item3 = data[i + 2];
            if (item3) {
                const td = document.createElement("td");
                const div = document.createElement("div");
                div.classList.add("div-td");

                const avatar = document.createElement("img");
                avatar.src = item3.avatar_url;
                avatar.width = 56;

                const login = document.createElement("p");
                login.textContent = item3.login;

                const a = document.createElement("a");
                a.href = item3.html_url;
                a.classList.add("link");
                a.textContent = "View Profile";
                a.target = "_blank";

                div.append(avatar, login, a);
                td.append(div);
                tr.append(td);
            }
            fragment.appendChild(tr);
        }
    }
    table.appendChild(fragment);
};

async function mainFunction(event) {
    event.preventDefault();

    data = await getData();
    console.log(data);

    showMain(data);

    data = await getData("Following");
    showContent(data, followingTable);

    data = await getData("Followers");
    showContent(data, followersTable);

    data = await getData("Repos");
    console.log(data);
    showContent(data, reposTable);
}

const toggles = [followersToggle, followingToggle, reposToggle];

const sections = [followersSection, followingSection, reposSection];

toggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
        sections.forEach((s) => s.classList.remove("active"));
        if (event.target.id === "toggle-followers") followersSection.classList.add("active");
        else if (event.target.id === "toggle-following") followingSection.classList.add("active");
        else if (event.target.id === "toggle-repos") reposSection.classList.add("active");

        slider.style.left = event.target.offsetLeft + "px";
    });
});

theForm.addEventListener("submit", mainFunction);
