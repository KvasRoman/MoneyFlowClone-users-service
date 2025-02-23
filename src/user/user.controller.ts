import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private userService: UserService) {}
    @MessagePattern({cmd: "create_user"})
    async createUser(@Payload() payload: {accountId: string, firstName: string, lastName?: string}){
        try{
            return await this.userService.createUser(payload);
        }
        catch(e){
            throw e
        }
    }
    @MessagePattern({cmd: "get_user"})
    async getUser(@Payload() payload: {accountId: string}){
        try{
            return await this.userService.getUser(payload.accountId);
        }
        catch(e){
            throw e
        }
    }
}
