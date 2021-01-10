const Utils = {
    chunkArray(myArray, chunk_size = 3) {
        var index = 0;
        var arrayLength = myArray.length;
        var tempArray = [];
        for (index = 0; index < arrayLength; index += chunk_size) {
            var myChunk = myArray.slice(index, index + chunk_size);
            tempArray.push(myChunk);
        }
        return tempArray;
    },

    sortByKey(array, key) {
        return array.sort(function (a, b) {
            var x = key === 'comments' ? a[key].length : a[key];
            var y = key === 'comments' ? b[key].length : b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    },
}

export default Utils;