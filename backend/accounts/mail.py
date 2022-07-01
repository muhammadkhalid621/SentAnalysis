
def send_email(receiver, subject, body):
    import smtplib
    from email.mime.multipart import MIMEMultipart
    from email.mime.text import MIMEText
    from email.mime.base import MIMEBase
    from email import encoders

#     body = '''Hello,
#   this email is to notify you that the analytics conduted on the given topic was a success and below are the 
#   contents of yor request.
#   1) pdf report
#   2) map

#   Sincerely,
#   The SSK Team.
#   '''
    sender = 'sskenterprises486@gmail.com'
    password = 'unimaginable_TRUE_4_'

    message = MIMEMultipart()
    message['From'] = sender
    message['To'] = receiver
    message['Subject'] = subject
    message.attach(MIMEText(body, 'plain'))

    
    session = smtplib.SMTP('smtp.gmail.com', 587)
    session.starttls()
    session.login(sender, password)
    text = message.as_string()
    session.sendmail(sender, receiver, text)
    session.quit()
    print('Mail Sent')
