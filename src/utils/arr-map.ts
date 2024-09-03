import {formatSongsAuthor} from "@/utils/index";

export function mapSongs(songs: any[]) {
    return songs.map((item:any) => {
        const target = item.song?item.song:item;
        item.dt = target.duration
        item.al = target.album
        item.ar = target.artists
        item.formatAuthor = formatSongsAuthor(target.artists)
        return item
    })
}