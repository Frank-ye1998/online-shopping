const actions = {
    setDeviceInfo:({commit},info)=>{
        return commit('SET_DEVICE_INFO',info)
    },
    setLoginKey:({commit},key)=>{
        return commit('SET_LOGIN_KEY',key);
    },
}

export default actions