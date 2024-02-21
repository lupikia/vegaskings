import {Jackpot} from './Jackpot'
export interface Game {
    lastdraw_date: string
    lastdraw_numbers: any
    nextdraw_date: any
    jackpot?: Jackpot
    game_id: string
    game_name: string
    update_time: string
  }