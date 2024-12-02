const returnModel = require("../models/Return");
const bookModel = require("../models/Books");
const borrowModel = require("../models/Borrow_Schema");
const updateModel=require("../models/User_Schema");

module.exports.borrowbooks = async (req, res, next) => {
    const { username, bookId, dueDate } = req.body;

    try {
        const isBook = await bookModel.findById(bookId);
        if (!isBook) return res.status(401).json('Enter Valid Book ID');

        const newBorrow = new borrowModel({
            username: username,
            bookId: bookId,
            dueDate: dueDate
        });

        await newBorrow.save();

        return res.status(200).json(`Book ID ${bookId} borrowed successfully`);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};

module.exports.returnBook = async (req, res, next) => {
    const { username, bookId, dueDate, fine } = req.body;

    try {
        const isBorrowed = await borrowModel.findOne({ bookId, username });
        if (!isBorrowed) {
            return res.status(404).json('This book was not borrowed by the user');
        }

        const newReturn = new returnModel({
            username,
            bookId,
            dueDate,
            fine,
        });

        await newReturn.save();

        const book = await bookModel.findById(bookId);
        if (book) {
            book.isAvailable = true;
            await book.save();
        }

        res.status(200).json(`Book ID ${bookId} returned successfully with a fine of ${fine}`);
    } catch (error) {
        console.error(error);
        res.status(500).json('An error occurred while returning the book');
    }
};

module.exports.updateBook = async (req, res, next) => {
    const { username, bookId, name, author } = req.body;

    try {
        
        const isUser = await updateModel.findOne({ username: username });
        if (!isUser) return res.status(401).json('Please Enter Valid Username');

       
        if (!isUser.admin) return res.status(403).json('User is not Authorized');

       
        const isBook = await bookModel.findById(bookId);
        if (!isBook) return res.status(404).json('Enter Valid Book ID');

        
        const updatedBook = await bookModel.updateOne(
            { _id: bookId }, 
            {
                $set: {
                    ...(name && { name }), 
                    ...(author && { author }), 
                }
            }
        );
        
        if (updatedBook.modifiedCount > 0) {
            res.status(200).json(`Book ID ${bookId} updated successfully.`);
        } else {
            res.status(400).json('No changes were made to the book.');
        }
    } catch (error) {
       
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

