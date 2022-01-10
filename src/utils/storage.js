// 本地存储封装模块
export const getItem = (name) => {
    // 读取本地存储数据
    const data = window.localStorage.getItem(name)
        // data是JSON格式字符串就转换，不是就原样返回
    try {
        return JSON.parse(data)
    } catch (error) {
        return data
    }
}

export const setItem = (name, value) => {
    // 如果value在对象，就转换JSON 格式字符串在储存
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    // 不是对象 就原样存进去
    window.localStorage.setItem(name, value)
}


export const removeItem = (name) => {
    window.localStorage.removeItem(name)
}