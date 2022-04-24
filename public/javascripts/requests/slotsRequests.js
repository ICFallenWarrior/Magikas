async function getSlot(SlotId) {
    try {
        const response = await fetch(`/api/slots/${SlotId}`);
        if (response.status == 200) {
           var slot = await response.json();
           return slot;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}
async function slotsplay(SlotId, card) {
    try {
        const response = await fetch(`/api/slots/${SlotId}/plays`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({ cardPlayed: card}) 
        });
        if (response.status == 200) {
           var  result= await response.json();
           return result;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}