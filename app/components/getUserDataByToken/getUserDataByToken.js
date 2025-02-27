export async function fetchUser(setUser) {
    try {
        const response = await fetch("/api/auth/decode");
        if (!response.ok) throw new Error("Failed to decode token");

        const data = await response.json();
        setUser(data);
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}
