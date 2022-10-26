/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Dependencies, Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom, lastValueFrom } from 'rxjs';
import CreatePostDto from './create-auth';

@Injectable({})
@Dependencies(HttpService)
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(private readonly httpService: HttpService) {}
  cus = {
    active:true,
    address:'string',
    email:'string',
    fullname:'string',
    phone:'string',
    
  }
  config = {
    headers:{
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': 'myadminsecretkey'
    }
    
  };
  async findAll(): Promise<CreatePostDto[]> {
    const { data } = await firstValueFrom(
      this.httpService.get('http://localhost:8080/api/rest/customer',this.config).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    // dữ liệu trả về là object *json đã parse*
    
    console.log(data.laundry_service_customers[1].fullname);
    console.log(data);
    return data;
  }
  async addNewCus(): Promise<CreatePostDto[]> {
    
    const { data } = await lastValueFrom(
      this.httpService.post('http://localhost:8080/api/rest/customer/add',JSON.stringify(this.cus),this.config).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'Another error happened!';
        }),
      ),
    );
    
  return data;
}
}
