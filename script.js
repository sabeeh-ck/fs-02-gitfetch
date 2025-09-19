"use strict";
const theForm = document.querySelector("form");
const userId = document.querySelector("#userId");

const getData = async (userId) => {
    const res = await fetch(`https://api.github.com/users/${userId}`);
    if (res.ok) {
        const obj = await res.json();
        return obj;
    } else {
        console.error("Invalid UserId");
        return 0;
    }
};

const showResult = (data) => {
    console.log(data);
    const container = document.querySelector("#result");
    const newDiv = document.createElement("div");
    newDiv.className = "div";
    if (data === 0) newDiv.innerHTML = `<p> Invalid UserId </p>`;
    else {
        newDiv.innerHTML = `
            <img src="${data.avatar_url}" class="avatar" width="48px"></img>
            <p> Name: ${data.name} </p>
        `;
    }
    container.textContent = "";
    container.append(newDiv);
};

theForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = await getData(userId.value);
    if (data != 0) {
        showResult(data);
    } else showResult(data);
});
