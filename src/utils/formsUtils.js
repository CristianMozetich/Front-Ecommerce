export const getCookies = (name) => {
    const allCookies = document.cookie.split(';');
    for (let i = 0; i < allCookies.length; i++) {
        const cookie = allCookies[i].trim();

        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

