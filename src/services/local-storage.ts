export const saveToLocalStorage = (cityName: string) => {
    console.log(`Saving this string to local storage ${cityName}`);
    const favoritesListArr = getFromLocalStorage();

    if (!favoritesListArr.includes(cityName)) {
        favoritesListArr.push(cityName);
    }

    localStorage.setItem('Starred', JSON.stringify(favoritesListArr));
}

export const getFromLocalStorage = () => {
    const localStorageData: string | null = localStorage.getItem('Starred');

    if (localStorageData == null) {
        return [];
    }

    return JSON.parse(localStorageData);
}

export const removeFromLocalStorage = (cityName: string) => {
    const localStorageData: string[] = getFromLocalStorage();

    const starredCitiesIndex: number = localStorageData.indexOf(cityName);

    localStorageData.splice(starredCitiesIndex, 1);

    localStorage.setItem('Starred', JSON.stringify(localStorageData))
}

