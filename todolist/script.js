document.addEventListener('DOMContentLoaded', (event) => {
    const inputBox = document.getElementById('input-box');
    const listContainer = document.getElementById("list-container");

    function addTask() {
        if (inputBox.value === '') {
            alert("You must write something!");
        } else {
            let li = document.createElement("li");
            li.innerHTML = inputBox.value;

            let span = document.createElement("span");
            span.innerHTML = "\u00d7"; // Unicode for '×' symbol
            span.className = 'delete-btn';
            span.addEventListener('click', function() {
                li.remove();
                saveData();
            });

            li.appendChild(span);
            listContainer.appendChild(li);

            li.addEventListener('click', function() {
                li.classList.toggle('checked');
                saveData();
            });

            inputBox.value = '';
            saveData();
        }
    }

    listContainer.addEventListener("click", function(e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            saveData();
        } else if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
            saveData();
        }
    }, false);

    function saveData() {
        localStorage.setItem("data", listContainer.innerHTML);
    }

    function showTask() {
        listContainer.innerHTML = localStorage.getItem("data") || "";
    }

    showTask();

    document.querySelector('button').addEventListener('click', addTask);
});
