import EMailCodeBuilder from "./EmailCodeBuilder";

export async function NotifyCWIDLogIn(email, firstname, req) {
    const EMAILContent = `
    <p class="greeting">✌ <strong>${firstname}</strong>, hello!</p>
    <p>CW ID login was performed today, via CW ID System.</p>
    `;

    await EMailCodeBuilder(
        { email: email, titleHTML: "CW ID login", EMAILContent: EMAILContent, details: true, request: req }
    );
}
