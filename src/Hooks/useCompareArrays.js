function compareArrays(array1, array2) {
    const coincidencias = [];
    
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array2.length; j++) {
        if (array1[i] === array2[j]) {
          coincidencias.push(array1[i]);
        }
      }
    }
    return coincidencias;
  }

  export {compareArrays}