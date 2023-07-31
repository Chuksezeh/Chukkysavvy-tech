
const BookList = (props) =>{

    const books = props.books;
    const tittle = props.tittle;

    return (
        <div className="book-list">
            {books.map((book) =>(
                <div className="first-name" key={book.id}>
                    <h2>{book.tittle}</h2>
                    <p>written by {book.authour}</p>
                    <p>and the cover is {book.body.toLocaleUpperCase()}</p>

                    </div>
            ))};

        </div>
    )
}
export default BookList;