from django.db import models


class GCalEvent(models.Model):
    ...
    # GCal ID


class RSVP(models.Model):
    event = models.ForeignKey(GCalEvent)
    user = ...
    email = models.EmailField(required=False, blank=True)
    phone = models.CharField(required=False, blank=True)
    notified = models.Boolean(default=False)
