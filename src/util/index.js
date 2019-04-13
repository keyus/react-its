import store from '@store'
import {Menus} from '@view/router'
import history from '@history'

class Util {
    reg = {
        password: /^\w{6,20}$/,
        account: /^\w{4,20}$/,
        money: /^[1-9]\d{0,7}$/i,
        // url: /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/i,
        ip: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    }
    //此项目金额，以分为单位，所有金额全部除以100
    formatMoney=(number)=>{
        number = number/100;
        const fallbackNumber = Number.isNaN(+number) ? 0 : +number;
        return new Intl.NumberFormat('zh-CN', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        }).format(fallbackNumber);
    }
    getHomePath = ()=>{
        const role = this.getRole();
        const menus = Menus.filter(it=>it.role.includes(role));
        if(Menus.length){
            return menus[0]?.path;
        }
    }
    goHome = ()=>{
        history.push(this.getHomePath())
    }
    isIp=(ipaddress)=>{
        return this.reg.ip.test(ipaddress)
    }
    getRole=()=> store.getState()?.user?.roleType;
}
export default new Util();
