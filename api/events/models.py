from django.db import models


class RSVP(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    event_id = models.CharField(max_length=200)
