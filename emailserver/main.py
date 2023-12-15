import smtplib
from pymongo import MongoClient

# List of email_id to send the mail

db_url = 'mongodb+srv://sugamf7:%40Safal12345@cluster0.acytgle.mongodb.net/morupayment'
client = MongoClient(db_url)
db = client.get_database()
collection = db.get_collection("User")
cursor = collection.find()

# SMTP setup (moved outside the loop for efficiency)
s = smtplib.SMTP('smtp.gmail.com', 587)
s.starttls()
s.login("sugamf1@gmail.com", "jspsfvfizwgaewpo")

# Iterate over each document in the collection
for document in cursor:
  # Extract email and name from the document
  email = document.get("email")
  name = document.get("name")

  # Check if both email and name are present
  if email and name:
    # Create your email message using the extracted information
    subject = "Electricity Bill Reminder"
    body = f"""
        <html>
            <head></head>
            <body>
                <p style="color: #333; font-size: 16px;">
                    Hello {name},
                </p>
                <p style="color: #333; font-size: 16px;">
                    This is a reminder about your monthly electricity bill. Please ensure to make the payment on time to avoid any disruptions.
                </p>
                <p style="color: #333; font-size: 16px;">
                    If you've already paid the bill, please ignore this message. Otherwise, pay via Moru app right now.
                </p>
                <p style="color: #333; font-size: 16px;">
                    <a href="https://moru.com.np/home/nea?lang=en" style="color: #007BFF; text-decoration: none;">Pay Your Bill</a>
                </p>
            </body>
        </html>
        """

    message = f"Subject: {subject}\nMIME-Version: 1.0\nContent-Type: text/html\n\n{body}"

    # Send email to the specific user
    s.sendmail("sugamf1@gmail.com", email, message)
  else:
    print("Skipped document. Email or name missing.")

# Quit SMTP connection after sending all emails
s.quit()
