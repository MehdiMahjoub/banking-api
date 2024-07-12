import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseService } from '../../src/firebase/firebase.service';

describe('FirebaseService', () => {
    let service: FirebaseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({
                load: [() => ({
                    FIREBASE_DATABASE_URL: 'https://banking-api-c018c.firebaseio.com'
                })]
            })],
            providers: [FirebaseService, ConfigService],
        }).compile();

        service = module.get<FirebaseService>(FirebaseService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // Ajoutez plus de tests pour chaque méthode
});
