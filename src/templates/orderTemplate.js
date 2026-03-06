function orderTemplate({ name, orderId, items, orderDetails }) {
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
                <h1 style="margin:0; font-size:24px;">Order confirmation</h1>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="padding:30px; color:#333;">
                <h2 style="margin-top:0;"> Hello ${name}</h2>
                <p style="line-height:1.6;">
                 Your order ${orderId} has been confirmed. We're excited to have you as a customer.
                 Please find the details of your order here.
                </p>

                </p>
                <p>${orderDetails}</p>

                <p style="font-size:14px; color:#777;">
                  Cheers,<br />
                  Monstera Team
                </p>
                <p style="text-align: center;">
                    <img src="https://cdn.discordapp.com/attachments/1458746892589469841/1463826544161067142/Monstera.png?ex=69ab45f4&is=69a9f474&hm=ea8897ebd20242d4688bba3211ff6ac69448d6d82be77aeaceadd50605829650" alt="">
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

`
}
module.exports = orderTemplate;