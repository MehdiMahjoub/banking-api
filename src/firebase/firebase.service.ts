import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import * as serviceAccount from './account-config.json';

@Injectable()
export class FirebaseService {
    private app: admin.app.App;

    constructor(private configService: ConfigService) {
        this.app = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
            databaseURL: this.configService.get<string>('FIREBASE_DATABASE_URL'),
        });
    }

    getFirestore() {
        return this.app.firestore();
    }
}
