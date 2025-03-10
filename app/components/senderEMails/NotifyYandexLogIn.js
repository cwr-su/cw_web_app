import EMailCodeBuilder from "./EmailCodeBuilder";

export async function NotifyYandexLogIn(email, firstname, req) {
    const EMAILContent = `
    <p class="greeting">✌ <strong>${firstname}</strong>, hello!</p>
    <p>CW ID login was performed today with your Yandex ID.</p>
    `;

    await EMailCodeBuilder(
        { email: email, titleHTML: "CW ID login via Yandex ID", EMAILContent: EMAILContent, details: true, request: req }
    );
}
