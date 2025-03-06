import EMailCodeBuilder from "./EmailCodeBuilder";

export async function sendSuccessfulVerifyEmail(email, firstname, req) {
    const EMAILContent = `
    <p class="greeting">🤝 <strong>${firstname}</strong>, hello!</p>
    <p>🎉🎊✨ Congratulations! Your EMail (${email}) has been successfully verified with CW ID. You now have full 💗 access to manage your account.</p>
    `;

    await EMailCodeBuilder(
        { email: email, titleHTML: "Successful EMail verification in CW ID", EMAILContent: EMAILContent, details: true, request: req }
    );
}
