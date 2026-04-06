from django.core.management.base import BaseCommand
from django.conf import settings
from djongo import connection
from pymongo import ASCENDING

# Sample data for superheroes, teams, activities, leaderboard, and workouts
data = {
    "users": [
        {"name": "Superman", "email": "superman@dc.com", "team": "DC"},
        {"name": "Batman", "email": "batman@dc.com", "team": "DC"},
        {"name": "Wonder Woman", "email": "wonderwoman@dc.com", "team": "DC"},
        {"name": "Iron Man", "email": "ironman@marvel.com", "team": "Marvel"},
        {"name": "Captain America", "email": "cap@marvel.com", "team": "Marvel"},
        {"name": "Black Widow", "email": "widow@marvel.com", "team": "Marvel"},
    ],
    "teams": [
        {"name": "Marvel"},
        {"name": "DC"},
    ],
    "activities": [
        {"user": "superman@dc.com", "activity": "Flight", "duration": 60},
        {"user": "ironman@marvel.com", "activity": "Suit Training", "duration": 45},
    ],
    "leaderboard": [
        {"team": "Marvel", "points": 120},
        {"team": "DC", "points": 110},
    ],
    "workouts": [
        {"name": "Strength Training", "level": "Advanced"},
        {"name": "Cardio Blast", "level": "Beginner"},
    ],
}

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        db = connection.cursor().db_conn
        # Drop collections if they exist
        for collection in data.keys():
            db[collection].delete_many({})
        # Insert data
        for collection, docs in data.items():
            db[collection].insert_many(docs)
        # Ensure unique index on email for users
        db['users'].create_index([('email', ASCENDING)], unique=True)
        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
