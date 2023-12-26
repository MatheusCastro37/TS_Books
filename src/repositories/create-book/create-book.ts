import {
  IBookDetails,
  ICreateBookRepository,
} from "../../controllers/create-book/protocols";
import { db } from "../../database/mongo";
import { Book } from "../../models/book";

export class CreateBookRepository implements ICreateBookRepository {
  async createBook(bookDetails: IBookDetails): Promise<Book> {
    const { insertedId } = await db.collection("books").insertOne(bookDetails);

    const book = await db
      .collection<Omit<Book, "id">>("books")
      .findOne({ _id: insertedId });

    if (!book) {
      throw new Error("O livro não pode ser criado!");
    }

    const { _id, ...rest } = book;

    const id = _id.toHexString();

    return { id, ...rest };
  }
}
