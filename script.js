// JavaScript source code


//selectors
const button = document.querySelector(".add");
const list = document.querySelector(".todolist");
const input = document.querySelector(".todo-input");

const filter = document.querySelector(".choose");

//add event listener
button.addEventListener("click", add_item);




//removing  and marking item
list.addEventListener("click", delete_mark);
filter.addEventListener("click", filterTodo);

//load document
document.addEventListener("DOMContentLoaded",gettodoes);

//function to add items to the list
function add_item(event) {

    

    event.preventDefault();

    if (input.value === "")
        return;

    const item_container = document.createElement("div");
    item_container.classList.add("item_container");


    const msg = document.createElement("li");
    msg.classList.add("message");
    msg.innerText = input.value;
    item_container.appendChild(msg);

    //save to local storage
    savelocal(input.value);

    
    const cb = document.createElement("button");
    cb.classList.add("complete_btn");
    cb.innerText = "Complete";
    item_container.appendChild(cb);
    


    const del_btn = document.createElement("button");
    del_btn.classList.add("del_btn");
    del_btn.innerText = "Remove"; 
    item_container.appendChild(del_btn);
    
    

    list.appendChild(item_container);

    input.value = "";
}


//delete_mark function
function delete_mark(e){
    const target = e.target;

    console.log(target.classList);
    //console.log(target.classList[0]);

    if (target.classList[0] === "del_btn") {

        //delete todo from local 
        deletelocal(target.parentElement);
        target.parentElement.remove();

    }


    if (target.classList[0] === "complete_btn") {
          const par = target.parentElement;
            par.classList.toggle("complete");
    }


}




function filterTodo(e) {
   

    const todoes = list.children; 
    //children eliminates text from nodelist


    for (let i = 0; i < todoes.length;i++) {

        switch (e.target.value) {

            case "all":
                todoes[i].style.display = "flex";
                break;

            case "complete":
                if (todoes[i].classList.contains("complete")) {
                    todoes[i].style.display = "flex";
                }
                else {
                    todoes[i].style.display = "none";
                }
                break;


            case "uncomplete":
                if (todoes[i].classList.contains("complete")) {
                    todoes[i].style.display = "none";
                }
                else {
                    todoes[i].style.display = "flex";
                }
                break;
        }



    }

} 


function savelocal(input) {

    let arr;

    if (localStorage.getItem("todoes") === null) {
        arr = [];
    }
    else {
        arr = JSON.parse(localStorage.getItem("todoes"));
    }

    arr.push(input);
    localStorage.setItem("todoes", JSON.stringify(arr));
}


function gettodoes() {

    const arr = JSON.parse(localStorage.getItem("todoes"));

    arr.forEach((todo) => {
        const item_container = document.createElement("div");
        item_container.classList.add("item_container");


        const msg = document.createElement("li");
        msg.classList.add("message");
        msg.innerText = todo;
        item_container.appendChild(msg);


        const cb = document.createElement("button");
        cb.classList.add("complete_btn");
        cb.innerText = "Complete";
        item_container.appendChild(cb);



        const del_btn = document.createElement("button");
        del_btn.classList.add("del_btn");
        del_btn.innerText = "Remove";
        item_container.appendChild(del_btn);

        list.appendChild(item_container);


    });
}

function deletelocal(todo) {

    let arr;
    if (localStorage.getItem("todoes") === null) {
        arr = [];
    }
    else {
        arr = JSON.parse(localStorage.getItem("todoes"));
    }

    let todo_string = todo.children[0].innerText;
    arr.splice(arr.indexOf(todo_string), 1);
    localStorage.setItem("todoes", JSON.stringify(arr));
}