export const fetchProducts = async () => {
    const param = window.location.pathname === '/'
        ? '/breads'
        : window.location.pathname

    const URL_BASE = 'https://backend-e-commerce-comidasargentinasjb-ii4kmkkfx-matifiordelli.vercel.app'
    let url = `${URL_BASE}${param}`

    return fetch(url)
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        .catch((err) => console.log(err))
}