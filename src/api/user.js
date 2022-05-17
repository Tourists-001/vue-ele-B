import request from "@/utils/request";
// 登录
export const login = async (data) => {
    return await request({
        url: '/admin/login',
        data,
        method: 'post'
    })
}

// 获取用户信息
export const getAdminInfo = async () => {
    return await request({
        url: '/admin/info'
    })
}
// 退出登录
export const signout = async () => {
    return await request({
        url: '/admin/signout'
    })
}
