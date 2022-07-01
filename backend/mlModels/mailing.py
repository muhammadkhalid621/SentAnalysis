
def send_email(receiver, reportFile, mapFile, reportFileName, mapFileName):
    import smtplib
    from email.mime.multipart import MIMEMultipart
    from email.mime.text import MIMEText
    from email.mime.base import MIMEBase
    from email import encoders

    body = '''Hello,
  this email is to notify you that the analytics conduted on the given topic was a success and below are the 
  contents of yor request.
  1) pdf report
  2) map

  Sincerely,
  The SSK Team.
  '''
    sender = 'sskenterprises486@gmail.com'
    password = 'unimaginable_TRUE_4_'
    receiver = receiver

    message = MIMEMultipart()
    message['From'] = sender
    message['To'] = receiver
    message['Subject'] = 'Hows it going partner?'
    message.attach(MIMEText(body, 'plain'))

    fileName = [reportFileName, mapFileName]
    files = [reportFile, mapFile]
    i=0
    for f in files:
        binary_pdf = open(f, 'rb')
        payload = MIMEBase('application', 'octate-stream', Name=fileName[i])
        payload.set_payload((binary_pdf).read())
        encoders.encode_base64(payload)
        payload.add_header('Content-Decomposition', 'attachment', filename=fileName[i])
        message.attach(payload)
        i +=1

    session = smtplib.SMTP('smtp.gmail.com', 587)
    session.starttls()
    session.login(sender, password)
    text = message.as_string()
    session.sendmail(sender, receiver, text)
    session.quit()
    print('Mail Sent')
