import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { OperationsController } from '../../src/operations/operations.controller';
import { OperationsService } from '../../src/operations/operations.service';
import { FirebaseService } from '../../src/firebase/firebase.service';

describe('OperationsController (e2e)', () => {
    let app: INestApplication;
    let operationsService = {
        create: jest.fn(dto => {
            return {
                id: '1',
                ...dto,
            };
        }),
        findAll: jest.fn(() => [
            {
                id: '1',
                type: 'loyer',
                name: 'Test',
                price: 1000,
                debit_date: new Date().toISOString(),
            },
        ]),
    };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [OperationsController],
            providers: [
                {
                    provide: OperationsService,
                    useValue: operationsService,
                },
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

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/operations (POST)', () => {
        return request(app.getHttpServer())
            .post('/operations')
            .send({
                type: 'loyer',
                name: 'Test',
                price: 1000,
                debit_date: new Date(),
            })
            .expect(201)
            .expect(res => {
                expect(res.body.id).toBe('1');
                expect(res.body.type).toBe('loyer');
                expect(res.body.name).toBe('Test');
                expect(res.body.price).toBe(1000);
                expect(new Date(res.body.debit_date)).toEqual(expect.any(Date));
            });
    });

    it('/operations (GET)', () => {
        return request(app.getHttpServer())
            .get('/operations')
            .expect(200)
            .expect(res => {
                expect(res.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: '1',
                            type: 'loyer',
                            name: 'Test',
                            price: 1000,
                            debit_date: expect.any(String),
                        }),
                    ]),
                );
            });
    });
});
