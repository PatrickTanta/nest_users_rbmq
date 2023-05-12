import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import * as Joi from 'joi'
import { RmqModule } from '../../infrastructure/amqp/amqp.module'
import { ConfigModule } from '@nestjs/config'
import { USERS_SERVICE } from './constants/services'

@Module({
    imports: [
        HttpModule,
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                RABBIT_MQ_URI: Joi.string().required(),
                RABBIT_MQ_USERS_QUEUE: Joi.string().required()
            })
        }),
        RmqModule.register({
            name: USERS_SERVICE
        })
    ],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
