// 封装操作localstorage本地存储的方法

const storage = {
  // 存储
  set(key, value) {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  },
  // 取出数据
  get(key) {
    return JSON.parse(localStorage.getItem(key))
  },
  // 删除数据
  remove(key) {
    localStorage.removeItem(key)
  },
  // 删除all
  removeAll() {
    localStorage.clear()
  }
}

// 暴露给外部访问
export default storage
