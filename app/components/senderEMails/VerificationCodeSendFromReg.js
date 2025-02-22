import EMailCodeBuilder from "./EmailCodeBuilder";

export async function sendVerificationEmail(email, firstname, verificationCode, req) {
    const EMAILContent = `
    <p class="greeting">🤝 <strong>${firstname}</strong>, hello!</p>
    <p>🔥 Thank you so much for registering with our CW online service. We are constantly improving our digital merchandise for your convenience. You can read more about our projects <a href="${process.env.NEXT_PUBLIC_SITE_URL}/projects">here</a>.</p>
    <p>You need to confirm this EMail, so, please verify your EMail. To do so, please go to <a href="${process.env.NEXT_PUBLIC_SITE_URL}/verify_email">the VERIFY page</a>, and enter a verification code.</p>
    <p>🔑 Your verification code:</p>
    <div class="verifycodeblock">
        <p class="selfverifycode"><strong style='font-family: monospace;'>${verificationCode}</strong></p>
    </div>
    <p style="text-align: center; margin-top: 5px;">❗ Don't report it to anyone ❗</p>
    `;

    await EMailCodeBuilder(
        { email: email, titleHTML: "Email Confirmation in CW ID", EMAILContent: EMAILContent, details: true, request: req }
    );
}
