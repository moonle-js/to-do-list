var tasks = [];
var leftItems = 0;


function createNewTask (text) {
    var addOrNot = true;
    for(let i in tasks){
        if(tasks[i].text == text){
            addOrNot = false
            alert('the same name')
        }
    }
    if(tasks.length != -1){
        document.querySelector('#shownSide').style.display = "flex"
    }
    if(addOrNot){
        var element = {
            text,
            completed: false
        }
        tasks.push(element);
        showAllTask(tasks);
    }

    
}
setInterval(function(){
    checkLeftItems();
    if(tasks.length <= 0 ){
        document.querySelector('#shownSide').style.display = "none"
    }
},100)

function checkLeftItems(){
    leftItems = 0;
    for(let i in tasks){
        if(!tasks[i].completed){
            leftItems++;
        }
    }
    document.querySelector('#left-items').innerHTML = `${leftItems} left`;
}

function removeTask (index) {
    tasks.splice(index,1)
    
    showAllTask(tasks);
}



function clearCompleted () {
    removeRedBorder();
    tasks = tasks.filter(a => a.completed == false)
    localStorage.clear();
    setTimeout(addToLocalStorage, 100)

    showAllTask(tasks);

    
}

document.querySelector('#clearCompleted').addEventListener('click', clearCompleted)




function showAllTask (currentTask) {
    document.querySelector('header').innerHTML = ``;
    for(let i in currentTask){
        if(currentTask[i].completed){
            document.querySelector('header').innerHTML += `
                <div class="element">
                <div class="checkingSide">
                    <input checked type="checkbox">
                    <span>
                        ${tasks[i].text}
                    </span>
                </div>

                <div class="deletingSide">
                    X
                </div>
            </div>
        `
        }else{
            document.querySelector('header').innerHTML += `
            <div class="element">
            <div class="checkingSide">
                <input type="checkbox">
                <span>
                    ${tasks[i].text}
                </span>
            </div>

            <div class="deletingSide">
                X
            </div>
        </div>

    `
        }

        document.querySelectorAll('input[type="checkbox"]').forEach(function(item){
            if(item.checked){
                item.parentNode.querySelector('span').style.textDecoration = "line-through"
            }else{
                item.parentNode.querySelector('span').style.textDecoration = "none"
            }
        })

        // removing item
    document.querySelectorAll('.deletingSide').forEach(function(item){
        item.addEventListener('click', function(){
            for(let i in tasks){
                
                if(tasks[i].text == item.parentNode.querySelector('span').innerHTML.trim()){
                    console.log(tasks[i].text)
                    console.log(item.parentNode.querySelector('span').innerHTML.trim())
                    console.log(i)
                    removeTask(i)

                    localStorage.clear();
                    setTimeout(addToLocalStorage, 100)
                }
            }
        })
    })
        //removing item


        //toggle
    document.querySelectorAll('input[type="checkbox"]').forEach(function(item){
        item.addEventListener('click', function(){
            for(let i in tasks){
                if(tasks[i].text == item.parentNode.querySelector('span').innerHTML.trim()){
                    if(item.checked){
                        item.parentNode.querySelector('span').style.textDecoration = "line-through"

                        tasks[i].completed = true

                    }else{
                        item.parentNode.querySelector('span').style.textDecoration = "none"

                        tasks[i].completed = false
                    }

                }
            }
        })
    })
    //toggle side
        
    }
}






function showActiveTasks () {
    var newArray = [];
    for(let i in tasks){
        if(tasks[i].completed == false){
            newArray.push(tasks[i])
        }
    }
    showAllTask(newArray);
}

function showCompletedTasks () {
    var newArray = [];
    for(let i in tasks){
        if(tasks[i].completed == true){
            newArray.push(tasks[i])
        }
    }
    showAllTask(newArray);
}

function removeRedBorder(){
    document.querySelectorAll("#categories span").forEach(function(item){
        item.classList.remove('redBorder')
    })
}

document.querySelector('#active').addEventListener('click',function(){
    removeRedBorder();
    this.classList.add('redBorder')
    showActiveTasks();
})
document.querySelector('#all').addEventListener('click', function(){
    removeRedBorder();
    this.classList.add('redBorder')
    showAllTask(tasks)
})
document.querySelector('#completed').addEventListener('click', function(){
    removeRedBorder();
    this.classList.add('redBorder')
    showCompletedTasks()
})




// adding side elements
var addedElementValue = document.querySelector('#addedElementValue');
var selectAllButton = document.querySelector('#selectAllButton');


// Adding when enter
window.addEventListener('keyup', function(e){
    if(e.key == "Enter" && addedElementValue.value.trim()){
        createNewTask(addedElementValue.value);
        addedElementValue.value = ""
    }
})
// Adding when enter


// check all
var checkedAll = false;
selectAllButton.addEventListener('click', function(){
    var checkboxesAll = document.querySelectorAll('input[type="checkbox"]');
    if(checkedAll){
        for(let i in tasks){
            tasks[i].completed = false
        }

        checkboxesAll.forEach(function(item){
            item.checked = false;
        })
        checkedAll = false
    }else if(!checkedAll){
        checkboxesAll.forEach(function(item){
            item.checked = true;
        })
        checkedAll = true;

        for(let i in tasks){
            tasks[i].completed = true
        }
    }
    showAllTask(tasks);
})






function addToLocalStorage(){

    for(let i in tasks){
        localStorage.setItem(`${tasks[i].text}`, tasks[i].completed)
    }

}

function getDataFromLocalStorage(){
    tasks = []
    for(let i = 0; i < localStorage.length; i++){
        var detector = localStorage.getItem(localStorage.key(i))
        if(detector == "false"){
            detector = false
        }else{
            detector = true
        }

        var task = {
            text: localStorage.key(i),
            completed: detector
        }
        tasks.push(task)
    }

        setTimeout(function(){
            showAllTask(tasks)
        },200)
}

window.addEventListener('load', function(){
    setTimeout(function(){
        getDataFromLocalStorage()
        if(tasks.length != 0){
            document.querySelector('#shownSide').style.display = "flex"
        }
    }, 100)
})


document.addEventListener('change', function(){
    setTimeout(addToLocalStorage, 100)
})
