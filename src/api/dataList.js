import request from "@/utils/request";


// 获取用户列表
export const getUserList = async (data) => {
    return await request({
        url: '/v1/users/list',
        params: data
    })
}

// 获取定位城市
export const cityGuess = async () => {
    return await request({
        url: '/v1/cities',
        params: {
            type: 'guess'
        }
    })
}
// 获取餐馆数量
export const getResturantsCount = async () => {
    return await request({
        url: '/shopping/restaurants/count'
    })
}
// 获取餐馆数据
export const getResturants = async (data) => {
    return await request({
        url: '/shopping/restaurants',
        params: data
    })
}

// 获取当前店铺食品种类
export const foodCategory = async () => {
    return await request({
        url: '/shopping/v2/restaurant/category',
    })
}

// 获取搜索地址
export const searchplace = async (cityid, value) => {
    return await request({
        url: '/v1/pois',
        params: {
            type: 'search',
            city_id: cityid,
            keyword: value
        }
    })
}
// 更新商品种类
export const updateResturant = async (data) => {
    return await request({
        url: '/shopping/updateshop',
        data,
        method: 'post',
    })
}
// 删除餐馆
export const deleteResturant = async (id) => {
    return await request({
        url: `/shopping/restaurant/${id}`,
        method: 'delete'
    })
}

// 获取食品数量
export const getFoodsCount = async (id) => {
    return await request({
        url: '/shopping/v2/foods/count',
        params: {
            id,
        }
    })
}

// 获取食品分类
export const getFoods = async (data) => {
    return await request({
        url: '/shopping/v2/foods',
        params: data,
    })
}

// 获取menu详情
export const getMenuById = async (id) => {
    return await request({
        url: `/shopping/v2/menu/${id}`
    })
}
// 获取餐馆详细信息
export const getResturantDetail = async (id) => {
    return await request({
        url: `/shopping/restaurant/${id}`,
    })
}

// 获取menu
export const getMenu = async (data) => {
    return await request({
        url: '/shopping/v2/menu',
        params: data
    })
}

// 删除food
export const deleteFood = async (id) => {
    return await request({
        url: `/shopping/v2/food/${id}`,
        method: 'delete'
    })
}

// 修改foods
export const updateFood = async (data) => {
    return await request({
        url: '/shopping/v2/updatefood',
        data,
        method: 'post'
    })
}

// 获取订单数量
export const getOrderCount = async (data) => {
    return await request({
        url: `/bos/orders/count`,
        params: data
    })
}

export const getOrderList = async (data) => {
    return await request({
        url: '/bos/orders',
        params: data,
    })
}

// 获取用户信息
export const getUserInfo = async (id) => {
    return await request({
        url: `/v1/user/${id}`
    })
}

// 获取地址信息
export const getAddressById = async (id) => {
    return await request({
        url: `/v1/addresse/${id}`,
    })
}

// 用户数量
export const adminCount = async () => {
    return await request({
        url: '/admin/count',
    })
}

// 用户列表
export const adminList = async (data) => {
    return await request({
        url: `/admin/all`,
        params:data
    })
}


export const addShop = async (data) => {
    return await request({
        url: '/shopping/addShop',
        data,
        method: 'post'
    })
}

export const getCategory = async (id) => {
    return await request({
        url: `/shopping/getcategory/${id}`
    })
}
export const addCategory = async (data) => {
    return await request({
        url: '/shopping/addcategory',
        data,
        method: 'post'
    })
}

export const addFood = async (data) => {
    return await request({
        url: '/shopping/addfood',
        data,
        method: 'post'
    })
}