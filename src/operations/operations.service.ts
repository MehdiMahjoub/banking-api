import { Injectable, BadRequestException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateOperationDto } from './dto/create-operation.dto';

@Injectable()
export class OperationsService {
    constructor(private firebaseService: FirebaseService) { }

    async create(data: CreateOperationDto) {
        const db = this.firebaseService.getFirestore();

        // Vérifier l'unicité du nom
        const existingOperations = await db.collection('operations').where('name', '==', data.name).get();
        if (!existingOperations.empty) {
            throw new BadRequestException('Operation with this name already exists');
        }

        const res = await db.collection('operations').add(data);
        return { id: res.id, ...data };
    }

    async findAll() {
        const db = this.firebaseService.getFirestore();
        const snapshot = await db.collection('operations').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async findOne(id: string) {
        const db = this.firebaseService.getFirestore();
        const doc = await db.collection('operations').doc(id).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }

    async update(id: string, data: CreateOperationDto) {
        const db = this.firebaseService.getFirestore();

        // Vérifier l'unicité du nom, excluant l'opération en cours de mise à jour
        const existingOperations = await db.collection('operations').where('name', '==', data.name).get();
        if (!existingOperations.empty && existingOperations.docs[0].id !== id) {
            throw new BadRequestException('Operation with this name already exists');
        }

        await db.collection('operations').doc(id).set(data, { merge: true });
        return { id, ...data };
    }

    async remove(id: string) {
        const db = this.firebaseService.getFirestore();
        await db.collection('operations').doc(id).delete();
        return { id };
    }
}
