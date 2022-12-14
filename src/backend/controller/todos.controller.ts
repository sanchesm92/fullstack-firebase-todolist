import { Request, Response } from "express";
import { db } from '@src/firebase'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where} from "firebase/firestore";
import { Itask } from "./interfaces/Itask";

/**
* @description
* Controllers
*/

export class TodosController {
/**
 * @description
 * Controller para requisição HTTP do tipo GET para /todos
 */
  public async getTodos(req: Request, res: Response): Promise<void> {
    const {email} = req.query
    try {
      const collectionRef = collection(db, "todos")
      const firebaseQuery = query(collectionRef, where("email", "==", email))
      const docs = await getDocs(firebaseQuery);
      const result: Itask[] = []
      docs.forEach(doc => {
        result.push({...doc.data(), id: doc.id, timestamp: doc.data().timestamp.toDate().getTime()})
      })
      res.status(200).send(result)
    } catch (error) {
      res.status(400).send({error})
    }
  }
/**
 * @description
 * Controller para requisição HTTP do tipo GET para /todos/:id
 */
  public async getTodoById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const docRef = doc(db, "todos", id);
      const docs = await getDoc(docRef);
      res.status(200).send({...docs.data()})
    } catch (error) {
      res.status(400).send({error})
    }
  }
/**
 * @description
 * Controller para requisição HTTP do tipo POST para /todos
 */
  public async createTodos(req: Request, res: Response): Promise<void> {
    try {
      const {task, email} = req.body;

      const getAllRef = collection(db, "todos")
      const firebaseQuery = query(getAllRef, where("email", "==", email))
      const docs = await getDocs(firebaseQuery);
      const result: Itask[] = []
      docs.forEach(doc => {
        result.push({...doc.data(), id: doc.id, timestamp: doc.data().timestamp.toDate().getTime()})
      })
      const collectionRef = collection(db, "todos")
      await Promise.resolve(addDoc(collectionRef, {task, timestamp: serverTimestamp(), email, completed: false, orderNumber: result.length }));
      res.status(201).send({message: 'created'})
    } catch (error) {
      res.status(400).send({error})
    }

  }
/**
 * @description
 * Controller para requisição HTTP do tipo PUT para /todos
 */
  public async updateTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const {task, completed} = req.body
      const docRef = doc(db, "todos", id);
      await updateDoc(docRef, {task, completed});
      res.status(200).send({message: 'updated', body: {id, task, completed}})
    } catch (error) {
      res.status(400).send(error)
    }
  }
/**
 * @description
 * Controller para requisição HTTP do tipo DELETE para /todos
 */
  public async deleteTodos(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const docRef = doc(db, "todos", id)
      await Promise.resolve(deleteDoc(docRef))
      res.status(204).send();
    } catch (error) {
      res.status(400).send({error})
    }

  }
}