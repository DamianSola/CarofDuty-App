

export const validateSubmit = (data) => {

    const {car, services, date, customer} = data;

    if(!car || !date || !customer) return false;
    if(!services || services.length === 0) return false;
    if(!customer.name || !customer.email || !customer.phone) return false;
    
    return true;
}