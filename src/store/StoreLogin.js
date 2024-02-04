
import { defineStore } from 'pinia';
import { loginUser, logOut } from '../auth/login.js';
import { GetUserName, GetUserAvatar } from '../api/getUserInfoApi.js'
import { router } from '../routes/router.js';
import * as jwtToken from 'jose';

export const UserLoginStore = defineStore
    ('StoreLogin', {
        state: () => ({
            exp: Date.now(),
            token: null,


        }),

        actions: {

            async UsrerLogin(token1) {
                this.token = await token1
                localStorage.setItem("tokenAnt", this.token)
            },
            logOut() {


                //移除token
                logOut();
                //用户信息改变，调用该方法进行重置
                loginState(). changeState()
            },

            async UserLigonAuthorization(login) {
                const { data } = await loginUser(login)
                console.log(data.email)
                this.UsrerLogin(data.token)
                console.log(data.token + " emial:" + data.email + " id:" + data.id)


                router.replace('/')
            }


        }
    })
export const loginState = defineStore(
    'loginState', {
    state: () => ({
        InLogin: false,
        name1: '',
        avatarUrl: '',
        userId: 0,
    }),
    actions: {

        async changeState() {

            if (localStorage.getItem('tokenAnt')) {
                const token = localStorage.getItem('tokenAnt')

                this.InLogin = true;

                const decoded = jwtToken.decodeJwt(token)
                //保存用户id
                this.userId = Number( decoded.id)

                //用异步的方法同时获取用户的名字和获取用户的头像，效率二倍
                const [avatarOf, nameOf] = await Promise.all([(GetUserAvatar(decoded.id)), (GetUserName(decoded.id))])
                this.name1 = nameOf.data
                if (avatarOf.data.success == true) {
                    this.avatarUrl = avatarOf.data.data
                } else {
                    console.log("获取头像失败")
                }



            } else {
                this.name1 = "";
                this.userId = 0;
                this.InLogin = false;
                console.log("退出登入")



            }
        }

    }
}

)