import { Injectable } from '@angular/core';
import { V3Match, Uuid } from '../type/response.type';

@Injectable({
  providedIn: 'root'
})
export class DataProcessorService {
  constructor() { }

  calcWinrate(data: {number_of_games: number, wins: number}) {
    const {number_of_games, wins} = data
    if (number_of_games === 0) {
      return '0'
    }
    return (100 * wins / number_of_games).toFixed(1)
  }

  checkWinlose(oldLastMatch: V3Match | undefined, newLastMatch: V3Match, puuid: Uuid): 'init' | 'win' | 'lose' | 'draw' | 'nothing' {
    if (oldLastMatch === undefined) {
      return 'init'
    }
    if (oldLastMatch.metadata.matchid === newLastMatch.metadata.matchid) {
      return 'nothing'
    }
    const team = newLastMatch.players.all_players.find(p => p.puuid === puuid)!.team
    if (team === 'Blue' && newLastMatch.teams.blue.has_won || team === 'Red' && newLastMatch.teams.red.has_won) {
      return 'win'
    }
    if (team === 'Blue' && newLastMatch.teams.red.has_won || team === 'Red' && newLastMatch.teams.blue.has_won) {
      return 'lose'
    }
    return 'draw'
  }

}
