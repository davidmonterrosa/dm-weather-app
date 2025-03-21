export const saveToLocalStorage = (cityName: string) => {
    console.log(`Saving this string to local storage ${cityName}`);
    let favoritesListArr = getFromLocalStorage();

    if (!favoritesListArr.includes(cityName)) {
        favoritesListArr.push(cityName);
    }

    localStorage.setItem('Starred', JSON.stringify(favoritesListArr));
}

export const getFromLocalStorage = () => {
    let localStorageData = localStorage.getItem('Starred');

    if (localStorageData == null) {
        return [];
    }

    return JSON.parse(localStorageData);
}

export const removeFromLocalStorage = (cityName: string) => {
    let localStorageData = getFromLocalStorage();

    let starredCitiesIndex = localStorageData.indexOf(cityName);

    localStorageData.splice(starredCitiesIndex, 1);

    localStorage.setItem('Starred', JSON.stringify(localStorageData))
}

