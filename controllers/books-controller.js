const Book = require('../model/Book')
exports.hello = async (req, res, next) => {
    res.render('home')
}
exports.getAllBooks = async (req, res, next) => {
    let books;
    try {
        books = await Book.find();
    } catch (err) {
        console.log(err)
    }
    if (!books) {
        return res.status(404).json({ message: "No products found !" })
    }
    return res.status(201).render('all-products',
        {
            arr: books
        })
}
exports.get_addBook = async (req, res, next) => {
    res.render('add-book')
}
exports.post_addBook = async (req, res, next) => {
    const name = req.body.name;
    const auther = req.body.auther;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;
    let book;

    try {
        book = new Book({
            name: name,
            auther: auther,
            description: description,
            price: price,
            image: image
        })
        await book.save()
    } catch (err) {
        console.log(err)

    }
    if (!book) {
        return res.status(500).json({ message: 'unable To add' })
    } return res.status(201).render('home')


}
exports.getById = async (req, res, next) => {
    const id = req.params.id
    let book;
    try {
        book = await Book.findOne({ _id: req.params.id })
    }

    catch (err) {
        console.log(err)
    }
    if (!book) {
        return res.status(500).json({ message: 'Not book found' })
    } return res.status(201).render('details', {
        book: book
    })
}
exports.updataBook = async (req, res, next) => {
    const id = req.params.id
    const { name, auther, description, price, image } = req.body;
    let book;
    try {
        book = await Book.findByIdAndUpdate(id, {
            name, auther, description, price, image
        })
        book = await book.save()
    } catch (err) {
        console.log(err)
    }
    if (!book) {
        return res.status(404).json({ message: 'cant update' })
    } return res.status(200).json({ book })
}
exports.deleteBook = async (req, res, next) => {
    const id = req.params.id
    let book;
    try {
        book = await Book.findByIdAndRemove(id)
    } catch (err) {
        console.log(err)
    }
    if (!book) {
        return res.status(404).json({ message: 'cant delete' })
    } return res.status(200).json({ message: 'Product successfully deleted' })
}