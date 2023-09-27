import { inject, Injectable } from '@angular/core';
import { V1Account, V1Mmr, V2Mmr, V3Matches, Uuid } from '../type/response.type';
import { HttpClient } from '@angular/common/http';
import { EMPTY, iif, map, switchMap, timer, zip, retry, of, interval, repeat } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient)

  CURRENT_SEASON = 'e7a2'
  REQUEST_FREQUENCY = 30 * 1000
  constructor() { }

  getAccountResponse(name: string, tag: string) {
    return this.http.get<{
      status: number,
      data: V1Account
    }>(`https://api.henrikdev.xyz/valorant/v1/account/${name}/${tag}`)
  }

  getMmrResponse(region: string, name: string, tag: string) {
    return this.http.get<{
      status: number,
      data: V1Mmr
    }>(`https://api.henrikdev.xyz/valorant/v1/mmr/${region}/${name}/${tag}`)
  }

  getMatchesResponse(region: string, name: string, tag: string) {
    return this.http.get<{
      status: number,
      data: V3Matches
    }>(`https://api.henrikdev.xyz/valorant/v3/matches/${region}/${name}/${tag}?filter=competitive&size=1`)
  }

  getWinrateResponse(region: string, name: string, tag: string) {
    return this.http.get<{
      status: number,
      data: V2Mmr
    }>(`https://api.henrikdev.xyz/valorant/v2/mmr/${region}/${name}/${tag}?season=${this.CURRENT_SEASON}`)
  }

  polling(region: string, name: string, tag: string, puuid: Uuid) {
    return zip([
      this.getMmrResponse(region, name, tag).pipe(map(res => res.data)),
      this.getMatchesResponse(region, name, tag).pipe(map(res => res.data[0])),
      this.getWinrateResponse(region, name, tag).pipe(map(res => res.data)),
      of(puuid)
    ])
  }

  start(name: string, tag: string) {
    return this.getAccountResponse(name, tag).pipe(
      map(res => res.data),
      switchMap(account => {
        const {region, name, tag, puuid} = account
        return iif(
          () => !!account,
          this.polling(region, name, tag, puuid).pipe(
            repeat({delay: this.REQUEST_FREQUENCY}),
            retry({delay: () => interval(10000)})
          ),
          EMPTY
        )
      }),
      retry({
        delay: (error: any) => {
          new Error(`${error.status} ${error.error.errors[0].message}`)
          return interval(10000)
        }
      })
    )
  }



}
