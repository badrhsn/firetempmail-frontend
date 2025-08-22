const url = "https://post.firetempmail.com";

export async function loadEmails(address) {
    try {
        const response = await fetch(`${url}/mail/get?address=${address}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        return {
            emails: data.mails || [],
            stats: data.stats || {}
        };
    } catch (error) {
        console.error("Failed to load emails:", error);
        throw new Error("Failed to load emails. Please try again.");
    }
}

export async function deleteEmail(email) {
    if (!email || !email.recipient || !email.suffix) return;
    
    let emailKey = email.recipient + "-" + email.suffix;
    const response = await fetch(`${url}/mail/delete?key=${emailKey}`);
    return await response.json();
}

export async function forwardEmail(emailKey, forwardTo) {
    const response = await fetch(`${url}/mail/forward`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: emailKey, forward: forwardTo }),
    });
    return await response.json();
}