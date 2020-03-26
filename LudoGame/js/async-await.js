function getIds() {
    return new Promise(resolve =>{
        resolve('done');
    });
}

function getRecipe(){
    return new Promise((resolve, reject)=>{
        resolve('something');
    });
}

getIds().then(something =>{
    console.log(something);
});