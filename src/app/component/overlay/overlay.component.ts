import { ApiService } from './../../service/api.service';
import { ImgUrl, V3Match } from './../../type/response.type';
import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataProcessorService } from 'src/app/service/data-processor.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
    private processor = inject(DataProcessorService)
    private router = inject(Router)
    private toastr = inject(ToastrService)

    @Input({ required: true }) name!: string
    @Input({ required: true }) tag!: string

    isReady = false
    rankIcon: ImgUrl | undefined
    rank: string | undefined
    rankRating: number | undefined
    winrate: string | undefined
    win = 0
    lose = 0
    startRecording: number | undefined
    lastMatch: V3Match | undefined

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
      this.apiService.start(this.name, this.tag).subscribe({
        next: res => {
          const [mmr, lastMatch, winrate, puuid] = res
          this.rank = mmr.currenttierpatched.toUpperCase()
          this.rankRating = mmr.ranking_in_tier
          this.rankIcon = `assets/tier/${mmr.currenttier}.png`
          this.winrate = this.processor.calcWinrate(winrate)
          this.isReady = true
          this.startRecording = Math.floor(Date.now() / 1000)
          const result = this.processor.checkWinlose(this.lastMatch, lastMatch, puuid)
          if (result === 'win') {
            this.win++
          } else if (result === 'lose') {
            this.lose++
          }
          this.lastMatch = lastMatch
        },
        error: err => {
          this.toastr.error(err.message, err.name)
          this.router.navigate([], {
            queryParams: {}
          })
        }
      })
    }
  }
