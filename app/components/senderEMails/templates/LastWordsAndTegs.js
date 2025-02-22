async function LastWordsInEMailWithEndHTMLTegs() {
    return `
    <div class="footer">
                <p class="sincerely">
                    <i>Sincerely, the CW team.
                    <br/><br/>
                    If you have any questions about purchasing a product, please contact: 
                    <a href='mailto:b2b@cwr.su'>b2b@cwr.su</a>.
                    <br/>
                    On cooperation issues: <a href='mailto:cwr@cwr.su'>cwr@cwr.su</a>.
                    <br/>
                    For technical issues and problems: 
                    <a href='mailto:help@cwr.su'>help@cwr.su</a>.</i>
                    <br/>
                    <br/>
                </p>
                <p>👤 Director and developer, creator, designer of the CW product: Laptev 
                Alexander A.</p>
                <p>👌🏻 This system notification is generated automatically by CW System. 
                You don't need to answer it!</p>
                <p id='foot'>© CW | All rights reserved | 2023 - ${new Date().getFullYear()}.<br/></p>
            </div>
        </div>
    </body>
    </html>
    `;
}

export default LastWordsInEMailWithEndHTMLTegs;