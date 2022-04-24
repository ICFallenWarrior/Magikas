async function getSlots() {
    try {
        const response = await fetch(`/api/slots`);
        if (response.status == 200) {
           var slots = await response.json();
           return slots;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}
