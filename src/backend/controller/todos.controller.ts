// import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";
import { db } from '@src/firebase'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc} from "firebase/firestore";
import { Itask } from "./interfaces/Itask";

// @Controller('todos')
export class TodosController {

  // @Get('')
  public async getTodos(_: Request, res: Response): Promise<void> {
    try {
      const collectionRef = collection(db, "todos")
      const docs = await getDocs(collectionRef);
      const result: Itask[] = []
      docs.forEach(doc => {
        result.push({...doc.data(), id: doc.id})
      })
      res.status(200).send(result)
    } catch (error) {
      res.status(400).send({error})
    }
  }

  public async getTodoById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const docRef = doc(db, "todos", id);
      const docs = await getDoc(docRef);
      res.status(200).send(docs.data())
    } catch (error) {
      res.status(400).send({error})
    }
  }

  public async createTodos(req: Request, res: Response): Promise<void> {
    try {
      const {task, details} = req.body;
      const collectionRef = collection(db, "todos")
      await Promise.resolve(addDoc(collectionRef, {task, details}));
      res.status(201).send({message: 'created'})
    } catch (error) {
      res.status(400).send({error})
    }

  }

  public async updateTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const {task, details} = req.body
      const docRef = doc(db, "todos", id);
      await updateDoc(docRef, {id, task, details});
      res.status(200).send({message: 'updated', body: {id, task, details}})
    } catch (error) {
      res.status(400).send(error)
    }
  }

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