window.onload = () => {
    displayLibrary()
}

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

function addToLibrary(book) {
    const library = getLibrary()
    library.push(book)
    localStorage.library = JSON.stringify(library)
}

function displayLibrary() {
    const library = getLibrary()
    const gallery = document.querySelector(".gallery")
    gallery.innerHTML = ""

    library.map(book => {
        const card = createCardElement(book)
        gallery.appendChild(card)
    })
}

function createCardElement(book) {
    const card = document.createElement("div")
    const title = document.createElement("div")
    const author = document.createElement("div")
    const pages = document.createElement("div")
    const isRead = document.createElement("div")

    card.classList.add("card")

    title.innerText = `Title: ${book.title}`
    author.innerText = `Author: ${book.author}`
    pages.innerText = `Number of pages: ${book.pages}`
    isRead.innerText = `${book.isRead ? `Is not read yet` : `Is already red`}`

    card.appendChild(title)
    card.appendChild(author)
    card.appendChild(pages)
    card.appendChild(isRead)

    return card
}

function getLibrary() {
    if (!localStorage.library) {
        localStorage.setItem("library", "[]")
    }
    return library = JSON.parse(localStorage.library)
}

document.querySelector(".add-card-button").addEventListener("click", e => {
    const someBook = new Book("Hobbit", "Tolkien", "200", false)
    addToLibrary(someBook)
    displayLibrary()
})