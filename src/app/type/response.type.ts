export type V1Account = {
  "puuid": Uuid,
  "region": string,
  "account_level": number,
  "name": string,
  "tag": string,
  "card": {
    "small": ImgUrl,
    "large": ImgUrl,
    "wide": ImgUrl,
    "id": Uuid
  },
  "last_update": string,
  "last_update_raw": number
}

export type ImgUrl = string

export type V1Mmr = {
  "currenttier": number,
  "currenttierpatched": string,
  "images": {
    "small": ImgUrl,
    "large": ImgUrl,
    "triangle_down": ImgUrl,
    "triangle_up": ImgUrl
  },
  "ranking_in_tier": number,
  "mmr_change_to_last_game": number,
  "elo": number,
  "name": string,
  "tag": string,
  "old": boolean
}

export type V2Mmr = {
  "wins": number,
  "number_of_games": number,
  "final_rank": number,
  "final_rank_patched": string,
  "act_rank_wins": {
    "patched_tier": string,
    "tier": number
  }[],
  "old": boolean
}

export type Uuid = string

export type Player = {
  "puuid": Uuid,
  "name": string,
  "tag": string,
  "team": "Red"|"Blue",
  "level": number,
  "character": string,
  "currenttier": number,
  "currenttier_patched": string,
  "player_card": Uuid,
  "player_title": Uuid,
  "party_id": Uuid,
  "session_playtime": {
      "minutes": number,
      "seconds": number,
      "milliseconds": number
  },
  "behavior": {
      "afk_rounds": number,
      "friendly_fire": {
          "incoming": number,
          "outgoing": number
      },
      "rounds_in_spawn": number
  },
  "platform": {
      "type": string,
      "os": {
          "name": string,
          "version": string
      }
  },
  "ability_casts": {
      "c_cast": number,
      "q_cast": number,
      "e_cast": number,
      "x_cast": number
  },
  "assets": {
      "card": {
          "small": ImgUrl,
          "large": ImgUrl,
          "wide": ImgUrl
      },
      "agent": {
          "small": ImgUrl,
          "bust": ImgUrl,
          "full": ImgUrl,
          "killfeed": ImgUrl
      }
  },
  "stats": {
      "score": number,
      "kills": number,
      "deaths": number,
      "assists": number,
      "bodyshots": number,
      "headshots": number,
      "legshots": number
  },
  "economy": {
      "spent": {
          "overall": number,
          "average": number
      },
      "loadout_value": {
          "overall": number,
          "average": number
      }
  },
  "damage_made": number,
  "damage_received": number
}

export type V3Match = {
  "metadata": {
    "map": string,
    "game_version": string,
    "game_length": number,
    "game_start": number,
    "game_start_patched": string,
    "rounds_played": number,
    "mode": string,
    "mode_id": string,
    "queue": string,
    "season_id": string,
    "platform": string,
    "matchid": string,
    "premier_info": {
      "tournament_id": string,
      "matchup_id": string
    },
    "region": string,
    "cluster": string
  },
  "players": {
    "all_players": Player[],
    "red": Player[],
    "blue": Player[]
  },
  "teams": {
    "red": {
      "has_won": boolean,
      "rounds_won": number,
      "rounds_lost": number
    },
    "blue": {
      "has_won": boolean,
      "rounds_won": number,
      "rounds_lost": number
    }
  }
}

export type V3Matches = V3Match[]

// export type ResponseError = {
//   "message": string,
//   "code": number,
//   "details": string
// }
