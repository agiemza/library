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
    const card = document.createElement("div")
    const removeButton = document.createElement("button")
    const statusButton = document.createElement("button")
    const titleHeader = document.createElement("div")
    const title = document.createElement("div")
    const authorHeader = document.createElement("div")
    const author = document.createElement("div")
    const pagesHeader = document.createElement("div")
    const pages = document.createElement("div")
    const isRead = document.createElement("div")

    removeButton.classList.add("remove-button")
    removeButton.innerText = "x"

    statusButton.classList.add("status-button")
    statusButton.innerText = "Change status"

    card.classList.add("card")

    title.classList.add('card-data')
    author.classList.add('card-data')
    pages.classList.add('card-data')
    isRead.classList.add(`${book.isRead ? `is-read` : `un-read`}`)

    titleHeader.innerText = `Title:`
    title.innerText = `${book.title}`
    authorHeader.innerText = `Author:`
    author.innerText = `${book.author}`
    pagesHeader.innerText = `Number of pages:`
    pages.innerText = `${book.pages}`
    isRead.innerText = `${book.isRead ? `Is already read` : `Is not read yet`}`

    card.appendChild(removeButton)
    card.appendChild(titleHeader)
    card.appendChild(title)
    card.appendChild(authorHeader)
    card.appendChild(author)
    card.appendChild(pagesHeader)
    card.appendChild(pages)
    card.appendChild(isRead)
    card.appendChild(statusButton)

    return card
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