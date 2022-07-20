window.onload = () => {
    displayLibrary()
}

// Library

function getLibrary() {
    if (!localStorage.library) {
        localStorage.setItem("library", "[]")
    }
    return library = JSON.parse(localStorage.library)
}

function addToLibrary(book) {
    const library = getLibrary()
    library.push(book)
    localStorage.library = JSON.stringify(library)
    displayLibrary()
}

function removeBook(index) {
    const library = getLibrary()
    localStorage.clear()
    library.map((book, currentIndex) => {
        if (currentIndex !== index) {
            addToLibrary(book)
        }
    })
    displayLibrary()
}

function displayLibrary() {
    const library = getLibrary()
    const gallery = document.querySelector(".gallery")
    gallery.innerHTML = ""

    library.map((book, index) => {
        const card = createCardElement(book)

        const removeButton = card.querySelector(".remove-button")
        removeButton.addEventListener("click", () => {
            removeBook(index)
        })

        const statusButton = card.querySelector(".status-button")
        statusButton.addEventListener("click", () => {
            toggleStatus(index)
        })

        gallery.appendChild(card)
    })
}

// Book

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

function createCardElement(book) {
    const card = generateElement('', 'card')
    const innerElements = [
        generateElement("x", "remove-button", "button"),
        generateElement("Title:"),
        generateElement(book.title, "card-data"),
        generateElement("Author:"),
        generateElement(book.author,"card-data"),
        generateElement("Number of pages:"),
        generateElement(book.page,"card-data"),
        generateElement(`${book.isRead ? `Is already read` : `Is not read yet`}`, book.isRead ? `is-read` : `un-read`),
        generateElement("Change book status", "status-button", "button"),
    ]

    innerElements.forEach(element => {
        card.appendChild(element)
    });

    return card
}

function generateElement(innerText, className, type) {
    const element = document.createElement(type ? type : `div`)
    if (innerText) {
        element.innerText = innerText
    }
    if (className) {
        element.classList.add(className)
    }
    return element
}

function toggleStatus(index) {
    const library = getLibrary()
    localStorage.clear()
    library.map((book, currentIndex) => {
        if (currentIndex === index) {
            book.isRead = !book.isRead
        }
        addToLibrary(book)
    })
    displayLibrary()
}

// Form 

function createBook() {
    const title = document.querySelector("#title").value
    const author = document.querySelector("#author").value
    const pages = document.querySelector("#pages").value
    const isRead = document.querySelector("#is-read").checked

    const newBook = new Book(title, author, pages, isRead)
    addToLibrary(newBook)
    closeForm()
}

function closeForm() {
    cover.style.cssText = "display: none;"
    document.querySelector(".add-book-form").reset()
}

// Popup 

const cover = document.querySelector(".cover")

const addBookButton = document.querySelector(".add-book")
addBookButton.addEventListener("click", e => {
    e.preventDefault()
    createBook()
})

const openFormButton = document.querySelector(".open-form")
openFormButton.addEventListener("click", () => {
    cover.style.cssText = "display: grid;"
    cover.querySelectorAll("input")[0].focus()
})

const closeCoverButton = document.querySelector(".close-cover")
closeCoverButton.addEventListener("click", closeForm)