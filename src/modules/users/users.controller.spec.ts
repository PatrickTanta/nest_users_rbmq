import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { HttpModule } from '@nestjs/axios'
import { UsersService } from './users.service'

describe('UsersController', () => {
    let controller: UsersController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            controllers: [UsersController],
            providers: [UsersService]
        }).compile()

        controller = module.get<UsersController>(UsersController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
