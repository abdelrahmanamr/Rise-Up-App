import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class ContentService {

  constructor(private httpClient: HttpClient) { }



postLink(content){
  return this.httpClient.post(environment.apiUrl+ 'content/postLink' , content);
}
}