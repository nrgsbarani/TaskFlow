/*let VisibleCreateNewBoradPanel = document.getElementById('create-new-board');
let CreateItemBox = document.getElementById('create-new-item-box');
let CreateItemTag = document.getElementById('create-new-item-tag');
let CreateItemInput = document.getElementById('create-new-item-input');
let CreateNewItemButton = document.getElementById('create-new-item-button');
let CancelCreationButton = document.getElementById('cancel-creation-button');*/


let CreateItemSwitch = 0; // 0 : off , 1 = create board , 2 = create list , 3 = create card
const ApplicationStorageName = "TrelloApplicationStorage";



const createNewBoardElement = (item) => {
    return `    <li>
                <a href="#" class="flex items-center justify-between p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 stark:hover:bg-gray-700 stark:text-white group">
                    <div class="flex items-center ">
                        <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 stark:text-gray-400 group-hover:text-gray-900 stark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H6a2 2 0 0 0-2 2h14v12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z"/>
                            <path d="M14 4H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM2 16v-6h12v6H2Z"/>
                        </svg>
                        <span class="ms-3 board-name-label">${item.board_name}</span>
                    </div>

                    <div class="flex items-center ">
                        <button data-tooltip-target="tooltip-edit-board-item${item.id}" data-tooltip-style="light"  type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-1.5 py-1 me-2 mb-2 stark:focus:ring-yellow-900 edit-board-button">
                            <svg class="w-6 h-6 text-white stark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                        <div id="tooltip-edit-board-item${item.id}" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 tooltip">
                            ویرایش
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                        <button data-tooltip-target="tooltip-delete-board-item${item.id}" data-tooltip-style="light"  type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-1.5 py-1 me-2 mb-2 stark:bg-red-600 stark:hover:bg-red-700 stark:focus:ring-red-800 delete-board-button">
                            <svg class="w-6 h-6 text-white stark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                        <div id="tooltip-delete-board-item${item.id}" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 tooltip">
                            حذف
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                    </div>
                </a>
            </li>
       ` ;
}


new Board( {
    container: document.getElementById('board-container'),
    template : (item) => {
        return createNewBoardElement(item)
    } ,
    inputBox : document.getElementById('create-new-item-box'),
    showNewBoardButtonForm : document.getElementById('create-new-board'),
    CreateItemSwitch : CreateItemSwitch,

    CreateItemTag : document.getElementById('create-new-item-tag'),
    CreateItemInput : document.getElementById('create-new-item-input'),
    CancelCreationButton : document.getElementById('cancel-creation-button'),
    CreateNewItemButton : document.getElementById('create-new-item-button'),
    ApplicationStorageName : ApplicationStorageName,
})

//-------------------------------------------------------------------------------------------- Section List

const draggableElements = document.getElementsByClassName("draggable");
const draggableLists = document.querySelectorAll(".drag-zone");


let draggingElement = null;
/*

function HandleDragEvent (event) {
    //console.log(this);
    //console.log('drag' , event.target);


}

function HandleDragStartEvent (event) {
    console.log('dragstart' , event.target);

    draggingElement = event.target;


    event.dataTransfer.setData('text/html', event.target.outerHTML);

    event.dataTransfer.dropEffect = 'move';

    event.target.classList.add("dragging-element");
}

function HandleDragEnterEvent (event) {
    //console.log('dragenter' , event.target);
}

function HandleDragOverEvent (event) {
    //console.log('dragover' , event.target);
    if (event.preventDefault) { event.preventDefault(); }

    if (!event.target.classList.contains('draggable')) {
        return;
    }

    event.target.classList.add("border-t-3");
    event.target.classList.add("border-t-indigo-500");
}

function HandleDragLeaveEvent (event) {
    event.target.classList.remove("border-t-3");
    event.target.classList.remove("border-t-indigo-500");
}

function HandleDropEvent (event) {
    console.log('drop' , event.target);

    event.target.classList.remove("border-t-3");
    event.target.classList.remove("border-t-indigo-500");

    let target = event.target.closest('.draggable');
    console.log("parent" ,target);
    //console.log("target" ,target);
    if (target != draggingElement) {
        let dropHTML = event.dataTransfer.getData('text/html');
        //console.log("drop element " ,dropHTML);

        target.parentNode.removeChild(draggingElement);
        target.insertAdjacentHTML('beforebegin' , dropHTML);
        addDragAndDropHandlers(target.previousSibling)
    }

}

function HandleDragEndEvent (event) {
    console.log('dragend' , event.target);
    event.target.classList.remove("dragging-element");

    reinitializeFlowbiteComponents();
}

const addDragAndDropHandlers = (draggable) => {
    draggable.setAttribute('draggable', true);

    //draggable.addEventListener('drag',(event) => HandleDragEvent(event) )
    draggable.addEventListener('dragstart',(event) => HandleDragStartEvent(event) )
    draggable.addEventListener('dragenter',(event) => HandleDragEnterEvent(event) )
    draggable.addEventListener('dragover',(event) => HandleDragOverEvent(event) )
    draggable.addEventListener('dragleave',(event) => HandleDragLeaveEvent(event) )
    draggable.addEventListener('drop',(event) => HandleDropEvent(event) )
    draggable.addEventListener('dragend',(event) => HandleDragEndEvent(event) )
}


function reinitializeFlowbiteComponents() {
    // Reinitialize all tooltips
    /!*document.querySelectorAll("[data-tooltip-target]").forEach((tooltipTriggerEl) => {
        const tooltipId = tooltipTriggerEl.getAttribute("data-tooltip-target");
        const tooltipEl = document.getElementById(tooltipId);
        if (tooltipEl) {
            new Flowbite.Tooltip(tooltipEl, tooltipTriggerEl);
        }
    });*!/

    // Reinitialize all dropdowns
    initDropdowns()

    // Reinitialize other components (if needed)
}


for (let draggable of draggableElements) {
    //addDragAndDropHandlers(draggable);
}

*/
/*document.addEventListener('dragstart', (event) => {
    if (event.target.classList.contains('draggable')) {
        console.log('dragstart' , event.target);
        draggingElement = event.target;
        event.dataTransfer.setData('text/html', event.target.outerHTML);
        event.dataTransfer.dropEffect = 'move';
        event.target.classList.add("dragging-element");
    }
})*/

