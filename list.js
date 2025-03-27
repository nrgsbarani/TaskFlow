class list {

    StorageList;        // save lists in local storage
    lists;              // save list info to show list
    addNewListButton;   // detected click on add new list
    sidebarBox;
    showSidebarTag;     // show sidebar tag like "ایجاد لیست جدید"
    showSidebarInput;   // show sidebar input like "عنوان لیست را وارد کنید ..."
    createListButton;   // the button for create new list
    cancleListButton;   // the button for cancle create new list
    APPStoragename;     // save list data for TrelloApplicationStorage key
    ErrorList;
    template;           // function for create new list
    CreateItemSwitch;
    BoardError;

    constructor(options) {
        this.lists = options.lists;
        this.addNewListButton = options.addNewListButton;
        this.sidebarBox = options.sidebarBox;
        this.showSidebarTag = options.showSidebarTag;
        this.showSidebarInput = options.showSidebarInput;
        this.createListButton = options.createListButton;
        this.cancleListButton = options.cancleListButton;
        this.APPStoragename = options.APPStoragename;
        this.ErrorList = options.ErrorList;
        this.template = options.template;
        this.CreateItemSwitch = options.CreateItemSwitch;
        this.BoardError = options.BoardError;

        this.showList(options);
        this.addBasicListEventAction();
    }

    showList = (options) => {

        let {lists , addNewListButton , sidebarBox , showSidebarTag , showSidebarInput , createListButton , cancleListButton ,
            APPStoragename , template, CreateItemSwitch } = options;
        if (!lists) { throw new Error("No list Exists provided!"); }
        if (!addNewListButton) { throw new Error("add new list button not Exists!"); }
        if (!showSidebarTag) { throw new Error("sidebar tag 404!"); }
        if (!showSidebarInput) { throw new Error("sidebar input 404!"); }
        if (!createListButton) { throw new Error("create list button 404!"); }
        if (!cancleListButton) { throw new Error("cancle list button 404!"); }
        if (!APPStoragename) { throw new Error("APPStoragename 404!"); }
        if (!template) { throw new Error("No template Exists provided!"); }
        let list = this.loadlistFromLocalStorage();
        list.forEach(item => document.querySelector('.list').innerHTML += template(item));
    }

    addBasicListEventAction() {
        
        this.addNewListButton.addEventListener('click', (event) => {
            let list = this.loadlistFromLocalStorage();
            if ( list.length >= 3 ) {
                this.ErrorList.classList.remove('hidden');
                return false;
            }
            this.CreateItemSwitch = 2;
            this.BoardError.classList.add('hidden');
            this.ErrorList.classList.add('hidden');
            this.sidebarBox.classList.remove('hidden');
            this.showSidebarTag.innerText = 'ایجاد لیست جدید';
            this.showSidebarInput.placeholder = " عنوان لیست را وارد نمایید ..."


        })
        this.cancleListButton.addEventListener('click', (event) => {
            this.CreateItemSwitch = 0;
            this.showSidebarInput.value = "";
            this.sidebarBox.classList.add('hidden');
        })
        this.createListButton.addEventListener('click', (event) => {
            this.initToCreateNewlist();
            this.CreateItemSwitch = 0;
        })
    }

    initToCreateNewlist() {
        let newItemText = this.showSidebarInput.value.trim();
        //console.log(`list : ${this.CreateItemSwitch}`)
        if (this.CreateItemSwitch == 2) {
            if (typeof newItemText !== "string" || newItemText.length === 0 || newItemText === null )  {
                // show error to user Enter valid data
                console.log('اضافه کردن لیست')
                alert("لطفا عبارت معتبر را وارد کنید");
                console.error("لطفا عبارت معتبر را وارد کنید")
                return false;
            }
            this.createNewlist(newItemText);
        } else {
            return false;
        }
                
    }

    createNewlist = (ListName) => {
        //console.log(BoardName);

        let mylists = this.loadlistFromLocalStorage();

        let listId = 1;
        // generate board id
        if ( mylists.length > 0 ) {
            listId = mylists.length + 1;
        }
        let ListObj = {id: listId , list_name : ListName , stage_lists : [] };

        mylists.push(ListObj);
        //console.log(BoardObj);
        this.savelistIntoLocalStorage(mylists);
        this.showSidebarInput.value = "";

        let listElement = this.template(ListObj)
        document.querySelector('.list').innerHTML += listElement;


        // initTooltips();
        this.sidebarBox.classList.add('hidden');

    }

    loadlistFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem(this.APPStoragename)) || [] ;
    }

    savelistIntoLocalStorage = (data = []) => {
        return localStorage.setItem(this.APPStoragename, JSON.stringify(data));
    }
}