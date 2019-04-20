const verb = {
    get(url) {
        return fetch(url);
    },
    post(url, data) {
        return fetch(url, {
            method: "POST",
            mode: "cors", 
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            referrer: "no-referrer", 
            body: JSON.stringify(data)
        })
    }
};

export default verb;