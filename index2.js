fetch("http://localhost:4001/api/users").then((res)=>res.json()).then(
    (data)=>console.log(data))