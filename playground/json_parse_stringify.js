const obj = {
    user: 'Vasya',
    age: 21
};

const arr = [];
arr.push(JSON.parse(JSON.stringify(
    obj
)));

arr.push(obj);

console.dir(arr);
