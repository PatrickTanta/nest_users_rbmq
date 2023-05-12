import * as usersData from './helpers/data.json'
import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { HttpService, HttpModule } from '@nestjs/axios'
import { UsersController } from './users.controller'
import { of } from 'rxjs'
import { User } from './interface/user.interface'
import { AxiosResponse } from 'axios'

describe('UsersService', () => {
    let usersService: UsersService
    let httpService: HttpService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            controllers: [UsersController],
            providers: [UsersService]
        }).compile()
        usersService = module.get<UsersService>(UsersService)
        httpService = module.get(HttpService)
    })

    it('should be defined', () => {
        expect(usersService).toBeDefined()
    })

    it('test_find_all_returns_valid_data', async () => {
        const users: User[] = usersData.results
        const response: AxiosResponse<any, any> = {
            data: users,
            headers: {},
            config: { url: 'http://localhost:3000/mockUrl', headers: null },
            status: 200,
            statusText: 'OK'
        }
        const httpServiceGetSpy = jest.spyOn(httpService, 'get').mockReturnValue(of(response))

        const result = await usersService.findAll()

        expect(httpServiceGetSpy).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users')

        expect(result).toBeDefined()
        expect(result.length).toBeGreaterThan(0)
    })

    it('test_find_all_maps_data_correctly', async () => {
        const result = await usersService.findAll()
        expect(result).toBeDefined()
        expect('address' in result[0]).toBeFalsy()
    })
})
