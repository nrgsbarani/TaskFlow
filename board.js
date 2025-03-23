class Board {

    list;
    container;
    inputBox;
    showNewBoardButtonForm;
    CreateItemSwitch;
    CreateItemTag;
    CreateItemInput;
    CancelCreationButton;
    CreateNewItemButton;
    ApplicationStorageName;

    // function
    template;



    constructor(options) {
        this.container = options.container;
        this.inputBox = options.inputBox;
        this.template = options.template;

        //this.list = null


        this.showNewBoardButtonForm = options.showNewBoardButtonForm
        this.CreateItemSwitch = options.CreateItemSwitch;
        this.CreateItemTag = options.CreateItemTag;
        this.CreateItemInput = options.CreateItemInput;
        this.cancelCreationButton = options.CancelCreationButton;
        this.CreateNewItemButton = options.CreateNewItemButton;
        this.ApplicationStorageName = options.ApplicationStorageName;


        this.showList(options);
        this.addBasicBoardEventAction();
        /*for (let boardItem in options.container.children) {
            this.addBasicBoardEventAction(boardItem);
        }*/
    }


    showList = (options) => {
        //console.log(options);

        let {container , template , inputBox , showNewBoardButtonForm , CreateItemSwitch , CreateItemTag ,
            CreateItemInput , CancelCreationButton , CreateNewItemButton , ApplicationStorageName} = options;
        if (!container) { throw new Error("No container Exists provided!"); }
        if (!inputBox) { throw new Error("No input box Exists!"); }
        if (!showNewBoardButtonForm) { throw new Error("show NewBoardButtonForm 404!"); }
        //if (CreateItemSwitch ) { throw new Error("CreateItemSwitch 404!"); }
        if (!CreateItemTag) { throw new Error("CreateItemTag 404!"); }
        if (!CreateItemInput) { throw new Error("CreateItemInput 404!"); }
        if (!CancelCreationButton) { throw new Error("CancelCreationButton 404!"); }
        if (!CreateNewItemButton) { throw new Error("CreateNewItemButton 404!"); }
        if (!ApplicationStorageName) { throw new Error("ApplicationStorageName 404!"); }

        //console.log(typeof (CreateItemSwitch))

        if ( typeof CreateItemSwitch != "number") { throw new Error('Enter valid value for CreateItemSwitch '); }
        //if (!list) { throw new Error("No list Exists provided!"); }
        //if (!Array.isArray(list)) { throw new Error("No list Exists provided!"); }
        if (!template) { throw new Error("No template Exists provided!"); }

        //let list = this.loadBoardFromLocalStorage();
        let boards = this.loadBoardFromLocalStorage();
        boards.forEach(item => container.innerHTML += template(item));

    }

    addBasicBoardEventAction() {
        this.container.addEventListener('click', (event) => {
            try {
                let target = event.target ;
                //console.log();
                if (target.closest('button').classList.contains('edit-board-button')) {
                    let index = this.getElementIndexFromEvent(event);

                    let list = this.loadBoardFromLocalStorage();
                    let newBoardName = prompt("لطفا مورد جدید را برای بورد وارد کنید  : " , list[index].board_name).trim();
                    //console.log(newBoardName)

                    event.target.closest('a').querySelector('.board-name-label').innerText = newBoardName;
                    list[index].board_name = newBoardName;

                    this.saveBoardsIntoLocalStorage(list);

                    //console.log(this.list);
                    //console.log(index);

                    //console.log('edit btn clicked!');
                    //console.log(this.list);
                }

                if (target.closest('button').classList.contains('delete-board-button')) {
                    //console.log('AAAA')

                    if (confirm("Are you sure you want to delete this item?")) {
                        //parentLi.remove();
                        let index = this.getElementIndexFromEvent(event);
                        event.target.closest('li').remove();
                        let list = this.loadBoardFromLocalStorage();
                        list.splice(index, 1);
                        this.saveBoardsIntoLocalStorage(list);
                        //console.log(this.list);console.log(this.list);
                    }


                }
            } catch (error)  {
                console.error(error);
            }

        })
        this.showNewBoardButtonForm.addEventListener('click', (event) => {
            //console.log("AAAAA");
            let boards = this.loadBoardFromLocalStorage();
            if ( boards.length >= 5 ) {
                alert("شما به حداکثر تعداد Board در پلن خود رسیده اید . لطفا پلن خود را به Premium ارتقاء دهید")
                return false;
            }

            this.CreateItemSwitch = 1;
            this.inputBox.classList.remove('hidden');
            this.CreateItemTag.innerText = 'ایجاد بورد جدید';
            this.CreateItemInput.placeholder = " عنوان بورد را وارد نمایید ..."


        })
        this.cancelCreationButton.addEventListener('click', (event) => {
            this.CreateItemSwitch = 0;
            this.CreateItemInput.value = "";
            this.inputBox.classList.add('hidden');
        })
        this.CreateNewItemButton.addEventListener('click', (event) => {
            this.initToCreateNewBoard();
        })
    }

    initToCreateNewBoard() {
        let newItemText = this.CreateItemInput.value.trim();

        if (typeof newItemText === "string" && newItemText.length === 0 || newItemText === null )  {
            // show error to user Enter valid data
            alert("لطفا عبارت معتبر را وارد کنید");
            console.error("لطفا عبارت معتبر را وارد کنید")
            return false;
        }

        switch ( this.CreateItemSwitch  ) { // return false; // shit
            case 0:
                return false;
            case 1:
                return this.createNewBoard(newItemText);
            case 2:
                return CreateItemSwitch = 3;
            case 3:
                return CreateItemSwitch = 4;
            default:
                return false;
            //break;
        }
    }

    createNewBoard = (BoardName) => {
        //console.log(BoardName);

        let myBoards = this.loadBoardFromLocalStorage();

        let BoardId = 1;
        // generate board id
        if ( myBoards.length > 0 ) {
            BoardId = myBoards.length + 1;
        }
        let BoardObj = {id: BoardId , board_name : BoardName , stage_lists : [] };

        myBoards.push(BoardObj);
        //console.log(BoardObj);
        this.saveBoardsIntoLocalStorage(myBoards);
        this.CreateItemInput.value = "";

        let boardElement = this.template(BoardObj)
        document.querySelector('#board-container').innerHTML += boardElement;


        initTooltips();
        this.inputBox.classList.add('hidden');

    }

    loadBoardFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem(this.ApplicationStorageName)) || [] ;
    }

    saveBoardsIntoLocalStorage = (data = []) => {
        return localStorage.setItem(this.ApplicationStorageName, JSON.stringify(data));
    }



    getElementIndexFromEvent (event) {
        let li = event.target.closest('li');
        let ul = li.parentElement;
        return Array.from(ul.children).indexOf(li);
        //return index;
    }

}