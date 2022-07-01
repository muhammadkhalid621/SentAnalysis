from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from .views import twitter_logs_profile

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(twitter_logs_profile, 'interval', minutes=21600)
    scheduler.start()