from datetime import datetime
from nepali_date import NepaliDate
import time
import pytz
import subprocess

# Set the time zone to 'Asia/Kathmandu'
nepal_timezone = pytz.timezone('Asia/Kathmandu')
day = 23
hour_am = 7
minute_am = 41
second_am = 50
hour_pm = 7  # Update this to the PM hour
minute_pm = 51  # Update this to the PM minute
second_pm = 0  # Update this to the PM second

while True:
    # Get the current timestamp using the current date and time in Nepal time zone
    timestamp_nepali = NepaliDate.today()
    current_time = datetime.now(nepal_timezone).strftime('%I:%M:%S %p')
    print(datetime.now(
        nepal_timezone).hour)


    # Check if it's the 23rd day of the month and 7:41:50 AM
    if timestamp_nepali.day == day and datetime.now(
        nepal_timezone).hour == hour_am and datetime.now(
            nepal_timezone).minute == minute_am and datetime.now(
                nepal_timezone).second == second_am and datetime.now(
                    nepal_timezone).strftime('%p') == 'AM':
        subprocess.run(['python3', 'main.py'])
        # Print a unique message for the unique day and time
        print(
            f'Today is a unique day and time (AM): {timestamp_nepali.year}-{timestamp_nepali.month:02d}-{timestamp_nepali.day:02d} {current_time}'
        )

    # Check if it's the 23rd day of the month and 7:41:00 PM
    elif timestamp_nepali.day == day and datetime.now(
        nepal_timezone).hour == hour_pm and datetime.now(
            nepal_timezone).minute == minute_pm and datetime.now(
                nepal_timezone).second == second_pm and datetime.now(
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
