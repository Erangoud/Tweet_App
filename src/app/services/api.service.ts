import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { switchMap } from "rxjs";
import { error } from "console";

@Injectable({
    providedIn: 'root',

})

export class ApiService{
    //url declaration 
    private BASE_URL = 'http://localhost:3000';

    constructor(private http: HttpClient) {
        console.log('ApiService created');

    }

    login(username: string, password: string){
        return this.http.get<any[]>(`${this.BASE_URL}/users?username=${username}&password=${password}`);
    }  
    
    register(user: any){
        //                                           || this filetrs the usernames||
        return this.http.get<any[]>(`${this.BASE_URL}/users?username=${user.username}`).pipe(
            switchMap(existingUsers => {
                if (existingUsers.length > 0 ){
                    throw new Error('Username already exists');
                }
                else{
                    return this.http.post(`${this.BASE_URL}/users`, user);
                }
            })
        );
    }

    getUserTweets(userId: string) {
        return this.http.get<any[]>(`${this.BASE_URL}/tweets?userId=${userId}`);
    }

    getAllTweets(){
        return this.http.get<any[]>(`${this.BASE_URL}/tweets`);
    }

    getAllUsers(){
        return this.http.get<any[]>(`${this.BASE_URL}/users`);
    }

    postTweet(tweet: any ){
        return this.http.post(`${this.BASE_URL}/tweets`,tweet);
    }
   
    deleteUserTweet(tweetId:string){
        return this.http.delete(`${this.BASE_URL}/tweets/${tweetId}`);
    }

    checkUserIdExists(id: string) {
        return this.http.get<any[]>(`${this.BASE_URL}/users?id=${id}`);
      }
      
}

