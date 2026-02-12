function registerTemplate({name}) {
    return `
    <!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f7; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 0;">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background:#40513B; padding:20px; text-align:center; color:white;">
                <h1 style="margin:0; font-size:24px;">Thank you for registering</h1>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="padding:30px; color:#333;">
                <h2 style="margin-top:0;">Hello and welcome ${name}!</h2>
                <p style="line-height:1.6;">
                  Thank you for registering with Monstera. We're excited to have you on board!
                  <p>Please verify your email address by clicking the button below.</p>
                </p>

                <p style="margin:30px 0; text-align:center;">
                  <a
                    href="###"
                    style="
                      background:#609966;
                      color:#ffffff;
                      padding:12px 20px;
                      text-decoration:none;
                      border-radius:6px;
                      display:inline-block;
                    "
                  >
                    Verify email!
                  </a>
                </p>

                <p style="font-size:14px; color:#777;">
                  Cheers,<br />
                  Monstera Team
                </p>
                <p style="text-align: center;">
                    <img src="https://cdn.discordapp.com/attachments/1466099182048772261/1466099945697185853/Monstera.png?ex=69836c79&is=69821af9&hm=4f21f1c181997ea2c1369f4dc92d677d3afe9e52e00b0471984042d94b9a5f36&" alt="">
                </p>
                
              </td>
            </tr>
            

            <!-- Footer -->
            <tr>
                
              <td style="background:#f4f4f7; padding:15px; text-align:center; font-size:12px; color:#999;">
                © ${new Date().getFullYear()} Monstera.fi All rights reserved.
              </td>
            </tr>
            
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}

module.exports = registerTemplate;