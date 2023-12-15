from datetime import datetime
from nepali_date import NepaliDate
import time
import pytz
import subprocess
# Set the time zone to 'Asia/Kathmandu'
nepal_timezone = pytz.timezone('Asia/Kathmandu')
day = 29
hour = 10
minute = 33
second = 10
while True:

  # Get the current timestamp using the current date and time in Nepal time zone
  timestamp_nepali = NepaliDate.today()
  current_time = datetime.now(nepal_timezone).strftime('%I:%M:%S %p')

  # Check if it's the 2nd day of the month and 11:10:15 AM
  if timestamp_nepali.day == day and datetime.now(
      nepal_timezone).hour == hour and datetime.now(
          nepal_timezone).minute == minute and datetime.now(
              nepal_timezone).second == second and datetime.now(
                  nepal_timezone).strftime('%p') == 'AM':
    subprocess.run(['python', 'main.py'])
    # Print a unique message for the unique day and time
    print(
        f'Today is a unique day and time (AM): {timestamp_nepali.year}-{timestamp_nepali.month:02d}-{timestamp_nepali.day:02d} {current_time}'
    )

  # Check if it's the 2nd day of the month and 11:00:00 PM
  elif timestamp_nepali.day == 2 and datetime.now(
      nepal_timezone).hour == 23 and datetime.now(
          nepal_timezone).minute == 0 and datetime.now(
              nepal_timezone).second == 0 and datetime.now(
                  nepal_timezone).strftime('%p') == 'PM':
    # Print a unique message for the unique day and time
    print(
        f'Today is a unique day and time (PM): {timestamp_nepali.year}-{timestamp_nepali.month:02d}-{timestamp_nepali.day:02d} {current_time}'
    )
  else:
    # Continuously log the current Nepali date and time
    print(
        f'Nepali Date and Time: {timestamp_nepali.year}-{timestamp_nepali.month:02d}-{timestamp_nepali.day:02d} {current_time}'
    )

  # Wait for a short duration before the next iteration
  time.sleep(1)
