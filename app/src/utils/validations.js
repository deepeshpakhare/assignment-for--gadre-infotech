export const isValidated = (arr) => {
    for (let obj of arr) {
        if(obj.productName === "") {
            alert("Please fill product name");
            return false;
        }
        if(obj.category === "") {
            alert("Please select category");
            return false;
        }
        if(obj.quantity==="") {
            alert("Please fill quantity");
            return false;
        }
        if(isNaN(obj.quantity)) {
            alert("Qunatity has to be a number");
            return false;
        }
    }
    return true;
}