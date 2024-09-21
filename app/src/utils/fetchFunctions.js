export const sendData = (data)  => {
    fetch("http://localhost:3000/api/products",{
      method: "POST",
      body: JSON.stringify(data)
    });
  }