const handleDragStartEvent = (element) => {
    element.addEventListener('dragstart', (event) => {
        console.log('drag start card' , event.target);
        draggingElement = event.target;
        event.dataTransfer.setData('text/html', event.target.outerHTML);
        event.dataTransfer.dropEffect = 'move';
        event.target.classList.add("dragging-element");
    })

    element.addEventListener('dragenter', (event) => {
        console.log('drag enter card' , event.target);
    })

    element.addEventListener('dragover', (event) => {
        console.log('drag over card' , event.target);
        event.preventDefault();

    })

    element.addEventListener('dragleave', (event) => {
        console.log('drag leave card' , event.target);
    })

    element.addEventListener('dragend', (event) => {
        console.log('drag end card' , event.target);
        event.target.classList.remove("dragging-element");
        initDropdowns()

    })


    element.addEventListener('drop', (event) => {
        console.log('drop card' , event.target);
        event.preventDefault();
        let target = event.target.closest('.draggable');
        if (target != draggingElement) {
            let dropHTML = event.dataTransfer.getData('text/html');
            //console.log("drop element " ,dropHTML);

            target.parentNode.removeChild(draggingElement);
            target.insertAdjacentHTML('beforebegin' , dropHTML);
            handleDragStartEvent(target.previousSibling)
        }

        draggingElement = null;

    })
}

Array.from(draggableElements).forEach((draggableElement) => {
    handleDragStartEvent(draggableElement);
})

draggableLists.forEach((list)=> {
    /*list.addEventListener("dragstart", (event) => {
        console.log('dragstart' , event.target);
    });*/

    list.addEventListener("dragenter", (event) => {
        console.log('dragenter' , event.target);
    })

    list.addEventListener("dragover", (event) => {
        console.log('dragover' , event.target);
        event.preventDefault();

    })

    list.addEventListener("dragleave", (event) => {
        console.log('dragleave' , event.target);
    })

    list.addEventListener("dragend", (event) => {
        console.log('dragend' , event.target);
        event.target.classList.remove("dragging-element");
        initDropdowns()
    })

    list.addEventListener('drop' , (event) => {
        console.log('drop' , event.target);
        event.preventDefault();
        if(draggingElement) {
            list.appendChild(draggingElement);
            draggingElement = null;
        }



    })
})

/*document.addEventListener('drop', (event) => {
    if (event.target.classList.contains('draggable')) {
        console.log('drop' , event.target);

    }
})*/

/*const handleDragAndDropEventsForLists = (list) => {
    //d.addEventListener("dragstart", handleDragAndDropEventsForLists);

    list.addEventListener('drop', (event) => {

        console.log('drop', event);
        event.preventDefault();
        if (draggingElement) {
            draggingElement.classList.remove("dragging-element");
            draggingElement = null;
        }
    });
}*/

/*for (draggableList of draggableLists) {
    handleDragAndDropEventsForLists(draggableList);
}*/
/*draggableLists.forEach( (draggable) => {
    //console.log(draggable);
    draggable.addEventListener('drop', (event) => {
        event.preventDefault();
        console.log('drop', event.target);
    })
})*/

//console.log(draggableLists);