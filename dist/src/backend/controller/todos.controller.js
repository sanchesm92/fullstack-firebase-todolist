"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const firebase_1 = require("@src/firebase");
const firestore_1 = require("firebase/firestore");
class TodosController {
    async getTodos(req, res) {
        const { email } = req.query;
        try {
            const collectionRef = (0, firestore_1.collection)(firebase_1.db, "todos");
            const firebaseQuery = (0, firestore_1.query)(collectionRef, (0, firestore_1.where)("email", "==", email));
            const docs = await (0, firestore_1.getDocs)(firebaseQuery);
            const result = [];
            docs.forEach(doc => {
                result.push({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp.toDate().getTime() });
            });
            res.status(200).send(result);
        }
        catch (error) {
            res.status(400).send({ error });
        }
    }
    async getTodoById(req, res) {
        try {
            const { id } = req.params;
            const docRef = (0, firestore_1.doc)(firebase_1.db, "todos", id);
            const docs = await (0, firestore_1.getDoc)(docRef);
            res.status(200).send({ ...docs.data() });
        }
        catch (error) {
            res.status(400).send({ error });
        }
    }
    async createTodos(req, res) {
        try {
            const { task, email } = req.body;
            const collectionRef = (0, firestore_1.collection)(firebase_1.db, "todos");
            await Promise.resolve((0, firestore_1.addDoc)(collectionRef, { task, timestamp: (0, firestore_1.serverTimestamp)(), email }));
            res.status(201).send({ message: 'created' });
        }
        catch (error) {
            res.status(400).send({ error });
        }
    }
    async updateTodo(req, res) {
        try {
            const { id } = req.params;
            const { task, email } = req.body;
            const docRef = (0, firestore_1.doc)(firebase_1.db, "todos", id);
            await (0, firestore_1.updateDoc)(docRef, { id, task, timestamp: (0, firestore_1.serverTimestamp)(), email });
            res.status(200).send({ message: 'updated', body: { id, task, timestamp: (0, firestore_1.serverTimestamp)() } });
        }
        catch (error) {
            res.status(400).send(error);
        }
    }
    async deleteTodos(req, res) {
        try {
            const { id } = req.params;
            const docRef = (0, firestore_1.doc)(firebase_1.db, "todos", id);
            await Promise.resolve((0, firestore_1.deleteDoc)(docRef));
            res.status(204).send();
        }
        catch (error) {
            res.status(400).send({ error });
        }
    }
}
exports.TodosController = TodosController;
//# sourceMappingURL=todos.controller.js.map