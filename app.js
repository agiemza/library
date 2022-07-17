const library = []

function Book(name, author, pages, isRead) {
    this.name = name
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

function addBookToLibrary(book){
    library.push(book)
}

const book1 = new Book("Hobbit", "Tolkien", "200", false)
addBookToLibrary(book1)
console.log(library[0])
