const router = require('express').Router();
const bookModel = require('../models/bookModel');

//POST REQUEST
router.post('/add', async (req, res) => {
    try {
        const data = req.body;
        const newBook = new bookModel(data);
        await newBook.save().then(() => {
            res.status(200).json({ message: "Book Added Successfully" })
        })
    } catch (error) {

        console.log(error);
    }
})

router.get('/getAllBooks', async (req, res) => {
    try {
        const books = await bookModel.find();
        res.status(200).json({ books })
    } catch (error) {
        console.log(error);
    }
})

router.get('/getBook/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const book = await bookModel.findById(id)
        console.log(book);
        res.status(200).json({ book })
    } catch (error) {
        console.log(error);
    }
})

router.put('/updateBook/:id', async (req, res) => {
    const id = req.params.id;
    const { title, author, price, published } = req.body;

    try {
        book = await bookModel.findByIdAndUpdate(id, {
            title,
            author,
            price,
            published,
        });
        await book
            .save()
            .then(() => { res.json({ message: "Book Updated Successfully" }) })
    } catch (error) {
        console.log(error);

    }
})

router.delete('/deleteBook/:id', async (req, res) => {
    const id = req.params.id;
    try {
        book = await bookModel.findByIdAndDelete(id)
            .then(() => { res.status(201).json({ message: "Book Deleted Successfully" }) })
    } catch (error) {
        console.log(error);

    }
})

router.get('/books/author/:author', async (req, res) => {
    const author = req.params.author;
    try {
        console.log(author);
        const books = await bookModel.find({ author: author })
        res.status(200).json({ books })
    }
    catch (error) {
        console.log(error);
    }
})

// router.get('/filter/:published', async (req, res) => {
//     const published = req.params.published;
//     try {
//         console.log(published);
//         const books =  await bookModel.find({published: new Date(`${published}-01-01T00:00:00Z`)})
//             .then(()=>{res.status(200).json({ books })})
//     }
//     catch (error) {
//         console.error('Error Fetching Results', error)
//         console.log(error);
//     }
// })

router.get('/books/published/:published', async (req, res) => {
    const published = parseInt(req.params.published);
    try {
        const books = await getBooksByYear(published);
        res.status(200).json({ books });
    } catch (error) {
        console.error('Error filtering books by year:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function getBooksByYear(year) {
    const startOfYear = new Date(year, 0, 1); // January 1st of the specified year
    const endOfYear = new Date(year + 1, 0, 1); // January 1st of the following year

    try {
        const books = await bookModel.find({
            published: {
                $gte: startOfYear,
                $lt: endOfYear
            }
        });
        return books;
    } catch (error) {
        console.error('Error filtering books by year:', error);
        throw new Error('Internal Server Error');
    }
}


module.exports = router;
