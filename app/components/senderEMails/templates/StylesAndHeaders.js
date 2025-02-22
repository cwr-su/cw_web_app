async function StyleCSSAndHeadersTemplate({ titleHTML }) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${titleHTML}</title>
        <style>
            img {
                padding: 10px;
                text-align: center;
                display: flex;
                jusify-content: center;
                align-items: center;
                margin: 0 auto;
            }
            body {
                margin: 0;
                padding: 10px;
                background-color: rgba(238, 233, 255, 0.8);
                box-sizing: border-box;
                font-family: Verdana, Geneva, sans-serif;
                font-size: 1.1rem;
                overflow-wrap: break-word;
                hyphens: auto;
            }
            .headhd {
                margin-top: 1rem;
                margin-bottom: 1rem;
            }
            .greeting {
                color:rgb(45, 23, 82);
                font-size: 1.25rem;
                text-align: right;
            }
            .deflogocw {
                width: 85%;
                height: 100%;
            }
            .firstlogo {
                width: 85%;
                height: 100%;
                padding-bottom: 10px;
            }
            .container {
                padding: 20px;
                border-radius: 10px;
                max-width: 500px;
                margin: 0 auto;
            }
            .verifycodeblock {
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 1.65rem;
                margin: 0 auto;
                border-radius: 30px;
                background-color: rgb(45, 23, 82);
            }
            p {
                font-family: Verdana, Geneva, sans-serif;
                color: rgb(0, 0, 0);
                font-size: 1.1rem;
            }
            a {
                text-decoration: none;
                color: rgb(113, 5, 255);
            }
            #foot, #hd {
                font-size: 0.95rem;
                text-align: center;
            }
            #hd {
                font-weight: 900;
                font-size: 1.8rem;
                text-align: center;
            }
            #hd > a {
                color: rgb(57, 0, 133);
            }
            .details {
                font-size: 1.1rem;
                text-align: left;
                margin-top: 20px;
            }
            .footer {
                font-size: 0.95rem;
                margin-top: 20px;
            }
            .logos {
                background-color: rgb(168, 137, 220);
                border-bottom-left-radius: 45px;
                border-bottom-right-radius: 45px;
                padding-top: 25px;
                dispay: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                text-align: center;
            }
            .selfverifycode {
                text-align: center;
                font-size: 1.5rem;
                color: rgb(255, 255, 255);
                margin: 0 auto;
            }
        </style>
    </head>
    <body style="background-color: rgba(238, 233, 255, 0.8);
                box-sizing: border-box;
                font-family: Verdana, Geneva, sans-serif;
                font-size: 1.1rem;
                overflow-wrap: break-word;
                hyphens: auto;">
        <div class="container" id="main" style="
            padding: 20px;
            border-radius: 10px;
            max-width: 500px;
            margin: 0 auto;"
        >
            <div class="logos" style="
            background-color: rgb(168, 137, 220);
            border-bottom-left-radius: 45px;
            border-bottom-right-radius: 45px;
            padding-top: 25px;
            dispay: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            text-align: center;
            ">
                <img class="firstlogo" src="cid:logo_cw_id" style="
                    padding: 10px;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 auto;
                    width: 85%;
                    height: 100%;
                    padding-bottom: 10px;
                ">
                <img class="deflogocw" src="cid:logo_cw" style="
                    padding: 10px;
                    text-align: center;
                    display: flex;
                    jusify-content: center;
                    align-items: center;
                    margin: 0 auto;
                    width: 85%;
                    height: 100%;
                ">
            </div>

            <p class="headhd" id="hd" style="
            font-weight: 900;
            font-size: 1.8rem;
            text-align: center;
            "><a href="cwr.su" style="
            text-decoration: none;
            color: rgb(57, 0, 133);
            ">CW | CodeWriter | CWR.SU</a></p>
    `;
}

export default StyleCSSAndHeadersTemplate;
