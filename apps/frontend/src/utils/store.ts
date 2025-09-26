import {create} from 'zustand';

import {User} from './types';

interface UserStore extends User{
    setUser: (user: User)=> Promise<void>
    clearUser: ()=>Promise<void>
}
export const useUserStore = create<UserStore>( (set)=>({
    username: '',
    email: '',
    avatar: '',
    name: '',
    rating: 0,
    wins: 0,
    setUser: async (user: User)=>{
        set({
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            name: user.name,
            rating: user.rating,        
            wins: user.wins
        })
        console.log(`User values updated gloablly ${user.username}`)
    },
    clearUser: async ()=>{
        set({
            username: '',
            email: '',
            avatar: '',
            name: '',
            rating: 0,            
            wins: 0
        })
        console.log('User state cleared')
    }
}))
