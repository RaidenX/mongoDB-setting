const jumlah =(a, b) => {
    console.log(a + b);
    
}

const pengurangan = (a, b) => {
    console.log(a - b);
    
}

const obj = {
    nama: "Alvin",
    age: 22
}
console.log('ini dari dua.js');

module.exports = {
    fungsi: jumlah,
    objek: obj
}
