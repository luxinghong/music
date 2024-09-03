import {defineStore} from "pinia";
import state from "./state";
import {darkTheme} from "naive-ui";
import {formatSongsAuthor} from "@/utils";

export const useMainStore = defineStore({
    id:'main',
    state: () => state,
    getters: {
        activeTheme(state) {
            return state.theme === 'dark'? darkTheme: null;
        },
        isActiveDarkTheme(state) {
            return state.theme === 'dark';
        },
        likeSongsIndexMap(state) {
            const map: { [key: number]: number; } = Object.create(null);
            state.likeSongs.forEach((item:number, index:number) => {
                map[item] = index;
            })
            return map;
        },
        currentPlaySong(state) {
            return state.playList[state.currentPlayIndex]
        },
        playListCount(state) {
            return state.playList.length;
        },
        isDark(state) {
            return state.theme === 'dark';
        }
    },
    actions: {
        initDocumentTheme() {
            if (this.theme === 'dark') {
                document.documentElement.classList.add('dark');
                document.documentElement.style.colorScheme = 'dark';
            } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.style.colorScheme = '';
            }
        },
        changeTheme(theme: 'dark' | 'light') {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
                document.documentElement.style.colorScheme = 'dark';
            } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.style.colorScheme = '';
            }
            this.theme = theme;
            localStorage.theme = theme;
        },
        removeAllLikeList() {
            this.likeSongs = [];
            localStorage.likeSongs = JSON.stringify(this.likeSongs);
        },
        toggleTheme() {
            const theme = this.theme === 'dark' ? 'light' : 'dark';
            this.changeTheme(theme);
        },
        mapSongListAddLike(data: any[]) {
            return data.map((item,index) => {
                if (this.likeSongs) {
                    item.like = this.hasLikeSong(item.id)
                }else {
                    item.like = false
                }
                item.formatAuthor = formatSongsAuthor(data)
                item.key = index
                return item
            })
        },
        hasLikeSong(id:number) {
            return !!this.likeSongs[this.likeSongsIndexMap[id]]
        }
    }
})