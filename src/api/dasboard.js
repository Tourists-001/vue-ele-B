import request from "@/utils/request";
// 所有api请求量
export const apiAllCount = async () => {
    return await request({
        url: '/statis/api/count'
    })
}
// api请求量
export const apiCount = async (date) => {
    return await request({
        url: `/statis/api/${date}/count`
    })
}

// 所有api请求信息
export const apiAllRecord = async () => {
    return await request({
        url: '/statis/api/all'
    })
}
// 用户注册量
export const userCount = async (date) => {
    return await request({
        url: `/statis/user/${date}/count`
    })
}

// 某一天的订单数量
export const orderCount = async (date) => {
    return await request({
        url: `/statis/order/${date}/count`
    })
}
// 某一天的管理员注册表
export const adminDayCount = async (date) => {
    return await request({
        url: `/statis/admin/${date}/count`
    })
}

// 管理员的数量
export const adminCount = async () => {
    return await request({
        url: '/admin/count'
    })
}
// 获取订单数量
export const getOrderCount = async (data) => {
    return await request({
        url: '/bos/orders/count',
        data,
    })
}

// 获取用户数量
export const getUserCount = async (data) => {
    return await request({
        url: `/v1/users/count`,
        data,
    })
}

// 获取类
export const foodCategory = async () => {
    return await request({
        url: '/shopping/v2/restaurant/category'
    })
}