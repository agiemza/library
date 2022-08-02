window.onload = () => {
    library.update()
}

// Library

class Library {

    constructor(_gallery) {
        initializeLocalStorage()
        this.gallery = _gallery
        this.books = JSON.parse(localStorage.getItem("library"))
    }

    static generateElement(innerText, className, type) {
        const element = document.createElement(type ? type : `div`)
        if (innerText) {
            element.innerText = innerText
        }
        if (className) {
            element.classList.add(className)
        }
        return element
    }

    static createCardElement(book) {
        const card = Library.generateElement("", "card")
        const innerElements = [
            Library.generateElement("x", "remove-button", "button"),
            Library.generateElement("Title:"),
            Library.generateElement(book.title, "card-data"),
            Library.generateElement("Author:"),
            Library.generateElement(book.author, "card-data"),
            Library.generateElement("Number of pages:"),
            Library.generateElement(book.pages, "card-data"),
            Library.generateElement(`${book.isRead ? `Is already read` : `Is not read yet`}`, book.isRead ? `is-read` : `un-read`),
            Library.generateElement("Change book status", "status-button", "button"),
        ]

        innerElements.forEach(element => {
            card.appendChild(element)
        })
        return card
    }

    displayEmptyMessage(text) {
        if (this.books.length === 0) {
            const message = document.createElement("div")
            message.classList.add("no-books")
            message.textContent = text
            this.gallery.appendChild(message)
        }
    }

    clearGallery() {
        while (this.gallery.firstChild) {
            this.gallery.removeChild(this.gallery.firstChild)
        }
    }

    update() {
        this.clearGallery()
        this.displayEmptyMessage("You have no books")

        for (const [index, data] of this.books.entries()) {

            const book = new Book(...Object.values({ ...data }))
            const card = Library.createCardElement(book)

            const removeButton = card.querySelector(".remove-button")
            removeButton.addEventListener("click", () => {
                this.remove(index)
            })

            const statusButton = card.querySelector(".status-button")
            statusButton.addEventListener("click", () => {
                book.changeStatus()
                this.books[index] = book
                this.update()
            })

            gallery.appendChild(card)
        }

        localStorage.clear()
        localStorage.setItem("library", JSON.stringify(this.books))
    }

    add(book) {
        this.books.push(book)
        this.update()
    }

    remove(index) {
        this.books.splice(index, 1)
        this.update()
    }
}

const gallery = document.querySelector(".gallery")
const library = new Library(gallery)

// New book

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }

    changeStatus() {
        this.isRead = !this.isRead
    }
}

function createBook() {
    const title = document.querySelector("#title").value
    const author = document.querySelector("#author").value
    const pages = document.querySelector("#pages").value
    const isRead = document.querySelector("#is-read").checked

    const book = new Book(title, author, pages, isRead)

    library.add(book)
    closeForm()
}

// New book window

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

function closeForm() {
    cover.style.cssText = "display: none;"
    document.querySelector(".add-book-form").reset()
}

// Local storage 

function initializeLocalStorage() {
    if (!localStorage.library) {
        localStorage.setItem("library", "[]")
    }
}