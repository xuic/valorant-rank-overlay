import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  calcWinrate(data: {number_of_games: number, wins: number}) {
    const {number_of_games, wins} = data
    return (100 * wins / number_of_games).toFixed(1)
  }
}
