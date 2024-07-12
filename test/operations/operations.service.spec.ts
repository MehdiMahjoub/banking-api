import { Test, TestingModule } from '@nestjs/testing';
import { OperationsService } from '../../src/operations/operations.service';
import { FirebaseService } from '../../src/firebase/firebase.service';

describe('OperationsService', () => {
    let service: OperationsService;
    let firebaseService: FirebaseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OperationsService,
                {
                    provide: FirebaseService,
                    useValue: {
                        getFirestore: jest.fn().mockReturnValue({
                            collection: jest.fn().mockReturnValue({
                                add: jest.fn(),
                                where: jest.fn().mockReturnThis(),
                                get: jest.fn().mockReturnThis(),
                                doc: jest.fn().mockReturnThis(),
                                set: jest.fn().mockReturnThis(),
                                delete: jest.fn().mockReturnThis(),
                            }),
                        }),
                    },
                },
            ],
        }).compile();

        service = module.get<OperationsService>(OperationsService);
        firebaseService = module.get<FirebaseService>(FirebaseService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // Add more tests for each method
});
